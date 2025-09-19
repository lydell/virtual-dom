module MemoryApplication exposing (main)

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


type alias Model =
    { key : Key
    , maybePage : MaybePage
    , count : Int
    , list : List { a : String, b : Int }
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
    ( { key = NoKey -- key
      , maybePage = page
      , count = 0
      , list = List.range 0 100000 |> List.map (\i -> { a = String.repeat i "a", b = i })
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
            viewPage "404"
                model.maybePage
                (Html.div []
                    [ Html.p []
                        [ Html.text "Not found" ]
                    , Html.text (String.fromInt model.count)
                    ]
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
