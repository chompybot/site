
// Set up arrow key controls
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var lookUp = false;
var lookDown = false;

var move = {
  f: false,
  b: false,
  r: false,
  l: false
}

// Add event listeners for arrow key presses
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

var pissing = false
var placing = false

var geo = new THREE.BoxGeometry(2, 2, 2)
var buildTxt = [
  textureLoader.load('wood.jpg'),
  textureLoader.load('wood.jpg'),
  textureLoader.load('wood.jpg'),
  textureLoader.load('wood.jpg'),
  textureLoader.load('wood.jpg'),
  textureLoader.load('wood.jpg')
];

// Create materials for each face using the textures
var mats = []
for (var i = 0; i < 6; i++) {
  mats.push(new THREE.MeshBasicMaterial({ map: buildTxt[i], opacity: 0.65, transparent: true }));
}
var mat = new THREE.MeshLambertMaterial({ color: "#009", opacity: 0.65, transparent: true })
var ghostMesh = new THREE.Mesh(geo, mats)
scene.add(ghostMesh)

var updown = {
  up: false,
  down: false
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 37: // left arrow
      moveLeft = true;
      break;
    case 38: // up arrow
      updown.up = true
      break;
    case 39: // right arrow
      moveRight = true;
      break;
    case 40: // down arrow
      updown.down = true
      break;
  }
  switch (event.key) {
    case "w":
      move.f = true
      break
    case "a":
      move.l = true
      break
    case "s":
      move.b = true
      break
    case "d":
      move.r = true
      break
      case " ":
        var direction = new THREE.Vector3()
            cam.getWorldDirection(direction)
            var dFactor = 90
            /*
            var d0 = new TWEEN.Tween(cam.position, false)
              .to({x: cam.position.x, y: cam.position.y, z: cam.position.z}, 200)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start()
            tweenArr.push(d0)
              */

            if(foodEaten > 0) {
              if (move.r) {
                var d0 = new TWEEN.Tween(cam.position, false)
                  .to({ x: cam.position.x + direction.clone().multiplyScalar(-0.1).z * dFactor, y: cam.position.y, z: cam.position.z - direction.clone().multiplyScalar(-0.1).x * dFactor }, 200)
                  .easing(TWEEN.Easing.Quadratic.InOut)
                  .start()
                tweenArr.push(d0)
              }//cam.position.add(direction.clone().multiplyScalar(0.1));
              if (move.l) {
                var d0 = new TWEEN.Tween(cam.position, false)
                  .to({ x: cam.position.x - direction.clone().multiplyScalar(-0.1).z * dFactor, y: cam.position.y, z: cam.position.z + direction.clone().multiplyScalar(-0.1).x * dFactor }, 200)
                  .easing(TWEEN.Easing.Quadratic.InOut)
                  .start()
                tweenArr.push(d0)
              }
              if (move.f) {
                var d0 = new TWEEN.Tween(cam.position, false)
                  .to({ x: cam.position.x + direction.clone().multiplyScalar(0.1).x * dFactor, y: cam.position.y, z: cam.position.z + direction.clone().multiplyScalar(0.1).z * dFactor }, 200)
                  .easing(TWEEN.Easing.Quadratic.InOut)
                  .start()
              tweenArr.push(d0)
              }//cam.position.add(direction.clone().multiplyScalar(0.1));
              if (move.b) {
                var d0 = new TWEEN.Tween(cam.position, false)
                  .to({ x: cam.position.x + direction.clone().multiplyScalar(-0.1).x * dFactor, y: cam.position.y, z: cam.position.z + direction.clone().multiplyScalar(-0.1).z * dFactor }, 200)
                  .easing(TWEEN.Easing.Quadratic.InOut)
                  .start()
                tweenArr.push(d0)
              }
               loseFood()
            } else {
              var audio = new Audio("audio/flashbang.mp3")
              audio.play()
              document.getElementById("whiteBang").style.transitionDuration= "500ms"
              document.getElementById("flashPhoto").style.transitionDuration= "500ms"
              document.getElementById("flashPhoto").style.opacity = "100%"
              document.getElementById("whiteBang").style.opacity = "100%"
              setTimeout(() => {
                document.getElementById("flashPhoto").style.opacity = "0%"
                document.getElementById("whiteBang").style.opacity = "0%"
                document.getElementById("flashPhoto").style.transitionDuration= "2500ms"
                document.getElementById("whiteBang").style.transitionDuration= "2500ms"
              }, 1000)
            }
            if (!move.f && !move.b && !move.l && !move.r) return
            break  
    
        
    case "n":
      var direction = new THREE.Vector3();
      cam.getWorldDirection(direction);
      var dFactor = 90;

      if(foodEaten > 3) {
        if (move.r) {
          var d0 = new TWEEN.Tween(cam.position, false)
            .to({ x: cam.position.x + direction.clone().multiplyScalar(-0.1).z * dFactor, y: cam.position.y, z: cam.position.z - direction.clone().multiplyScalar(-0.1).x * dFactor }, 200)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
          tweenArr.push(d0);
        }

        if (move.l) {
          var d0 = new TWEEN.Tween(cam.position, false)
            .to({ x: cam.position.x - direction.clone().multiplyScalar(-0.1).z * dFactor, y: cam.position.y, z: cam.position.z + direction.clone().multiplyScalar(-0.1).x * dFactor }, 200)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
          tweenArr.push(d0);
        }

        if (move.f) {
          for (let i = 0; i < 4; i++) {
            var d0 = new TWEEN.Tween(cam.position, false)
              .to({ x: cam.position.x + direction.clone().multiplyScalar(0.1 * 4).x * dFactor, y: cam.position.y, z: cam.position.z + direction.clone().multiplyScalar(0.1 * 4).z * dFactor }, 200)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
            tweenArr.push(d0);
            loseFood();
          }
        }

        if (move.b) {
          var d0 = new TWEEN.Tween(cam.position, false)
            .to({ x: cam.position.x + direction.clone().multiplyScalar(-0.1).x * dFactor, y: cam.position.y, z: cam.position.z + direction.clone().multiplyScalar(-0.1).z * dFactor }, 200)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
          tweenArr.push(d0);
        }
        loseFood();
      } else {
        var audio = new Audio("audio/flashbang.mp3")
        audio.play()
        document.getElementById("whiteBang").style.transitionDuration= "500ms"
        document.getElementById("flashPhoto").style.transitionDuration= "500ms"
        document.getElementById("flashPhoto").style.opacity = "100%"
        document.getElementById("whiteBang").style.opacity = "100%"
        setTimeout(() => {
          document.getElementById("flashPhoto").style.opacity = "0%"
          document.getElementById("whiteBang").style.opacity = "0%"
          document.getElementById("flashPhoto").style.transitionDuration= "2500ms"
          document.getElementById("whiteBang").style.transitionDuration= "2500ms"
        }, 1000)
      }
      if (!move.f && !move.b && !move.l && !move.r) {
        return;
      }
      break;


    case "e":
      if (objSel) {
        for (let i = 0; i < intersections.length; i++) {
          if (intersections[i].distance < eatRange) {
            var mesh = intersections[i].object
            if(piss.includes(mesh)) return
            if(mesh === ghostMesh) return
            if(mesh === jack.jackMeshs.leg1 || mesh === jack.jackMeshs.leg2) return
            if(shitArr.includes(mesh)) {
              var audio = new Audio("audio/scream.mp3")
              audio.play()
            }
            const anim = new TWEEN.Tween(mesh.position, false)
              .to(cam.position, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start()
            var dVec = new THREE.Vector3(0, 0, 0)
            setTimeout(() => scene.remove(mesh), 250)
            tweenArr.push(anim)
            if(buildBlocks.includes(mesh)) {
              getBullets()
              getBullets()
              getBullets()
              getBullets()
              getBullets()
              getBullets()
              getBullets()
              getBullets()
              getBullets()
              getBullets()
              buildBlocks.splice(buildBlocks.indexOf(mesh), 1)
            } else {
              eatFood()
              eatFood()
            }
            setTimeout(() => {
              var audio = new Audio('audio/chomp.mp3');
              audio.play();
            }, 10)
            setTimeout(() => {
              var audio = new Audio('audio/eat.wav');
              audio.play();
            }, 25)
          }
        }
      } else {
        var josiah = document.getElementById("josiah")
        josiah.style.opacity = "100%"
        setTimeout(() => {
          josiah.style.opacity = "0%"
        }, 1000)
        var audio1 = new Audio('audio/boom.mp3')
        audio1.play()
        var audio = new Audio('audio/meat.mp3');
        audio.play();
      }
      break
    case "f":
      pissing = true
      break
    case "b":
      placing = true
      var direction = new THREE.Vector3()
      cam.getWorldDirection(direction)
      ghostMesh.position.set((cam.position.x + direction.clone().multiplyScalar(10).x), -1.5, (cam.position.z + direction.clone().multiplyScalar(10).z))
      break
  }
}

