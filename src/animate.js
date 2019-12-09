import * as d3 from "d3";

const animate = (path, duration) => {
  let lineLength = path.node().getTotalLength();
  path
    .attr("stroke-dasharray", lineLength + " " + lineLength)
    .attr("stroke-dashoffset", lineLength)
    .transition()
    .duration(duration)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);
};

export default animate;
