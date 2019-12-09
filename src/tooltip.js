import{ forEachObjIndexed } from 'ramda';
import { dark } from './theme';

const drawRows = (messageVersions, version, colour) => {
  let rows = "";
  forEachObjIndexed((value, key) => {
    if (key === "latest") {
      rows += (`
        <tr style="color: ${messageVersions.latest===version? colour:dark.text}">
          <td>${messageVersions.latest}</td>
          <td>LATEST</td>
        </tr>
      `);
    } else if (key === "noVersionPath"){
      rows += (`
      <tr style="color: ${messageVersions.noVersionPath===version? colour:dark.text}">
        <td>${messageVersions.noVersionPath}</td>
        <td>NO VERSION PATH</td>
      </tr>
    `);
    }
      else if (
      messageVersions.latest !== key &&
      messageVersions.noVersionPath !== key
    ) {
      rows += `
        <tr style="color: ${key===version? colour:dark.text}">
          <td>${key}</td>
          ${value.deprecated ? `<td>DEPRECATED</td>` : `<td/>`}
        </tr>`;
    }
  })(messageVersions);
  return rows;
};

const Tooltip =  ({
  messageName,
  version,
  availableVersions = { [messageName]: {} },
  colour
}) => {
  return `
  <table style="text-align: center; margin: 0 auto;">
    <tr>
      <th>Version</th>
      <th>Usage</th>
    </tr>
    ${drawRows(availableVersions[messageName], version, colour)}
  </table>
  `;
}

export default Tooltip;