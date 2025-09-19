module KeyedConst exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Html.Keyed


type alias Model =
    { list : List Item
    }


type alias Item =
    { key : String
    , loaded : Bool
    }


type Msg
    = Load


init : () -> ( Model, Cmd Msg )
init () =
    ( { list = list1
      }
    , Cmd.none
    )


list1 : List Item
list1 =
    [ { key = "1", loaded = False }
    , { key = "2", loaded = False }
    , { key = "3", loaded = False }
    , { key = "4", loaded = False }
    ]


list2 : List Item
list2 =
    [ { key = "2", loaded = False }
    , { key = "1", loaded = False }
    , { key = "3", loaded = False }
    , { key = "4", loaded = True }
    ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Load ->
            ( { list = list2 }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


loader =
    Html.div
        [ Html.Attributes.style "width" "50px"
        , Html.Attributes.style "height" "50px"
        , Html.Attributes.style "background" "magenta"
        , Html.Attributes.style "border" "5px solid white"
        ]
        []


view : Model -> Html Msg
view model =
    Html.div []
        [ Html.button [ Html.Events.onClick Load ] [ Html.text "Load" ]
        , Html.Keyed.node "div"
            []
            (model.list
                |> List.map
                    (\item ->
                        ( item.key
                        , if item.loaded then
                            Html.div []
                                [ Html.text item.key ]

                          else
                            loader
                        )
                    )
            )
        ]


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
