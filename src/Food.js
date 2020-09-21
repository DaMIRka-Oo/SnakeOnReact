import React from 'react';
import human1 from './Pictures/human.jpg'
import human2 from './Pictures/human2.png'
import human3 from './Pictures/human3.jpg'

export default (props) =>{
    const style ={
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }


    let img = props.img == 0 ? human1 : (props.img == 1 ? human2 : human3);

    return(
        <div className="snake-food" style={style}>
            <img src={img}/>
        </div>
    )
}