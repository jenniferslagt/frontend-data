console.log("hoi");

// hieronder wordt de query opgehaald (met behulp van Kris)
const mijnQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# tel de materiaalsoorten bij wapens
SELECT ?typeLabel (COUNT(?cho) AS ?choCount) WHERE {
# selecteer soorten wapens
<https://hdl.handle.net/20.500.11840/termmaster12445> skos:narrower* ?type .
?type skos:prefLabel ?typeLabel .

# geef objecten van een soort wapen
?cho edm:object ?type .

}
GROUP BY ?typeLabel
ORDER BY DESC(?choCount)
LIMIT 10
`

const mijnUrl ="https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-10/sparql"

function runQuery(url, query) {
    return fetch(url + "?query=" + encodeURIComponent(query) + "&format=json")
        .then(res => res.json())
        .then(data => data.results.bindings)
        .catch(error => {
            console.log(error)
        })
}

function schoneData(data){
  return  data.map( result => {
    return {
        wapentype: result.typeLabel.value,
        aantal: Number(result.choCount.value)
    }
  })
 }

runQuery(mijnUrl, mijnQuery)
    .then(schoneData)
    .then(resultaten => {


//import { select } from "d3";
const svg = d3.select("svg")
const width = +svg.attr("width")
const height = +svg.attr("height");

const render = data => {

    const margin = {
            top: 20,
            right: 50,
            bottom: 20,
            left: 130 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.aantal)])
        .range([0, innerWidth]);

    const xAxis = d3.axisBottom(xScale);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.wapentype))
        .range([0, innerHeight])
        .padding(0.1);

    const yAxis = d3.axisLeft(yScale);

    const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    yAxis(g.append("g"));

    xAxis(g.append("g").attr("transform", `translate(0,${innerHeight})`));

    g.selectAll("rect")
        .data(resultaten)
        .enter()
        .append("rect")
        .attr("y", d => yScale(d.wapentype))
        .attr("width", d => xScale(d.aantal))
        .attr("height", yScale.bandwidth());
};

    render(resultaten)

    });


// Source: Making a Bar Chart with D3.js and SVG [Reloaded] - https://www.youtube.com/watch?v=NlBt-7PuaLk
