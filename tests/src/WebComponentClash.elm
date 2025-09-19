module WebComponentClash exposing (main)

import Browser
import Html
import Html.Events


type Msg
    = Start


type alias Flags =
    { isSubComponent : Bool
    }


type alias Model =
    { isSubComponent : Bool
    , showSub : Bool
    }


main : Program Flags Model Msg
main =
    Browser.element
        { init =
            \{ isSubComponent } ->
                ( { isSubComponent = isSubComponent
                  , showSub = False
                  }
                , Cmd.none
                )
        , update =
            \msg m ->
                case msg of
                    Start ->
                        ( { m | showSub = True }, Cmd.none )
        , subscriptions =
            \m ->
                Sub.none
        , view =
            \m ->
                if m.isSubComponent then
                    Html.text "I AM SUB"

                else
                    Html.div []
                        [ const
                        , Html.div []
                            [ if m.showSub then
                                Html.node "elm-web-component" [] []

                              else
                                Html.button [ Html.Events.onClick Start ] [ Html.text "show sub" ]
                            ]
                        , if m.showSub then
                            Html.text "this text should be at the END"

                          else
                            const
                        ]
        }


const =
    Html.text "constant text"
