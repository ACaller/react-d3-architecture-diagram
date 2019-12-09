import React from "react";
import Diagram from "./Diagram";
// import sampleData from './example/sample-data.json';

const styles = {
  divStyle: {
    display: "flex",
    flexDirection: "column",
    //height: "100vh",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  diagramStyle: {
    maxWidth: window.innerWidth,
    maxHeight: window.innerHeight-20
  }
};

const App = ({startingService, theme, serviceData}) => {
  return (
    <div style={styles.divStyle} id='diagram-container'>
      <Diagram style={styles.diagramStyle} dataOptions={{ startingService }} serviceData={serviceData} light={theme!=='dark'}/>
    </div>
  );
};

export default App;

App.defaultProps = {
  startingService: 'Service-A',
  theme: 'dark',
  serviceData: {}
}
