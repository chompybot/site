const foodCount = 700;

var foodArr = []

for(let i = 0; i < foodCount; i++) {
  var geo = new THREE.SphereGeometry(2, 32, 16)
  var mat = new THREE.MeshBasicMaterial({ map: textureLoader.load("food.jpeg") })
  var mesh = new THREE.Mesh(geo, mat)
  scene.add(mesh)
  var rad = 300
  var dets = [(Math.random() * 5), (Math.random() * 5)]
  if(dets[0] > 2.5 && dets[1] > 2.5) {
    mesh.position.x = (Math.floor(Math.random() * rad))
    mesh.position.z = (Math.floor(Math.random() * rad))
  } else if(dets[0] < 2.5 && dets[1] < 2.5) {
    mesh.position.x = (Math.floor(Math.random() * -rad))
    mesh.position.z = (Math.floor(Math.random() * -rad))
  } else if(dets[0] > 2.5 && dets[1] < 2.5) {
    mesh.position.x = (Math.floor(Math.random() * rad))
    mesh.position.z = (Math.floor(Math.random() * -rad))
  } else if(dets[0] < 2.5 && dets[1] > 2.5) {
    mesh.position.x = (Math.floor(Math.random() * -rad))
    mesh.position.z = (Math.floor(Math.random() * rad))
  }
  foodArr.push(mesh)
}