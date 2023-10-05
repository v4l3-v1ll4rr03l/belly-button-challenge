const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"; 
buildChart(940);

function labelID(otu_id) { return "OTU".concat(" ", otu_id.toString()); }

function buildChart(curr_id){
    d3.json(url).then(function(data) { 
        console.log(data);
        samples = data.samples;
        console.log(samples);  
        let curr_sample = samples.filter(sample => sample.id == curr_id);
        curr_sample = curr_sample[0];
        console.log(curr_sample);
        let temp_x = curr_sample.sample_values;
        let temp_y = curr_sample.otu_ids;
        console.log(temp_x);
        console.log(temp_y);
        
        let trace1 = {
            x: temp_x.slice(0,10).reverse(),
            y: temp_y.slice(0,10).reverse().map(labelID),
            type: "bar",
            orientation: "h"
          };
          
        Plotly.newPlot("plot", [trace1]);
    });
}

console.log(curr_metadata);