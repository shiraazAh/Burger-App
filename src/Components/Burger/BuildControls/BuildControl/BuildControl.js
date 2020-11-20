import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.all}>
   
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>-</button>
            {/* <div className={classes.numberBox}>1</div> */}
            <button className={classes.More} onClick={props.added}>+</button>
            </div>
        </div>
    )
}

export default buildControl;