module Lazy exposing (main)

import Browser
import Html exposing (Html, button, div, li, node, text)
import Html.Attributes
import Html.Events exposing (onClick)
import Html.Keyed
import Html.Lazy
import Json.Encode


type alias Model =
    { count : Int
    , visible : Bool
    , swapped : Bool
    }


initialModel : Model
initialModel =
    { count = 0
    , visible = True
    , swapped = False
    }


type Msg
    = Increment
    | Toggle
    | Swap


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            { model | count = model.count + 1 }

        Toggle ->
            { model | visible = not model.visible }

        Swap ->
            { model | swapped = not model.swapped }


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Toggle ] [ Html.text "Toggle" ]
        , button [ onClick Swap ] [ Html.text "Swap" ]
        , button [ onClick Increment ] [ Html.text "Increment" ]
        , if modBy 2 model.count == 0 then
            const

          else
            Html.text "not const"
        , div []
            ([ Html.text (" count=" ++ String.fromInt model.count)
             , if model.visible then
                Html.Lazy.lazy viewLazy (model.count // 3)

               else
                Html.text ""
             ]
                |> (if model.swapped then
                        List.reverse

                    else
                        identity
                   )
            )
        ]


viewLazy : Int -> Html msg
viewLazy i =
    Html.text (" divided=" ++ String.fromInt (Debug.log "mod i" i))


const =
    Html.Lazy.lazy constLazy ()


constLazy () =
    Html.text (Debug.log "const" "const")


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
