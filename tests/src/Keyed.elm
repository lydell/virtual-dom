module Keyed exposing (main)

import Browser
import Html exposing (Html, button, div, li, node, text)
import Html.Attributes
import Html.Events exposing (onClick)
import Html.Keyed
import Json.Encode


type alias Model =
    List Int


initialModel : Model
initialModel =
    List.range 1 10


type Msg
    = SwapFirstAndLast
    | InsertNewFirst
    | InsertNewLast
    | InsertNewSecond
    | ReplaceSecond
    | RemoveSecond
    | Swap3
    | Swap3Remove1


all =
    [ SwapFirstAndLast
    , InsertNewFirst
    , InsertNewLast
    , InsertNewSecond
    , ReplaceSecond
    , RemoveSecond
    , Swap3
    , Swap3Remove1
    ]


update : Msg -> Model -> Model
update msg model =
    let
        next =
            List.maximum model |> Maybe.map ((+) 1) |> Maybe.withDefault 0
    in
    case msg of
        SwapFirstAndLast ->
            case model of
                first :: rest ->
                    case getLast rest of
                        Just ( rest_, last ) ->
                            last :: rest_ ++ [ first ]

                        Nothing ->
                            model

                _ ->
                    model

        InsertNewFirst ->
            next :: model

        InsertNewLast ->
            model ++ [ next ]

        InsertNewSecond ->
            case model of
                first :: rest ->
                    first :: next :: rest

                _ ->
                    model

        ReplaceSecond ->
            case model of
                first :: _ :: rest ->
                    first :: next :: rest

                _ ->
                    model

        RemoveSecond ->
            case model of
                first :: _ :: rest ->
                    first :: rest

                _ ->
                    model

        Swap3 ->
            case model of
                v1 :: v2 :: v3 :: v4 :: v5 :: rest ->
                    v3 :: v2 :: v5 :: v4 :: v1 :: rest

                _ ->
                    model

        Swap3Remove1 ->
            case model of
                v1 :: v2 :: v3 :: _ :: v5 :: rest ->
                    v3 :: v2 :: v5 :: v1 :: rest

                _ ->
                    model


getLast : List a -> Maybe ( List a, a )
getLast list =
    case List.reverse list of
        last :: rest ->
            Just ( List.reverse rest, last )

        _ ->
            Nothing


view : Model -> Html Msg
view model =
    div []
        [ div []
            (all
                |> List.map
                    (\msg ->
                        button [ onClick msg ]
                            [ text (Debug.toString msg)
                            ]
                    )
                |> List.intersperse (Html.text " ")
            )
        , div [ Html.Attributes.style "display" "flex" ]
            [ Html.Keyed.ul
                -- [ Html.Keyed.node "elm-portal"
                [ Html.Attributes.attribute "data-target-selector" "#portal" ]
                (model
                    |> Debug.log "view"
                    |> List.map
                        (\n ->
                            ( String.fromInt n
                            , li []
                                [ text (String.fromInt n)
                                ]
                            )
                        )
                )
            , Html.ul
                []
                (model
                    |> List.map
                        (\n ->
                            li []
                                [ text (String.fromInt n)
                                ]
                        )
                )
            ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
