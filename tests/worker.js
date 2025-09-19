const {Elm} = require("./build/main.js");

const app = Elm.Worker.init();

console.log(app);
app.ports.incoming.send(5);
app.ports.outgoing.subscribe((v) => {
    console.log("outgoing", v);
});

