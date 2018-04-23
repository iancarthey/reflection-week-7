import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReflectionForm from '../ReflectionForm/ReflectionForm';
import { connect } from 'react-redux';
import ReflectionList from '../ReflectionList/ReflectionList'

const mapStateToProps = reduxState => ({
  reduxState,
});


class App extends Component {
  componentDidMount() {
    this.props.dispatch({
        type: 'FETCH_REFLECTION'
    })
}
  
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Reflection Board</h1>
          </header>
          <ul>
            <li>
              <Link to='/'>Add New Reflection</Link>
            </li>
            <li>
              <Link to='/reflection'>View Reflections</Link>
            </li> 
           </ul>
          <br/>
          <Route exact path="/" component={ReflectionForm} />
          <Route path="/reflection" component={ReflectionList} />
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
