    var width = 1200,
    height = 1200;

    var projection = d3.geo.orthographic()
        .translate([width / 2, height / 2])
        .center([0.0, 0.0])
        .clipAngle(90)
        .scale(450);

    var path = d3.geo.path()
        .projection(projection);

    var λ = d3.scale.linear()
        .domain([0, 100])
        .range([-180, 180]);

    var φ = d3.scale.linear()
        .domain([0, 100])
        .range([90, -90]);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    function rotate(a, b) {
        projection.rotate([λ(a), φ(b)]);
        svg.selectAll("path").attr("d", path);
    };


    var buildings = svg.append("g");

    d3.json("londontopo.json", function(error, data) {
        if (error) throw error;

        data.transform = {
            scale: [0.00005736413748528683, 0.000017385988039137747],
            translate: [-0.190389659968519, 51.43136245091755]
        };

        scale = function(scalefactor) {
            return [scalefactor * 0.005736413748528683, scalefactor * 0.0028385988039137747];
        }
        data.transform = {
            scale: scale(4.6),
            translate: [20, -60]
        };

    // Convert to GeoJSON for rendering
    var buildingsGeoJSON = topojson.feature(data, data.objects.london);

    svg.insert("path")
        .datum(buildingsGeoJSON)
        .attr("class", "buildings")
        .attr("d", path);

    //svg.insert("path")
        //.datum(topojson.object(data, data.objects.water))
        //.attr("class", "landuse")
        //.attr("d", path);

    });

    svg.append("defs").append("path")
        .datum({type: "Sphere"})
        .attr("id", "sphere")
        .attr("d", path);

    svg.append("use")
        .attr("class", "fill")
        .attr("xlink:href", "#sphere");

    var rotation = 15;

    rotate(rotation, 50);

    document.addEventListener('DOMContentLoaded', function() {
        var rotateInput = document.createElement('input');

        rotateInput.type = 'range';
        rotateInput.min = 0;
        rotateInput.max = 100;
        rotateInput.step = 5;
        rotateInput.value = rotation;

        document.getElementsByTagName('body')[0].appendChild(rotateInput);

        rotateInput.addEventListener('change', function(evt) {
            rotation = rotateInput.value;
            console.log(rotateInput.value);
            rotate(rotateInput.value, 50);
        });
    });



