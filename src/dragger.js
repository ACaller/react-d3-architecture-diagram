import * as d3 from "d3";

let x1 = 0;
let y1 = 0;

export const onDragStart = () => {
  d3.select(this).raise();
  d3.select("#diagram svg").attr("cursor", "grabbing");
  x1 = null;
  y1 = null;
};

export const onDragging = d => {
  if (x1 !== null) {
    const { e: x, f: y } = d3
      .select("#diagram svg g")
      .node()
      .transform.baseVal.consolidate().matrix;

    let deltaX = d3.event.x - x1;
    let deltaY = d3.event.y - y1;

    const scale =
      d3
        .select("#diagram svg g")
        .attr("transform")
        .match(/(?<=scale\().*[^\)]/)
        .shift() || 1;

    d3.select("#diagram svg g").attr(
      "transform",
      `translate(${x + deltaX},${y + deltaY}) scale(${scale})`
    );
  }

  x1 = d3.event.x;
  y1 = d3.event.y;
};

export const onDragEnd = () => {
  d3.select("#diagram svg").attr("cursor", "grab");
};
