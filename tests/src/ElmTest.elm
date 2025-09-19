module ElmTest exposing (main)

import Html
import Html.Attributes
import Json.Encode
import Random
import Svg
import Test exposing (Test, test)
import Test.Html.Query as Query
import Test.Html.Selector as Selector
import Test.Runner


testNode =
    Html.div
        [ --     Html.Attributes.property "className" (Json.Encode.object [ ( "a", Json.Encode.string "a" ) ])
          -- , Html.Attributes.property "className" (Json.Encode.list identity [ Json.Encode.string "a", Json.Encode.string "b" ])
          Html.Attributes.property "className" (Json.Encode.string "other-class")
        , Html.Attributes.class "the-class"
        ]
        [-- Svg.svg []
         -- [ Svg.path [ Html.Attributes.class "yo" ] [] ]
        ]


myTest : Test
myTest =
    test "Patched VDOM makes this test fail" <|
        \_ ->
            testNode
                |> Query.fromHtml
                |> Query.has [ Selector.class "the-class", Selector.class "other-class" ]


foo =
    case Test.Runner.fromTest 1 (Random.initialSeed 0) myTest of
        Test.Runner.Plain [ runner ] ->
            runner.run ()

        _ ->
            Debug.todo "Not the SeededRunners you are looking for"


main =
    Html.div []
        [ Html.text (Debug.toString foo)
        , testNode
        ]
