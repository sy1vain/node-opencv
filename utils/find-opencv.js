"use strict";

var exec = require("child_process").exec;
var fs = require("fs");
var flag = process.argv[2] || "--exists";

// Normally |pkg-config opencv ...| could report either OpenCV 2.x or OpenCV 3.y
// depending on what is installed.  To enable both 2.x and 3.y to co-exist on
// the same machine, the opencv.pc for 3.y can be installed as opencv3.pc and
// then selected by |export PKG_CONFIG_OPENCV3=1| before building node-opencv.
var opencv = process.env.PKG_CONFIG_OPENCV3 === "1" ? "opencv3" : '"opencv >= 2.3.1"';

function main(){
  if(flag === "--cflags") {
    require("native-opencv").include_dirs();
  }
  else if(flag === "--libs") {
      require("native-opencv").libraries();
  }
  else {
      throw new Error("Error: unknown argument '" + flag + "'");
  }
}

main();
