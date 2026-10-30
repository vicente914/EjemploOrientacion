const btn = document.getElementById("btn");
const caja1 = document.getElementById("caja1");

function mostrarOrientacion(e){
  caja1.innerHTML = e.alpha + " - " + e.beta;
}

function onClick() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === 'granted') {
          window.addEventListener('devicemotion', handleOrientation);
        } else {
          console.error('Request to access the orientation was rejected');
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener('devicemotion', handleOrientation);
  }
}


// 3. Hacemos que el usuario active el sensor con un toque en la pantalla
document.body.addEventListener("click", onClick);