class Player {
  constructor(
    gameScreen,
    playerLeft,
    playerTop,
    playerWidth,
    playerHeight,
    imgSrc
  ) {
    this.gameScreen = gameScreen;
    this.left = playerLeft;
    this.top = playerTop;
    this.width = playerWidth; //100
    this.height = playerHeight; //200
    this.directionX = 0;
    this.directionY = 0;
    //creating the element, setting the src and everything else
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    // put the player on the screen after we set all the properties
    this.gameScreen.appendChild(this.element);
  }

  move() {
    if (this.left >= 30 && this.left + this.width <= 500) {
      this.left += this.directionX;
      this.top += this.directionY;
      this.updatePosition();
    }
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
