"use strict";

var debugging = false;

var fs = require('fs');
var cp = require('child_proccess');
var path = require('path');

var webAppPath = '../src-web/app/src';
var webAssetsPath = '../src-web/assets';
var nativescriptAppPath = '../src-nativescript/app/src';
var nativescriptAssetsPath ='../src-nativescript/app/assets';


// Root SymLink Code for Windows
if (process.argv.length > 2) {
    if (process.argv[2] === 'symlink') {
        createRootSymLink();
        console.log("Created Symlink");
    }
    return 0;
}



console.log("Configuring...");

// remove previous symlinks if they exist
try {
    if (fs.existsSync(resolve(nativescriptAppPath))) {
        fs.unlinkSync(resolve(nativescriptAppPath));
    }
    if (fs.existsSync(resolve(nativescriptAssetsPath))) {
        fs.unlinkSync(resolve(nativescriptAssetsPath));
    }
} catch (err) {
}

// We need to create a symlink
try {
    createSymLink();
} catch (err) {
    if (debugging) {
        console.log("Symlink error: ", err);
    }
    // Failed, which means they weren't running root; so lets try to get root
    AttemptRootSymlink();
}

// Might silent fail on OSX, so we have to see if it exists
// if (!fs.existsSync(resolve(nativescriptComponentsPath))) {
//     AttemptRootSymlink();
// }

displayFinalHelp();

if (!fs.existsSync(resolve(nativescriptAppPath))) {
    console.log("We were unable to create a symlink  - from -");
    console.log("  ", resolve(webAppPath), "    - to - ");
    console.log("  ", resolve(nativescriptAppPath));
    console.log("If you don't create this symlink, you will have to manually copy the code each time you change it.");
}


return 0;

/**
 * This will attempt to run the install script as root to make a symlink
 *
 */
function AttemptRootSymlink() {

    if (process.platform === 'win32') {
        var curPath = resolve("./");
        if (debugging) {
            console.log("RootSymlink Base path is", curPath);
        }
        cp.execSync("powershell -Command \"Start-Process 'node' -ArgumentList '"+curPath+"/install.js symlink' -verb runas\"");
    } else {
        console.log("To automatically create a SymLink between your web app and NativeScript, we need root for a second.");
        cp.execSync("sudo "+process.argv[0] + " " + process.argv[1] +" symlink");
    }
}

/**
 * Create the symlink when running as root
 */
function createRootSymLink() {
    var li1 = process.argv[1].lastIndexOf('\\'), li2 = process.argv[1].lastIndexOf('/');
    if (li2 > li1) { li1 = li2; }
    var AppPath = process.argv[1].substring(0,li1);
    var p1 = resolve(AppPath + "/" + nativescriptAppPath);
    var p2 = resolve(AppPath + "/" + webAppPath);
    if (debugging) {
        console.log("Path: ", p1, p2);
    }
    fs.symlinkSync(p2, p1, 'junction');

    p1 = resolve(AppPath + "/" + nativescriptAssetsPath);
    p2 = resolve(AppPath + "/" + webAssetsPath);
    if (debugging) {
        console.log("Path: ", p1, p2);
    }
    fs.symlinkSync(p2,p1,'junction');
}

/**
 * Create Symlink
 */
function createSymLink() {
    if (debugging) {
        console.log("Attempting to Symlink", webAppPath, nativescriptAppPath);
    }
    fs.symlinkSync(resolve(webAppPath), resolve(nativescriptAppPath), 'junction');
    fs.symlinkSync(resolve(webAssetsPath), resolve(nativescriptAssetsPath), 'junction');

}