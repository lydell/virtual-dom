module DocTwoElements exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes


main : Program {} {} Msg
main =
    Browser.document
        -- Does _not_ error when using Browser.element. Only with Browser.{document|application}.
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Model


type alias Model =
    {}



-- Init


init : {} -> ( Model, Cmd Msg )
init flags =
    ( {}
    , Cmd.none
    )



-- View


view : Model -> Browser.Document Msg
view model =
    { title = "❌ Error 2+ Elm custom element"
    , body =
        [ Html.p []
            [ Html.text "Below is an Elm custom element that only breaks when nested 2+ times in Browser.document...depending on spacing in HTML body."
            ]
        , Html.node "custom-elm"
            [ Html.Attributes.attribute "data-elm" ""
            , Html.Attributes.attribute "say" "hola"
            ]
            [ Html.text "Hello, World!"
            ]
        , Html.node "custom-elm"
            [ Html.Attributes.attribute "data-elm" ""
            , Html.Attributes.attribute "say" "hej"
            ]
            [ Html.text "Hello, World!"
            ]
        ]
    }



-- Update


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
