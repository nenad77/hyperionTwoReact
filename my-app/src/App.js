import React, {Component, Fragment} from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';
import {Header} from "./components/Header/Header";

import {CardsPage} from './pages/CardsPage/CardsPage';
import {FormPage} from './pages/FormPage/FormPage';
import CardDetailsPage from './pages/CardDetailsPage/CardDetailsPage';
import * as actionTypes from './store/actionTypes';
import {updateAge, updateName} from './store/actionCreators';

import {connect} from 'react-redux';

class App extends Component {

  state = {
    links: {
      form: '/form-page',
      cards: '/cards-page'
    }
  }

  onAgeUpdate = () => {
    this.props.updateAge(43);
  }

  render() {
      return (
        <Fragment> 
          <BrowserRouter>

            <button onClick={() => this.props.updateName("Peter")}>Change name</button>
            <button onClick={this.onAgeUpdate}>Change age</button>
            <div className="main-content">
              {this.props.age}
              {this.props.name}
              <Route path={this.state.links.cards} exact component={CardsPage} />
              <Route path={this.state.links.form}  exact component={FormPage} />
              <Route path='/cards/:id' exact component={CardDetailsPage} />

            </div>
          </BrowserRouter>
        </Fragment>
      );
    }
}

const mapStateToProps = state => {
   return {
    age: state.age,
    name: state.name
   }

}

const mapDispatchToProps = dispatch => {
  return {
    updateAge: (age) => dispatch(updateAge(age)),
    updateName: (name, lastName) => dispatch(updateName(name, lastName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
