import React, {Component}  from 'react';

class Menu extends Component{

    onclick(){
        window.location.assign('http://localhost:3000/game/');
    }

    render(){
        return(
            <button type='submit' className="button-2" onClick={(e) => this.onclick(e)}>Начать игру</button>
        )
    }

}

export default Menu