var shitArr = []
var jack = {
  jackMats: {
    top: [],
    body: []
  },
  jackGeo: {
    top: new THREE.TetrahedronGeometry(1, 0),
    body: new THREE.BoxGeometry(2, 2, 2),
    legs: new THREE.BoxGeometry(1, 2, 1)
  },
  jackMeshs: {
    top: null,
    body: null,
    leg1: null,
    leg2: null
  },
  moveX: (val) => {
    jack.jackMeshs.body.position.x = jack.jackMeshs.body.position.x + val
    jack.jackMeshs.top.position.x = jack.jackMeshs.top.position.x + val
    jack.jackMeshs.leg1.position.x = jack.jackMeshs.leg1.position.x + val
    jack.jackMeshs.leg2.position.x = jack.jackMeshs.leg2.position.x + val
  },
  moveY: (val) => {
    jack.jackMeshs.body.position.y = jack.jackMeshs.body.position.y + val
    jack.jackMeshs.top.position.y = jack.jackMeshs.top.position.y + val
    jack.jackMeshs.leg1.position.y = jack.jackMeshs.leg1.position.y + val
    jack.jackMeshs.leg2.position.y = jack.jackMeshs.leg2.position.y + val
  },
  moveZ: (val) => {
    jack.jackMeshs.body.position.z = jack.jackMeshs.body.position.z + val
    jack.jackMeshs.top.position.z = jack.jackMeshs.top.position.z + val
    jack.jackMeshs.leg1.position.z = jack.jackMeshs.leg1.position.z + val
    jack.jackMeshs.leg2.position.z = jack.jackMeshs.leg2.position.z + val
  },
  attack: () => {
    jack.attacking = true
    var shitGeo = new THREE.BoxGeometry(1, 1, 1)
    var shitMat = new THREE.MeshBasicMaterial({ map: textureLoader.load("poop.jpg") })
    var shit = new THREE.Mesh(shitGeo, shitMat)
    shitArr.push(shit)
    scene.add(shit)
    shit.thrown = false
    shit.position.x = jack.jackMeshs.top.position.x
    shit.position.y = (jack.jackMeshs.top.position.y + 1.5)
    shit.position.z = jack.jackMeshs.top.position.z
    var shitPos = setInterval(() => {
      if(!shit.thrown) {
        shit.position.x = jack.jackMeshs.top.position.x
        shit.position.y = (jack.jackMeshs.top.position.y + 1.5)
        shit.position.z = jack.jackMeshs.top.position.z
      } else {
        clearInterval(shitPos)
      }
    }, 5)
    var shitGrow = new TWEEN.Tween(shit.scale, false)
      .to({x:2, y:2, z:2}, 250)
      .start()
    tweenArr.push(shitGrow)
    var audio = new Audio("audio/poop.mp3")
    audio.play()
    setTimeout(() => {
      shit.thrown = true
      var camDir = new THREE.Vector3()
      cam.getWorldDirection(camDir)
      var futureCamPos = {x:(cam.position.x + camDir.clone().multiplyScalar(3).x) ,y: (cam.position.y - 1), z:(cam.position.z + camDir.clone().multiplyScalar(3).z)}
      if(move.r) {
        futureCamPos.x += camDir.clone().multiplyScalar(-2).z
        futureCamPos.z -= camDir.clone().multiplyScalar(-2).x
      } else if(move.l) {
        futureCamPos.x -= camDir.clone().multiplyScalar(-2).z
        futureCamPos.z += camDir.clone().multiplyScalar(-2).x
      }
      if(!move.f && !move.b && !move.l && !move.r) futureCamPos = {x: cam.position.x, y: cam.position.y, z:cam.position.z}
      var shitThrow = new TWEEN.Tween(shit.position)
        .to(futureCamPos, 150)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
      tweenArr.push(shitThrow)
    }, 250)
  },
  attacking: false,
  moving: true,
  legsMode: "x",
  currentDir: "-x",
  health: 100,
  alive: true
}
for(let i = 0; i < 4; i++) {
  jack.jackMats.top.push(new THREE.MeshBasicMaterial({ map: textureLoader.load("jack.png") }))
}
jack.jackMeshs.top = new THREE.Mesh(jack.jackGeo.top, jack.jackMats.top)
jack.jackMeshs.top.position.y = 4
scene.add(jack.jackMeshs.top)

for(let i = 0; i < 6; i++) {
  jack.jackMats.body.push(new THREE.MeshBasicMaterial({ map: textureLoader.load("jack.png") }))
}
jack.jackMeshs.body = new THREE.Mesh(jack.jackGeo.body, jack.jackMats.body)
jack.jackMeshs.body.position.y = 2
scene.add(jack.jackMeshs.body)
jack.jackMeshs.body.rotation.z = 13

