import * as d3 from "d3";

const h = Math.sqrt(3) / 2; //constant for hexagons

export const buildHexagonData = (
  xDisplacement = 0,
  yDisplacement = 0,
  radius = 40
) => [
  { x: radius + xDisplacement, y: yDisplacement },
  {
    x: radius / 2 + xDisplacement,
    y: radius * h + yDisplacement
  },
  {
    x: -radius / 2 + xDisplacement,
    y: radius * h + yDisplacement
  },
  { x: -radius + xDisplacement, y: yDisplacement },
  {
    x: -radius / 2 + xDisplacement,
    y: -radius * h + yDisplacement
  },
  {
    x: radius / 2 + xDisplacement,
    y: -radius * h + yDisplacement
  }
];

export const getHexagonExitPoint = (x = 0, y = 0, radius = 40) => ({
  x: radius + x,
  y
});
export const getHexagonEntryPoint = (x = 0, y = 0, radius = 40) => ({
  x: -radius + x,
  y: y
});

export const drawHexagonLines =  d3
  .area()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
  .curve(d3.curveCardinalClosed.tension(0.75));

export const drawHexagon = (
  svgContainer,
  { x, y, radius, name, version, buffer }
) => {
  svgContainer
    .append("path")
    .attr("d", drawHexagonLines(buildHexagonData(x, y, radius)))
    .attr("stroke", "black")
    .attr("fill", "#69b3a2");

  svgContainer
    .append("text")
    .attr("x", x - radius)
    .attr("y", y)
    .text(name)
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .attr("fill", "black");

  svgContainer
    .append("text")
    .attr("x", x - 20)
    .attr("y", y + 16)
    .text(version)
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .attr("fill", "black");
};
