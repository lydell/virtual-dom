-- Compare with https://ellie-app.com/rSkS3cxMZsga1


module AttrProp exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes
import Html.Events exposing (onClick)
import Json.Encode


type alias Model =
    Bool


initialModel : Model
initialModel =
    False


type Msg
    = Flip


update : Msg -> Model -> Model
update msg model =
    case msg of
        Flip ->
            not model


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Flip ]
            [ text
                ("Flip ("
                    ++ (if model then
                            "True"

                        else
                            "False"
                       )
                    ++ ")"
                )
            ]
        , div
            [ Html.Attributes.class "box"
            , if model then
                Html.Attributes.property "id" (Json.Encode.string "red")

              else
                Html.Attributes.attribute "id" "red"
            ]
            []
        , div
            [ Html.Attributes.class "box"
            , if model then
                Html.Attributes.attribute "id" "red"

              else
                Html.Attributes.property "id" (Json.Encode.string "red")
            ]
            []
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