var buildBlocks = []

function onKeyUp(event) {
  switch (event.keyCode) {
    case 37: // left arrow
      moveLeft = false;
      break;
    case 38: // up arrow
      updown.up = false
      break;
    case 39: // right arrow
      moveRight = false;
      break;
    case 40: // down arrow
      updown.down = false
      break;
  }
  switch (event.key) {
    case "w":
      move.f = false
      break
    case "a":
      move.l = false
      break
    case "s":
      move.b = false
      break
    case "d":
      move.r = false
      break
    case "f":
      pissing = false
      break
    case "b":
      if(foodEaten > 0) {
        loseFood()
        var direction = new THREE.Vector3();
        cam.getWorldDirection(direction);
        placing = false
        var geo = new THREE.BoxGeometry(2, 2, 2)
        var mat = new THREE.MeshLambertMaterial({ color: "#009", opacity: 1, transparent: true })
        var buildTxt = [
          textureLoader.load('wood.jpg'),
          textureLoader.load('wood.jpg'),
          textureLoader.load('wood.jpg'),
          textureLoader.load('wood.jpg'),
          textureLoader.load('wood.jpg'),
          textureLoader.load('wood.jpg')
        ];

        // Create materials for each face using the textures
        var mats = []
        for (var i = 0; i < 6; i++) {
          mats.push(new THREE.MeshBasicMaterial({ map: buildTxt[i] }));
        }
        var mesh = new THREE.Mesh(geo, mats)
        scene.add(mesh)
        buildBlocks.push(mesh)
        mesh.position.set((cam.position.x + direction.clone().multiplyScalar(10).x), ghostMesh.position.y, (cam.position.z + direction.clone().multiplyScalar(10).z))
        var audio = new Audio("audio/place.wav")
        audio.play()
      } else placing = false
      break
  }
}

