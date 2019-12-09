import React, { Component } from "react";
import { forEachObjIndexed } from "ramda";
import * as d3 from "d3";
import { calculateData2 } from "./calculate-data-points";
import drawService from "./draw-service";
import drawMessageLine from "./draw-message-line";
import { onDragEnd, onDragStart, onDragging } from "./dragger";
import calculateDepthAndSiblings from "./calculate-depth-and-siblings";
import { dark, light} from './theme';
import zoomer from './zoomer';

const diagramConstants = {
  radius: 70,
  x: 100,
  buffer: {
    x: 350,
    y: 10
  }
};

class Diagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.style.maxWidth,
      height: props.style.maxHeight,
      y: props.style.maxHeight / 2,
      theme: props.light? light:dark
    };
  }

  componentDidMount() {
    this.drawChart(this.props.serviceData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataOptions !== this.props.dataOptions) {
      d3.select("#diagram svg").remove();
      d3.select("body g.tooltip").remove();
      this.drawChart(this.props.serviceData);
    }
  }

  componentWillUnmount(){
    d3.select("#diagram svg").remove();
    d3.select("body g.tooltip").remove();
  }

  drawChart(params = {}) {
    const preparedData = calculateDepthAndSiblings(
      params,
      this.props.dataOptions.startingService
    );

    const { y, width, height, theme } = this.state;
    const { x, radius, buffer } = diagramConstants;
    const svgContainer = d3
      .select("#diagram").style('background-color', theme.background)
      .append("svg")
      .attr("width", width) //for static sized items
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]) //for resizing items inside
      .attr("cursor", "grab")
      .style("border", "1px solid black")
      .call(
        d3
          .drag()
          .on("start", onDragStart)
          .on("drag", onDragging)
          .on("end", onDragEnd)
      )
      .append("g")
      .attr("transform", "translate(0,0) scale(1)");

    var tooltip = d3
      .select("body")
      .append("g")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style('background-color', theme.secondary)
      .style("opacity", 0).style("position", "absolute");

    let services = {};
    preparedData.forEach(value => {
      services[value.name] = calculateData2(
        buffer,
        radius,
        x,
        y
      )({ ...value, parent: services[value.parent] });
    });

    forEachObjIndexed((value, key) => {
      drawService(svgContainer, value, theme);
      if (value.downstreams && value.downstreams.length > 0) {
        value.downstreams.forEach(downstream => {
          if (services[downstream.service]) {
            drawMessageLine(
              svgContainer,
              value.exitPoint,
              services[downstream.service].entryPoint,
              downstream.action,
              downstream.version,
              services[downstream.service].selfRouting,
              tooltip, theme
            );
          }
        });
      }
    }, services);

    zoomer({x, width});
  }

  render() {
    return <div id={"diagram"} style={this.props.style} />;
  }
}

export default Diagram;