jack.jackMeshs.leg1 = new THREE.Mesh(jack.jackGeo.legs, jack.jackMats.body)
jack.jackMeshs.leg2 = new THREE.Mesh(jack.jackGeo.legs, jack.jackMats.body)
scene.add(jack.jackMeshs.leg1)
scene.add(jack.jackMeshs.leg2)
jack.jackMeshs.leg1.position.x = -0.5
jack.jackMeshs.leg2.position.x = 0.5

function moveJack(newPos) {
  jack.jackMeshs.body.position.x = newPos.x
  jack.jackMeshs.body.position.y = newPos.y
  jack.jackMeshs.body.position.z = newPos.z
  jack.jackMeshs.top.position.x = newPos.x
  jack.jackMeshs.top.position.y = newPos.y
  jack.jackMeshs.top.position.z = newPos.z
}

jack.moveX(10)

var jackTweenarr = []
function legSwing(speed, moveFactor) {
  var leg1swing0
  var leg1swing1
  var leg1swing2
  var leg2swing0
  var leg2swing1
  var leg2swing2
  switch(jack.legsMode) {
    case "x":
      leg1swing0 = new TWEEN.Tween(jack.jackMeshs.leg1.rotation, false)
        .to({x:(jack.jackMeshs.leg1.rotation.x + moveFactor), y:jack.jackMeshs.leg1.rotation.y, z:jack.jackMeshs.leg1.rotation.z}, speed)
      jackTweenarr.push(leg1swing0)

      leg1swing1 = new TWEEN.Tween(jack.jackMeshs.leg1.rotation, false)
        .to({x:(jack.jackMeshs.leg1.rotation.x - (moveFactor * 2)), y:jack.jackMeshs.leg1.rotation.y, z:jack.jackMeshs.leg1.rotation.z}, speed)
      jackTweenarr.push(leg1swing1)

      leg1swing2 = new TWEEN.Tween(jack.jackMeshs.leg1.rotation, false)
      .to({x:(jack.jackMeshs.leg1.rotation.x + moveFactor), y:jack.jackMeshs.leg1.rotation.y, z:jack.jackMeshs.leg1.rotation.z}, speed)
      jackTweenarr.push(leg1swing2)


      leg2swing0 = new TWEEN.Tween(jack.jackMeshs.leg2.rotation, false)
        .to({x:(jack.jackMeshs.leg2.rotation.x - moveFactor), y:jack.jackMeshs.leg2.rotation.y, z:jack.jackMeshs.leg1.rotation.z}, speed)
      jackTweenarr.push(leg2swing0)

      leg2swing1 = new TWEEN.Tween(jack.jackMeshs.leg2.rotation, false)
        .to({x:(jack.jackMeshs.leg2.rotation.x + (moveFactor * 2)), y:jack.jackMeshs.leg2.rotation.y, z:jack.jackMeshs.leg2.rotation.z}, speed)
      jackTweenarr.push(leg2swing1)

      leg2swing2 = new TWEEN.Tween(jack.jackMeshs.leg2.rotation, false)
      .to({x:(jack.jackMeshs.leg2.rotation.x - moveFactor), y:jack.jackMeshs.leg2.rotation.y, z:jack.jackMeshs.leg2.rotation.z}, speed)
      jackTweenarr.push(leg2swing2)
      break
    case "z":
      leg1swing0 = new TWEEN.Tween(jack.jackMeshs.leg1.rotation, false)
        .to({x:jack.jackMeshs.leg1.rotation.x, y:jack.jackMeshs.leg1.rotation.y, z:(jack.jackMeshs.leg1.rotation.z + moveFactor)}, speed)
      jackTweenarr.push(leg1swing0)

      leg1swing1 = new TWEEN.Tween(jack.jackMeshs.leg1.rotation, false)
      .to({x:jack.jackMeshs.leg1.rotation.x, y:jack.jackMeshs.leg1.rotation.y, z:(jack.jackMeshs.leg1.rotation.z - (moveFactor * 2))}, speed)
      jackTweenarr.push(leg1swing1)

      leg1swing2 = new TWEEN.Tween(jack.jackMeshs.leg1.rotation, false)
      .to({x:jack.jackMeshs.leg1.rotation.x, y:jack.jackMeshs.leg1.rotation.y, z:(jack.jackMeshs.leg1.rotation.z + moveFactor)}, speed)
      jackTweenarr.push(leg1swing1)


      leg2swing0 = new TWEEN.Tween(jack.jackMeshs.leg2.rotation, false)
        .to({x:jack.jackMeshs.leg1.rotation.x, y:jack.jackMeshs.leg1.rotation.y, z:(jack.jackMeshs.leg1.rotation.z - moveFactor)}, speed)
      jackTweenarr.push(leg2swing0)

      leg2swing1 = new TWEEN.Tween(jack.jackMeshs.leg2.rotation, false)
      .to({x:jack.jackMeshs.leg1.rotation.x, y:jack.jackMeshs.leg1.rotation.y, z:(jack.jackMeshs.leg1.rotation.z + (moveFactor * 2))}, speed)
      jackTweenarr.push(leg2swing1)

      leg2swing2 = new TWEEN.Tween(jack.jackMeshs.leg2.rotation, false)
      .to({x:jack.jackMeshs.leg1.rotation.x, y:jack.jackMeshs.leg1.rotation.y, z:(jack.jackMeshs.leg1.rotation.z - moveFactor)}, speed)
      jackTweenarr.push(leg2swing2)
      break
  }

  leg1swing0.start()
  tweenArr.push(leg1swing0)
  leg2swing0.start()
  tweenArr.push(leg2swing0)
  setTimeout(() => {
    leg1swing1.start()
    tweenArr.push(leg1swing1)
    leg2swing1.start()
    tweenArr.push(leg2swing1)
    setTimeout(() => {
      leg1swing2.start()
      tweenArr.push(leg1swing2)
      leg2swing2.start()
      tweenArr.push(leg2swing2)
    }, speed)
  }, speed)
}

