// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// Require Dependencies
const $ = require("jquery");
const powershell = require("node-powershell");
const newtab = require("./newtab");
const path = require("path");

// Clear the Error Messages
$(".alert-danger .message").html();
$(".alert-danger").hide();

// Testing PowerShell
$("button").click(e => {
  let psscript = e.target.id;
  // Create the PS Instance
  let ps = new powershell({
    executionPolicy: "Bypass",
    noProfile: true
  });

  // Load the gun
  let scriptPath = path.resolve(__dirname, "./" + psscript + ".ps1");
  ps.addCommand(scriptPath);

  // Pull the Trigger
  ps.invoke()
    .then(output => {
      let dataSet = JSON.parse(output);
      // Catch Custom Errors
      if (dataSet.Error) {
        $(".alert-danger .message").html(dataSet.Error.Message);
        $(".alert-danger").show();
        return;
      }
      newtab(dataSet);
    })
    .catch(err => {
      console.error(err);
      $(".alert-danger .message").html(err);
      $(".alert-danger").show();
      ps.dispose();
    });
});
