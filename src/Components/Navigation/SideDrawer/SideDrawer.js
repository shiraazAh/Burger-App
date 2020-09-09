import React from 'react';
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux'

const sideDrawer = (props) => {

    let assignedClasses = [classes.SideDrawer, classes.Close];

    if(props.open) {
        assignedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.click}></BackDrop>
            <div className={assignedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuth={props.isAuth}/>
            </div>
        </Aux>
    )
};

export default sideDrawer;