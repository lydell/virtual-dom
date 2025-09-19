port module KeyedFuzz exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes
import Html.Keyed
import List.Extra
import Random


port verify : List Int -> Cmd msg


port verified : (Bool -> msg) -> Sub msg


type alias Model =
    { list : List Int
    , previousList : List Int
    , iteration : Int
    , seed : Random.Seed
    }


type Msg
    = Verified Bool


init : () -> ( Model, Cmd Msg )
init () =
    let
        initialModel : Model
        initialModel =
            { list = [ 1, 2, 3 ]
            , previousList = []
            , iteration = 0
            , seed = Random.initialSeed 0
            }
    in
    ( initialModel
    , verify initialModel.list
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Verified success ->
            if success then
                let
                    ( nextList, nextSeed ) =
                        Random.step (listGenerator2 model.list) model.seed
                in
                ( { list = nextList
                  , previousList = model.list
                  , iteration = model.iteration + 1
                  , seed = nextSeed
                  }
                , verify nextList
                )

            else
                ( model, Cmd.none )


listGenerator : Random.Generator (List Int)
listGenerator =
    Random.int 0 100
        |> Random.andThen
            (\len ->
                Random.int 0 (len * len)
                    |> Random.andThen
                        (\max ->
                            Random.list len (Random.int 0 max)
                        )
            )


type Operation
    = Insert
    | Delete
    | Move
    | Update


listGenerator2 : List Int -> Random.Generator (List Int)
listGenerator2 oldList =
    Random.int 1 100
        |> Random.andThen
            (\numOperations ->
                List.range 1 numOperations
                    |> List.foldl
                        (\_ acc ->
                            Random.map2 Tuple.pair
                                (Random.weighted ( 1, Insert ) [ ( 1, Delete ), ( 10, Move ), ( 5, Update ) ])
                                acc
                                |> Random.andThen
                                    (\( operation, list ) ->
                                        case operation of
                                            Insert ->
                                                Random.map2 (\index n -> list |> insertAt index n)
                                                    (Random.int 0 (List.length list - 1))
                                                    (Random.int 0 5)

                                            Delete ->
                                                Random.map (\index -> list |> List.Extra.removeAt index)
                                                    (Random.int 0 (List.length list - 1))

                                            Move ->
                                                Random.map2
                                                    (\index1 index2 ->
                                                        let
                                                            n =
                                                                list |> List.Extra.getAt index1 |> Maybe.withDefault 0
                                                        in
                                                        list
                                                            |> List.Extra.removeAt index1
                                                            |> insertAt index2 n
                                                    )
                                                    (Random.int 0 (List.length list - 1))
                                                    (Random.int 0 (List.length list - 2))

                                            Update ->
                                                Random.map2 (\index n -> list |> List.Extra.setAt index n)
                                                    (Random.int 0 (List.length list - 1))
                                                    (Random.int 0 5)
                                    )
                        )
                        (Random.constant oldList)
            )


insertAt : Int -> a -> List a -> List a
insertAt index a list =
    if index == 0 then
        a :: list

    else
        case list of
            [] ->
                []

            first :: rest ->
                first :: insertAt (index - 1) a rest


subscriptions : Model -> Sub Msg
subscriptions _ =
    verified Verified


view : Model -> Html Msg
view model =
    Html.main_ []
        [ Html.text (String.fromInt model.iteration)
        , Html.ul []
            (List.map (\i -> Html.li [] [ Html.text (String.fromInt i) ]) model.previousList)
        , Html.Keyed.ul [ Html.Attributes.id "keyedUl" ]
            (List.map
                (\i ->
                    ( String.fromInt i
                    , if i == 0 then
                        zero

                      else
                        Html.li [] [ Html.text (String.fromInt i) ]
                    )
                )
                model.list
            )
        , Html.ul []
            (List.map (\i -> Html.li [] [ Html.text (String.fromInt i) ]) model.list)
        ]


zero =
    Html.li [] [ Html.text "0" ]


main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
