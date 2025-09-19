module HtmlText exposing (main)

import Browser
import Html
import Html.Attributes
import Time


main =
    Html.div [ Html.Attributes.id "ID" ] [ Html.text (text 0) ]


main2 =
    Browser.element
        { init = \() -> ( 0, Cmd.none )
        , update = \() m -> ( m + 1, Cmd.none )
        , subscriptions = always (Time.every 1000 (always ()))
        , view = \m -> Html.text (text m)
        }


text m =
    case modBy 5 m of
        0 ->
            "Spiegel"

        1 ->
            "Knoblauch"

        2 ->
            "Bohnen"

        3 ->
            "Mädchen"

        _ ->
            "Ärztin"
