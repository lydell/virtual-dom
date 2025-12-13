module Ed exposing (main)

import Browser
import Html as H
import Html.Attributes as HA
import Html.Events as HE


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


view : Model -> H.Html Msg
view model =
    H.div []
        [ H.input
            ([ HA.type_ "radio"
             , HA.name (toName model)
             , HA.checked (model == Two)
             ]
             -- ++ (case model of
             --         One ->
             --             []
             --         Two ->
             --             [ HA.checked True ]
             --    )
            )
            []
        , H.input
            ([ HA.type_ "radio"
             , HA.name (toName model)
             , HA.checked (model == One)
             ]
             -- ++ (case model of
             --         One ->
             --             [ HA.checked True ]
             --         Two ->
             --             []
             --    )
            )
            []
        , H.button [ HE.onClick Next ]
            [ H.text "Next" ]
        ]
