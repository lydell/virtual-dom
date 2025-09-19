module Classes exposing (main)

import Browser
import Html
import Html.Attributes
import Html.Events


main =
    Browser.sandbox
        { init = 1
        , update = \() model -> model + 1
        , view =
            \model ->
                Html.div []
                    [ Html.div
                        [ Html.Attributes.id "one"
                        , Html.Attributes.class "bold"
                        ]
                        [ Html.text "one" ]
                    , Html.div
                        [ Html.Attributes.id "two"
                        , Html.Attributes.classList
                            [ ( "bold", True )
                            , ( "italic", modBy 10 model == 0 )
                            ]
                        , Html.Events.onClick ()
                        ]
                        [ Html.text (String.fromInt model) ]
                    ]
        }
