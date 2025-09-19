module ElmUi exposing (main)

import Browser
import Element
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Http
import Process
import Task
import Time


type Model
    = BothLoading
    | RightLoading
    | Done


init : () -> ( Model, Cmd Msg )
init () =
    ( BothLoading, Process.sleep 100 |> Task.perform (always FirstLoaded) )


type Msg
    = FirstLoaded
    | RightLoaded
    | HttpDone
    | TimeZoneDone
    | TaskDone


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FirstLoaded ->
            ( RightLoading, Process.sleep 100 |> Task.perform (always RightLoaded) )

        RightLoaded ->
            ( Done, Http.get { url = "http://localhost:9001", expect = Http.expectWhatever (always HttpDone) } )

        HttpDone ->
            ( Done, Time.here |> Task.perform (always TimeZoneDone) )

        TimeZoneDone ->
            ( Done, Task.perform (always TaskDone) (Task.succeed ()) )

        TaskDone ->
            ( Done, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


loadingOld =
    Element.el
        [ Element.behindContent
            (Element.el
                [ Element.htmlAttribute (Html.Attributes.class "VILLAIN")
                ]
                Element.none
            )
        , Element.explain Debug.todo
        ]
        Element.none


loading =
    Element.el
        [ Element.explain Debug.todo
        ]
        (Element.el
            [ Element.htmlAttribute (Html.Attributes.class "VILLAIN")
            ]
            Element.none
        )


loadingHtml =
    Html.div []
        [ Html.div [ Html.Attributes.class "VILLAIN HTML" ] []
        ]


viewOld : Model -> Html Msg
viewOld model =
    Element.layout []
        (Element.column []
            [ case model of
                BothLoading ->
                    loading

                _ ->
                    Element.text "first done"
            , case model of
                BothLoading ->
                    loading

                RightLoading ->
                    loading

                Done ->
                    Element.row []
                        [ Element.text "left"
                        , Element.text "right"
                        ]
            ]
        )


view : Model -> Html Msg
view model =
    Html.div []
        [ case model of
            BothLoading ->
                loadingHtml

            _ ->
                -- This commented out version results in:
                -- - the loadingHtml being left behind
                -- - the text being in the wrong order
                -- Html.div []
                --     [ Html.text "first done"
                --     ]
                Html.text "first done"
        , case model of
            BothLoading ->
                loadingHtml

            RightLoading ->
                loadingHtml

            Done ->
                Html.div []
                    [ Html.text "second done"
                    ]
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
