function abrirLogin() {
    document.getElementById('popup-registro').style.display = 'none';
    document.getElementById('popup-login').style.display = 'block';
    document.querySelector('#popup-login h3').innerText = "Iniciar Sesión";
}

function abrirRegistro() {
    document.getElementById('popup-login').style.display = 'none';
    document.getElementById('popup-registro').style.display = 'block';
}

function cerrarPopups() {
    document.getElementById('popup-login').style.display = 'none';
    document.getElementById('popup-registro').style.display = 'none';
}

function procesarRegistro() {
    const nombre = document.getElementById('registro-nombre').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    if (nombre !== "" && email !== "" && password !== "") {
      localStorage.setItem("cuentaNombre", nombre);
        localStorage.setItem("cuentaEmail", email);
        localStorage.setItem("cuentaPassword", password);
        document.getElementById('registro-nombre').value = "";
        document.getElementById('registro-email').value = "";
        document.getElementById('registro-password').value = "";
        abrirLogin();
        document.querySelector('#popup-login h3').innerText = "¡Cuenta creada! Iniciá sesión";
        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = "";
    } else {
        alert("Por favor, completá todos los campos para registrarte.");
    }
}

function procesarLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === "" || password === "") {
        alert("Por favor, ingresá tu email y contraseña.");
        return;
    }

    const emailGuardado = localStorage.getItem("cuentaEmail");
    const passGuardada = localStorage.getItem("cuentaPassword");
    const nombreGuardado = localStorage.getItem("cuentaNombre");

    if (emailGuardado) {
        // Verifica que coincidan el email y la contraseña registrados
        if (email === emailGuardado && password === passGuardada) {
            localStorage.setItem("usuarioLogueado", nombreGuardado);
            actualizarHeader(nombreGuardado);
            cerrarPopups();
        } else {
            alert("Email o contraseña incorrectos.");
        }
        } else {
        // Si entra directo sin haberse registrado antes, usa la parte anterior al @
        const nombreDesdeEmail = email.split("@")[0];
        localStorage.setItem("usuarioLogueado", nombreDesdeEmail);
        actualizarHeader(nombreDesdeEmail);
        cerrarPopups();
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    document.getElementById('botones-ingreso').style.display = 'inline';
    document.getElementById('mensaje-bienvenida').style.display = 'none';
    
    document.getElementById('login-email').value = "";
    document.getElementById('login-password').value = "";
    document.getElementById('registro-nombre').value = "";
    document.getElementById('registro-email').value = "";
    document.getElementById('registro-password').value = "";
}

function actualizarHeader(nombre) {
    document.getElementById('texto-hola').innerText = "Hola, " + nombre;
    document.getElementById('botones-ingreso').style.display = 'none';
    document.getElementById('mensaje-bienvenida').style.display = 'inline';
}

function revisarSesion() {
    const usuario = localStorage.getItem("usuarioLogueado");
    if (usuario) {
        actualizarHeader(usuario);
    }
}

revisarSesion();

function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("activo");
}

const carrito = [];

function agregarAlCarrito(nombreProducto, precioProducto) {
    const nuevoProducto = {
        nombre: nombreProducto,
        precio: precioProducto
    };
    carrito.push(nuevoProducto);
    document.getElementById("textoMensaje").innerText = "¡Agregaste " + nombreProducto + " al carrito!";
    document.getElementById("mensajeLindo").style.display = "block";
}

function cerrarMensaje() {
    document.getElementById("mensajeLindo").style.display = "none";
}

function actualizarCarritoDOM() {
    let caja = document.getElementById("cajaCarrito");
    let total = 0;
    let textoParaElDOM = "<h3 style='color:#d00515; font-family:\"Amador\", cursive; margin-top:0;'>Tu Carrito</h3>";
    for (let i = 0; i < carrito.length; i++) {
        textoParaElDOM = textoParaElDOM + "<p style='font-family:\"Inter\", serif;'>" + carrito[i].nombre + " - $" + carrito[i].precio + "</p>";
        total = total + carrito[i].precio;
    }
    textoParaElDOM = textoParaElDOM + "<h4 style='color:#d00515; font-family:\"Playfair Display\", serif;'>Total: $" + total + "</h4>";
    
    textoParaElDOM = textoParaElDOM + "<button class='boton-cerrar' onclick='borrarUltimo()' style='margin-right: 10px; margin-bottom: 10px;'>Borrar último</button>";
    textoParaElDOM = textoParaElDOM + "<button class='boton-cerrar' onclick='vaciarCarrito()'>Vaciar todo</button><br>";
    textoParaElDOM = textoParaElDOM + "<button class='boton-cerrar' onclick='finalizarCompra()' style='margin-right: 10px;'>Finalizar compra</button>";
    textoParaElDOM = textoParaElDOM + "<button class='boton-cerrar' onclick='cerrarCarrito()'>Cerrar</button>";

    caja.innerHTML = textoParaElDOM;
}

