port module MemoryWorker exposing (main)

import Browser.Events
import Http
import Process
import Random
import Task
import Time


port outgoing : Int -> Cmd msg



-- port incoming : (Int -> msg) -> Sub msg


type alias Model =
    { list : List { a : String, b : Int }
    , sub : Bool
    }


init : () -> ( Model, Cmd () )
init () =
    let
        _ =
            Debug.log "hi" ()
    in
    ( { list = List.range 0 100000 |> List.map (\i -> { a = String.repeat i "a", b = i })
      , sub = True
      }
    , Cmd.batch
        [ Cmd.none
        , outgoing 1
        , Process.sleep 1000 |> Task.perform (always ())

        -- , Random.generate identity (Random.constant ())
        -- , Http.request
        --     { method = "GET"
        --     , headers = []
        --     , url = "https://api.sampleapis.com/coffee/hot"
        --     , body = Http.emptyBody
        --     , expect = Http.expectWhatever (always ())
        --     , timeout = Nothing
        --     , tracker = Just "tracker"
        --     }
        ]
    )


main =
    Platform.worker
        { init = init
        , update =
            \msg model ->
                let
                    _ =
                        Debug.log "update" msg
                in
                ( { model | sub = False }, Cmd.none )
        , subscriptions =
            \model ->
                if model.sub then
                    -- Sub.none
                    -- (incoming (always ()))
                    -- Time.every 0 (always ())
                    -- Browser.Events.onAnimationFrame (always ())
                    -- Browser.Events.onResize (always (always ()))
                    Http.track "tracker" (always ())

                else
                    Sub.none
        }
