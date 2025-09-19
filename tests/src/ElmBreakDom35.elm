module ElmBreakDom35 exposing (main)

import Angle
import Browser
import Camera3d
import Color
import Direction3d
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Length
import Pixels
import Point3d
import Scene3d
import Scene3d.Material as Material
import Viewpoint3d


type Model
    = Model


type Msg
    = MakeErrorsHappen


update : Msg -> Model -> ( Model, Cmd msg )
update MakeErrorsHappen _ =
    ( Model, Cmd.none )


main =
    Browser.element
        { init = \() -> ( Model, Cmd.none )
        , subscriptions = \Model -> Sub.none
        , update = update
        , view = view
        }


view : Model -> Html Msg
view model =
    Html.div
        []
        [ scene model
        , button [ onClick MakeErrorsHappen ]
            [ text "make bugs"
            ]
        ]


scene : Model -> Html msg
scene _ =
    let
        underlayment : Scene3d.Entity coordinates
        underlayment =
            Scene3d.quad (Material.color (Color.rgba 255 0 0 0.5))
                (Point3d.meters -5 -5 -1)
                (Point3d.meters 5 -5 -1)
                (Point3d.meters 5 5 -1)
                (Point3d.meters -5 5 -1)

        r =
            42.0

        ( camX, camY, camZ ) =
            ( r * cos 0.0, r * sin 0.0, 24.0 )

        camera =
            Camera3d.perspective
                { viewpoint =
                    Viewpoint3d.lookAt
                        { focalPoint = Point3d.origin
                        , eyePoint = Point3d.meters camX camY camZ
                        , upDirection = Direction3d.positiveZ
                        }
                , verticalFieldOfView = Angle.degrees 30
                }
    in
    Scene3d.cloudy
        { entities = [ underlayment ]
        , camera = camera
        , clipDepth = Length.meters 1
        , background = Scene3d.transparentBackground
        , dimensions = ( Pixels.int 800, Pixels.int 1000 )
        , upDirection = Direction3d.negativeZ
        }
