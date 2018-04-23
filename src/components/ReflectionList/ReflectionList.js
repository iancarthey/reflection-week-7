import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReflectionListItem from '../ReflectionListItem/ReflectionListItem'

const mapStateToProps = reduxState => ({
    reduxState,
});

class ReflectionList extends Component{
    render(){
        let allReflections = this.props.reduxState.reflectionList.map((reflection) =>{
            return <ReflectionListItem key={reflection.id} reflection={reflection} />
        })
        return(
            <div>
                {allReflections}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ReflectionList);