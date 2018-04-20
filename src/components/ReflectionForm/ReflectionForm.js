import React, { Component } from 'react';

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

    handleChangeFor = (propertyName) => {
        return (event) => {
          this.setState({
            newPlant: {
            ...this.state.newPlant,
            [propertyName]: event.target.value
            }
          })
        }
      }

      addNewReflection = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_REFLECTION', payload: this.state.newReflection })
    }

    render(){
        return(
            <form onSubmit={this.addNewReflection}>
                <p>Topic</p>
                <input onChange={this.handleChangeFor("topic")} />
                <p>Reflection</p>
                <input onChange={this.handleChangeFor("reflectionBody")} />
                <br />
                <input type="submit" value="Add new reflection" />
            </form>
        )
    }
}
