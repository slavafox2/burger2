import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };
    sideDrawerClosedHander = () => {
        this.setState({ showSideDrawer: false });
    };
    sideDrawerToggleHandler = () => {
        //this.setState({showSideDrawer: !this.state.showSideDrawer});  // you shouldn't do like this because async nature of State can use unexpected token!!!
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };
    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.sideDrawerClosedHander} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);