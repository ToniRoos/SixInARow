import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from './app/App';
import { ws } from './logic/ws';

ws.init();
ReactDom.render(<App />, document.getElementById('root'));

