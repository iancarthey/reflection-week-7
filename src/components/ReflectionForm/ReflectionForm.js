import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReflectionForm.css';

const mapStateToProps = reduxState => ({
    reduxState,
});

class ReflectionForm extends Component{

    constructor(props) {
        super(props);
        
        this.state={
            newReflection: {
                topic: '',
                reflectionBody: ''
            }
        }
    }
//FUNCTION FOR UPDATING STATE WITH INPUT FIELDS
    handleChangeFor = (propertyName) => {
        return (event) => {
          this.setState({
            newReflection: {
            ...this.state.newReflection,
            [propertyName]: event.target.value
            }
          })
        }
      }
//FUNCTION FOR SENDING DISPATCH TO ADD REFLECTION
      addNewReflection = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_REFLECTION', payload: this.state.newReflection })
    }

    render(){
        return(
            <form onSubmit={this.addNewReflection} className="formDiv">
                <p>Topic</p>
                <input onChange={this.handleChangeFor("topic")} />
                <p>Reflection</p>
                <input onChange={this.handleChangeFor("reflectionBody")} id="reflectionInputBox"/>
                <br />
                <input type="submit" value="Add new reflection" />
            </form>
        )
    }
}


export default connect(mapStateToProps)(ReflectionForm);