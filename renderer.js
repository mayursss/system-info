// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// Require Dependencies
const $ = require("jquery");
const powershell = require("node-powershell");
const dt = require("datatables.net")();
const dtbs = require("datatables.net-bs4")(window, $);

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
  ps.addCommand("./" + psscript);

  // Pull the Trigger
  ps.invoke()
    .then(output => {
      let data = JSON.parse(output);
      console.log("This is data", data);
      // Catch Custom Errors
      if (data.Error) {
        $(".alert-danger .message").html(data.Error.Message);
        $(".alert-danger").show();
        return;
      }
      // generate DataTables columns dynamically
      let columns = [];
      Object.keys(data[0]).forEach(key =>
        columns.push({ title: key, data: key })
      );
      // empty table
      $("#output").empty();
      if ($.fn.dataTable.isDataTable("#output")) {
        table.destroy();
      }
      table = $("#output").DataTable({
        data: data,
        columns: columns,
        paging: true,
        search: true
      });
    })
    .catch(err => {
      console.error(err);
      $(".alert-danger .message").html(err);
      $(".alert-danger").show();
      ps.dispose();
    });
});
