const btn = document.getElementById("btn");
const caja1 = document.getElementById("caja1");

// 1. Esta función recibe el evento y muestra los datos
function mostrarOrientacion(e) {
    // Si alpha y beta son null (porque el móvil no los soporta o no hay permiso), mostramos un aviso
    if (e.alpha === null && e.beta === null) {
        caja1.innerHTML = "El sensor no está enviando datos (o no está disponible).";
    } else {
        caja1.innerHTML = "Alpha: " + e.alpha + " <br> Beta: " + e.beta;
    }
}

// 2. Función que pide los permisos (necesario en iOS 13+)
function onClick() {
    // Usamos DeviceOrientationEvent, no DeviceMotionEvent
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then((state) => {
                if (state === 'granted') {
                    // Escuchamos deviceorientation y llamamos a la función correcta
                    window.addEventListener('deviceorientation', mostrarOrientacion);
                    btn.disabled = true; // Desactivamos el botón para que no se pulse mil veces
                    btn.textContent = "Permisos concedidos";
                } else {
                    caja1.innerHTML = "Permiso denegado por el usuario.";
                }
            })
            .catch((error) => {
                caja1.innerHTML = "Error al pedir permiso: " + error;
            });
    } else {
        // En Android y otros navegadores no hace falta pedir permiso explícito
        window.addEventListener('deviceorientation', mostrarOrientacion);
        btn.disabled = true;
        btn.textContent = "Permisos concedidos";
    }
}

btn.addEventListener("click", onClick);