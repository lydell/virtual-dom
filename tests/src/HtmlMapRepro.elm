module HtmlMapRepro exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onBlur, onClick)
import Html.Lazy


type Model
    = A
    | B


type Msg
    = MsgA SubMsgA
    | MsgB SubMsgB


type SubMsgA
    = ClickA
    | BlurA


type SubMsgB
    = ClickB
    | BlurB


update : Msg -> Model -> Model
update msg model =
    case Debug.log "( msg, model )" ( msg, model ) of
        ( MsgA ClickA, A ) ->
            B

        ( MsgB ClickB, B ) ->
            A

        _ ->
            model


view : Model -> Html Msg
view model =
    case model of
        A ->
            Html.map MsgA viewA

        B ->
            Html.map MsgB viewB


viewA : Html SubMsgA
viewA =
    div []
        [ button [ onClick ClickA, onBlur BlurA ] [ text "Go to B" ]
        , div [] [ text "A" ]
        ]


viewB : Html SubMsgB
viewB =
    div []
        [ div [] [ text "B" ]
        , button [ onClick ClickB, onBlur BlurB ] [ text "Go to A" ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = A
        , view = view
        , update = update
        }