var piss = []
// Render loop
var pissInt = 0
function animate() {
  requestAnimationFrame(animate);

  var direction = new THREE.Vector3();
  cam.getWorldDirection(direction);
  // Update cam position and rotation based on arrow key input
  const lookSensitivity = 8
  if (moveLeft) {
    cam.rotation.y += (lookSensitivity * 0.01);
  }
  if (moveRight) {
    cam.rotation.y -= (lookSensitivity * 0.01);
  }

  if (move.r) {
    cam.position.x += direction.clone().multiplyScalar(-0.1).z
    cam.position.z -= direction.clone().multiplyScalar(-0.1).x
  }//cam.position.add(direction.clone().multiplyScalar(0.1));
  if (move.l) {
    cam.position.x -= direction.clone().multiplyScalar(-0.1).z
    cam.position.z += direction.clone().multiplyScalar(-0.1).x
  }
  if (move.f) {
    cam.position.x += direction.clone().multiplyScalar(0.1).x
    cam.position.z += direction.clone().multiplyScalar(0.1).z
  }//cam.position.add(direction.clone().multiplyScalar(0.1));
  if (move.b) {
    cam.position.x += direction.clone().multiplyScalar(-0.1).x
    cam.position.z += direction.clone().multiplyScalar(-0.1).z
  } //cam.position.add(direction.clone().multiplyScalar(-0.1));
  light.position.set(cam.position.x, cam.position.y, cam.position.z)
  cameraMesh.position.set(cam.position.x, cam.position.y, cam.position.z)

  if (pissing) {
    if (bullets > 0 && pissInt >= 5) {
      pissInt = 0
      loseBullets() 
      var geo = new THREE.BoxGeometry(0.1, 0.1, 0.1)
      var mat = new THREE.MeshLambertMaterial({ color: "#990" })
      var bullet = new THREE.Mesh(geo, mat)
      bullet.puddled = false
      scene.add(bullet)
      piss.push(bullet)
      bullet.lifespan = 0;
      setInterval(() => bullet.lifespan++, 100)
      bullet.position.set(cam.position.x, (cam.position.y - 0.5), cam.position.z)
      var direction = new THREE.Vector3()
      cam.getWorldDirection(direction)
      bullet.shootInt = setInterval(() => {
        if (bullet.position.y > -2) {
          bullet.position.x += direction.clone().multiplyScalar(0.1).x
          bullet.position.z += direction.clone().multiplyScalar(0.1).z
          if (bullet.lifespan < 5) bullet.position.y += 0.03; else bullet.position.y -= 0.03
        } else {
          var puddle = new TWEEN.Tween(bullet.scale, false)
            .to({ x: (Math.floor(Math.random() * 10)), y: 0.2, z: (Math.floor(Math.random() * 10)) }, 100)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()
          clearInterval(bullet.shootInt)
          bullet.puddled = true
          tweenArr.push(puddle)
        }
      }, 10)
      bullet.initPuddle = () => {
        var puddle = new TWEEN.Tween(bullet.scale, false)
          .to({ x: (Math.floor(Math.random() * 10)), y: 0.2, z: (Math.floor(Math.random() * 10)) }, 100)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
        clearInterval(bullet.shootInt)
        bullet.puddled = true
        tweenArr.push(puddle)
      }
      bullet.initRapture = () => {
        var rapture0 = new TWEEN.Tween(bullet.scale)
          .to({ x: 0.1, y: 0.8, z: 0.1 }, 100)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
        tweenArr.push(rapture0)
        var rapture1 = new TWEEN.Tween(bullet.position)
          .to({ x: bullet.position.x, y: 100, z: bullet.position.z }, 500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start()
        tweenArr.push(rapture1)
        setTimeout(() => {
          scene.remove(bullet)
          piss.splice(piss.indexOf(bullet), 1)
        }, 600)
      }
      bullet.initDelete = () => {
        scene.remove(bullet)
      }
      setTimeout(() => clearInterval(bullet.shootInt), 10000)
    }
  }
  pissInt++

  for (let i = 0; i < piss.length; i++) {
    if (piss[i].lifespan > 100) {
      piss[i].initRapture()
    }
  }
  if (piss.length > 50) {
    for (let i = 0; i < piss.length; i++) {
      piss[i].initDelete()
    }
    piss = []
  }

  if (placing) {
    if (updown.up) {
      ghostMesh.position.set((cam.position.x + direction.clone().multiplyScalar(10).x), (ghostMesh.position.y + 0.1), (cam.position.z + direction.clone().multiplyScalar(10).z))
    } else if (updown.down) {
      ghostMesh.position.set((cam.position.x + direction.clone().multiplyScalar(10).x), (ghostMesh.position.y - 0.1), (cam.position.z + direction.clone().multiplyScalar(10).z))
    } else {
      ghostMesh.position.set((cam.position.x + direction.clone().multiplyScalar(10).x), (ghostMesh.position.y), (cam.position.z + direction.clone().multiplyScalar(10).z))
    }
  } else {
    ghostMesh.position.set(0, 1000, 0)
  }


  checkIntersection()

  // Clamp the pitch to avoid over-rotating
  cam.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cam.rotation.x));

 
  

  renderer.render(scene, cam);
}
animate();
