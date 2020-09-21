import React, {Component} from 'react';
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () =>{
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max - min + 1)+min) / 10)*10
    let y = Math.floor((Math.random()*(max - min + 1)+min) / 10)*10
    return [x, y]
}

const getRandomImage = () => {
    let r = Math.floor(Math.random() * Math.floor(3));
    return r
}

const initialState = {
    food: getRandomCoordinates(),
    speed: 500,
    direction: 'RIGHT',
    snakeDots:[
        [0, 0],
        [10, 0]
    ],
    play: true,
    increase: false,
    again: false,
    pause: false,
    img: getRandomImage()
}

let interval;

class App extends Component {
  state = initialState;

  componentDidMount() {
      interval = setInterval(this.moveSnake, this.state.speed);

      document.onkeydown = this.onKeyDown;
  }



  componentDidUpdate() {
      if (this.state.play){
          this.checkIfOutOfBorders();
          this.checkIfCollapsed();
          this.checkIfEat();
      }
        if (this.state.again) {
            interval = setInterval(this.moveSnake, this.state.speed);
            this.setState({
                again: false
            })
            console.log(this.state.pause)
        }

  }

    onKeyDown = (e) =>{
      e = e || window.event;
      switch (e.keyCode){
          case 38:
              if (this.state.direction != 'DOWN' ) this.setState({direction: 'UP'});
              break;
          case 40:
              if (this.state.direction != 'UP' ) this.setState({direction: 'DOWN'});
              break;
          case 37:
              if (this.state.direction != 'RIGHT' ) this.setState({direction: 'LEFT'});
              break;
          case 39:
              if (this.state.direction != 'LEFT' ) this.setState({direction: 'RIGHT'});
              break;
      }
  }


  moveSnake = () =>{
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];

      switch (this.state.direction) {
          case 'RIGHT':
              head = [head[0] + 10, head[1]]
              break;
          case 'LEFT':
              head = [head[0] - 10, head[1]]
              break;
          case 'DOWN':
              head = [head[0], head[1] + 10]
              break;
          case 'UP':
              head = [head[0], head[1] - 10]
              break;
      }


      dots.shift();
      dots.push(head);
      this.setState({
          snakeDots: dots
      })
  }

  checkIfOutOfBorders(){
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
          this.onGameOver();
      }
  }

  checkIfEat(){
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      let food = this.state.food;
      if (head[0] == food[0] && head[1] == food[1]){
          let snake = [...this.state.snakeDots];
          let flag = false;

          while(!flag){
              let num = getRandomCoordinates();
              let flag2 = false;
              snake.forEach(dot => {
                  if (num[0] == dot[0] && num[1] == dot[1]){
                      flag2 = true;

                  }
              })
              if (!flag2){
                  flag = true;
              }
          }

          this.setState({
              food: getRandomCoordinates()
          })
          this.enlargeSnake();
          if (this.state.speed > 100){
              this.setState({
                  speed: this.state.speed - 10,
                  img: getRandomImage()
              })
          }
          this.state.increase = true;
      }
      if (this.state.increase) this.increaseSpeed();
  }


  onGameOver(){
     // alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
      clearInterval(interval);
      this.setState({play: false});

  }

    clickButton(){
      if (!this.state.play){
          this.setState(initialState);
          this.setState({
              again: true
          })

      }

        else if (!this.state.pause){
            clearInterval(interval)
            this.setState({
                pause: true
            })
        }

        if (this.state.pause){
            interval = setInterval(this.moveSnake, this.state.speed);
            this.setState({
                pause: false
            })
        }


    }




  enlargeSnake(){
      let newSnake = [...this.state.snakeDots];
      newSnake.unshift([]);

      this.setState({
          snakeDots: newSnake
      })
  }

  increaseSpeed(){

      clearInterval(interval);
      interval = setInterval(this.moveSnake, this.state.speed);
      this.setState({
          increase: false
      })
  }

  checkIfCollapsed(){
      let snake = [...this.state.snakeDots];
      let head = snake[snake.length - 1];
      snake.pop();
      snake.forEach(dot => {
          if (head[0] == dot[0] && head[1] == dot[1]){
              this.onGameOver();
          }
      })
  }

    onclick(){
        window.location.assign('http://localhost:3000/home/');
    }

    render(){
    return (
        <div>
            <div className="game-area">
                <Snake snakeDots={this.state.snakeDots}/>
                <Food dot={this.state.food} img={this.state.img}/>
            </div>
            <h1 className="score">Ваш счёт {this.state.snakeDots.length - 2}</h1>
            <button onClick={this.clickButton.bind(this) } className="button-1" >
                {this.state.play ? (this.state.pause ? "Продолжить" : "Пауза") : "Начать заново"}</button>
            <button onClick={(e) => this.onclick(e)} className="button-3">В главное меню</button>
        </div>

    );
  }

}

export default App;
