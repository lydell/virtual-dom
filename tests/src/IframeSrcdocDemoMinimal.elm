module IframeSrcdocDemoMinimal exposing (main)

import Browser
import Html
import Html.Attributes
import Html.Events
import Json.Encode
import VirtualDom


main =
    Browser.sandbox
        { init = False
        , update = \() model -> not model
        , view = view
        }


scenarios model =
    -- user = The programmer writing Elm code
    [ ( "No sandbox by user (simplest possible case)"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            ]
      )
    , ( "Sandbox: allow-scripts (next simplest case – but TOO simple). Note: Without allow-same-origin the scripts cannot affect stuff outside the iframe. There will be an error in the JS console about this."
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            , Html.Attributes.sandbox "allow-scripts"
            ]
      )
    , ( "Sandbox: allow-scripts allow-same-origin (simplest working case with sandbox set)"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            , Html.Attributes.sandbox "allow-scripts allow-same-origin"
            ]
      )
    , ( "Sandbox: other allow-x (allow-top-navigation, try the links) at start"
      , \srcdoc ->
            [ Html.Attributes.attribute "html" (srcdoc """
                <a href="https://example.com">iframe navigation</a>
                <br>
                <a href="https://example.com" target="_top">Top navigation</a>
            """)
            , Html.Attributes.sandbox "allow-top-navigation allow-scripts allow-same-origin"
            ]
      )
    , ( "Sandbox: other allow-x (allow-top-navigation, try the links) at end"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc """
                <a href="https://example.com">iframe navigation</a>
                <br>
                <a href="https://example.com" target="_top">Top navigation</a>
              """)
            , Html.Attributes.sandbox "allow-scripts allow-same-origin allow-top-navigation"
            ]
      )
    , ( "Sandbox: Multiple allow-scripts, with different casing and whitespace"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")

            -- \u{000C} = \f = form feed
            , Html.Attributes.sandbox "allow-scripts allow-same-origin\tALLOW-SCRIPTS\nallow-SCRIPTS\u{000C}Allow-Scripts\u{000D}aLlOw-ScRiPtS"
            ]
      )
    , ( "No sandbox, with features users probably expect to work"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc """
                <a href="data:text/plain,Hello!" download="hello.txt">Download link</a>
                <br>
                <a href="https://example.com" target="_top">Top navigation</a>
                <br>
                <form action="https://example.com" target="_top"><button name="form-value" value="1337">Form submit</button></form>
              """)
            ]
      )
    , ( "sandbox=\"\", should explicitly disable all features"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc """
                <a href="data:text/plain,Hello!" download="hello.txt">Download link</a>
                <br>
                <a href="https://example.com" target="_top">Top navigation</a>
                <br>
                <form action="https://example.com" target="_top"><button name="form-value" value="1337">Form submit</button></form>
              """)
            , Html.Attributes.sandbox ""
            ]
      )
    , ( "Edge case: Bogus allow-value which we shouldn’t activate via naive string replacement (non-breaking space version)."
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc """
                <a href="https://example.com" target="_top">Top navigation (disallowed)</a>
              """)

            -- \u{00A0} = non-breaking space, but only ASCII whitespace (except \v) separates tokens
            , Html.Attributes.sandbox "allow-top-navigation\u{00A0}allow-scripts"
            ]
      )
    , ( "Edge case: Bogus allow-value which we shouldn’t activate via naive string replacement (vertical tab version)."
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc """
                <a href="https://example.com" target="_top">Top navigation (disallowed)</a>
              """)

            -- \u{000B} = \v = vertical tab is the only ASCII whitespace that does NOT separate tokens
            , Html.Attributes.sandbox "allow-top-navigation\u{000B}allow-scripts"
            ]
      )
    , ( "Sandbox: null (assuming strings is an easy TypeError mistake to make in Kernel code)"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            , Html.Attributes.property "sandbox" Json.Encode.null
            ]
      )
    , ( "Sandbox: explicit property (string)"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            , Html.Attributes.property "sandbox" (Json.Encode.string "allow-scripts allow-same-origin")
            ]
      )
    , ( "Sandbox: 1-item string array (interpreted identically to a string)"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            , Html.Attributes.property "sandbox" (Json.Encode.list Json.Encode.string [ "allow-scripts allow-same-origin" ])
            ]
      )
    , ( "Sandbox as attribute: uppercase"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            , Html.Attributes.attribute "SANDBOX" "allow-scripts allow-same-origin"
            ]
      )
    , ( "Sandbox as attribute: mixed case"
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            , Html.Attributes.attribute "SandBox" "allow-scripts allow-same-origin"
            ]
      )
    , ( "Sandbox as attributeNS. Note that attributeNS is non-functional – this is the same as not saying anything about sandbox at all (allow all)."
      , \srcdoc ->
            [ Html.Attributes.srcdoc (srcdoc "")
            , VirtualDom.attributeNS "" "SandBox" "allow-scripts allow-same-origin"
            , VirtualDom.attributeNS "whatever" "SANDBOX" "allow-scripts allow-same-origin"
            ]
      )
    , ( "srcdoc: null (assuming strings is an easy TypeError mistake to make in Kernel code)"
      , \srcdoc ->
            [ Html.Attributes.property "srcdoc" Json.Encode.null
            ]
      )
    , ( "srcdoc: Explicit property (string)"
      , \srcdoc ->
            [ Html.Attributes.property "srcdoc" (Json.Encode.string (srcdoc ""))
            ]
      )
    , ( "srcdoc: 1-item string array (interpreted identically to a string)"
      , \srcdoc ->
            [ Html.Attributes.property "srcdoc" (Json.Encode.list Json.Encode.string [ srcdoc "" ])
            ]
      )
    , ( "srcdoc as attribute: uppercase"
      , \srcdoc ->
            [ Html.Attributes.attribute "SRCDOC" (srcdoc "")
            ]
      )
    , ( "srcdoc as attribute: mixed case"
      , \srcdoc ->
            [ Html.Attributes.attribute "SrcDoc" (srcdoc "")
            ]
      )
    , ( "switching between src and srcdoc"
      , \srcdoc ->
            [ if model then
                Html.Attributes.attribute "src" "https://example.com"

              else
                Html.Attributes.attribute "srcdoc" (srcdoc "")
            ]
      )
    ]


view model =
    Html.div []
        (Html.p [] [ Html.text "There should be no [injected] text at the bottom of this page." ]
            :: Html.hr [] []
            :: (scenarios model
                    |> List.indexedMap
                        (\index ( description, attributes ) ->
                            let
                                iframe =
                                    case index |> modBy 4 of
                                        1 ->
                                            Html.node "IFRAME"

                                        2 ->
                                            Html.node "IfRaMe"
                                            
                                        3 ->
                                            Html.node "my-iframe"

                                        _ ->
                                            Html.iframe
                            in
                            Html.div []
                                [ Html.p [] [ Html.text description ]
                                , iframe
                                    (attributes
                                        (\extraHtml ->
                                            "<b>iframe "
                                                ++ String.fromInt index
                                                ++ "</b><br>"
                                                ++ extraHtml
                                                ++ "<script>window.parent.document.body.append('[Injected from iframe "
                                                ++ String.fromInt index
                                                ++ "]')</script>"
                                        )
                                    )
                                    []
                                ]
                        )
                    |> List.intersperse (Html.hr [] [])
               )
            ++ [ Html.button [ Html.Events.onClick () ]
                    [ Html.text
                        (if model then
                            "Switch to srcdoc"

                         else
                            "Switch to src"
                        )
                    ]
               ]
        )
