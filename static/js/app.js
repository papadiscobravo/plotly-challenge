console.log("Opened app.py, where the work will happen.");

// Fetch the JSON data and console log it
d3.json("samples.json").then(function(data) {
    console.log("Here's the data:");
    console.log(data);
  });

// Promise Pending
const dataPromise = d3.json("samples.json");
console.log("Data Promise: ", dataPromise);


// The following is based on code Dom demonstrated in office hours.
function InitDashboard() {
    console.log("InitDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then(function(data) {
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option").
            text(sampleId).
            property("value", sampleId);
        });
    });

    // Update the bar graph
    // Update the bubble chart
    // Update the demographic information


}
InitDashboard();
;

