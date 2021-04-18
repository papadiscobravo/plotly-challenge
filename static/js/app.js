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
            title: `Top ten bacteria sampled from test subject ${sampleId}'s belly button by count`,
            yaxis: {title: "Operational Taxonomic Unit (OTU)"},
            yaxis: {autorange: "reversed"},
            xaxis: {title: "Count"},
            height: 500,
            width: 1000
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
            type: "bubble",
            x: otu_ids.slice(0,10),
            y: sample_values.slice(0,10),
            mode: "markers",
            marker: {
                size: sample_values.slice(0,10),
                color: otu_ids.slice(0,10)
            },
            text: otu_labels.slice(0,10)
        }

        console.log("Here is the bubble chart data, as bubbleData:"); 
        console.log(bubbleData);

        var bubbleArray = [bubbleData];
        console.log("Here's the bubble chart data as an array, called bubbleArray:"); 
        console.log(bubbleArray);

        var bubbleLayout = {
            title: `Top ten bacteria sampled from test subject ${sampleId}'s belly button by count`,
            showlegend: false,
            height: 500,
            width: 1000,
            yaxis: {title: "Count"},
            xaxis: {title: "Operational taxonomic unit (OTU) identification number"}
        };

    Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

    });
    

};
// CREATE SHOW METADATA FUNCTION
function ShowMetadata(sampleId){
    console.log(`ShowMetadata for ID: (${sampleId})`);
        
    d3.json("samples.json").then(data => {

        var metadata = data.metadata;
        console.log("Here's all the metadata:");
        console.log(metadata);
        var testSubjectMetadata = metadata.filter(s => s.id == sampleId);     
        console.log(`Test subject ${sampleId}'s demographic information (metadata) as the object itself is:`);
        console.log(testSubjectMetadata);

        // Now how to put the JavaScript variable testSubjectMetadata into the HTML in div id="sample-metadata" class="panel-body"
        // metadata stores the following for each test subject:
        // id, wfreq, bbtype ("I" or "O"), location, age, gender, ethnicity

        MetadataToHTML =
            "ID: " + testSubjectMetadata[0].id + "<br>" +
            "reports washing belly button " + testSubjectMetadata[0].wfreq + " times per week" + "<br>" +
            "innie or outie (I or O): " + testSubjectMetadata[0].bbtype + "<br>" +
            "age: " + testSubjectMetadata[0].age + "<br>" +
            "gender: " + testSubjectMetadata[0].gender + "<br>" +
            "location: " + testSubjectMetadata[0].location + "<br>" +
            "ethnicity: " + testSubjectMetadata[0].ethnicity;

        document.getElementById("sample-metadata").innerHTML = MetadataToHTML;
        console.log(MetadataToHTML);

    });

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