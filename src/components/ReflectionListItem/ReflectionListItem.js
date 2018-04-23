import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReflectionListItem.css';

//connect redux
const mapStateToProps = reduxState => ({
    reduxState,
});

class ReflectionListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            bookmarked: false,
            id: 0
        }
    }

    //DELETE REFLECTION FUNCTION
    deleteReflection = (reflection) => {
        this.props.dispatch({
            type: 'DELETE_REFLECTION',
            payload: reflection
        })
    }

    //BOOKMARK FUNCTION
    bookmarkReflection = (reflection) => {
        this.setState({
            bookmarked: !this.state.bookmarked,
            id: reflection.id
        })
        console.log(this.state);
        this.props.dispatch({
            type: 'BOOKMARK_REFLECTION',
            payload: this.state
        })
    }

    render(){
        return(
            <div className="reflectionDiv">
                <h3>{this.props.reflection.topic}</h3>
                <p>{this.props.reflection.description}</p>
                <button onClick={() => this.deleteReflection(this.props.reflection)}>Delete</button>
                <button onClick={() => this.bookmarkReflection(this.props.reflection)}>Bookmark</button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ReflectionListItem);