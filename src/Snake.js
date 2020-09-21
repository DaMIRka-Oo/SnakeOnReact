import React from 'react';
import head from './Pictures/snake-head.png'

export default (props) =>{
    return(
        <div>
            {props.snakeDots.map((dot, i) =>{
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`
                }
                return (
                    <div className='snake-dot' key={i} style={style}>
                        {i == props.snakeDots.length-1? <img src={head}/>: false}

                    </div>
                )
            })}
        </div>
    )
}