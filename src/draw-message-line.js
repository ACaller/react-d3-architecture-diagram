import * as d3 from "d3";
import { pathEq, hasPath, forEachObjIndexed } from "ramda";
import animate from "./animate";
import Tooltip from "./tooltip";

const drawLine = d3
  .line()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  });
const midpoint = (a, b) => (b - a) / 2 + a;
const lineAngle = (p1, p2) =>
  (Math.atan((p2.y - p1.y) / (p2.x - p1.x)) * 180) / Math.PI;

const getTextData = (start, end) => ({
  x: midpoint(start.x, end.x),
  y: midpoint(start.y, end.y),
  angle: lineAngle(start, end)
});

const checkMessageVersions = (messageName, version, availableVersions) => {

  if (availableVersions && hasPath([messageName])(availableVersions)) {
    return {
      latest: pathEq([messageName, "latest"], version)(availableVersions),
      exists: hasPath([messageName, version])(availableVersions)
    };
  } else {
    return {
      exists: false,
      latest: false,
    };
  }
};

const selectColour = theme => ({ exists, latest }) => {
  return latest ? theme.positive : exists ? theme.warn : theme.negative;
};

const drawMessageLine = (
  svgContainer,
  start,
  end,
  messageName,
  version,
  availableVersions,
  tooltip, theme
) => {
  const checkedVersioning = checkMessageVersions(
    messageName,
    version,
    availableVersions
  );

  const lineData = [start, end];
  const textData = getTextData(start, end);
  
  const tooltipTable = Tooltip({messageName, version, availableVersions, colour: selectColour(theme)(checkedVersioning)});

  const group = svgContainer.append("g").on("mouseover", function(d) {
    tooltip
      .html(
        `
        <div style="color: ${theme.textPrimary}"> 
          ${messageName}:${version}
          ${tooltipTable}
        </div>
        `
      )
      .style("left", `${d3.event.x}px`)
      .style("top", `${d3.event.y}px`)
      .style("opacity", 0.9);
  });

  let path = group
    .append("path")
    .attr("d", drawLine(lineData))
    .attr("stroke", selectColour(theme)(checkedVersioning))
    .attr("stroke-width", 2)
    .attr("opacity", 1);

  animate(path, 1000);

  group
    .append("text")
    .style("fill", theme.text)
    .style("font-size", "10px")
    .style("font-family", "verdana")
    .attr("dy", "-.40em")
    .attr("text-anchor", "middle")
    .attr(
      "transform",
      `translate(${textData.x},${textData.y}) rotate(${textData.angle})`
    )
    .text(messageName);

  group
    .append("text")
    .style("fill", theme.text)
    .style("font-size", "10px")
    .style("font-family", "verdana")
    .attr("dy", ".90em")
    .attr("text-anchor", "middle")
    .attr(
      "transform",
      `translate(${textData.x},${textData.y}) rotate(${textData.angle})`
    )
    .text(version);
};

export default drawMessageLine;
