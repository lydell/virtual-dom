module OpenWindow exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (on, onClick)
import Json.Decode as Decode
import Json.Encode as Encode


type alias Model =
    { count : Int }


initialModel : Model
initialModel =
    { count = 0 }


type Msg
    = OpenWindow Decode.Value


update : Msg -> Model -> Model
update msg model =
    case msg of
        OpenWindow alert ->
            let
                object =
                    Encode.object [ ( "toJSON", alert ) ]

                string =
                    Encode.encode 0 object
            in
            { model | count = model.count + String.length string }


alertDecoder =
    Decode.at [ "target", "ownerDocument", "defaultView", "open" ] Decode.value


view : Model -> Html Msg
view model =
    div []
        [ button [ on "click" (Decode.map OpenWindow alertDecoder) ] [ text "+1" ]
        , div [] [ text <| String.fromInt model.count ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
