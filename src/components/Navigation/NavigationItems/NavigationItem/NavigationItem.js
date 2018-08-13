import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItems = (props) => (

    <li className={classes.NavigationItem}>
        {/* <a href={props.link} className={props.active ? classes.active : null} > */}
            <NavLink 
                to={props.link}
                activeClassName={classes.active} 
                exact={props.exact}>
             {props.children} </NavLink>
        {/* </a> */}
    </li>

)

export default navigationItems;