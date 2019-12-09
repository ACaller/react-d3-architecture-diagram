const h = Math.sqrt(3) / 2; //constant for hexagons

const buildHexagonData = (
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

const step = (x, radius, buffer) => step => step * (2 * radius + buffer) + x;

const calcYPositions = (items, index, radius, buffer, y) => {
  if (items % 2 === 0) {
    const itemsFromCentre =
      index > items / 2 - 0.5 ? index - (items / 2 - 1) : index - items / 2;
    return (
      Math.sign(itemsFromCentre) *
        (Math.abs(itemsFromCentre) - 0.5) *
        (2 * radius + buffer) +
      y
    );
  } else {
    const itemsFromCentre = Math.ceil(items / 2) - (index + 1);
    return itemsFromCentre * (2 * radius + buffer) + y;
  }
};

const calculateDataPoints = (
  parent,
  generation,
  siblings,
  index,
  self,
  buffer,
  radius,
  xStart,
  yStart
) => {
  const x = step(xStart, radius, buffer.x)(generation);
  const y = calcYPositions(
    siblings,
    index,
    radius,
    buffer.y,
    parent && parent.exitPoint && parent.exitPoint.y
      ? parent.exitPoint.y
      : yStart
  );
  const hexagonPoints = buildHexagonData(x, y, radius);
  const entryPoint = getHexagonEntryPoint(x, y, radius);
  const exitPoint = getHexagonExitPoint(x, y, radius);

  return {
    x,
    y,
    hexagonPoints,
    entryPoint,
    exitPoint,
    radius,
    buffer,
    name: self.name,
    version: self.version,
    selfRouting: self.selfRouting
  };
};

const calculateData2 = (buffer, radius, xStart, yStart) => ({
  parent,
  depth,
  siblings,
  index,
  ...serviceData
}) => {
  const x = step(xStart, radius, buffer.x)(depth);
  const y = calcYPositions(
    siblings + 1,
    index,
    radius,
    buffer.y,
    parent && parent.exitPoint && parent.exitPoint.y
      ? parent.exitPoint.y
      : yStart
  );
  const hexagonPoints = buildHexagonData(x, y, radius);
  const entryPoint = getHexagonEntryPoint(x, y, radius);
  const exitPoint = getHexagonExitPoint(x, y, radius);

  return {
    x,
    y,
    hexagonPoints,
    entryPoint,
    exitPoint,
    radius,
    buffer,
    ...serviceData
  };
};
export { calculateDataPoints, calculateData2 };
