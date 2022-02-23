var sh = require("shelljs");
var os = require("os");
var path = require("path");

sh.cd(path.resolve(__dirname, ".."));

switch (os.type().toLowerCase()) {
    case "linux":
        sh.exec("google-chrome index.html");
        break;
    case "windows_nt":
        sh.exec("start index.html");
        break;
    case "darwin":
        sh.exec("open index.html");
        break;
}