function mostrarCarrito() {
    let caja = document.getElementById("cajaCarrito");
    
    if (caja.style.display === "none" || caja.style.display === "") {
        actualizarCarritoDOM(); 
        caja.style.display = "block"; 
    } else {
        caja.style.display = "none"; 
    }
}

function cerrarCarrito() {
    document.getElementById("cajaCarrito").style.display = "none";
}

function borrarUltimo() {
    carrito.pop(); 
    actualizarCarritoDOM(); 
}

function vaciarCarrito() {
    while (carrito.length > 0) {
        carrito.pop();
    }
    actualizarCarritoDOM(); 
}

function finalizarCompra() {
    const usuario = localStorage.getItem("usuarioLogueado");
    if (carrito.length === 0) {
        document.getElementById("textoMensaje").innerText = "Tu carrito está vacío. Agregá algún producto antes de comprar.";
        document.getElementById("mensajeLindo").style.display = "block";
        cerrarCarrito();
        return;
    }
    if (!usuario) {
        document.getElementById("textoMensaje").innerText = "Para finalizar tu compra, tenés que iniciar sesión o registrarte.";
        document.getElementById("mensajeLindo").style.display = "block";
        cerrarCarrito();
        return;
    }
    let total = 0;
    let detalleHTML = "<p style='margin: 0 0 8px 0; font-weight: bold; color: #d00515;'>Resumen de tu pedido:</p>";
    
    for (let i = 0; i < carrito.length; i++) {
        detalleHTML += "<p style='margin: 4px 0;'>• " + carrito[i].nombre + " - $" + carrito[i].precio + "</p>";
        total += carrito[i].precio;
    }
    
    detalleHTML += "<p style='margin: 10px 0 0 0; padding-top: 8px; border-top: 1px solid #d00515; font-weight: bold; font-size: 1.05rem;'>Total a pagar: $" + total + "</p>";

    document.getElementById("resumen-checkout").innerHTML = detalleHTML;
    cerrarCarrito();
    document.getElementById("popup-checkout").style.display = "block";
}

function cerrarCheckout() {
    document.getElementById("popup-checkout").style.display = "none";
}

function confirmarPedido() {
    const direccion = document.getElementById("checkout-direccion").value;
    const metodoPago = document.getElementById("checkout-pago").value;
    const usuario = localStorage.getItem("usuarioLogueado");
    const email = localStorage.getItem("cuentaEmail") || "tu correo electrónico";

    if (direccion === "") {
        alert("Por favor, ingresá una dirección de envío.");
        return;
    }

  let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }
    const numeroOrden = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("textoMensaje").innerHTML = 
        "¡Gracias por tu compra, " + usuario + "!" +
        "<span style='display:block; font-family:\"Inter\", serif; font-size:0.95rem; font-weight:normal; color:#000; margin-top:12px; line-height:1.5;'>" +
        "<strong>Orden:</strong> #LB-" + numeroOrden + "<br>" +
        "<strong>Total abonado:</strong> $" + total + "<br>" +
        "<strong>Envío a:</strong> " + direccion + "<br>" +
        "<strong>Pago:</strong> " + metodoPago + "<br>" +
        "<em style='font-size:0.85rem; color:#444;'>Enviamos el comprobante a " + email + "</em>" +
        "</span>";

    document.getElementById("checkout-direccion").value = "";
    cerrarCheckout();
    vaciarCarrito();
    document.getElementById("mensajeLindo").style.display = "block";
}

const misRespuestas = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: ""
};

