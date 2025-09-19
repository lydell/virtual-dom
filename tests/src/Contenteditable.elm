module Contenteditable exposing (main)

import Browser
import Html exposing (Html, button, div, span, text)
import Html.Attributes as Attr
import Html.Events as Events
import Json.Decode as Decode


type alias Model =
    { contents : String
    }


initialModel : Model
initialModel =
    { contents = "Some content"
    }


type Msg
    = ResetContents
    | GotInput String


update : Msg -> Model -> Model
update msg model =
    case msg of
        ResetContents ->
            { model | contents = model.contents ++ " A" }

        GotInput contents ->
            { model | contents = Debug.log "contents" contents }


view : Model -> Html Msg
view model =
    div []
        [ Html.p []
            [ text "Click on 'Some content', empty it out, then click 'Reset contents'"
            ]
        , button
            [ Events.onClick ResetContents ]
            [ text "Reset contents" ]
        , span
            [ Attr.contenteditable True
            , Events.on "input" (Decode.at [ "target", "innerText" ] Decode.string |> Decode.map GotInput)
            , Attr.style "white-space" "pre-wrap"
            ]
            [ text model.contents ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
