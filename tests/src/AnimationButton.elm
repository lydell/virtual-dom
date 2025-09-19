port module AnimationButton exposing (main)

import Browser
import Browser.Events
import Html exposing (Html)
import Html.Events


port show : Int -> Cmd msg


type Model
    = Idle
    | Animating Int


init : () -> ( Model, Cmd Msg )
init () =
    ( Idle, Cmd.none )


type Msg
    = Start
    | Increment


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Start ->
            ( Animating 0, show 0 )

        Increment ->
            case model of
                Idle ->
                    ( model, Cmd.none )

                Animating n ->
                    let
                        count =
                            n + 1
                    in
                    ( Animating count, show count )


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        Idle ->
            Sub.none

        Animating _ ->
            Browser.Events.onAnimationFrame (always Increment)


view : Model -> Html Msg
view model =
    case model of
        Idle ->
            Html.button [ Html.Events.onClick Start ] [ Html.text "Start" ]

        Animating n ->
            Html.text <| "view: " ++ String.fromInt n


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
