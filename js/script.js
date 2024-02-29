window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const game = new Game();
  startButton.addEventListener("click", function () {
    startGame();
  });
  restartButton.addEventListener("click", () => {
    game.restart();
  });
  //event listener for the keyboard
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      game.player.directionX = 3;
    } else if (event.code === "ArrowLeft") {
      game.player.directionX = -3;
    }
  });
  //event listener for the keyboard when you let go the key
  document.addEventListener("keyup", () => {
    game.player.directionX = 0;
  });

  function startGame() {
    console.log("start game");
    game.start();
  }
};
