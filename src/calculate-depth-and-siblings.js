import { compose, groupBy, prop, mapObjIndexed, sort, forEachObjIndexed, mergeDeepRight, assocPath } from "ramda";

const addParentAndDepth = (parent = {}, serviceData, result) => {
  if (parent && parent.downstreams) {
    parent.downstreams.forEach((downstream, index) => {
      if (
        serviceData[downstream.service] &&
        !result[downstream.service]
      ) {
        result[downstream.service] = {
          ...serviceData[downstream.service],
          parent: parent.name,
          depth: parent.depth ? parent.depth + 1 : 1
        };
         addParentAndDepth(result[downstream.service], serviceData, result);
      }
    });
  }
   
};

const objToArray = (obj) => {
  let result = [];
  forEachObjIndexed(value => {
    result.push(value);
  }, obj);
  return result
}

const sortedObjectToArray = obj => {
  let result = [];
  forEachObjIndexed(value => {
    result.push(value);
  }, obj);
  return sort((a, b) => prop("depth", a) - prop("depth", b), result);
};

const calculateDepthAndSiblings = (serviceData, startingService) => {
 
let result = {} 
  result[startingService] = {
    ...serviceData[startingService],
    siblings: 0,
    index: 0,
    depth: 0
  };

  addParentAndDepth(result[startingService], serviceData, result);
  let depthGroups = groupBy(prop("depth"), objToArray(result));

  forEachObjIndexed((services, depth) => {
    const siblings = services.length-1;

    services.forEach((service, index) => {
      result[service.name] = mergeDeepRight(result[service.name],{siblings, index})
    })
  }, depthGroups);

  return sortedObjectToArray(result);
};

export default calculateDepthAndSiblings;