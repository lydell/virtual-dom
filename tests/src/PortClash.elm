port module PortClash exposing (main)

import Process
import Task


port incoming : (Int -> msg) -> Sub msg


main =
    Platform.worker
        { init =
            \flags ->
                if Debug.log "flags" flags == "One" then
                    ( { flags = flags
                      , sub = False
                      }
                    , Process.sleep 100
                        |> Task.perform (always -1)
                    )

                else
                    ( { flags = flags
                      , sub = True
                      }
                    , Cmd.none
                    )
        , update =
            \msg model ->
                let
                    _ =
                        Debug.log model.flags msg
                in
                ( { model | sub = True }, Cmd.none )
        , subscriptions =
            \model ->
                if model.sub then
                    incoming identity

                else
                    Sub.none
        }
