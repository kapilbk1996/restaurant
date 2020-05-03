import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
         
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path="/:restaurant" component={Restaurants} /> */}
          </Switch>
      </div>
      </BrowserRouter>
        );
      }
    }
    
    export default App;
