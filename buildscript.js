var mv = require("mv");

// Method to remove directory with or without files
// Example rmDir("file1") => delete directory with all files || rmDir("file1", false) => delete just the files in the directory
var fs = require("fs");
var rmDir = function(dir, rmSelf) {
  var files;
  rmSelf = rmSelf === undefined ? true : rmSelf;
  dir = dir + "/";
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    console.log("!Oops, directory not exist.");
    return;
  }
  if (files.length > 0) {
    files.forEach(function(x, i) {
      if (fs.statSync(dir + x).isDirectory()) {
        rmDir(dir + x);
      } else {
        fs.unlinkSync(dir + x);
      }
    });
  }
  if (rmSelf) {
    // check if user want to delete the directory ir just the files in this directory
    fs.rmdirSync(dir);
    // console.log("Removed" + dir);
  }
};

// Remove files before moving new build
rmDir("publish/umd");
rmDir("publish/es");
rmDir("publish/lib");

// Move Files after Build
mv("umd", "publish/umd", function(err) {
  if (err) console.log("err moving umd Folder", err);
  console.log("Moved umd");
});
mv("es", "publish/es", function(err) {
  if (err) console.log("err moving es Folder", err);
  console.log("Moved es");
});
mv("lib", "publish/lib", function(err) {
  if (err) console.log("err moving lib Folder", err);
  console.log("Moved lib");
});
