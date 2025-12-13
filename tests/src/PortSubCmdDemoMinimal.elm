port module PortSubCmdDemoMinimal exposing (main)

import Browser
import Html exposing (Html)
import Html.Events


port getFromLocalStorage : { debug : String } -> Cmd msg


port gotTextFromLocalStorage : (String -> msg) -> Sub msg


type alias Model =
    { page : Page
    }


type Page
    = Home
    | Contact String


init : () -> ( Model, Cmd Msg )
init () =
    ( { page = Home }
      -- Flip to the `getFromLocalStorage` line here to trigger the bug.
    , Cmd.none
      -- , getFromLocalStorage { debug = "via init" }
      -- In this case, calling `getFromLocalStorage` here is useless.
      -- But imagine adding another `getFromLocalStorage` call in a bigger app
      -- and suddenly the original use breaks. Oops!
    )


type Msg
    = PressedGoToHomePage
    | PressedGoToContactPage
    | GotLocalStorage String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case Debug.log "msg" msg of
        PressedGoToHomePage ->
            ( { model | page = Home }
            , Cmd.none
            )

        PressedGoToContactPage ->
            -- This text is supposed to be immediately replaced via the two ports.
            ( { model | page = Contact "❌ Oops! We never got anything from local storage :(" }
            , getFromLocalStorage { debug = "via PressedGoToContactPage" }
            )

        -- Imagine there being a `ContactPage` model with `ContactPage.Msg` that has
        -- `GotLocalStorage`. Then the message handling wouldn’t look as silly :)
        -- I wanted to keep things simple for the demo, though.
        GotLocalStorage text ->
            case model.page of
                Home ->
                    ( model, Cmd.none )

                Contact _ ->
                    ( { model | page = Contact text }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.page of
        Home ->
            Sub.none

        Contact _ ->
            -- Imagine this being `ContactPage.subscriptions |> Sub.map ContactPageMsg`.
            gotTextFromLocalStorage GotLocalStorage


view : Model -> Html Msg
view model =
    case model.page of
        Home ->
            Html.div []
                [ Html.h1 [] [ Html.text "Home page" ]
                , Html.button [ Html.Events.onClick PressedGoToContactPage ]
                    [ Html.text "Go to contact page" ]
                ]

        Contact text ->
            Html.div []
                [ Html.h1 [] [ Html.text "Contact page" ]
                , Html.button [ Html.Events.onClick PressedGoToHomePage ]
                    [ Html.text "Go to home page" ]
                , Html.p [] [ Html.text ("Text from local storage: " ++ text) ]
                ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
