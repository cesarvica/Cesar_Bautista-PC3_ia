class Player {

  constructor() {
    this.position = createVector(100, 300)
    this.speed = 5
    this.velocity = createVector()
  }

  draw() {
    if(keyIsDown(38) && this.position.y > 100){
      this.position.y -= this.speed
    }
    if(keyIsDown(40) && this.position.y < 500){
      this.position.y += this.speed
    }

    fill('blue')
    noStroke()
    circle(this.position.x, this.position.y, 40)    
  }
}