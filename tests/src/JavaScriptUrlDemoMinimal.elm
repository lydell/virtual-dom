module JavaScriptUrlDemoMinimal exposing (main)

import Html
import Html.Attributes
import Json.Encode


{-| elm/virtual-dom already protects against `javascript:` URL:s.
But only when trying to set `href` (for example) to a _string._
What happens if you try to set it to some other data type?

When you do `myElement.href = something` in JavaScript, that `something` value is coerced into a string.
It’s equivalent to `myElement.href = String(something)`.

What happens when you coerce an array to a string? `String(someArray)` works like
`someArray.join(",")`. And what happens if you join an array with just one item?
Well, then no separators are needed, so it becomes just that single item as a string.
So `myElement.href = "foo"` and `myElement.href = ["foo"]` end up being equivalent!

The solution in elm/virtual-dom is easy. Instead of checking if the value is a string,
mimic what the browser does and coerce it to a string. Then check that string for
`javascript:` URL:s.

This patch does that:

    diff --git a/src/Elm/Kernel/VirtualDom.js b/src/Elm/Kernel/VirtualDom.js
    index 690eaa8..a226a83 100644
    --- a/src/Elm/Kernel/VirtualDom.js
    +++ b/src/Elm/Kernel/VirtualDom.js
    @@ -322,7 +322,7 @@ function _VirtualDom_noJavaScriptOrHtmlUri(value)

     function _VirtualDom_noJavaScriptOrHtmlJson(value)
     {
    -   return (typeof __Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(__Json_unwrap(value)))
    +   return _VirtualDom_RE_js_html.test(String(__Json_unwrap(value)))
            ? __Json_wrap(
                /**__PROD/''//*//**__DEBUG/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
            ) : value;

-}
main =
    Html.div []
        ([ Html.a [ Html.Attributes.href "javascript:alert('HACKED!')" ]
            [ Html.text "Html.Attributes.href (already safe)" ]
         , Html.a [ Html.Attributes.property "href" (Json.Encode.string "javascript:alert('HACKED!')") ]
            [ Html.text "Explicit property (string) (already safe)" ]
         , Html.a [ Html.Attributes.property "href" (Json.Encode.list Json.Encode.string [ "javascript:alert('HACKED!')" ]) ]
            [ Html.text "1-item string array (interpreted identically to a string) – BYPASS!" ]
         , Html.a [ Html.Attributes.property "href" Json.Encode.null ]
            [ Html.text "href property set to null (just checking that it won’t crash the Kernel code)" ]
         ]
            |> List.intersperse (Html.br [] [])
        )
