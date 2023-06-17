import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
import {getDatabase, ref, onValue, update, push,child,set}  from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js'





const firebaseConfig = {
    apiKey: "AIzaSyAwsqo6cPBggrFohLizcSX-jz5nSzyqu7k",
    authDomain: "chatpro3-67b94.firebaseapp.com",
    projectId: "chatpro3-67b94",
    storageBucket: "chatpro3-67b94.appspot.com",
    messagingSenderId: "437144700135",
    appId: "1:437144700135:web:e85a38a141d1f62cacce42"
  };
  
 
  const app = initializeApp(firebaseConfig);


  var nombreus = document.getElementById("nombreus");
  var btniniciar = document.getElementById("btniniciar");
  var btnsalir = document.getElementById("btnsalir");
  var textomensaje = document.getElementById("textomensaje");
  var mensajesChat= document.getElementById("mensajesChat");
  var  usuarioconectado = "";
  var textomensaje = document.getElementById("textomensaje");
  var enviarMensajeBtn = document.getElementById("enviarMensajeBtn");
  var problemabtn = document.getElementById("problemabtn");

  
 btniniciar.onclick = async function () {
    var auth = getAuth();
    var providor = new GoogleAuthProvider();
    auth.languageCode = 'es';
    var response = await signInWithPopup(auth, providor);
    nombreus.innerText = response.user.email;
    btniniciar.style.display = "none";
    btnsalir.style.display = "flex";
    usuarioconectado =response.user.email;
    escucharYDibujarMensajes();

  }

btnsalir.onclick = async function () {
    var auth = getAuth();
    await auth.signOut();
    btniniciar.style.display = "flex";
    btnsalir.style.display = "none";
    nombreus.innerText = "No Conectado";
    usuarioconectado = ""

}

enviarMensajeBtn.addEventListener("click", async function() {
    await enviar();
  });

  async function enviar() {
    if (usuarioconectado === "") {
      alert("El usuario necesita iniciar sesión para enviar el mensaje");
      return;
    }
  
    var mensaje = textomensaje.value.trim();
    
    if (mensaje === "") {
      alert("no puedes enviarlo hasta que tenga algo escrito");
      return;
    }
  
    var db = getDatabase();
    var referenciaAMensajes = ref(db, "mensajes");
    var nuevaLlave = push(child(ref(db), "mensajes")).key;
    var nuevosDatos = {
      [nuevaLlave]: {
        usuario: usuarioconectado,
        mensaje: mensaje,
        fecha: new Date().toLocaleDateString()
      }
    };
  
    textomensaje.value = "";
  
    await update(referenciaAMensajes, nuevosDatos);
  }


  function escucharYDibujarMensajes() {
    var db = getDatabase();
    var referenciaAMensajes = ref(db, "mensajes");
    onValue(referenciaAMensajes, function(datos) {
      var valoresObtenidos = datos.val();
      mensajesChat.innerHTML = "";
      Object.keys(valoresObtenidos).forEach(llave => {
        var mensajeDescargado = valoresObtenidos[llave];
        var mensaje = "<div class='mensaje'>";
        mensaje += "<div class='usuario'>" + mensajeDescargado.usuario + "</div>";
        mensaje += "<div class='mensajechats'>" + mensajeDescargado.mensaje + "</div>";
        mensaje += "<div class='fecha'>" + mensajeDescargado.fecha + "</div>";
        mensaje += "</div>";
        mensajesChat.innerHTML += mensaje;
      });
    });
  }
  

 problemabtn.addEventListener("click", enviarConsultas);

 async function enviarConsultas() {
   if (usuarioconectado === "") {
     alert("El usuario necesita iniciar sesión para enviar su problema");
     return;
   }
 
   var consultas = problemtext.value.trim();
 
   if (consultas === "") {
     alert("No puedes enviar una consulta vacía");
     return;
   }
 
   var db = getDatabase();
   var referenciaAConsultas = ref(db, "consultas");
 
   var nuevosDatos = {
     usuario: usuarioconectado,
     consulta: consultas
   };
 
   problemtext.value = "";
 
   await push(referenciaAConsultas, nuevosDatos);
   alert("La consulta ha sido enviada correctamente.");
 }
 















 
 
 
 
 
 
 
 
 
 
  
 
  
  
  
  
  