function legSwitch() {
  if(jack.legsMode === "x") {
    jack.legsMode = "z"
    jack.jackMeshs.leg2.position.x -= 0.5
    jack.jackMeshs.leg1.position.x += 0.5
    jack.jackMeshs.leg2.position.z += 0.5
    jack.jackMeshs.leg1.position.z -= 0.5
  } else {
    jack.legsMode = "x"
    jack.jackMeshs.leg2.position.x += 0.5
    jack.jackMeshs.leg1.position.x -= 0.5
    jack.jackMeshs.leg2.position.z -= 0.5
    jack.jackMeshs.leg1.position.z += 0.5
  }
}

var shitCount = 0
setInterval(() => {
  if((jack.jackMeshs.body.position.x - cam.position.x) <= 50 && (jack.jackMeshs.body.position.z - cam.position.z) <= 50) {
    jack.attack()
    shitCount++
  }
  if(shitCount > 15) {
    for(let i = 0; i < shitArr.length; i++) {
      scene.remove(shitArr[i])
    }
    shitArr = []
    shitCount = 0
  }
}, 3000)

var jackAnger = 0.1
var jackWalkSpeed = 300

setInterval(() => {
  if(jack.moving) {
    legSwing(jackWalkSpeed, 1)
  }
}, (jackWalkSpeed * 3))

