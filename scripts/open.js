var sh = require('shelljs');
var os = require('os');
var path = require('path');

sh.cd(path.resolve(__dirname, '..'));

switch (os.type().toLowerCase()) {
    case 'linux':
        sh.exec('google-chrome dist/index.html');
        break;
    case 'windows_nt':
        sh.exec('start dist/index.html');
        break;
    case 'darwin':
        sh.exec('open dist/index.html');
        break;
}
