import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from 'firebase'
import home from './components/home';
import Header from './components/header';
import analista from './components/analista';
import gestor from './components/gestor';
import { Spinner } from 'reactstrap'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path='/analista' component={analista} />
          <Route exact path="/gestor" component={gestor} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
