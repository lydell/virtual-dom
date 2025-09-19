module Map162 exposing (main)

import Browser
import Browser.Events
import Browser.Navigation
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode


type Model
    = Button
    | Image
    | Blank


type Msg
    = ButtonMsg ButtonMsg
    | ImageMsg ImageMsg
    | BlankMsg BlankMsg


type ButtonMsg
    = ButtonPressed


type ImageMsg
    = ImageRendered
    | ImageLoaded


type BlankMsg
    = NoOp
    | Reload


main : Program () Model Msg
main =
    Browser.document
        { init = \_ -> ( Button, Cmd.none )
        , update = update
        , subscriptions = subscriptions
        , view = \model -> { title = "", body = [ view model ] }
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( Debug.log "" msg, model ) of
        ( ButtonMsg ButtonPressed, Button ) ->
            ( Image
            , Cmd.none
            )

        ( ButtonMsg _, _ ) ->
            ( model
            , Cmd.none
            )

        ( ImageMsg ImageRendered, Image ) ->
            ( Blank
            , Cmd.none
            )

        ( ImageMsg _, _ ) ->
            ( model
            , Cmd.none
            )

        ( BlankMsg Reload, Blank ) ->
            ( model
            , Browser.Navigation.reload
            )

        ( BlankMsg _, _ ) ->
            ( model
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    if model == Image then
        Browser.Events.onAnimationFrame (\_ -> ImageMsg ImageRendered)

    else
        Sub.none


view : Model -> Html Msg
view model =
    case model of
        Button ->
            Html.div []
                [ Html.button [ Html.Events.onClick ButtonPressed ]
                    [ Html.text "Start" ]
                ]
                |> Html.map ButtonMsg

        Image ->
            Html.div []
                [ Html.img
                    [ Html.Attributes.src "https://picsum.photos/2000"
                    , Html.Events.on "load" (Json.Decode.succeed ImageLoaded)
                    ]
                    []
                ]
                |> Html.map ImageMsg

        Blank ->
            Html.div [] [ Html.text "" ]
                |> Html.map BlankMsg
