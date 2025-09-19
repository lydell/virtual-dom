module Textarea exposing (main)

import Browser
import Html
import Html.Attributes exposing (id, value)
import Html.Events exposing (onClick, onInput)


main =
    Browser.sandbox
        { init = "with children"
        , update = \msg _ -> msg
        , view =
            \m ->
                Html.div [ id "node" ]
                    [ Html.textarea
                        [ onInput identity
                        , value m
                        ]
                        [-- Html.text (Debug.log "text" m)
                        ]
                    , Html.button [ onClick "reset" ] [ Html.text "Reset" ]
                    ]
        }
