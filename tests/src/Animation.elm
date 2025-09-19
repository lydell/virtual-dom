module Animation exposing (main)

import Browser
import Browser.Events
import Html
import Html.Events


type Msg
    = Start
    | AM


main =
    Browser.element
        { init = \() -> ( Nothing, Cmd.none )
        , update =
            \msg m ->
                case msg of
                    Start ->
                        ( Just 0, Cmd.none )

                    AM ->
                        ( case m of
                            Just mm ->
                                Just (mm + 1)

                            Nothing ->
                                Just 0
                        , Cmd.none
                        )
        , subscriptions =
            \m ->
                case m of
                    Nothing ->
                        Sub.none

                    Just _ ->
                        Browser.Events.onAnimationFrame (always AM)
        , view =
            \m ->
                case m of
                    Just mm ->
                        Html.text (String.fromInt mm)

                    Nothing ->
                        Html.button [ Html.Events.onClick Start ] [ Html.text "start" ]
        }
