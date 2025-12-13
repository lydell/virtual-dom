module StopPropChecked exposing (main)

import Browser
import Html
import Html.Attributes
import Html.Events
import Json.Decode


type Msg
    = Checked Bool
    | Clicked


main : Program () Bool Msg
main =
    Browser.sandbox
        { init = False
        , update =
            \msg checked ->
                case Debug.log "msg" msg of
                    Checked newChecked ->
                        newChecked

                    Clicked ->
                        checked
        , view =
            \checked ->
                Html.div
                    []
                    [ Html.input
                        [ Html.Attributes.type_ "checkbox"
                        , Html.Attributes.checked checked

                        -- , Html.Events.onCheck Checked
                        , Html.Events.stopPropagationOn
                            "change"
                            (Json.Decode.map (\newChecked -> ( Checked newChecked, True )) Html.Events.targetChecked)
                        , Html.Events.stopPropagationOn
                            "click"
                            (Json.Decode.succeed ( Clicked, True ))
                        ]
                        []

                    -- |> Html.map identity
                    ]
        }
