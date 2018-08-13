import React, { Component } from 'react';
import Aux from '../a/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };
    sideDrawerClosedHander = () => {
        this.setState({showSideDrawer: false});
    };
    sideDrawerToggleHandler = () => {
        //this.setState({showSideDrawer: !this.state.showSideDrawer});  // you shouldn't do like this because async nature of State can use unexpected token!!!
        this.setState( (prevState)=> {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer  open={this.state.showSideDrawer}  closed={this.sideDrawerClosedHander} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

export default Layout;