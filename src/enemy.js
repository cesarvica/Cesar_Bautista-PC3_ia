class Enemy {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector()
    this.maxSpeed = 5
    this.maxSteer = 0.5
    this.life = 3
  }

  draw() {
    
    let desiredSeparate = SteeringBehaviours.separate(this, Global.enemies, 70)
    let desired = desiredSeparate
    let steer = SteeringBehaviours.calculateSteer(this, desired)
    this.velocity.add(steer)
    this.position.add(this.velocity)

    fill('orange')
    noStroke()
    circle(this.position.x, this.position.y, 30)
    
    fill('black')
    textSize(20)
    text(this.life.toString(), this.position.x - 5, this.position.y + 7)

  }
}
