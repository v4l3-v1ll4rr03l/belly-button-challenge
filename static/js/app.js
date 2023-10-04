const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"; 

d3.json(url).then(function(data) { console.log(data); });

let otu_labels = [];
let otu_amounts = [];
let samples = data.samples;

for (let i = 0; i < samples.length; i++)
{
    for (let i = 0; j < samples.sample_values.length; j++)
    {
        let curr_id = samples.otu_ids[i];
        let curr_amt = samples.sample_values[i];
        let index = otu_labels.indexOf(curr_id);
        if (index < 0)
        {
            otu_labels.push(curr_id);
            otu_amounts.push(curr_amt);
        }
        else
        {
            otu_amounts[index] = otu_amounts[index] + curr_amt;
        }
    }
}

let trace1 = {
    x: otu_amounts,
    y: otu_labels,
    text: otu_labels,
    type: "bar",
    orientation: "h"
  };
  
