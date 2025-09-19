const jsdom = require("jsdom");
const { JSDOM } = jsdom;
JSDOM.fromFile("worker.html", { runScripts: "dangerously", resources: "usable" }).then(value => {
    console.log("then")
})
