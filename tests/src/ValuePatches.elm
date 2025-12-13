module ValuePatches exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes
import Html.Events


type alias Model =
    String


type Msg
    = Typed String
    | Clicked


main =
    Browser.sandbox
        { init = ""
        , update = update
        , view = view
        }


update : Msg -> Model -> Model
update msg model =
    case msg of
        Typed text ->
            text

        Clicked ->
            model


view : Model -> Html Msg
view model =
    Html.div []
        [ Html.input [ Html.Events.onInput Typed, Html.Attributes.value model ] []
        , Html.button [ Html.Events.onClick Clicked ] [ Html.text "Button" ]
        ]
