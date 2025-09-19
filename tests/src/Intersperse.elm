module Intersperse exposing (main)

import Browser
import Html
import Html.Events


type Msg
    = Click


br =
    Html.br []
        [-- Html.br [] []
        ]


main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }


init =
    0


update msg model =
    case msg of
        Click ->
            model + 1


view model =
    Html.div []
        -- Note: Currently has a different bug: The elements get the wrong order.
        -- how to trigger crash?
        (List.filterMap identity
            [ Just <| br
            , if model == 0 then
                Nothing

              else
                Just br
            , Just <| Html.div [] [ Html.button [ Html.Events.onClick Click ] [ Html.text "Third" ] ]
            , Just <| Html.button [ Html.Events.onClick Click ] [ Html.text "Third" ]
            ]
        )


viewWrongOrder model =
    Html.div []
        -- Note: has a different bug: The elements get the wrong order.
        -- probably because of the translation stuff?
        [ Html.text "Hello, World!"
        , br
        , Html.text (String.fromInt model)
        , br
        , Html.button [ Html.Events.onClick Click ] [ Html.text "Third" ]
        ]
