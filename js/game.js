class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.player = new Player(
      this.gameScreen,
      200,
      400,
      100,
      200,
      "../images/car.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 1;
    this.gameIsOver = false;
    this.gameIntervalId = 0;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.counter = 0;
    this.song = new Audio("../song.mp3");
    this.song.volume = 0.1;
    this.crash = new Audio("../crash.wav");
  }
  start() {
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.height}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    //adding a theme song
    // this.song.play();

    //This will be our loop, with the setInterval
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      this.counter++;
    }, this.gameLoopFrequency);
  }
  restart() {
    //the lazy way would be to refresh the page
    location.reload();
    console.log("restart clicked");
    //reset the game is over property back to false
    // this.gameIsOver = false;
    // //reset all variables to starting positions
    // this.score = 0;
    // this.lives = 1;
    // //hide the game over screen and show the game screen
    // this.gameEndScreen.style.display = "none";
    // this.gameScreen.style.display = "block";
    // //add a new obstacle to the array
    // this.obstacles.push(new Obstacle(this.gameScreen));
    // //call the game start method
    // this.start();
  }
  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }
  update() {
    this.player.move();

    //add a red car every so many frames
    console.log(this.counter);
    if (this.counter % 300 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
    //this handles everything with the obstacles
    this.obstacles.forEach((oneObstacle, index) => {
      oneObstacle.move();
      //if you score a point and the red passes
      if (oneObstacle.top > 700) {
        console.log("You scored a point");
        this.obstacles.splice(index, 1);
        oneObstacle.element.remove();
        this.obstacles.push(new Obstacle(this.gameScreen));
        //updating the score when a red car passes
        this.score++;
        this.scoreElement.innerText = this.score;
      }

      //collision
      if (this.player.didCollide(oneObstacle)) {
        console.log("bang!!! there was a collision");
        //play the crash sound
        // this.crash.play();
        //add a class to make the car spin
        this.player.element.classList.add("rotating");
        setTimeout(() => {
          this.player.element.classList.remove("rotating");
        }, 500);

        this.obstacles.splice(index, 1);
        oneObstacle.element.remove();
        this.obstacles.push(new Obstacle(this.gameScreen));
        //updating the score when a red car passes
        this.lives--;
        this.livesElement.innerText = this.lives;
        //check the lives, and if 0 then gameIsOver equals true
        if (this.lives === 0) {
          this.gameIsOver = true;
        }
      }
    });
  }
  gameOver() {
    console.log("the game is over");
    this.song.pause();

    //***********setting the high scores in the local storage ******** */
    //check the local storage for a high score
    const scoresFromLocal = JSON.parse(localStorage.getItem("highScores"));
    //if there was nothing in the local storage
    if (!scoresFromLocal) {
      //create a high scores in my local storage
      localStorage.setItem("highScores", JSON.stringify([this.score]));
    } else {
      scoresFromLocal.push(this.score);
      //sort high scores from high to low
      scoresFromLocal.sort((a, b) => b - a);
      const topThree = scoresFromLocal.slice(0, 3);
      localStorage.setItem("highScores", JSON.stringify(topThree));
    }

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
    //displaying the scores on the game over page
    const realHighScores = JSON.parse(localStorage.getItem("highScores"));
    const orderedList = document.createElement("ol");
    realHighScores.forEach((oneScore) => {
      const liElement = document.createElement("li");
      liElement.innerText = "Ragnar - " + oneScore;
      orderedList.appendChild(liElement);
    });
    this.gameEndScreen.appendChild(orderedList);
  }
}
