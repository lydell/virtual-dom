port module Worker exposing (main)

import Browser
import Html exposing (Html)
import Html.Events
import Process
import Task
import Time


port incoming : (Int -> msg) -> Sub msg


port outgoing : Int -> Cmd msg


type alias Model =
    { sleepDone : Bool
    }


type Msg
    = SleepDone
    | Incoming Int
    | Tick
    | Button


init : () -> ( Model, Cmd Msg )
init () =
    ( { sleepDone = False
      }
    , Process.sleep 1000 |> Task.perform (always SleepDone)
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SleepDone ->
            ( { model | sleepDone = True }, outgoing 3 )

        Incoming n ->
            ( model, outgoing n )

        Tick ->
            ( model, outgoing 0 )

        Button ->
            ( model, outgoing 100 )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ incoming Incoming
        , if model.sleepDone then
            Sub.none

          else
            Time.every 100 (always Tick)
        ]


main2 =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


view : Model -> Html Msg
view model =
    Html.button [ Html.Events.onClick Button ] []


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
