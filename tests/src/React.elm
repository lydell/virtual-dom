module React exposing (main)

import Browser
import Html
import Html.Attributes exposing (id, value)
import Html.Events exposing (onClick, onInput)


main =
    Browser.sandbox
        { init = 0
        , update = \() count -> count + 1
        , view =
            \count ->
                Html.div []
                    [ Html.p []
                        [ if count == 1 then
                            Html.strong [] [ Html.text (String.fromInt count) ]

                          else
                            Html.text (String.fromInt count)
                        , Html.text " ist die Anzahl."
                        ]
                    , Html.button [ onClick () ] [ Html.text "Inkrement" ]
                    ]
        }