function elegirOpcion(numeroPregunta, letra, idBotonElegido) {
    misRespuestas[numeroPregunta] = letra;
    const opcionesLetras = ["A", "B", "C", "D", "E"];

    for (let i = 0; i < opcionesLetras.length; i++) {
        let letraActual = opcionesLetras[i];
        let idActual = "btn-" + numeroPregunta + "-" + letraActual;
        let botonActual = document.getElementById(idActual);

        if (botonActual != null) {
            botonActual.style.backgroundColor = "#f1f1f1";
            botonActual.style.color = "black";
        }
    }

    let botonSeleccionado = document.getElementById(idBotonElegido);
    if (botonSeleccionado != null) {
        botonSeleccionado.style.backgroundColor = "#d94848";
        botonSeleccionado.style.color = "white";
    }
}

function calcularResultado() {
    const faltantes = [];
    for (let i = 1; i <= 5; i++) {
        if (misRespuestas[i] === "") {
            faltantes.push(i);
        }
    }

    if (faltantes.length > 0) {
    const textoAviso = faltantes.length === 1
      ? "Por favor, respondé todas las preguntas antes de ver tu resultado. Te falta completar la pregunta " + faltantes[0] + "."
      : "Por favor, respondé todas las preguntas antes de ver tu resultado. Te faltan completar las preguntas: " + faltantes.join(", ") + ".";

    document.getElementById("texto-aviso-quiz").innerText = textoAviso;
    document.getElementById("overlay-quiz").style.display = "block";
    document.getElementById("popup-aviso-quiz").style.display = "block";
    return;
  }
  function cerrarAvisoQuiz() {
  document.getElementById("overlay-quiz").style.display = "none";
  document.getElementById("popup-aviso-quiz").style.display = "none";
}

    const puntos = { A: 0, B: 0, C: 0, D: 0, E: 0 };

    for (let i = 1; i <= 5; i++) {
        let letraSeleccionada = misRespuestas[i];
        puntos[letraSeleccionada]++;
    }

    const opciones = ["A", "B", "C", "D", "E"];
    let ganador = "A";
    let maxPuntos = 0;

    for (let indice = 0; indice < opciones.length; indice++) {
        let letraActual = opciones[indice];
        if (puntos[letraActual] > maxPuntos) {
            maxPuntos = puntos[letraActual];
            ganador = letraActual;
        }
    }

    const perfiles = {
        A: {
            nombre: "Lady Bird",
            descripcion: "Tenés una necesidad gigante de expresarte, una imaginación desbordante y a veces el mundo te queda chico. Sos impulsiva/o/, pero tu lealtad y tus ganas de vivir son inmensas."
        },
        B: {
            nombre: "Marion",
            descripcion: "Sos la voz de la razón. Práctica/o/, trabajadora/o/ incansable y con un sentido de la responsabilidad altísimo. Darías todo por los tuyos."
        },
        C: {
            nombre: "Julie",
            descripcion: "Sos el corazón del grupo. Incondicional, dulce y transparente. Valorás los vínculos reales y las cosas simples."
        },
        D: {
            nombre: "Kyle",
            descripcion: "Sos el/la intelectual misterioso. Te gusta observar el mundo desde afuera con una mirada crítica. Estar desconectado/a es tu forma de conectar."
        },
        E: {
            nombre: "Danny",
            descripcion: "Sos pura luz y entusiasmo. Romántico/a, educado/a y con una sensibilidad artística gigante. Tratás siempre de complacer a los demás."
        }
    };

    document.getElementById("nombre-personaje").innerText = "¡Sos " + perfiles[ganador].nombre + "!";
    document.getElementById("descripcion-personaje").innerText = perfiles[ganador].descripcion;
    document.getElementById("resultado-quiz").style.display = "block";
}

const tarjetasPersonajes = document.querySelectorAll('.cuadrado-personaje');

tarjetasPersonajes.forEach(function(personaje) {
    personaje.addEventListener('click', function() {
        personaje.classList.toggle('activo');

        const video = personaje.querySelector('video');
        if (video) {
            if (personaje.classList.contains('activo')) {
                video.muted = true;
                video.play();
            } else {
                video.pause();
            }
        }
    });
});

const tarjetasPremios = document.querySelectorAll('.tarjeta-premio');

tarjetasPremios.forEach(function(tarjeta) {
    tarjeta.addEventListener('click', function() {
        tarjeta.classList.toggle('activo');
    });
});


