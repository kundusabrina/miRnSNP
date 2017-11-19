function createGraph(jsonData,tabDiv,counterID)
{
  
 // Checking the parameters
 // console.log(jsonData);
 // console.log(tabDiv);

  jsonData.sort(function(a,b){
    if(a.source>b.source){
      return 1;
    }
  else if(a.source<b.source){
    return-1;
  }
  else{
    if(a.target>b.target){
      return 1;
    }

    if(a.target<b.target) {
      return-1;
    }

    else{
      return 0;
    }
  }
});

for(var i=0;i<jsonData.length;i++) {
  if(i!=0&&jsonData[i].source==jsonData[i-1].source&&jsonData[i].target==jsonData[i-1].target) {
    jsonData[i].linknum=jsonData[i-1].linknum+1;
  }
  else
  {
    jsonData[i].linknum=1;
  }
}
    var nodes={};
    jsonData.forEach(function(link){
      link.source = nodes[link.source] || (nodes[link.source]={name:link.source});
      link.target = nodes[link.target] || (nodes[link.target]={name:link.target});
      //console.log(nodes[link.source], typeof nodes[link.target]);
      //console.log(nodes);
    });

    //console.log(Object.keys(nodes));
    for(var k in nodes) {
      if(nodes[k].name.indexOf("hsa") > -1) {
        nodes[k]["group"] = 0;
      }
      else if (nodes[k].name.indexOf("d") > -1) {
        nodes[k]["group"] = 1;
      } else {
        nodes[k]["group"] = 2;
      }
    }
    var arrows=[];

    for(var i=0;i<jsonData.length;i++){
      arrows[i]=jsonData[i].type;
    };

    var w= 900, h=800;

   // var w = document.getElementById("graph").offsetWidth;
   
    // Switch case to associate variable 'w' with the correct calling object.
    // If the function drawGraph is called from tab 'Individual Disease', v = #graph object
    // If the funtion drawGraph is called from tab 'Disease Category', v = #disease_category_graph object 
    switch(tabDiv)
    {
      case "#graph": var w = document.getElementById("graph").offsetWidth; break;
      case "#disease_category_graph": var w = document.getElementById("disease_category_graph").offsetWidth; break;
      case "#single_dis_graph": var w = document.getElementById("single_dis_graph").offsetWidth; break;
    }
    
    var force=d3.layout.force()
    .nodes(d3.values(nodes))
    .links(jsonData)
    .size([w,h])
    .linkDistance(300)
    .charge(-300)
    .on("tick",tick)
    .start();

    var color = d3.scale.category10();

    var red_nodes = [
      "hsa-mir-26b",
      "hsa-mir-100",
      "hsa-mir-488"
    ];
    var blue_nodes = [
      "hsa-mir-497",
      "hsa-mir-18a",
      "hsa-mir-99a",
      "hsa-mir-199a-2",
      "hsa-mir-7-3",
      "hsa-mir-409",
      "hsa-mir-194-1",
      "hsa-mir-339",
      "hsa-mir-125b-2",
      "hsa-mir-483",
      "hsa-mir-383",
      "hsa-mir-494",
      "hsa-mir-125b-1",
      "hsa-mir-197",
      "hsa-mir-198",
      "hsa-mir-128-2",
      "hsa-mir-126",
      "hsa-mir-375",
      "hsa-mir-130b",
      "hsa-mir-199a-1",
      "hsa-mir-10b",
      "hsa-mir-195",
      "hsa-mir-148a",
      "hsa-mir-217",
      "hsa-mir-125a",
      "hsa-mir-202",
      "hsa-mir-203",
      "hsa-mir-106b",
      "hsa-mir-106a",
      "hsa-mir-206",
      "hsa-mir-153-1",
      "hsa-mir-93",
      "hsa-mir-151",
      "hsa-mir-26a-1",
      "hsa-mir-149",
      "hsa-mir-146a",
      "hsa-mir-101-1",
      "hsa-mir-190",
      "hsa-let-7a-1",
      "hsa-mir-134",
      "hsa-mir-150",
      "hsa-mir-200a",
      "hsa-mir-199b",
      "hsa-mir-140",
      "hsa-mir-136",
      "hsa-mir-19b-1" 
  ];
  var orange_nodes = [
    "hsa-mir-222",
    "hsa-mir-17",
    "hsa-mir-29a",
    "hsa-mir-218-1",
    "hsa-mir-132",
    "hsa-mir-9-1",
    "hsa-mir-137",
    "hsa-mir-27b",
    "hsa-mir-15b",
    "hsa-mir-16-1",
    "hsa-mir-373",
    "hsa-mir-181c",
    "hsa-mir-103-1",
    "hsa-mir-221",
    "hsa-mir-142",
    "hsa-mir-29b-1",
    "hsa-mir-107",
    "hsa-mir-181a-1",
    "hsa-mir-15a",
    "hsa-mir-200b",
    "hsa-mir-21",
    "hsa-mir-224",
    "hsa-mir-154",
    "hsa-mir-19a",
    "hsa-mir-133a-1",
    "hsa-mir-181d",
    "hsa-mir-188",
    "hsa-mir-372",
    "hsa-mir-204",
    "hsa-mir-192",
    "hsa-mir-135b",
    "hsa-mir-183",
    "hsa-mir-7-1",
    "hsa-mir-24-1",
    "hsa-mir-29c",
    "hsa-mir-30a",
    "hsa-mir-27a",
    "hsa-mir-30c-1",
    "hsa-mir-92a-1",
    "hsa-mir-181b-1",
    "hsa-mir-196a-1",
    "hsa-mir-143",
    "hsa-mir-95",
    "hsa-mir-191",
    "hsa-mir-141",
    "hsa-mir-214",
    "hsa-mir-215",
    "hsa-mir-23a",
    "hsa-mir-30b",
    "hsa-mir-25"
  ];
    var svg=d3.select(tabDiv)
    .append("svg:svg")
    .attr("width",w)
    .attr("height",h);

    svg.append("svg:defs").selectAll("marker")
    .data(arrows)
    .enter().append("svg:marker")
    .attr("id",String).attr("viewBox","0 -5 10 10")
    .attr("refX",15)
    .attr("refY",-1.5)
    .attr("markerWidth",16)
    .attr("markerHeight",16)
    .attr("orient","auto")
    .append("svg:path")
    .attr("d","M0,-5L10,0L0,5");

    var path=svg.append("svg:g").selectAll("path")
    .data(force.links())
    .enter().append("svg:path")
    .attr("class",function(d){return"link "+d.type;})
    .attr("marker-end",function(d){return"url(#"+d.type+")";});

    var circle=svg.append("svg:g").selectAll("circle")
    .data(force.nodes())
    .enter().append("svg:circle")
    .attr("r",8)
    // .style("fill", function(d) {
    //     return d.group;
    // })
    .style("fill", function circleColor(d) {
      if (red_nodes.indexOf(d.name) !== -1) {
        return "red";
      } else if (blue_nodes.indexOf(d.name) !== -1){
        return "blue";
      } else if (orange_nodes.indexOf(d.name) !== -1) {
        return "orange";
      } else {
        return "green";
      }
    })
    .call(force.drag);

    var text=svg.append("svg:g").selectAll("g")
    .data(force.nodes())
    .enter().append("svg:g");
    text.append("svg:text")
    .attr("x",8)
    .attr("y",".31em")
    .attr("class","shadow")
    .text(function(d){return d.name;});

    text.append("svg:text")
    .attr("x",8).attr("y",".31em")
    .text(function(d){return d.name;});

    function tick() {
        path.attr("d",function(d)
        {
          var dx=d.target.x-d.source.x,dy=d.target.y-d.source.y,
          dr=1000/d.linknum;
          return"M"+d.source.x+","+d.source.y+"A"+dr+","+dr+" 0 0,1 "+d.target.x+","+d.target.y;
        });

      circle.attr("transform",function(d){return"translate("+d.x+","+d.y+")";});

      text.attr("transform",function(d){return"translate("+d.x+","+d.y+")";});
    }
  }
