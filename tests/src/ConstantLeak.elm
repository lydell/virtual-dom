module ConstantLeak exposing (main)

import Browser
import Html
import Html.Events


hr =
    Html.hr [] []


main =
    Browser.sandbox
        { init = False
        , update = \msg model -> not model
        , view =
            \model ->
                Html.div []
                    (Html.button [ Html.Events.onClick () ]
                        [ Html.text "Toggle" ]
                        :: List.repeat
                            (if model then
                                1000

                             else
                                0
                            )
                            hr
                    )
        }
