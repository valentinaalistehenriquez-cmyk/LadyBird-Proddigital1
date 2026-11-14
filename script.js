function abrirLogin() {
  document.getElementById('popup-registro').style.display = 'none';
  document.getElementById('popup-login').style.display = 'block';
}

function abrirRegistro() {
  document.getElementById('popup-login').style.display = 'none';
  document.getElementById('popup-registro').style.display = 'block';
}

function cerrarPopups() {
  document.getElementById('popup-login').style.display = 'none';
  document.getElementById('popup-registro').style.display = 'none';
}

// 2. Procesar los datos
function procesarLogin() {
  const nombre = document.getElementById('login-nombre').value;
  if (nombre !== "") {
    localStorage.setItem("usuarioLogueado", nombre);
    actualizarHeader(nombre);
    cerrarPopups();
  } else {
    alert("Por favor, ingresá tu nombre para iniciar sesión.");
  }
}

function procesarRegistro() {
  const nombre = document.getElementById('registro-nombre').value;
  if (nombre !== "") {
    localStorage.setItem("usuarioLogueado", nombre);
    actualizarHeader(nombre);
    cerrarPopups();
  } else {
    alert("Por favor, ingresá tu nombre para registrarte.");
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  document.getElementById('botones-ingreso').style.display = 'inline';
  document.getElementById('mensaje-bienvenida').style.display = 'none';
  document.getElementById('login-nombre').value = "";
  document.getElementById('registro-nombre').value = "";
  document.getElementById('registro-email').value = "";
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
let usuarioLogueado = false; 

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
    if (usuarioLogueado == false) {
        document.getElementById("textoMensaje").innerText = "Para finalizar tu compra, tenés que iniciar sesión o registrarte.";
        document.getElementById("mensajeLindo").style.display = "block";
        cerrarCarrito();
    } else {
        document.getElementById("textoMensaje").innerText = "¡Gracias por tu compra! Te enviaremos los detalles al mail.";
        document.getElementById("mensajeLindo").style.display = "block";
        vaciarCarrito();
        cerrarCarrito();
    }
}

function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("activo");
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
  const puntos = { A: 0, B: 0, C: 0, D: 0, E: 0 };
 
  for (let i = 1; i <= 5; i++) {
    let letraSeleccionada = misRespuestas[i];
    if (letraSeleccionada != "") {
      puntos[letraSeleccionada]++;
    }
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

