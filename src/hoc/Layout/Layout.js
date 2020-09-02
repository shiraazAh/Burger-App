import React, { Component } from 'react';
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerHandler = () => {
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
    return (
        <Aux>
            <SideDrawer open={this.state.showSideDrawer} click={this.closeSideDrawer}></SideDrawer>
            <Toolbar toggleSideDrawer={this.sideDrawerHandler}></Toolbar>
            <main className={classes.Content}>{this.props.children}</main>
        </Aux>)
    }
}

export default Layout;