module Map171_debug exposing (main)

import Browser
import Html exposing (Html, br, button, div, source, text, video)
import Html.Attributes exposing (autoplay, id, loop, property, src, style, type_)
import Html.Events exposing (on, onClick)
import Json.Decode as JD
import Json.Encode as JE


type alias Model =
    { currentTime : Float
    , duration : Float
    , videoVisible : Bool
    , selection : Maybe ( GroupId, ItemId )
    }


initialModel : Model
initialModel =
    { currentTime = 0
    , duration = 0
    , videoVisible = False
    , selection = Nothing
    }


type MediaMsg
    = MediaMsgTimeupdate { currentTime : Float, duration : Float }


type VideoPageMsg
    = VideoPageMsgLeave
    | VideoPageMsgMediaMsg MediaMsg


type GroupId
    = GroupId String


groupIdEncoder : GroupId -> JE.Value
groupIdEncoder (GroupId value) =
    JE.string value


type ItemId
    = ItemId String


itemIdEncoder : ItemId -> JE.Value
itemIdEncoder (ItemId value) =
    JE.string value


type ListPageMsg
    = ListPageMsgSelect GroupId ItemId


type Msg
    = VideoPage VideoPageMsg
    | ListPage ListPageMsg


update : Msg -> Model -> Model
update msg model =
    case msg of
        VideoPage videoPageMsg ->
            case videoPageMsg of
                VideoPageMsgMediaMsg (MediaMsgTimeupdate { currentTime, duration }) ->
                    { model | currentTime = currentTime, duration = duration }

                VideoPageMsgLeave ->
                    { model | videoVisible = False }

        ListPage listPageMsg ->
            case listPageMsg of
                ListPageMsgSelect groupId itemId ->
                    let
                        _ =
                            Debug.log "Attempt to store selection with" listPageMsg

                        _ =
                            -- In my case i am storing the selection in the local storage,
                            -- so i can just use F5 to reload the page, without reselecting.
                            Debug.log "Selection json which can be sent to local storage" <|
                                JE.encode 0 <|
                                    JE.object
                                        [ ( "groupId", groupIdEncoder groupId )
                                        , ( "itemId", itemIdEncoder itemId )
                                        ]
                    in
                    { model | selection = Just ( groupId, itemId ), videoVisible = True }


timeupdateDecoder : JD.Decoder { currentTime : Float, duration : Float }
timeupdateDecoder =
    JD.map2 (\currentTime duration -> { currentTime = currentTime, duration = duration })
        (JD.at [ "target", "currentTime" ] JD.float)
        (JD.at [ "target", "duration" ] JD.float)


viewList : Html ListPageMsg
viewList =
    div []
        [ button [ onClick <| ListPageMsgSelect (GroupId "fpie73") (ItemId "72ba27hs") ]
            [ text "Open video" ]
        ]


viewVideo : Html VideoPageMsg
viewVideo =
    div []
        [ button [ onClick <| VideoPageMsgLeave ] [ text "Leave video" ]
        , br [] []
        , br [] []
        , button
            [ onClick <| VideoPageMsgMediaMsg <| MediaMsgTimeupdate { currentTime = 0, duration = 0 }
            ]
            [ text "Timeupdate" ]

        -- , video
        --     [ autoplay True
        --     , property "muted" (JE.string "muted")
        --     , loop True
        --     -- , on "timeupdate" (timeupdateDecoder |> JD.map MediaMsgTimeupdate)
        --     ]
        --     [ source
        --         [ id "mp4"
        --         , src "http://www.w3schools.com/html/movie.mp4"
        --         , type_ "video/mp4"
        --         ]
        --         []
        --     ]
        -- |> Html.map VideoPageMsgMediaMsg
        ]


view : Model -> Html Msg
view model =
    div
        [ style "transform" "scale(2, 2)"
        , style "transform-origin" "left top"
        ]
        [ if model.videoVisible then
            viewVideo |> Html.map VideoPage

          else
            viewList |> Html.map ListPage
        , div []
            [ br [] []
            , text <| String.fromFloat model.currentTime ++ "/" ++ String.fromFloat model.duration
            ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
