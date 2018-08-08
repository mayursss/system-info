const $ = require("jquery");
const dt = require("datatables.net")();
const dtbs = require("datatables.net-bs4")(window, $);

function newtab(dataSet) {
  if ($.fn.DataTable.isDataTable("#output")) {
    $("#output")
      .DataTable()
      .destroy();
  }
  $("#output").empty();

  let columns = [];
  if (dataSet.length > 0) {
    Object.keys(dataSet[0]).forEach(key =>
      columns.push({ title: key, data: key })
    );
    table = $("#output").DataTable({
      data: dataSet,
      columns: columns
    });
  } else {
    Object.keys(dataSet).forEach(key =>
      columns.push({ title: key, data: key })
    );
    let return_data = new Array();
    return_data.push(dataSet);

    table = $("#output").DataTable({
      data: return_data,
      columns: columns
    });
  }
}

module.exports = newtab;
