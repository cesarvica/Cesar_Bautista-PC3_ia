class Game {
  constructor() {
    Global.player = new Player()
    this.numBullets = 3
    this.numNpcs = 5
    this.spawnTime = 7
    this.timer = this.spawnTime
    this.canshoot = true
    this.reload = 1
    
  }

  draw() {
    
    this.timer += 0.013
    if(this.timer > this.spawnTime){
      console.log("uwu")
      this.spawnEnemies()
      this.timer = 0
      
    }
    
    Global.player.draw()
    Global.enemies.forEach(enemy => {
      if(enemy != null)
        enemy.draw()
    })

    Global.bullets.forEach(bullet => {
      if(bullet != null)
        bullet.draw()
    })
  }

  keyPressed(){
    if(keyCode === 32){
      this.spawnBullet()
    }
  }

  spawnEnemies(){
    for(let i = 0; i < this.numNpcs; i++){
      Global.enemies.push(new Enemy(600 + random(1), 300 + random(1)))
    }
  }

  spawnBullet(){
    var targets = this.getRandomArray(this.numBullets)
    if(!this.verifyRandom(targets)){
      this.spawnBullet()
      return
    }
    console.log(targets)

    for(let i = 0; i < this.numBullets; i++){
      Global.bullets.push(new Bullet(Global.player.position.x, Global.player.position.y, targets[i]))
    }
  }

  verifyRandom(array){
    for(let i = 0; i < array.length; i++){
      if(Global.enemies[array[i]] == null) return false
      for(let j = 0; j < array.length; j++){
        if(j > i){
          if(array[i] == array[j]) return false
        }
      }
    }
    return true
  }

  getRandomArray(size){
    var temp = []
    for(let i = 0; i < size; i++){
      temp[i] = Math.floor(random(Global.enemies.length))
    }
    return temp
  }
}