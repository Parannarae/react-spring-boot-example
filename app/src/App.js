import React, { Component } from 'react';
import './css/App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import GroupEdit from './pages/GroupEdit'
import GroupList from './pages/GroupList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import { AuthContext } from "./context/auth";

class App extends Component {
  render() {
    return (
      <AuthContext.Provider value={false}>
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <PrivateRoute path='/' exact={true} component={Home} />
            <PrivateRoute path='/admin' exact={true} component={Admin} />
            <PrivateRoute path='/groups' exact={true} component={GroupList} />
            <PrivateRoute path='/groups/:id' component={GroupEdit} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App;
