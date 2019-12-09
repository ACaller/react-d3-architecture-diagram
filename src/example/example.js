import React from 'react';
import exampleData from './example-data.json';
import App from '../App';

const Example = () => <App serviceData={exampleData} theme={'dark'} startingService={'Service-A'}/>;

export default Example;
