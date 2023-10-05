function init() 
{
    buildVisuals(940);
    let select = document.getElementById("selDataset");
    d3.json(url).then(function(data) 
    { 
        // referenced https://www.geeksforgeeks.org/how-to-create-a-dropdown-list-with-array-values-using-javascript/
        let names = data.names;
        for (let i = 0; i < names.length; i++) {
            let option = names[i];
            let el = document.createElement("option");
            el.textContent = option;
            el.value = option;
            select.appendChild(el);
        }
    });
}

function labelID(otu_id) {return "OTU".concat(" ", otu_id.toString());}

function updateVisuals()
{
    let dropdownMenu = d3.select("#selDataset");
    let curr_id = dropdownMenu.property("value");
    buildVisuals(curr_id);
}

function buildVisuals(curr_id)
{
    d3.json(url).then(function(data) 
    { 
        console.log(data);

        let curr_metadata = data.metadata.filter(sample => sample.id == curr_id)[0];
        d3.select(".metadata-id").text('id: ' + curr_metadata.id);
        d3.select(".metadata-eth").text('ethnicity: ' + curr_metadata.ethnicity);
        d3.select(".metadata-gender").text('gender: ' + curr_metadata.gender);
        d3.select(".metadata-age").text('age: ' + curr_metadata.age);
        d3.select(".metadata-location").text('location: ' + curr_metadata.location);
        d3.select(".metadata-bbtype").text('bbtype: ' + curr_metadata.bbtype);
        d3.select(".metadata-wfreq").text('wfreq: ' + curr_metadata.wfreq);

        let curr_sample = data.samples.filter(sample => sample.id == curr_id)[0];
        let temp_x = curr_sample.sample_values;
        let temp_y = curr_sample.otu_ids;
        console.log(temp_x);
        console.log(temp_y);
        
        let trace1 = 
        {
            x: temp_x.slice(0,10).reverse(),
            y: temp_y.slice(0,10).reverse().map(labelID),
            type: "bar",
            orientation: "h"
        };
          
        Plotly.newPlot("bar", [trace1]);

        let trace2 = 
        {
            x: temp_y,
            y: temp_x,
            text: curr_sample.otu_labels,
            mode: "markers",
            marker: 
            {
                color: temp_y,
                size: temp_x
            }
        };

        let layout = { xaxis: { title: { text: 'OUT ID',}}}

        Plotly.newPlot('bubble', [trace2], layout);
    });
}

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"; 
init();
d3.selectAll("#selDataset").on("change", updateVisuals);