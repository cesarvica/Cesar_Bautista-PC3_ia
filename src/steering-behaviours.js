class SteeringBehaviours {}

// seek: seguir a
SteeringBehaviours.seek = function(agent, targetPosition, seekRange) {

  let distance = dist(targetPosition.x, targetPosition.y, agent.position.x, agent.position.y)
  let desiredSeek

  if (distance < seekRange) {

    desiredSeek = targetPosition.copy().sub(agent.position).normalize().mult(agent.maxSpeed)
  } else {

    desiredSeek = createVector()
  }
  return desiredSeek
}

// arrive: seguir desacelerando
SteeringBehaviours.arrive = function(agent, targetPosition, arriveRange) {

  let distance = dist(targetPosition.x, targetPosition.y, agent.position.x, agent.position.y)
  let desiredArrive

  if (distance > arriveRange) {

    desiredArrive = SteeringBehaviours.seek(agent, targetPosition)
  } else {
    let speed = map(distance, 0, arriveRange, 0, agent.maxSpeed)
    desiredArrive = targetPosition.copy().sub(agent.position).normalize().mult(speed)
  }
  return desiredArrive
}

// flee: huir de
SteeringBehaviours.flee = function(agent, targetPosition, fleeRange) {

  let distance = dist(targetPosition.x, targetPosition.y, agent.position.x, agent.position.y)
  let desiredFlee

  if (distance < fleeRange) {
    desiredFlee = agent.position.copy().sub(targetPosition).normalize().mult(agent.maxSpeed)
  } else {
    desiredFlee = createVector()
  }
  return desiredFlee
}

//Separate : Mantiene una distancia entre objetos
SteeringBehaviours.separate = function(agent, neighbors, separateRange) {

  let desiredSeparate = createVector(0, 0)
  neighbors.filter(v => v != null).forEach((neighbor) => {
    let distance = dist(agent.position.x, agent.position.y, neighbor.position.x, neighbor.position.y)

    // verificar si estoy dentro del entorno
    if (distance < separateRange) {

      // sumar todos los deseados de los flees
      let flee = SteeringBehaviours.flee(agent, neighbor.position, 9999999)
      desiredSeparate.add(flee)
    }
  })
  return desiredSeparate
}

// se calcula el desvío necesario para llevar a desired
SteeringBehaviours.calculateSteer = function(agent, desired) {

  let steer = desired.sub(agent.velocity).limit(agent.maxSteer)
  return steer
}
