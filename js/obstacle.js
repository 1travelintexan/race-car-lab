class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.redCarPositions = [100, 300];
    this.left =
      this.redCarPositions[
        Math.floor(Math.random() * this.redCarPositions.length)
      ];
    this.top = -300;
    this.width = 100;
    this.height = 200;
    //creating the element, setting the src and everything else
    this.element = document.createElement("img");
    this.element.src = "../images/redCar.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    // put the player on the screen after we set all the properties
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top += 6;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
}
