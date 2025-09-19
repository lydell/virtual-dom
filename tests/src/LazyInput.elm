module LazyInput exposing (main)

import Browser
import Html exposing (Html, div, input, p, text)
import Html.Attributes exposing (attribute, class, property, value)
import Html.Events exposing (onInput)
import Html.Lazy exposing (lazy)
import Json.Encode


type alias Model =
    String


initialModel : Model
initialModel =
    ""


type Msg
    = UserChangedValue String


update : Msg -> Model -> Model
update msg model =
    case msg of
        UserChangedValue value ->
            if String.length value > 2 then
                model

            else
                value


view : Model -> Html Msg
view model =
    div []
        [ lazy viewInner model
        , const
        , div
            [ attribute "id" "red"
            , property "id" (Json.Encode.string "green")
            , class "box"
            ]
            []
        ]


const =
    input [ value "const" ] []


viewInner model =
    div []
        [ input [ onInput UserChangedValue, value model ] []
        , p [] [ text model ]
        , p [] [ text <| String.fromInt <| String.length model ]
        , div
            [ attribute "id" "red"
            , property "id" (Json.Encode.string "green")
            , class "box"
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
