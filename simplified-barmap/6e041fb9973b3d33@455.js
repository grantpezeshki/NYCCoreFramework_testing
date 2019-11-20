// https://observablehq.com/@grantpezeshki/simplified-barmap@455
import define1 from "./e93997d5089d7165@2200.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Simplified BarMap`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`
<form>
  <p><b>Please select the variable of interest:</b></p>
  <div>
  </div>
</form>
`
)});
  main.variable(observer("viewof r")).define("viewof r", ["radio","choices"], function(radio,choices){return(
radio(choices)
)});
  main.variable(observer("r")).define("r", ["Generators", "viewof r"], (G, _) => G.input(_));
  main.variable(observer("viewof barUnderMap")).define("viewof barUnderMap", ["vega_embed","r","UHF42_topojson","dataSelection","mapWidthRatio","width","mapHeightRatio","measure","chartHeightRatio"], function(vega_embed,r,UHF42_topojson,dataSelection,mapWidthRatio,width,mapHeightRatio,measure,chartHeightRatio){return(
vega_embed({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "title":r,
    "data": { values: UHF42_topojson,  //topojson object 
        format: {
          "type": "topojson",
          "feature": "collection"
        }
      },
    "transform": [{
      "lookup": "properties.GEOCODE",
      "from": {
        "data": {values: dataSelection},
        "key": "geo_entity_id",
        "fields": ["name", "Measure", "year_description", "data_value"]
      }
    }],
      
  "vconcat": [
    
    {"layer": [
   
    {
      "width":mapWidthRatio*(width),
      "height":mapHeightRatio*(width),
      "mark": {
        "type": "geoshape"
      },
    "encoding": {
    "stroke": {"opacity": 0.25,"value":"white"},
    "fill": {
      "field": "data_value",
      "type": "quantitative",
      "legend": null
    }
  }
},
       { "width":mapWidthRatio*(width),
      "height":mapHeightRatio*(width),
      "mark": {
        "type": "geoshape"
      },
    "encoding": {
    "stroke": {"condition": {
              "selection": "pts"
              ,"value":"red"
            }},
      "tooltip": [
      {"field": "properties.GEONAME", "type": "nominal", "title": "Neighborhood"},
      {"field": "data_value", "type": "quantitative", "title": measure[0]}
    ]
    }}
    ]},{
    
      "selection": {"pts":{"type":"multi","fields":["properties.GEONAME"],"empty":"none"}},
      "width":mapWidthRatio*(width),
      "height":chartHeightRatio*(width),
      "mark": "bar",
      "encoding": {
          "stroke": {"condition": {
              "selection": "pts","value":"red"
            },"value":"white"},
          
          "fill": {
            "field": "data_value",
            "type": "quantitative",
            "legend": null
                  },
          "x": {"field": "properties.GEONAME", 
                "type": "nominal", //"scale": {"rangeStep": 10},
                "sort":{"op":"sum","order":"ascending","field":"data_value"},
                "axis": null
               },
          "y": {"field": "data_value", "type": "quantitative",
                "axis": {"title": measure[0]}
               },
          "tooltip": [
          {"field": "properties.GEONAME", "type": "nominal", "title": "Neighborhood"},
          {"field": "data_value", "type": "quantitative", "title": measure[0]}
                      ]
    }
    }
  ]
}
                   )
)});
  main.variable(observer("barUnderMap")).define("barUnderMap", ["Generators", "viewof barUnderMap"], (G, _) => G.input(_));
  main.variable(observer("dataSelection")).define("dataSelection", ["AsthmaData","r"], function(AsthmaData,r){return(
AsthmaData.filter(function(d){return d.name == r;})
)});
  main.variable(observer("measure")).define("measure", ["dataSelection"], function(dataSelection){return(
[...new Set(dataSelection.map(dataSelection => dataSelection.Measure))]
)});
  main.variable(observer("choices")).define("choices", ["AsthmaData"], function(AsthmaData){return(
[...new Set(AsthmaData.map(AsthmaData => AsthmaData.name))]
)});
  main.variable(observer("AsthmaData")).define("AsthmaData", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/grantpezeshki/Asthma_Infographic/master/Data.csv")
)});
  main.variable(observer("mapHeightRatio")).define("mapHeightRatio", function(){return(
.8
)});
  main.variable(observer("mapWidthRatio")).define("mapWidthRatio", function(){return(
.8
)});
  main.variable(observer("chartHeightRatio")).define("chartHeightRatio", function(){return(
.1
)});
  main.variable(observer("UHF42_topojson")).define("UHF42_topojson", ["d3"], function(d3){return(
d3.json("https://raw.githubusercontent.com/grantpezeshki/Asthma_Infographic/master/UHF42.topojson")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-fetch@1")
)});
  main.variable(observer("vega_embed")).define("vega_embed", ["require"], function(require){return(
require("vega-embed@3")
)});
  const child1 = runtime.module(define1);
  main.import("radio", child1);
  return main;
}
