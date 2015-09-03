//Script utilizando um arquivo de json em formato de árvore
function init() {
    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#3376C5", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 80);//deixar innerRadius igual a 0 pra que o gráfico vire um Gráfico de Pizza

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.size;
            });


        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        
    d3.json("areas.json", function(error, root) {
        if (error) return console.warn(error);
        var g = svg.selectAll(".arc")
            .data(pie(root.children[1].children))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                
                return color(d.data.name);
            });

        g.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.name;
            });
    });
    
};

