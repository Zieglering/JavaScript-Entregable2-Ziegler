// Simulador de tienda de café

fetch("./data/cafes.json")
  .then(response => response.json())
  .then(cafes => { 

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let sumaTotal = 0;
let badgeCarrito = document.querySelector(".cantidad-productos-carrito");






function mostrarCarrito() {
  
  if (carrito.length > 0) {
    badgeCarrito.innerText = JSON.parse(localStorage.getItem("carrito")).reduce((acumulador, valor) => acumulador + (valor.cantidad), 0);
    sumaTotal = JSON.parse(localStorage.getItem("carrito")).reduce((acumulador, valor) => acumulador + (valor.precioCafe)*valor.cantidad, 0);
  } else {
    badgeCarrito.innerText = 0;
    sumaTotal = 0;
  };   
  
  const carritoLista = document.querySelector("#productos-carrito");
  carritoLista.innerHTML = `
  <div class="panelCarrito">
    <a href="#!" class="botonCerrarCarrito">
      <img src="./assets/store/cerrar.svg" alt="imagen">
    </a>
    <h2 class="carritoTitulo">Carrito</h2>
    <ul class="miCarrito"></ul>
  </div>  
  `;
  
  const botonCarrito = document.querySelector("#botonAbrirCarritoNav");
  botonCarrito.addEventListener("click", abrirCarrito);
  carritoLista.querySelector(".botonCerrarCarrito").addEventListener("click", () => cerrarCarrito());
  const panelMiCarrito = document.querySelector(".miCarrito");
  carrito.forEach((producto, i) => {
    const li = document.createElement("li");
    li.classList.add("productoLista");
    li.innerHTML = `
    <div class="card mb-3 carrito_01">
      <div class="productosCarrito">
        <div class="imagenSizeCarrito">
          <img class="rounded-start imagen-carrito" src="${producto.fotoCafe}" alt="imagen">
        </div>
        <div class="divBatchCarrito">
          <div class="textoProductosCarrito">
            <h3 class="card-title titulo-cafes-Carrito">${producto.nombreCafe}</h3>
            <h3 class="card-text">$${producto.precioCafe}</h3>
          </div>
          
        </div>
        <div class="divBatchCarrito">
          <div class="cantidadCarrito">
            <h3 class="card-text">${producto.cantidad}</h3>
          </div>
        </div>  
        <div class="col-md-2 divEliminarCarrito">
          <a class="btn botonEliminarDelCarrito" href="#!">
            <img class="iconoEliminarDelCarrito" src="./assets/store/eliminar.png" alt="Botón Borrar elmento del carrito">
          </a>
        </div>
      </*div>
    </div>
    `;
    li.querySelector(".botonEliminarDelCarrito").addEventListener("click", () => borrarProducto(i));
    panelMiCarrito.appendChild(li);
  });
};




function mostrarProductos() {

  cafes.forEach((producto, i) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card tarjetaFondo" style="width: 15rem;">
      <img src="${producto.fotoCafe}" alt="imagen" class="card-img-top fotoProducto">
      <div class="card-body">
        <h5 class="card-title titulo-cafes">${producto.nombreCafe}</h5>
        <div class="animacionPrecioIcono">
          <div class="precioIcono">
            <p class="card-text">$${producto.precioCafe}</p>
            <a href="#!" class="btn cafe-color-boton botonAgregarAlCarrito">
              <img class="iconoCarrito" src="./assets/store/agregar_al_carrito.svg" alt="Icono Carrito">
            </a>
          </div>
        </div>  
      </div>
    </div>
    `;
    div.querySelector(".botonAgregarAlCarrito").addEventListener("click", () => agregarProducto(i));
    document.querySelector("#productos-contenedor").appendChild(div);
  });
};


function abrirCarrito() {
  document.querySelector(".panelCarrito").style.width = "450px";
  document.querySelector(".panelCarrito").style.paddingLeft = "20px";
  document.querySelector(".panelCarrito").style.paddingRight = "20px";
  document.querySelector("#main").style.marginRight = "450px";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  document.querySelector(".tarjetasContenedor").style.filter = "brightness(20%) blur(2px) saturate(50%)";
  document.querySelector(".cafe-titulo").style.filter = "brightness(20%) saturate(50%)";
  document.querySelector(".tarjetasContenedor").style.pointerEvents = "none";
}

function cerrarCarrito() {
  document.querySelector(".panelCarrito").style.width = "0px";
  document.querySelector(".panelCarrito").style.paddingLeft = "0px";
  document.querySelector(".panelCarrito").style.paddingRight = "0px";
  document.querySelector("#main").style.marginRight = "0px";
  document.body.style.backgroundColor = "rgba(229, 223, 216, 1";
  document.querySelector(".tarjetasContenedor").style.filter = "brightness(100%) blur(0px) saturate(100%)";
  document.querySelector(".cafe-titulo").style.filter = "brightness(100%)";
  document.querySelector(".tarjetasContenedor").style.pointerEvents = "all";
} 



function sumaCarrito() {
  
  const totalCarrito = document.querySelector(".panelCarrito");
  let divTotal = "";
  divTotal.innerHTML = "";
  if(sumaTotal > 0) {
    divTotal = document.createElement("div");
    divTotal.classList.add("totalCarrito");
    divTotal.innerHTML = `
    <div>
      <button type="button" class="btn botonBorrarTodoCarrito">Borrar Carrito</button>
    </div>  
    <h6>Dejanos instrucciones o comentanos de tu pedido</h6>
    <form action="#!" class="formComentarios" action="">
      <textarea name="comment" rows="6" cols="24"></textarea>
    </form>
    <div class="divTotalContainer">
      <h3>Total</h3>
      <h3>$${sumaTotal}</h3>
    </div>
    <div>
      <button type="button" class="btn botonCheckout">Checkout</button>
    </div>
    `;
    totalCarrito.appendChild(divTotal);
  };
  
  badgeCarrito.innerHTML = carrito.reduce((acumulador, valor) => acumulador + (valor.cantidad), 0);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  divTotal.querySelector(".botonBorrarTodoCarrito").addEventListener("click", borrarTodoCarrito);
  divTotal.querySelector(".botonCheckout").addEventListener("click", checkOut);
  cerrarCarrito()
};

function agregarProducto(i) {
  
  const productoSeleccionado = cafes[i];
  const productoEnCarrito = carrito.find(producto => producto.id === productoSeleccionado.id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad ++;
  } else {
    carrito.push(productoSeleccionado);
  };
  mostrarCarrito();
  sumaTotal = carrito.reduce((acumulador, valor) => acumulador + (valor.precioCafe)*valor.cantidad, 0);
  sumaCarrito();    
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

function borrarProducto(i) {
  
  const productoSeleccionado = carrito[i];
  const productoEnCarrito = carrito.find(producto => producto.id === productoSeleccionado.id);
  if ((productoEnCarrito) && (productoEnCarrito.cantidad > 1)) {
      productoSeleccionado.cantidad --;
  } else {
      if (productoEnCarrito){
      carrito.splice(carrito.indexOf(productoEnCarrito), 1);
      };
  };
  mostrarCarrito();
  sumaTotal = carrito.reduce((acumulador, valor) => acumulador + (valor.precioCafe)*valor.cantidad, 0);
  sumaCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  abrirCarrito()
};

function borrarTodoCarrito() {
  
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción eliminará todo el carrito de compras",
    type: 'warning',
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Si, borrar todo el carrito'
  }).then((result) => {
    if (result.value) {

      carrito = [];
      sumaCarrito();
      mostrarCarrito();
      cerrarCarrito()
    }})
};

function checkOut() {

  Swal.fire({
    title: `El total es $${sumaTotal}`,
    text: "¿Proceder al pago?",
    type: 'warning',
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Proceder al pago'
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: "¡Gracias por tu compra!",
        text: "Estamos preparando tu pedido",
        icon: "success"
      });
      carrito = [];
      sumaCarrito();
      mostrarCarrito();
      cerrarCarrito()
    }})
}




mostrarCarrito();
cerrarCarrito()
mostrarProductos();
sumaCarrito();

});

