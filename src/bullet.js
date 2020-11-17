class Bullet {
  constructor(x, y, enemy) {
    this.position = createVector(x, y)
    this.velocity = createVector()
    this.targetIndex = enemy
    this.target = Global.enemies[enemy]
    this.maxSpeed = 5
    this.maxSteer = 0.5
    this.initDesired = createVector(random(1), random(-1, 1)).normalize()
  }

  draw() {
    let desiredSeek = SteeringBehaviours.seek(this, this.target.position, 9999)
    let finalDesired = desiredSeek.add(this.initDesired)
    let steer = SteeringBehaviours.calculateSteer(this, finalDesired)
    this.velocity.add(steer)
    this.position.add(this.velocity)

    let distance = dist(this.target.position.x, this.target.position.y, this.position.x, this.position.y)
    if(distance < 5){
      this.target.life--
      if(this.target.life == 0){
        Global.enemies[this.targetIndex] = null
      }
      this.removeFromArray(Global.bullets, this)
    }

    fill('green')
    noStroke()
    circle(this.position.x, this.position.y, 30)    
  }

  removeFromArray(array, element){
    let index = array.indexOf(element)
    array[index] = null
  }
}