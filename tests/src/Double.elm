module Double exposing (main)

import Browser
import Html
import Html.Events


incrementButton =
    Html.button [ Html.Events.onClick () ]
        [ Html.text "Increment" ]


main =
    Browser.sandbox
        { init = 0
        , update = \msg model -> model + 1
        , view =
            \model ->
                Html.div []
                    [ incrementButton
                    , Html.text (String.fromInt model)
                    ]
        }
