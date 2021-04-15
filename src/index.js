import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import HeaderApp from './components/HeaderApp';

ReactDOM.render(<HeaderApp />, document.getElementById('header'));
ReactDOM.render(<HashRouter>
      <div>
        <Route exact path="/" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
      </div>
   </HashRouter >, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
