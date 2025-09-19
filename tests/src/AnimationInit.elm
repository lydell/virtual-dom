port module AnimationInit exposing (main)

import Browser
import Browser.Events
import Html exposing (Html)


port show : Int -> Cmd msg


type alias Model =
    { count : Int }


init : () -> ( Model, Cmd Msg )
init () =
    ( { count = 0 }, Cmd.batch [ show 0 ] |> Cmd.map identity )


type Msg
    = Increment


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            let
                count =
                    model.count + 1
            in
            ( { model | count = count }, show count )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrame (always Increment)


view : Model -> Html Msg
view model =
    Html.text <| "view: " ++ String.fromInt model.count


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
