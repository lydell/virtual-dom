module Ed exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Html.Keyed


main : Program () Model Msg
main =
    Browser.element
        { init = \() -> ( One, Cmd.none )
        , update = \Next _ -> ( Two, Cmd.none )
        , view = view
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = Next


type Model
    = One
    | Two


toName : Model -> String
toName model =
    case model of
        One ->
            "One"

        Two ->
            "Two"


view : Model -> Html Msg
view model =
    Html.Keyed.node "div"
        []
        [ ( "radio1-" ++ toName model
          , Html.input
                [ Html.Attributes.type_ "radio"
                , Html.Attributes.name (toName model)
                , Html.Attributes.checked (model == Two)
                ]
                []
          )
        , ( "radio2-" ++ toName model
          , Html.input
                [ Html.Attributes.type_ "radio"
                , Html.Attributes.name (toName model)
                , Html.Attributes.checked (model == One)
                ]
                []
          )
        , ( "button"
          , Html.button [ Html.Events.onClick Next ]
                [ Html.text "Next" ]
          )
        ]
