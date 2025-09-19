module OuterHtmlDemoMinimal exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Encode


main =
    Browser.sandbox
        { init = False
        , update = \msg _ -> msg
        , view = view
        }


view : Bool -> Html Bool
view checkboxChecked =
    viewFancyCheckbox identity checkboxChecked


{-| Imagine this function coming from a third party package.
It renders a fancy checkbox (though in this example it’s just a plain HTML checkbox).
It sneakily runs some JavaScript code when you check the checkbox (though in this example it isn’t very sneaky).
But the package of course doesn’t advertise the latter :)

elm/virtual-dom already protects against `innerHTML`.
This patch extends the protection to cover `outerHTML` as well:

    diff --git a/src/Elm/Kernel/VirtualDom.js b/src/Elm/Kernel/VirtualDom.js
    index 9fe8504..690eaa8 100644
    --- a/src/Elm/Kernel/VirtualDom.js
    +++ b/src/Elm/Kernel/VirtualDom.js
    @@ -303,7 +303,7 @@ function _VirtualDom_noOnOrFormAction(key)

     function _VirtualDom_noInnerHtmlOrFormAction(key)
     {
    -   return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
    +   return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
     }

     function _VirtualDom_noJavaScriptUri(value)

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