var jackRays = [
  new THREE.Raycaster(),
  new THREE.Raycaster(),
  new THREE.Raycaster()
]
function jackAnim() {
  requestAnimationFrame(jackAnim)

  jackAnger = (0.1 + ((jack.health - 100) * -1) / 500)
  if(jack.moving) {
    var newInt = Math.floor(Math.random() * 300)
    if(newInt === 170) {
      var dirArr = ["-x", "x", "z", "-z"]
      legSwitch()
      var pastDir = jack.currentDir
      jack.currentDir = dirArr[Math.floor(Math.random() * dirArr.length)]
    }
    switch(jack.currentDir) {
      case "x":
        jack.moveX(jackAnger)
        break
      case "-x":
        jack.moveX(-jackAnger)
        break
      case "z":
        jack.moveZ(jackAnger)
        break
      case "-z":
        jack.moveZ(-jackAnger)
        break
    }
    if(jack.jackMeshs.body.position.x >= 300 || jack.jackMeshs.body.position.x <= -300 || jack.jackMeshs.body.position.z >= 300 || jack.jackMeshs.body.position.z <= -300 ) {
      jack.jackMeshs.body.position.x = 10
      jack.jackMeshs.body.position.z = 10
      jack.jackMeshs.leg1.position.x = 10
      jack.jackMeshs.leg1.position.z = 10
      jack.jackMeshs.leg2.position.z = 10
      jack.jackMeshs.leg2.position.x = 10
      jack.jackMeshs.top.position.x = 10
      jack.jackMeshs.top.position.z = 10
    }

    for(let i = 0; i < jackRays.length; i++) {
      var rayDir
      switch(jack.currentDir) {
        case "x":
          rayDir = new THREE.Vector3(0.1, -1, (-2 + i))
          break
        case "-x":
          rayDir = new THREE.Vector3(-0.1, -1, (-2 + i))
          break
        case "z":
          rayDir = new THREE.Vector3((-2 + i), -1, 0.1)
          break
        case "-z":
          rayDir = new THREE.Vector3((-2 + i), -1, -0.1)
          break
      }
      jackRays[i].set(new THREE.Vector3(jack.jackMeshs.body.position.x, 0, jack.jackMeshs.body.position.z), rayDir)
    }
    var jackInts = [jackRays[0].intersectObjects(buildBlocks), jackRays[1].intersectObjects(buildBlocks), jackRays[2].intersectObjects(buildBlocks)]
    if(jackInts[0].length > 0 || jackInts[1].length > 0 || jackInts[2].length > 0) {
      switch(jack.currentDir) {
        case "x":
          jack.moveX(-5)
          break
        case "-x":
          jack.moveX(5)
          break
        case "z":
          jack.moveZ(-5)
          break
        case "-z":
          jack.moveZ(5)
          break
      }
      jack.moving = false
      setTimeout(() => {
        var dirArr = ["-x", "x", "z", "-z"]
        legSwitch()
        jack.currentDir = dirArr[Math.floor(Math.random() * dirArr.length)]
        jack.moving = true
      }, 2500)
    }
  }

  if(jack.health <= 0 && jack.alive) {
    jack.alive = false
    jack.moving = false
    var jackTop = new TWEEN.Tween(jack.jackMeshs.top.position, false)
      .to({x: jack.jackMeshs.body.position.x, y:(jack.jackMeshs.body.position.y), z:jack.jackMeshs.body.position.z}, 4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
    tweenArr.push(jackTop)
    var jackleg1 = new TWEEN.Tween(jack.jackMeshs.leg1.position, false)
      .to({x: jack.jackMeshs.body.position.x, y:(jack.jackMeshs.body.position.y), z:jack.jackMeshs.body.position.z}, 4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
    tweenArr.push(jackleg1)
    var jackleg2 = new TWEEN.Tween(jack.jackMeshs.leg2.position, false)
      .to({x: jack.jackMeshs.body.position.x, y:(jack.jackMeshs.body.position.y), z:jack.jackMeshs.body.position.z}, 4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
    var h1 = setInterval(() => {
      jack.jackMeshs.top.scale.x -= 0.001
      jack.jackMeshs.top.scale.y -= 0.001
      jack.jackMeshs.top.scale.z -= 0.001
      jack.jackMeshs.leg1.scale.x -= 0.001
      jack.jackMeshs.leg1.scale.y -= 0.001
      jack.jackMeshs.leg1.scale.z -= 0.001
      jack.jackMeshs.leg2.scale.x -= 0.001
      jack.jackMeshs.leg2.scale.y -= 0.001
      jack.jackMeshs.leg2.scale.z -= 0.001
    }, 10)
    setTimeout(() => clearInterval(h1), 1000)
    tweenArr.push(jackleg2)
    setTimeout(() => {
      scene.remove(jack.jackMeshs.leg1)
      scene.remove(jack.jackMeshs.leg2)
      scene.remove(jack.jackMeshs.top)
      var deathGeo = new THREE.BoxGeometry(1, 1, 1)
      var deathMat = new THREE.MeshLambertMaterial({ color: "#999" })
      var deathMesh = new THREE.Mesh(deathGeo, deathMat)
      scene.add(deathMesh)
      deathMesh.position.set(jack.jackMeshs.body.position.x, jack.jackMeshs.body.position.y, jack.jackMeshs.body.position.z)
      var bodyRise = new TWEEN.Tween(jack.jackMeshs.body.position, false)
        .to({x:jack.jackMeshs.body.position.x, y:(jack.jackMeshs.body.position.y + 20), z: jack.jackMeshs.body.position.z}, 5000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
      tweenArr.push(bodyRise)
      var deathRise = new TWEEN.Tween(deathMesh.position, false)
        .to({x:jack.jackMeshs.body.position.x, y:(jack.jackMeshs.body.position.y + 20), z: jack.jackMeshs.body.position.z}, 5000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
      var audio = new Audio('audio/wave.mp3');
      audio.play();
      var audio = new Audio('audio/death.mp3');
      audio.play();
      tweenArr.push(deathRise)
      var deathExplode = new TWEEN.Tween(deathMesh.scale, false)
        .to({x:5, y:5, z:5}, 3000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
      tweenArr.push(deathExplode)
      setTimeout(() => {
        scene.remove(deathMesh)
        scene.remove(jack.jackMeshs.body)
      
            var popupMenu = document.getElementById('win-message');
            if (popupMenu.style.display === 'none' || popupMenu.style.display === '') {
                popupMenu.style.display = 'block';
            } else {
                popupMenu.style.display = 'none';
            }
        
      }, 3000)
    }, 4000)
  }
  
  if(!jack.attacking) jack.attack()
  
  jack.jackMeshs.top.rotation.x -= jackAnger
  jack.jackMeshs.top.rotation.y += jackAnger * 2
  jack.jackMeshs.top.rotation.z -= jackAnger
  
  jack.jackMeshs.body.rotation.y += jackAnger
}
jackAnim()