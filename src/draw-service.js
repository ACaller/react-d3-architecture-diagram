import { drawHexagonLines } from "./hexagon";
import animate from "./animate";

const tagIsUptoDate = (tag = "", version = "") =>
  tag.replace(/v/i, "") === version.replace(/-develop/, "");

const versionIsUptoDate = (version = "", branchVersion = "") =>
  version.replace(/-develop/, "") === branchVersion;

const drawService = (
  svgContainer,
  { hexagonPoints, x, y, radius, name, version, branchVersion, tag },
  theme
) => {
  let group = svgContainer.append("g");
  const versionIsOK = versionIsUptoDate(version, branchVersion);
  const tagIsOK = tagIsUptoDate(tag, version);

  let path = group
    .append("path")
    .attr("d", drawHexagonLines(hexagonPoints))
    .attr(
      "stroke",
      versionIsOK ? theme.text : theme.negative
    );

  animate(path, 4000);

  group
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", theme.textPrimary)
    .text(name);

  group
    .append("text")
    .attr("x", x)
    .attr("y", y + 16)
    .text("image: " + version)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", versionIsOK ? theme.text : theme.negative);

  if (!tagIsOK) {
    group
      .append("text")
      .attr("x", x)
      .attr("y", y - 16)
      .text("tag: " + tag)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", theme.warn);
  }

  if (!versionIsOK) {
    group
      .append("text")
      .attr("x", x)
      .attr("y", y + 32)
      .text("branch: " + branchVersion)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", theme.negative);
  }
};

export default drawService;
