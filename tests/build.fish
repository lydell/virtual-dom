set file JsonEvalDemoMinimal.elm

set dir (dirname (status -f))
cd $dir

rm -rf elm-stuff

set -x ELM_HOME build/elm-home
set virtual_dom $ELM_HOME/0.19.1/packages/elm/virtual-dom/1.0.3
set browser $ELM_HOME/0.19.1/packages/elm/browser/1.0.2
set html $ELM_HOME/0.19.1/packages/elm/html/1.0.0
set core $ELM_HOME/0.19.1/packages/elm/core/1.0.5
set json $ELM_HOME/0.19.1/packages/elm/json/1.1.3
set test $ELM_HOME/0.19.1/packages/elm-explorations/test/2.2.0

rm -f $virtual_dom/artifacts.dat
rm -f $browser/artifacts.dat
rm -f $html/artifacts.dat
rm -f $core/artifacts.dat
rm -f $json/artifacts.dat
rm -f $test/artifacts.dat

cp ../src/Elm/Kernel/*.js $virtual_dom/src/Elm/Kernel/
cp ../../browser/src/Browser/*.elm $browser/src/Browser/
cp ../../browser/src/Debugger/*.elm $browser/src/Debugger/
cp ../../browser/src/Elm/Kernel/*.js $browser/src/Elm/Kernel/
cp ../../html/src/*.elm $html/src/
cp ../../html/src/Html/*.elm $html/src/Html/
cp ../../core/src/Elm/Kernel/*.js $core/src/Elm/Kernel/
cp ../../json/src/Elm/Kernel/*.js $json/src/Elm/Kernel/

elm make src/$file --output=build/main0.js #--debug

cat <build/main0.js >build/main.js
# string replace 'use strict' '' <build/main0.js >build/main.js
# string replace '( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 )' '( state = 0, draw(model), _Browser_requestAnimationFrame(updateIfNeeded), 1 )' <build/main0.js >build/main.js

begin
    echo '(function () {
var scope = {};
(function () {'
    cat <build/main0.js
    echo '}).call(scope);
Elm.hot.reload(scope);
})();'
end >build/hot.js
