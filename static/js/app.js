const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"; 
let curr_id = 940;
let curr_data =[];
let curr_metadata = {};

d3.json(url).then(function(data) { 
    console.log(data); 
    for (let i = 0; i < data.samples.length; i++)
    {
        let temp_samples = data.samples[i];
        if (temp_samples.id == curr_id)
        {
            curr_metadata = data.metadata[i];
            for (let j = 0; j < temp_samples.sample_values.length; j++)
            {
                curr_data.push({"otu_id": temp_samples.otu_ids[j], 
                                "otu_label": temp_samples.otu_labels[j], 
                                "sample_value": temp_samples.sample_values[j]});
            }
        }
    }
    let sorted_data = curr_data.sort((a, b) => b.sample_value - a.sample_value);
    let sliced_data = sorted_data.slice(0,10);
    console.log(sliced_data);
    console.log(curr_metadata);

    let trace1 = {
        x: sliced_data.map(object => object.sample_value),
        y: sliced_data.map(object => object.out_id),
        type: "bar",
        orientation: "h"
      };
      
    Plotly.newPlot("plot", [trace1]);
});
console.log(curr_metadata);