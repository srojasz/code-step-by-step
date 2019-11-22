"use strict";

const fr = new FileReader(); // Con esto creamos un nuevo objeto File Reader

// Nos traemos los elementos del DOM que necesitamos para ejecutar las funciones relacionadas con leer, cargar y pintar la imagen: el botón de añadir imagen, el input type file, la miniatura y la imagen de la tarjeta

const uploadBtn = document.querySelector(".js__profile-trigger");
const fileField = document.querySelector(".js__profile-upload-btn");
const profileImage = document.querySelector(".js__profile-image");
const profilePreview = document.querySelector(".js__profile-preview");

// Con esta función gestionamos todo lo relativo a cargar/leer la imagen
function getImage(e) {
  // almacenamos en la constante myFile el primer archivo que cargamos desde nuestro pc
  const myFile = e.currentTarget.files[0];
  // establecemos dos órdenes sobre el objeto file reader
  // 1º cuando se produzca el evento cargar en el fr, se ejecuta la función setImage (está definida y explicada más adelante)
  fr.addEventListener("load", setImage);
  // 2º se le pide que lea los datos de la URL de myFile (es decir, del archivo que hemos cargado desde el ordenador)
  fr.readAsDataURL(myFile);
}

// Con la función setImage leemos la info de la imagen. Para ello definimos una variable llamada picture con un string vacío (cuando tengamos en cuenta las cookies del navegador estará relleno con el nombre de la variable donde almacenemos los datos ls, pero de momento se queda vacío al principio).

let picture = "";

function setImage() {
  // Una vez que cargamos la imagen con el FR, se rellena con el fr.result (que es una propiedad del objeto fr con la info de la foto que necesitamos para pintarla)
  picture = fr.result;
  // Por último, setImage también ejecuta la función previewImage, que se encarga de pintar los datos almacenados en picture (siempre y cuando no sea un string vacío) en los contenedores de la miniatura y la imagen de la card. Son background-image (no img src en el html), con lo que para verse correctamente hay que añadir bakcground-position:center, background-size: cover.
  previewImage();
}

function previewImage() {
  if (picture !== "") {
    profileImage.style.backgroundImage = `url(${picture})`;
    profilePreview.style.backgroundImage = `url(${picture})`;
  }
}

// Estas últimas líneas ponen en marcha el botón que nos permite añadir una imagen desde nuestro PC. Hay un input type=file (que tenemos que ocultar en el css con un display: none) y un button que están a la par en el form (son hermanos).

function fakeFileClick(ev) {
  // Tenemos que dar dos órdenes para que funcione: parar el botón (preventDefalut)
  ev.preventDefault();
  // Y simular una especie de click automático en el input file (que ya hemos nombrado arriba del todo como fileField) para que se nos abra la ventana del ordenador para buscar la imagen que queremos seleccionar.
  fileField.click();
}

// Por último, los listener: uno en el botón de añadir imagen que, cuando haga click el usuario, tiene que poner en marcha todo lo anterior (prevenir botón y hacer click en el input). Y otro en el propio input, que cuando haya un cambio tiene que activar la función getImage (todo lo relacionado con cargar, leer y pintar la imagen.)

uploadBtn.addEventListener("click", fakeFileClick);
fileField.addEventListener("change", getImage);
