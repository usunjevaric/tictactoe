import React from 'react';
// import ('../styles/_square.scss');
function Square(props){
    return (
        <button
            className={"square " + (props.isWinning ?`wining-square wining-square-${props.direction}`: null)}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}


export default Square;
