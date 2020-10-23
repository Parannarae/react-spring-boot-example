import React, { Component } from 'react';
import './css/App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import GroupEdit from './pages/GroupEdit'
import GroupList from './pages/GroupList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContext } from "./context/auth";

class App extends Component {

  constructor(props) {
    super(props);
    const existingTokens = JSON.parse(localStorage.getItem("tokens"))
    this.state = {
      authTokens: existingTokens
    };
    this.setAuthTokens = this.setAuthTokens.bind(this);
    this.unSetAuthTokens = this.unSetAuthTokens.bind(this);
  }
  
  setAuthTokens(data) {
    console.log("Storing tokens: " + data);
    localStorage.setItem("tokens", JSON.stringify(data));
    this.setState({ authTokens: data });
  }
  
  unSetAuthTokens() {
    localStorage.removeItem("tokens");
    this.setState({ authTokens: null });
  }

  render() {
    // destructuring should provide same key name as the original one
    //  (variable name can be renamed by `{authTokens: new_name} = this.state`)
    const { authTokens } = this.state
    console.log("App: authTokens: " + authTokens);
    // by passing a variable which is the result of the destructuring, it passes both key and value to new object
    // (`value` in below case)
    return (
      <AuthContext.Provider value={{ authTokens, setAuthTokens: this.setAuthTokens, unSetAuthTokens: this.unSetAuthTokens }}>
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/' exact={true} component={Home} />
            <Route path='/groups' exact={true} component={GroupList} />
            <PrivateRoute path='/groups/:id' component={GroupEdit} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App;
