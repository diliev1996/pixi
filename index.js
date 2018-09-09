const app = new PIXI.Application();

const initBall = () => {
  let ball = PIXI.Sprite.fromImage('assets/ball.png');
  ball.interactive = true;
  ball.scale.set(0.5);
  ball.anchor.set(0.5);
  ball.x = app.view.width / 2;
  ball.y = app.view.height / 2;
  ball.yv = 1;
  ball.speed = 1;
  return ball;
};

const initText = () => {
  let text = new PIXI.Text('Speed : 1');
  text.style = new PIXI.TextStyle({
    fill: 0xFFFFFF
  });
  text.scale.set(1.5);
  text.x = app.screen.width - text.width;
  return text;
};

const initPlus = () => {
  const plus = PIXI.Sprite.fromImage('assets/plus.png');
  plus.scale.set(0.2);
  plus.interactive = true;
  plus.click = () => {
    if (ball.speed < 20) {
      ball.speed += 1;
      setSpeedText(ball.speed);
    }
  };
  return plus;
}

const initMinus = () =>{
  const minus = PIXI.Sprite.fromImage('assets/minus.png');
  minus.y = 44;
  minus.scale.set(0.2);
  minus.interactive = true;  
  minus.click = () => {
    if (ball.speed >= 1) {
      ball.speed -= 1;
      setSpeedText(ball.speed);
    }
  };
  return minus;
}


const ball = initBall();
const text = initText();
const plus = initPlus();
const minus = initMinus();

app.stage.addChild(ball,text,plus,minus);
app.stage.interactive = true;

/**
 * Moves the ball to a new place based on its direction and speed
 * If the ball is at any of the two boundaries the direction is changed
 */
const animateball = () => {
  let centerOfBall = ball.height / 2;
  app.ticker.add(() => {
    ball.rotation += 0.01;
    ball.y += ball.yv * ball.speed;
    if (ball.y + centerOfBall >= app.screen.height || ball.y - centerOfBall <= 0) {
      ball.yv *= -1;
    }
  });
};

ball.texture.baseTexture.on('loaded', () => {
  animateball();
})

const setSpeedText = value => {
  text.text = "Speed : " + value;
  text.x = app.screen.width - text.width;
};

document.getElementById('display').appendChild(app.view);