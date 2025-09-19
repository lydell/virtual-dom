module DebuggerUnicode exposing (main)

import Browser
import Dict
import Html
import Html.Events


type Msg
    = Pärtan SubMsg


type SubMsg
    = Ärtan


main =
    Browser.sandbox
        { init =
            { startsWithAscii = Pärtan Ärtan
            , startsWithUnicode = Ärtan
            , list = List.repeat 100000 { bar = 5 }
            , dict = Dict.fromList [ ( "a", { one = 1 } ) ]
            , dict2 = Dict.fromList [ ( ( 1, 2 ), { one = 1 } ) ]
            , dict3 =
                List.range 1 100000
                    |> List.map
                        (\i ->
                            ( i, { p = Pärtan Ärtan, ä = Ärtan, v = i ^ 2 } )
                        )
                    |> Dict.fromList
            }
        , update = always identity
        , view =
            \_ ->
                Html.button [ Html.Events.onClick (Pärtan Ärtan) ]
                    [ Html.text "Click me, then open the debugger" ]
        }
