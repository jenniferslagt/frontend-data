## Een interactieve bar chart over wapentypes (gefilterd op herkomst)
![Schermafbeelding 2019-11-28 om 18 29 31](https://user-images.githubusercontent.com/45489420/69824778-361d8300-120d-11ea-8957-d9941fdf6830.png)
[Bekijk hier de live versie](https://jenniferslagt.github.io/frontend-data/bar_chart.html)

## De opdrachtgever 
Het museum Volkenkunde heeft ons de opdracht gegeven om een datavisualisatie te maken die "collectiebreed" is. Het hoeft juist niet specifiek te zijn, maar het moet te maken hebben met (een groot deel van) de gehele collectie van 700.000 voorwerpen (!). In begin 2020 opent het museum namelijk een kleine tentoonstelling die gaat over de missie en het DNA van het museum. Hierop zal een datavisualisatie gepresenteerd worden.

## Target audience (doelgroep)
De datavisualisatie is gemaakt voor bezoekers die naar de kleine tentoonstelling komen in 2020. Daarom moet de visualisatie in één oogslag een duidelijk verhaal vertellen die wat zegt over het museum. De mensen die hier naar toe komen zijn voor namelijk geïnteresseerd in de collectie van het museum.

## Het concept
De collectie van het wereldmuseum heeft maar liefst 700.000 foto's en objecten. Het is aan mijn de taak om een datavisualisatie te maken die collectiebreed is. Ik heb uiteindelijk gekozen om me te focussen op wapens, aangezien er 47.683 records zijn die te maken hebben met wapens. Daarnaast behoort het tot de top 10 meest voorkomende categorieën / trefwoorden. Wapens is eigenlijk iets heel algemeens, maar wat voor soorten wapens zijn er eigenlijk in de collectie en waar komen deze vandaan? Om antwoord op deze vraag te geven, heb ik nog twee variabelen er bij gehaald: namelijk wapentypes en herkomst. Het is het idee om het aantal wapentypes weer te geven per wapentype op basis van gekozen continent. <br>
<br>
Tenslotte is er nog de vraag: wat voor datavisualisatie ga ik maken? Om deze keuze te maken, heb ik rekening gehouden met doelgroep en met de haalbaarheid. Als ik bijvoorbeeld een bekende datavisualisatie kies, begrijpt de doelgroep makkelijker de boodschap van de visualisatie. Kortom: ik wil een simpele, bekende visualisatie maken. Ik vind dat de bar chart het beste bij deze eisen past, daarom heb ik ervoor gekozen om dit ook te maken.
<br>

## Wat haal ik uit mijn database?
Op basis van mijn concept haal ik 3 variabelen op uit de database:
1. Wapentype
2. Aantal wapens (per wapentype)
3. Herkomst (per wapentype)

## Werken met D3.js
Om een datavisualisatie te maken, ben ik aan de slag gegaan met D3.js. Hierbij heb ik verschillende tutorials / bronnen gebruikt die onderaan de pagina staan. In mijn wiki (Interactie toevoegen met D3.js) heb ik beschreven hoe ik hiermee te werk ben gegaan en wat ik precies weggehaald, veranderd of toegevoegd heb.

### Wat is D3.js?
D3.js is een JavaScript library die documenten manipuleert gebaseerd op data (meestal in de vorm van een array met waardes). Je kan er interactieve datavisualisaties (of componenten ervan) maken met JS, HTML, CSS en SVG. D3.js bindt data naar de DOM (Document Object Model) en past dan transformaties toe aan het document. Ook kan je interacties of animaties ermee maken op basis van grote datasets die opgeschoond kunnen worden. 

### Hoe werkt deze update pattern precies?

[Bekijk hier een uitgebreide uitleg over D3.js en de update pattern](https://github.com/jenniferslagt/frontend-data/wiki/De-D3-update-pattern)



## Mijn leerpunten
Afgelopen weken heb ik de volgende punten geleerd:
* D3.js heeft zijn eigen keywords en deze kunnen het best gebruikt worden als je `d3.` ervoor zet.
* Met D3.js kan je een svg tekenen in Javascript waar binnen de  datavisualisaties gemaakt wordt.
* Scale functions worden gebruikt om een bepaalde input (bijvoorbeeld data) te verbinden met een bepaalde output (bijvoorbeeld kleur). Dit bepaald hoe de input wordt weergegeven.
* Ik heb geleerd om een bar chart te maken die uit verschillende componenten bestaat.
* Ik weet nu dat ik interactie kan toevoegen m.b.v D3 keywords, bijvoorbeeld events.
* Ik heb geleerd hoe ik specifieke data kan filteren en selecteren als de gebruiker een bepaalde taak uitvoert.
* Ik heb geleerd hoe je DOM elementen kan verbinden met data (D3 Data Join). 
* Data kan veranderd worden in de visualisatie m.b.v een update pattern.

## Bronnen
* [NMVW-collectie van het museum](https://github.com/jenniferslagt/frontend-data/wiki/Het-concept)

Introductie D3.js en een bar chart maken:
* [D3.js Data-Driven documents](https://d3js.org/)
* [Introduction to D3 | D3 in Depth](https://www.d3indepth.com/introduction/)
* [D3 Gallery examples](https://github.com/d3/d3/wiki/Gallery)

Interactie toevoegen:
* [D3: Animated Bar Chart](https://bl.ocks.org/jamesleesaunders/f32a8817f7724b17b7f1)
* [D3.js Graph Gallery | Building legends in d3.js](https://www.d3-graph-gallery.com/graph/custom_legend.html#cont1) (Categorical legend: use a loop)
* [The General Update Pattern of D3.js](https://www.youtube.com/watch?v=IyIAR65G-GQ&t=212s)
* [D3js Tutorials: Part 13 - Adding Tooltips To Your Bar Graph](https://www.youtube.com/watch?v=wsCOif7RMBo)
