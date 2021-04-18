console.log("opened app.py");

// Fetch the JSON data and console log it
d3.json("samples.json").then(function(data) {
    console.log("Here's the data:");
    console.log(data);
  });

// Promise Pending
const dataPromise = d3.json("samples.json");
console.log("Data Promise: ", dataPromise);


// The following is based on code Dom demonstrated in office hours.


// How to draw a bar graph:
function DrawBarGraph(sampleId){
    console.log(`DrawBarGraph(${sampleId})`);

    d3.json("samples.json").then(data => {

        // There might be an error down here:
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        // There might be an error up there.
        console.log(resultArray);
        var result = resultArray[0];
        console.log("Here's the result of filtering the data:");
        console.log(result);
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log(`Here are OTU IDs: ${otu_ids}`);
        console.log(`Here are OTU labels: ${otu_labels}`);
        console.log(`Here are OTU sample values: ${sample_values}`);

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`); // TBD
        console.log(`Here are the yticks: ${yticks}`);

        var barData = {
            x: sample_values.slice(0,10),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10),
            orientation: "h"
        }
        console.log("Here is the bar graph data, as barData:"); 
        console.log(barData);

        var barArray = [barData];
        console.log("Here's the bar graph data as an array, called barArray:"); 
        console.log(barArray);

        var barLayout = {
            title: `Bacteria sampled from test subject ${sampleId}'s belly button`,
            yaxis: {title: "Bacterium"},
            yaxis: {autorange: "reversed"},
            xaxis: {title: "Count"}
        };

    Plotly.newPlot("bar", barArray, barLayout);

    });

};

// How to draw a bubble chart:
function DrawBubbleChart(sampleId){
    console.log(`DrawBubbleChart(${sampleId})`);

    d3.json("samples.json").then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        console.log(resultArray);
        var result = resultArray[0];
        console.log("Here's the result of filtering the data:");
        console.log(result);
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log(`Here are OTU IDs: ${otu_ids}`);
        console.log(`Here are OTU labels: ${otu_labels}`);
        console.log(`Here are OTU sample values: ${sample_values}`);

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`); // TBD
        console.log(`Here are the yticks: ${yticks}`);

        var bubbleData = {
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            y: yticks,
            type: "bubble",
            marker: {size: sample_values.slice(0,10)},
            text: otu_labels.slice(0,10)
        }
        console.log("Here is the bubble chart data, as bubbleData:"); 
        console.log(bubbleData);

        var bubbleArray = [bubbleData];
        console.log("Here's the bubble chart data as an array, called bubbleArray:"); 
        console.log(bubbleArray);

        var bubbleLayout = {
            title: `Bacteria sampled from test subject ${sampleId}'s belly button`,
            showlegend: false,
            height: 800,
            width: 600,
            yaxis: {title: "Bacterium"},
            xaxis: {title: "Count"}
        };

    Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

    });
    

};

function ShowMetadata(sampleId){
    console.log(`ShowMetadata(${sampleId})`);
};

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);
    DrawBarGraph(newSampleId);
    DrawBubbleChart(newSampleId);
    ShowMetadata(newSampleId);

};


function InitDashboard() {
    console.log("InitDashboard()");

    // Populate the dropdown
    var selector = d3.select("#selDataset");
    console.log("dropdown populated");

    d3.json("samples.json").then(function(data) {

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option").
            text(sampleId).
            property("value", sampleId);
        });
        console.log(`sampleNames: ${sampleNames}`);

        var id = sampleNames[0];
        console.log(`id: ${id}`);

        DrawBarGraph(id);
        DrawBubbleChart(id);
        ShowMetadata(id);

    });

    // Update the bar graph
    // Update the bubble chart
    // Update the demographic information

}
InitDashboard();
;