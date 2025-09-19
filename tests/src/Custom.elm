module Custom exposing (main)

import Browser
import Html exposing (Html)


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Model


type alias Model =
    { say : String
    }



-- Init


type alias Flags =
    { say : String
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { say = flags.say
      }
    , Cmd.none
    )



-- View


view : Model -> Html Msg
view model =
    Html.div []
        [ Html.text "Hello, custom wrld!"
        , Html.p []
            [ Html.text ("Say " ++ model.say)
            ]
        ]



-- Update


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
