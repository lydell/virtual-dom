module Gleam exposing (main)

import Browser
import Json.Decode as Decode
import Task
import VirtualDom


main =
    Browser.element
        { init = \() -> ( 0, Cmd.none )
        , view =
            \model ->
                VirtualDom.node
                    "button"
                    [ VirtualDom.on "click" (VirtualDom.Normal (Decode.succeed ())) ]
                    [ VirtualDom.text (String.fromInt model) ]
        , update =
            \msg model ->
                case msg of
                    () ->
                        ( model + 1
                        , case model of
                            2 ->
                                Task.perform (\_ -> ()) (Task.succeed ())

                            _ ->
                                Cmd.none
                        )
        , subscriptions = \_ -> Sub.none
        }
