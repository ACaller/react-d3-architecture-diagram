import * as d3 from 'd3';

const zoomed = () => {
      d3.select("#diagram svg g").attr(
        "transform",
        `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`
      );
    }

const zoom = d3
      .zoom()
      .scaleExtent([1 / 2, 4])
      .on("zoom", zoomed);

const transition = zoomLevel => {
      d3.select("#diagram svg g")
        .transition()
        .delay(100)
        .duration(700)
        .call(zoom.scaleBy, zoomLevel);
    };


const zoomer = ({x=0, width}) => {
    
    const button = d3.select("#diagram svg").append("g");

    button
      .append("rect")
      .attr("x", width - x)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "lightgrey");
    button
      .append("text")
      .attr("id", "out")
      .attr("x", width - x + 10)
      .attr("dy", 15)
      .style("fill", "black")
      .style("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("-")
      .on("click", x => {
        transition(0.8);
      });

    button
      .append("rect")
      .attr("x", width - x + 25)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", "lightgrey");
    button
      .append("text")
      .attr("id", "in")
      .attr("x", width - x + 35)
      .attr("dy", 15)
      .style("fill", "black")
      .style("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("+")
      .on("click", x => {
        transition(1.2);
      });
  
}

export default zoomer;