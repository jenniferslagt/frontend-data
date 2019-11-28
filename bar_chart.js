// Hieronder wordt de query opgehaald (met behulp van Kris)
const mijnQuery = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
# tel de materiaalsoorten bij wapens
SELECT ?typeLabel ?continentLabel (COUNT(?cho) AS ?choCount) WHERE {

  # selecteer soorten wapens
  <https://hdl.handle.net/20.500.11840/termmaster12445> skos:narrower*  ?type .
  ?type skos:prefLabel ?typeLabel .

  # geef objecten van een soort wapen
  ?cho edm:object ?type .
  VALUES ?typeLabel {"pijlen" "speren" "bogen (wapens)" "zwaarden" "krissen" "lansen" "dolken" "knotsen" "zwaardstootplaten" "messen (wapens)" }.

  # geef het continent
  <https://hdl.handle.net/20.500.11840/termmaster2> skos:narrower ?continent .
  ?continent skos:prefLabel ?continentLabel .
  ?continent skos:narrower* ?place .
  ?cho dct:spatial ?place .
}
GROUP BY ?typeLabel ?continentLabel
ORDER BY DESC(?choCount)
`

const mijnUrl = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-10/sparql"

// De opgehaalde data wordt omgezet tot een Json bestand.
function runQuery(url, query) {
    return fetch(url + "?query=" + encodeURIComponent(query) + "&format=json")
        .then(res => res.json())
        .then(data => data.results.bindings)
        .catch(error => {
            console.log(error)
        })
}

// De data wordt opgeschoond, zodat alleen de relevante data wordt weergegeven.
function schoneData(data) {
    return data.map(result => {
        return {
            wapentype: result.typeLabel.value,
            continentLabel: result.continentLabel.value,
            aantal: Number(result.choCount.value)
        }
    })
}

runQuery(mijnUrl, mijnQuery)
    .then(schoneData)
    .then(resultaten =

        // De bar chart wordt aangemaakt en de juiste data wordt meegegeven.
        function makeBarChart(resultaten) {

            const svg = d3.select("svg")
            const width = +svg.attr("width")
            const height = +svg.attr("height");

            const render = data => {

                // De data wordt opgeschoond (wapentypes beginnen nu met een hoofdletter).
                data = data.map((item) => {

                    item["wapentype"] = item["wapentype"]
                        .charAt(0)
                        .toUpperCase() + item["wapentype"]
                        .slice(1)

                    return item
                });

                const margin = {
                    top: 170,
                    right: 330,
                    bottom: 85,
                    left: 140
                };

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


                let g = svg
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                yAxis(g.append("g"));

                xAxis(g.append("g")
                    .attr("transform", `translate(0,${innerHeight})`));

                // Voeg een titel toe.
                g.append("text")
                    .attr("class", "title")
                    .attr("y", -100)
                    .text("BENIEUWD NAAR DE WAPENTYPES IN DE COLLECTIE?");

                // Voeg een subtitel toe
                g.append("text")
                    .attr("class", "subtitle")
                    .attr("y", -70)
                    .text("Bekijk dan hier de top 10 wapentypes!");

                // Voeg labels toe.
                g.append("text")
                    .attr("class", "labels")
                    .attr("y", 345)
                    .attr("x", 530)
                    .text("aantal wapens");

                g.append("text")
                    .attr("class", "labels")
                    .attr("y", -20)
                    .attr("x", -30)
                    .text("wapentypes");

                // De bars worden gemaakt.
                const bars = g.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("y", d => yScale(d.wapentype))
                    .transition()
                    .delay((d, i) => {
                        return i * 100;
                    })
                    .attr("width", d => xScale(d.aantal))
                    .attr("height", yScale.bandwidth());

                // Een tooltip toevoegen
                g.selectAll("rect")
                    .on("mouseover", function() {
                        tooltip.style("display", "block") // De tooltip wordt weergegeven
                    })

                g.selectAll("rect")
                    .on("mouseout", function() {
                        tooltip.style("display", "none") // De tooltip wordt niet weergegeven
                    })

                g.selectAll("rect")
                    .on("mousemove", function(d) {
                        var xPos = d3.mouse(this)[0] - -150;
                        var yPos = d3.mouse(this)[1] - -160;

                        tooltip
                            .attr("transform", "translate(" + xPos + "," + yPos + ")");
                        tooltip.select("text")
                            .text(d.wapentype + ":" + d.aantal);
                    })

                var tooltip = svg.append("g")
                    .attr("class", tooltip)
                    .style("display", "none");

                tooltip
                    .append("text")
                    .attr("x", 15)
                    .attr("dy", "1.2em")
                    .style("fontsize", "1.25em")
                    .attr("font-weight", "bold")

                // Er wordt een legenda toegevoegd waarmee je kan filteren
                g.append("text")
                    .attr("class", "legend_title")
                    .attr("y", -18)
                    .attr("x", 680)
                    .text("Filter op continent");

                // De data met continenten worden toegevoegd
                const continents = ["Afrika", "Amerika", "Azië", "Eurazië", "Oceanië"]

                // Er wordt een cirkel voor elk continent toegevoegd.
                svg.selectAll("mydots")
                    .data(continents)
                    .enter()
                    .append("circle")
                    .attr("cx", 830)
                    .attr("cy", (d, i) => {
                        return 190 + i * 30
                    }) // Het eerste getal geeft locatie van cirkel. 25 is de afstand tussen de cirkels
                    .attr("r", 7)
                    .on('click', (e) => {
                        onClick(e)
                    })

                // Er wordt één cirkel aan elk continent verbonden.
                svg.selectAll("mylabels")
                    .data(continents)
                    .enter()
                    .append("text")
                    .attr("x", 855)
                    .attr("y", (d, i) => {
                        return 190 + i * 30
                    })
                    .text((d) => {
                        return d
                    })
                    .attr("text-anchor", "left")
                    .style("alignment-baseline", "middle");

            }

            render(resultaten)

            d3.selectAll("circle")
                .on("click", (d) => {
                    onClick(d);
                })

            function onClick(selectedContinent) {
                const selection = resultaten.filter(resultaat => resultaat.continentLabel == selectedContinent)

                d3.selectAll("g")
                    .remove();
                d3.selectAll("text")
                    .remove();

                d3.selectAll("svg")
                    .enter()
                    .append("rect")
                    .data(selection);

                document.getElementById("continentChange")
                    .innerHTML = selectedContinent


                render(selection)

            }


        });


// Bron: Making a Bar Chart with D3.js and SVG [Reloaded] - https://www.youtube.com/watch?v=NlBt-7PuaLk
