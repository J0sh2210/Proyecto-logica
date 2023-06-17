var carritoVisible = false;

if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready();
}
function ready(){
    var botonesEliminar = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminar.length; i++){
        var button = botonesEliminar[i];
        button.addEventListener('click', eliminarProdCarrito);
    }
    var botonesSumar = document.getElementsByClassName('sumar-cant');
    for(var i=0; i < botonesSumar.length;i++){
        var button = botonesSumar[i];
        button.addEventListener('click', sumarCantidad);
    }
    var botonesRestar = document.getElementsByClassName('restar-cant');
    for(var i=0; i < botonesRestar.length;i++){
        var button = botonesRestar[i];
        button.addEventListener('click', restarCantidad);
    }
    var botonesAgregar = document.getElementsByClassName('boton-produ');
    for(var i=0; i<botonesAgregar.length;i++){
        var button = botonesAgregar[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}

function eliminarProdCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    actualizarTotal();

    ocultarCarrito();
}
function actualizarTotal(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoProdu = carritoContenedor.getElementsByClassName('carrito-prod');
    var total = 0;

    for(var i=0; i < carritoProdu.length;i++){
        var prod = carritoProdu[i];
        var precioElemento = prod.getElementsByClassName('carrito-produ-precio')[0];
        console.log(precioElemento);

        var precio = parseFloat(precioElemento.innerText.replace('Q',''));
        console.log(precio);
        var cantidadProd = prod.getElementsByClassName('carrito-cant-produ')[0];
        var cantidad = cantidadProd.value;
        console.log(cantidad);
        total = total + (precio * cantidad);

    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = 'Q' + total.toLocaleString("es") + '.00';
}

function ocultarCarrito(){
    var carritoProdu = document.getElementsByClassName('carrito-produ')[0];
    if(carritoProdu.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity='0';
        carritoVisible = false;

        var produ = document.getElementsByClassName('contenedor-produ')[0];
        produ.style.width = '100%';
    }
}
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-cant-produ')[0].value;
    console.log(cantidadActual);
    cantidadActual ++;
    selector.getElementsByClassName('carrito-cant-produ')[0].value = cantidadActual;

    actualizarTotal();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-cant-produ')[0].value;
    console.log(cantidadActual);
    cantidadActual --;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-cant-produ')[0].value = cantidadActual;

    actualizarTotal();
    }
}
function agregarAlCarritoClicked(event){
    var button = event.target;
    var prod = button.parentElement;
    var titulo = prod.getElementsByClassName('nombre-produ')[0].innerText;
    console.log(titulo);
    var precio = prod.getElementsByClassName('precio-produ')[0].innerText;
    var imagenSrc = prod.getElementsByClassName('img-produ')[0].src;
    console.log(imagenSrc);
 
   agregarProdCarrito(titulo, precio, imagenSrc);

   hacerVisibleCarrito();
}

 function agregarProdCarrito(titulo, precio, imagenSrc){
    var prod = document.createElement('div');
    prod.classList.add = 'prod';
    var produCarrito = document.getElementsByClassName('carrito-produ')[0];

    var nombreProduCarrito = produCarrito.getElementsByClassName('carrito-produ-title');
    for(var i=0; i <nombreProduCarrito.length;i++){
        if(nombreProduCarrito[i].innerText==titulo){
            alert("El producto ya se encuentra en el carrito");
            return;
        }
    }
    var prodCarritoContenido = `
            <div class="carrito-prod">
            <img src="${imagenSrc}" alt="" width="80px">
            <div class="carrito-detalles-produ">
                <span class="carrito-produ-title">${titulo}</span>
                <div class="cantidad-select">
                <i class="fa-solid fa-minus restar-cant"></i>
                <input type="text" value="1" class="carrito-cant-produ" disabled>
                <i class="fa-solid fa-plus sumar-cant"></i>
            </div>
            <span class="carrito-produ-precio">${precio}</span>
            </div>
            <span class="btn-eliminar">
                <i class="fa-solid fa-trash-can"></i>
            </span>
            </div>
    `
    prod.innerHTML = prodCarritoContenido;
    produCarrito.append(prod);

    prod.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarProdCarrito);

    var botonSumarCant = prod.getElementsByClassName('sumar-cant')[0];
    botonSumarCant.addEventListener('click', sumarCantidad);

    var botonRestarCant = prod.getElementsByClassName('restar-cant')[0];
    botonRestarCant.addEventListener('click', restarCantidad);
 }
 function pagarClicked(event){
    alert("Gracias por su compra");

    var carritoProdu = document.getElementsByClassName('carrito-produ')[0];
    while(carritoProdu.hasChildNodes()){
        carritoProdu.removeChild(carritoProdu.firstChild);
    }
    actualizarTotal();

    ocultarCarrito();
 }
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var produ = document.getElementsByClassName('contenedor-produ')[0];
    produ.style.width = '60%';

}