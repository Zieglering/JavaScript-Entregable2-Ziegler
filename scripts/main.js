
// importo el json que contiene el array de cafes
fetch('./data/cafes.json')
  .then(response => response.json())
  .then(cafes => {
  

const carrito = [];
let sumaTotal = 0;


// -----  * MOSTRAR PRODUCTOS * -----
// Por cada producto del array cafes
// - Creo el html para mostrarlo
// - Anclo el html creado al <section id="productos-contenedor"> y lo emparento como hijo de este
// - Agrego un evento al <button class="botonAgregarAlCarrito"> para que cuando hago click ejecuta la funcion agregarProducto(i)
function mostrarProductos() {
  cafes.forEach((producto, i) => {
    const div = document.createElement("div");
    div.classList.add("col", "card");
    div.innerHTML = `
      <div class="imagenReserva">
        <img class="card-img-top" src="${producto.fotoCafe}" alt="imagen">
      </div>
      <div class="card-body">
        <div class="titulo-cafes">
          <h2 class="card-title">${producto.nombreCafe}</h2>
        </div>
        <p class="card-text texto-descripcion">${producto.descripcionCafe}</p>
        <form class="boton">
          <button type="button" class="btn cafe-color-boton botonAgregarAlCarrito">Agregar $${producto.precioCafe}</button>
        </form>
      </div>
    `;
    div.querySelector(".botonAgregarAlCarrito").addEventListener("click", () => agregarProducto(i));
    document.querySelector("#productos-contenedor").appendChild(div);
  });
}

// -----  * MOSTRAR CARRITO * -----
// anclo carritoLista a <section id="productos-carrito">
// borro el contenido html de carritoLista, y vuelvo a agregar el texto Carrito
// por cada producto del array carrito
// creo el html para mostrar y emparento el html  creado como hijo de carritoLista
function mostrarCarrito() {
  const carritoLista = document.querySelector("#productos-carrito");
  carritoLista.innerHTML = `
  <div class="titulo">
    <h3>Carrito</h3>
  </div>
  `;
  carrito.forEach((producto, i) => {
    const li = document.createElement("li");
    li.classList.add("productoLista");
    li.innerHTML = `
    <div class="card mb-3 carrito_01">
      <div class="row g-0">
        <div class="col-md-2 imagenSize">
          <img class="img-fluid rounded-start imagen-carrito" src="${producto.fotoCafe}" alt="imagen">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h3 class="card-title">${producto.nombreCafe}</h3>
            <h3 class="card-text">$${producto.precioCafe}</h3>
            <h3 class="card-text">Cantidad ${producto.cantidad}</h3>
          </div>
        </div>
        <form class="col-md-2">
          <button class="btn cafe-color-boton botonEliminarDelCarrito" type="button">Quitar del carrito</button>
        </form>
      </div>
    </div>
    `;
    li.querySelector(".botonEliminarDelCarrito").addEventListener("click", () => borrarProducto(i));
    carritoLista.appendChild(li);
  });
}

// -----  * SUMAR PRECIO TOTAL * -----
// anclo totalCarrito al <section id="productos-carrito"> 
// creo divTotal, luego  borro su contenido html
// creo el contenido html de divTotal, en donde paso el valor de ${sumaTotal}
// y lo emparento como hijo de totalCarrito  
function sumaCarrito() {
  const totalCarrito = document.querySelector("#productos-carrito");
  let divTotal = ""
  divTotal.innerHTML = "";
  divTotal = document.createElement("div");
  divTotal.classList.add("totalCarrito");
  divTotal.innerHTML = `<h3> Total $${sumaTotal} </h3>`
  totalCarrito.appendChild(divTotal);
  let badgeCarrito = document.querySelector(".cantidad-productos-carrito")
  badgeCarrito.innerHTML = carrito.length
}

// ---- * AGREGAR PRODUCTOS AL CARRITO *  ----
function agregarProducto(i) {
  const productoSeleccionado = cafes[i];
  

  if (carrito.find(producto => producto.id == productoSeleccionado.id)) {
    productoSeleccionado.cantidad ++
      mostrarCarrito();

      sumaTotal = carrito.reduce((acumulador, valor) => acumulador + (valor.precioCafe)*valor.cantidad, 0);
      sumaCarrito();
  } else {
    carrito.push(productoSeleccionado);
    mostrarCarrito();

    sumaTotal = carrito.reduce((acumulador, valor) => acumulador + (valor.precioCafe)*valor.cantidad, 0);
    sumaCarrito();    
  }
}





// ---- * BORRAR PRODUCTOS DEL CARRITO *  ----
function borrarProducto(i) {
  const productoSeleccionado = carrito[i];
  if (carrito.find(producto => producto.id == productoSeleccionado.id) && (productoSeleccionado.cantidad > 1)) {
      productoSeleccionado.cantidad --
      mostrarCarrito();

      sumaTotal = carrito.reduce((acumulador, valor) => acumulador + (valor.precioCafe)*valor.cantidad, 0);
      sumaCarrito();

  } else {
    carrito.splice(carrito.indexOf(productoSeleccionado), 1);
    console.log(productoSeleccionado)
    mostrarCarrito();

    sumaTotal = carrito.reduce((acumulador, valor) => acumulador + (valor.precioCafe)*valor.cantidad, 0);
    sumaCarrito();
  }
}

// Ejecuto funcion para mostrar los productos del array
mostrarProductos();
})