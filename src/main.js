let game

function setup() {
  createCanvas(800, 600)
  game = new Game()
}

function draw() {
  background('white')
  game.draw()
}

function keyPressed(){
  game.keyPressed()
}