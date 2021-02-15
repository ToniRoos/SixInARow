import * as React from 'react';
import Board from './Board';
import * as ReactDom from 'react-dom';
import Main from './Main';
import { ws } from './logic/ws';

ws.init();
ReactDom.render(<Main />, document.getElementById('root'));

