module KeyedSometimes exposing (main)

import Browser
import Html exposing (Html)
import Html.Events
import Html.Keyed


type alias Model =
    Int


type Msg
    = Next


init : () -> ( Model, Cmd Msg )
init () =
    ( 0, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Next ->
            ( model + 1, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


view : Model -> Html Msg
view model =
    let
        list =
            List.range 0 model
                |> (if modBy 11 model == 0 then
                        List.reverse

                    else
                        identity
                   )

        isKeyed =
            modBy 2 (model // 2) == 0
    in
    Html.div []
        [ Html.button [ Html.Events.onClick Next ] [ Html.text "Next" ]
        , Html.p []
            [ Html.text
                (if isKeyed then
                    "keyed"

                 else
                    "not keyed"
                )
            ]
        , if isKeyed then
            Html.Keyed.ul []
                (list |> List.map (\i -> ( "cool" ++ String.fromInt i, Html.li [] [ Html.text (String.fromInt i) ] )))

          else
            Html.ul []
                (list |> List.map (\i -> Html.li [] [ Html.text (String.fromInt i) ]))
        ]



-- 0 -> keyed
-- 1 -> keyed
-- 2 -> not keyed
-- 3 -> not keyed


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
