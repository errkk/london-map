var width = 960,
    height = 1160;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.mercator()
    .scale(500)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);


d3.json("londontopo.json", function(error, data) {
    if (error) return console.error(error);
    console.log(data);

    // Convert TopoJSON to GeoJSON for display
    var geoJSON = topojson.feature(data, data.objects.london);

    svg.append("path")
        .datum(geoJSON)
        .attr("d", path);
});
