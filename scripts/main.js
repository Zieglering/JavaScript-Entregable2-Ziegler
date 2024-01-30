// Simulador de tienda de café
//____________________________

// importar el json que contiene el array de cafes
fetch('./data/cafes.json')
  .then(response => response.json())
  .then(cafes => {

// crear la variable carrito y asignar el array guardado en localstorage si existe, y si no asignar un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let sumaTotal = 0;

// crear el badge del carrito y si existe en localStorage agregar  carrito.cantidad si no el valor en el badge es 0
// crear si existe localStorage de sumaTotal, asignar su valor de localStorage, si no sumaTotal = 0 
let badgeCarrito = document.querySelector(".cantidad-productos-carrito");

if (carrito.length > 1) {
  badgeCarrito.innerText = JSON.parse(localStorage.getItem("carrito")).reduce((acumulador, valor) => acumulador + (valor.cantidad), 0);
  sumaTotal = JSON.parse(localStorage.getItem("carrito")).reduce((acumulador, valor) => acumulador + (valor.precioCafe)*valor.cantidad, 0);

} else {
  badgeCarrito.innerText = 0;
  sumaTotal = 0;
};

// Funcion para borrar todos los elementos del carrito
function borrarTodoCarrito() {
  carrito = [];
  sumaCarrito();
  mostrarCarrito();
};


// -----  * MOSTRAR PRODUCTOS * -----
// Por cada producto del array cafes
// - Crear el html para mostrarlo
// - Anclar el html creado al <section id="productos-contenedor"> y emparentarlo como hijo de este
// - Agregar un evento al <button class="botonAgregarAlCarrito"> para que cuando se haga click, se ejecuta la funcion agregarProducto(i)
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
};

// -----  * MOSTRAR CARRITO * -----
// Anclar carritoLista a <section id="productos-carrito">
// Agregar el texto Carrito en donde empieza el carrito en el html
// Por cada producto del array carrito
// Crear el html para mostrar y emparentar el html creado como hijo de carritoLista
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
};

// -----  * SUMAR PRECIO TOTAL * -----
// Anclar totalCarrito al <section id="productos-carrito"> 
// Crear divTotal, luego borrar su contenido html
// si sumaTotal > 0 
// - Crear el contenido html de divTotal, en donde paso el valor de ${sumaTotal}
// - Emparentar divTotal como hijo de totalCarrito  
// Agregar el contenido del html de badgeCarrito = carrito.cantidad sumada de todos los elementos del carrito
// Agregar el evento al boton para cuand hago click en borrar todo el carrito, ejecute la funcion para borrar todo el carrito
function sumaCarrito() {
  const totalCarrito = document.querySelector("#productos-carrito");
  let divTotal = "";
  divTotal.innerHTML = "";
  if(sumaTotal > 0) {
    divTotal = document.createElement("div");
    divTotal.classList.add("totalCarrito");
    divTotal.innerHTML = `
    <h3> Total $${sumaTotal} </h3>
    <form action="">
      <button type="button" class="btn oscuro-color-boton botonBorrarTodoCarrito">Borrar Carrito</button>
    </form>
    `;
    totalCarrito.appendChild(divTotal);
  };
  badgeCarrito.innerHTML = carrito.reduce((acumulador, valor) => acumulador + (valor.cantidad), 0);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  divTotal.querySelector(".botonBorrarTodoCarrito").addEventListener("click", borrarTodoCarrito);
};

// ---- * AGREGAR PRODUCTOS AL CARRITO *  ----
// Esta es la funcion que se llama al hacer click en el boton agregar de cada producto
// Asignar a la constante productoSeleccionado el objeto seleccionado del array cafes (que viene del json) segun [i] que es pasado por el boton dentro de la funcion mostrarProductos(), en el momento cafes.forEach((producto, i)
// Buscar un objeto en el array carrito que tenga un id igual al de productoSeleccionado, que viene al presionar el boton agregar y asignar este a la constante productoEnCarrito
// Si productoEnCarrito existe, sumar el valor de la propiedad cantidad de productoEnCarrito
// Si productoEnCarrito NO existe, agregar el objeto que viene de productoSeleccionado al array carrito
// Luego para actualizar el contenido, ejecutar las funciones mostrarCarrito(), actualizar sumaTotal con el nuevo objeto agregado, ejecutar la funcion sumaCarrito(), y guardar en localStorage el carrito en este momento
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

// ---- * BORRAR PRODUCTOS DEL CARRITO *  ----
// Esta es la funcion que se llama al hacer click en el boton Quitar del carrito de cada producto en el carrito
// Asignar a la constante productoSeleccionado el objeto seleccionado del array carrito segun [i] que es pasado por el boton dentro de la funcion mostrarCarrito(), en el momento carrito.forEach((producto, i)
// Buscar un objeto en el array carrito que tenga un id igual al de productoSeleccionado, que viene al presionar el boton agregar y asignar este a la constante productoEnCarrito
// Si productoEnCarrito existe y además el valor de su propiedad .cantidad es mayor a 1, suma el valor de su propiedad .cantidad
// De lo contrario si el array carrito existe borro el objeto productoEnCarrito del carrito
// Luego para actualizar el contenido, ejecutar las funciones mostrarCarrito(), actualizar sumaTotal con el nuevo objeto agregado, ejecutar la funcion sumaCarrito(), y guardar en localStorage el carrito en este momento
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
};



// Ejecutar funcion mostrar carrito al inicio para mostrar el contenido guardado en localstorage
mostrarCarrito();
// Ejecutar funcion mostrar productos al inicio para mostrar los productos del array en el json
mostrarProductos();
// Ejecutar funcion sumar carrito al inicio para mostrar el total
sumaCarrito();
});