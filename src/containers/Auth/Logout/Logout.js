import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount() {
        console.log("[Logout] - this.props.onLogout;");
        
        this.props.onLogout();  // need to do REDIRECT two ways: 1. this.props.onLogout(this.props.history); and use 'push' method
    }


    render() {
        return (
            <Redirect to="/" />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);