module DisableButtons exposing (main)

import Browser exposing (Document)
import Html
    exposing
        ( Html
        , div
        )
import Html.Attributes as HA
import Html.Events


view : Model -> Document Msg
view model =
    let
        body : Html Msg
        body =
            div []
                [ Html.button [ Html.Events.onClick ToggleDemoClicked ] [ Html.text "Toggle Demo Enabled/Disabled" ]
                , Html.p []
                    [ Html.text <|
                        if model.demoButtonsEnabled then
                            "Demo State: Currently Enabled"

                        else
                            "Demo State: Currently Disabled"
                    ]
                , Html.p [] [ Html.text "this button works after being re-enabled:" ]
                , demoButton model DemoBtn1Clicked { setFalseAttrs = True }
                , Html.p [] [ Html.text "this button is unexpectedly still disabled after being re-enabled:" ]
                , demoButton model DemoBtn2Clicked { setFalseAttrs = False }
                ]
    in
    { title = "Tulars", body = [ body ] }


demoButton : Model -> msg -> { setFalseAttrs : Bool } -> Html msg
demoButton model n { setFalseAttrs } =
    Html.p []
        [ Html.button
            ([ Html.Events.onClick n ]
                ++ (if model.demoButtonsEnabled then
                        if setFalseAttrs then
                            [ HA.disabled False ]

                        else
                            []

                    else
                        [ HA.disabled True ]
                   )
            )
            [ if model.demoButtonsEnabled then
                Html.text "Clicking this button should increment the counter ->"

              else
                Html.text "Clicking this button should NOT increment the counter"
            ]
        , Html.text <| String.fromInt model.demoCounter
        ]


type alias Model =
    { demoButtonsEnabled : Bool
    , demoCounter : Int
    }


type Msg
    = ToggleDemoClicked
    | DemoBtn1Clicked
    | DemoBtn2Clicked


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }


initialModelAt : Model
initialModelAt =
    { demoButtonsEnabled = True
    , demoCounter = 0
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initialModelAt
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( updateHelp msg model, Cmd.none )


updateHelp : Msg -> Model -> Model
updateHelp msg model =
    case msg of
        ToggleDemoClicked ->
            { model | demoButtonsEnabled = not model.demoButtonsEnabled }

        DemoBtn1Clicked ->
            { model | demoCounter = model.demoCounter + 1 }

        DemoBtn2Clicked ->
            { model | demoCounter = model.demoCounter + 1 }
