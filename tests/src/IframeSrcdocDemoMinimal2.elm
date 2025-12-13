module IframeSrcdocDemoMinimal2 exposing (main)

import Browser
import Html
import Html.Attributes
import Html.Events
import Json.Encode
import VirtualDom


type CustomElementState
    = Srcdoc1
    | Srcdoc2
    | NoSrcdoc


main =
    Browser.sandbox
        { init = Srcdoc1
        , update =
            \() customElementState ->
                case customElementState of
                    Srcdoc1 ->
                        Srcdoc2

                    Srcdoc2 ->
                        NoSrcdoc

                    NoSrcdoc ->
                        Srcdoc1
        , view = view
        }


view customElementState =
    Html.div []
        [ Html.iframe [ Html.Attributes.srcdoc "<script>window.parent.document.body.append('[Injected 1]')</script>" ] []
        , Html.iframe [ Html.Attributes.property "srcdoc" (Json.Encode.string "<script>window.parent.document.body.append('[Injected 2]')</script>") ] []
        , Html.iframe [ Html.Attributes.attribute "srcdoc" "<script>window.parent.document.body.append('[Injected 3]')</script>" ] []
        , Html.iframe [ Html.Attributes.attribute "SRCDOC" "<script>window.parent.document.body.append('[Injected 4]')</script>" ] []
        , Html.iframe [ Html.Attributes.attribute "SrcDoc" "<script>window.parent.document.body.append('[Injected 5]')</script>" ] []

        -- Test of the custom element documented in: https://github.com/elm/html/pull/281
        , Html.node "my-iframe"
            (case customElementState of
                Srcdoc1 ->
                    [ Html.Attributes.attribute "html" "<elm>Hello 1</em><script>window.parent.document.body.append('[Injected 6]')</script>" ]

                Srcdoc2 ->
                    [ Html.Attributes.attribute "html" "<elm>Hello 2</em>" ]

                NoSrcdoc ->
                    []
            )
            []
        , Html.button [ Html.Events.onClick () ] [ Html.text "Cycle my-iframe content" ]
        ]
