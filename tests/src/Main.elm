module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events
import Markdown
import Url exposing (Url)
import Url.Builder
import Url.Parser


type Msg
    = UrlRequested Browser.UrlRequest
    | UrlChanged Url
    | Increment Int
    | ElmWatch (Program () Model Msg)


type alias Model =
    { key : Key
    , maybePage : MaybePage
    , count : Int
    }


type Key
    = Key Nav.Key
    | NoKey


type MaybePage
    = Page Page
    | NotFound


type Page
    = Home
    | About


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init () url key =
    initHelper (Key key) (pageFromUrl url)


initHelper key page =
    ( { key = key
      , maybePage = page
      , count = 0
      }
    , Cmd.none
    )


pageFromUrl : Url -> MaybePage
pageFromUrl url =
    Url.Parser.parse urlParser url
        |> Maybe.map Page
        |> Maybe.withDefault NotFound


urlFromPage : Page -> String
urlFromPage page =
    case page of
        Home ->
            Url.Builder.absolute [] []

        About ->
            Url.Builder.absolute [ "about" ] []


urlParser : Url.Parser.Parser (Page -> b) b
urlParser =
    Url.Parser.oneOf
        [ Url.Parser.map Home Url.Parser.top
        , Url.Parser.map About (Url.Parser.s "about")
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlRequested urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    case model.key of
                        Key key ->
                            ( model, Nav.pushUrl key (Url.toString url) )

                        NoKey ->
                            ( model, Cmd.none )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | maybePage = pageFromUrl url }
            , Cmd.none
            )

        Increment n ->
            ( { model | count = model.count + n }
            , Cmd.none
            )

        ElmWatch _ ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


view : Model -> Browser.Document Msg
view model =
    case model.maybePage of
        Page Home ->
            viewPage "Home"
                model.maybePage
                (Html.p []
                    [ Html.text "This is the home page!" ]
                )

        Page About ->
            viewPage "About"
                model.maybePage
                (Html.p []
                    [ Html.text "This is the about us page!" ]
                )

        NotFound ->
            -- viewPage "404"
            --     model.maybePage
            --     (Html.div []
            --         [ Html.p []
            --             [ Html.text "Not found" ]
            --         , viewCount model.count
            --         ]
            --     )
            { title = "cool"
            , body =
                [ viewCount model.count
                , Html.p []
                    [ Html.b [] [ Html.text "Möchtest du ", staticIcon, Html.text "ein Ball ", staticIcon ]
                    , Html.a [ Attr.href "/ball" ] [ Html.text ("nehmen? (" ++ String.fromInt (model.count // 10) ++ ")") ]
                    ]
                , Markdown.toHtml [] ("Hallo! Die Zahl ist **" ++ String.fromInt model.count ++ "** und das ist gut.")
                ]
            }


staticIcon =
    Html.div
        [ Attr.style "width" "20px"
        , Attr.style "height" "20px"
        , Attr.style "background-color" "rgb(0, 255, 0)"
        , Attr.style "display" "inline-block"
        ]
        []


viewCount : Int -> Html Msg
viewCount count =
    let
        r =
            (count * 50) |> modBy 256

        icon =
            Html.div
                [ Attr.style "width" "20px"
                , Attr.style "height" "20px"
                , Attr.style "background-color" ("rgb(" ++ String.fromInt r ++ ", 0, 0)")
                , Attr.style "display" "inline-block"
                , Html.Events.onClick (Increment 1)
                ]
                []

        text =
            Html.text ("Knoblauch " ++ String.fromInt count)
    in
    -- Html.node "elm-portal"
    Html.div
        [ Attr.attribute "data-target-selector" "#portal" ]
        ([ Html.text ("Rechner: " ++ String.fromInt count)
         , Html.button [ Html.Events.onClick (Increment 1) ] [ Html.text "Erhöhen" ]
         , Html.button [ Html.Events.onClick (Increment -1) ] [ Html.text "Dekrementieren" ]
         ]
            ++ (List.range 0 (count - 1)
                    |> List.map
                        (\i ->
                            Html.div
                                []
                                [ Html.text (String.fromInt i)
                                , if i == 2 && count == 5 then
                                    Html.span [ Attr.style "border" "2px solid" ] [ icon, icon ]

                                  else
                                    icon
                                , if i == 2 && count == 5 then
                                    Html.span [ Attr.style "border" "2px solid" ] [ staticIcon, staticIcon ]

                                  else
                                    staticIcon
                                , if i == 2 && count == 5 then
                                    Html.span [ Attr.style "border" "2px solid" ] [ text, text ]

                                  else
                                    text
                                ]
                        )
               )
        )


viewPage : String -> MaybePage -> Html Msg -> Browser.Document Msg
viewPage title maybePage content =
    { title = title ++ " – Awesome site"
    , body =
        [ viewNav maybePage
        , Html.hr [] []
        , content
        ]
    }


viewNav : MaybePage -> Html Msg
viewNav maybePage =
    let
        items =
            [ ( Home, "Home" )
            , ( About, "About" )
            ]
    in
    Html.nav []
        [ Html.ul []
            (items
                |> List.map
                    (\( page, text ) ->
                        Html.li []
                            [ Html.a
                                (if Page page == maybePage then
                                    []

                                 else
                                    [ Attr.href (urlFromPage page)
                                    ]
                                )
                                [ Html.text text ]
                            ]
                    )
            )
        ]


application =
    -- This is extracted since it’s possible to do so. The hot reload needs to handle that.
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    , onUrlRequest = UrlRequested
    , onUrlChange = UrlChanged
    }


decoy =
    -- There can be unused programs in a file.
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = UrlRequested
        , onUrlChange = UrlChanged
        }


main : Program () Model Msg
main =
    Browser.application application


main2 : Program () Model Msg
main2 =
    Browser.element
        { init = \() -> initHelper NoKey NotFound
        , view = view >> .body >> Html.div [] >> Html.map identity
        , update = update
        , subscriptions = subscriptions
        }
