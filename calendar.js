//Arrays de datos:
meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
lasemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
diassemana = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//Tras cargarse la página ...
window.onload = function () {
  //fecha actual
  hoy = new Date(); //objeto fecha actual
  diasemhoy = hoy.getDay(); //dia semana actual
  diahoy = hoy.getDate(); //dia mes actual
  meshoy = hoy.getMonth(); //mes actual
  annohoy = hoy.getFullYear(); //año actual
  // Elementos del DOM: en cabecera de calendario 
  tit = document.getElementById("titulos"); //cabecera del calendario
  ant = document.getElementById("anterior"); //mes anterior
  pos = document.getElementById("posterior"); //mes posterior
  // Elementos del DOM en primera fila
  f0 = document.getElementById("fila0");
  //Pie de calendario
  pie = document.getElementById("fechaactual");

  //formulario: datos iniciales:

  // Definir elementos iniciales:
  mescal = meshoy; //mes principal
  annocal = annohoy //año principal
  //iniciar calendario:
  cabecera()
  primeralinea()
  escribirdias()
}

//FUNCIONES de creación del calendario:

//cabecera del calendario
function cabecera() {
  tit.innerHTML = meses[mescal] + " " + annocal;
  mesant = mescal - 1; //mes anterior
  mespos = mescal + 1; //mes posterior
  if (mesant < 0) {
    mesant = 11;
  }
  if (mespos > 11) {
    mespos = 0;
  }
  ant.innerHTML = meses[mesant]
  pos.innerHTML = meses[mespos]
}

//primera línea de tabla: días de la semana.
function primeralinea() {
  for (i = 0; i < 7; i++) {
    celda0 = f0.getElementsByTagName("th")[i];
    celda0.innerHTML = diassemana[i]
  }
}

//B. FUNCIÓN PARA RELLENAR LA CUADRÍCULA DE DÍAS, se llama "escribirdias()"//

//[Info:Debemos hacer coincidir cada día del mes con el día de la semana que le corresponde. Las celdas sobrantes deben ser llenadas también con los números de los días correspondientes a los meses anterior y posterior]//

function escribirdias() {
  //1º:Buscar el día de la semana en que cae el día 1 del mes//
  primeromes = new Date(annocal, mescal, "1") //Nuevo objeto:"primeromes" ¿qué hace? tener la fecha 1
  prsem = primeromes.getDay() //"getDay" nos da en qué día de la semana cae(cuidado:en el calendario inglés, desde el domingo)
  prsem--; //Para adaptar al calendario español (y empezar por lunes)se le restará uno
  if (prsem == -1) {
    prsem = 6;
  } //A menos que sea domingo, entonces la resta dará "-1" y lo transformamos en "6" (i.e.domingo)

  //2º Asignarle un valor de fecha a la primera celda:
  //[info:Para buscar la fecha de la primera celda restamos a la fecha de primero de mes el valor de "prsem", ya que este número es igual a las celdas que deben quedar a la izquierda del día 1 del mes. El resultado lo ponemos en un nuevo objeto de fecha "diames", y así obtenemos la fecha de la primera celda]//
  diaprmes = primeromes.getDate()
  prcelda = diaprmes - prsem; //restar días que sobran de la semana
  empezar = primeromes.setDate(prcelda) //empezar= tiempo UNIX 1ª celda
  diames = new Date() //convertir en fecha
  diames.setTime(empezar); //diames=fecha primera celda.


  //3º Recorrer y escribir los días del calendario//
  //[info:Una vez que tenemos la fecha de la primera celda, dentro de esta misma función creamos dos bucles anidados que recorren las celdas. A cada celda le añadimos un día más que a la anterior, de esta manera escribimos los días del calendario]//

  //Recorrer las celdas para escribir el día:
  for (i = 1; i < 7; i++) { //localizar fila
    fila = document.getElementById("fila" + i);
    for (j = 0; j < 7; j++) {
      midia = diames.getDate()
      mimes = diames.getMonth()
      mianno = diames.getFullYear()
      celda = fila.getElementsByTagName("td")[j];
      celda.innerHTML = midia;

      //Recuperar estado inicial al cambiar de mes:
      celda.style.backgroundColor = "rgb(255, 255, 255)";
      celda.style.color = "#492736";

      //domingos en rojo
      if (j == 6) {
        celda.style.color = "#f11445";
      }

      //dias restantes del mes en gris
      if (mimes != mescal) {
        celda.style.color = "#a0babc";
      }

      //destacar la fecha actual
      if (mimes == meshoy && midia == diahoy && mianno == annohoy) {
        celda.style.backgroundColor = "rgba(0, 98, 255, 0.47)";
        celda.style.color = "rgb(255, 255, 255)";
        celda.innerHTML = "<cite title='Fecha Actual'>" + midia + "</cite>";
      }

      //pasar al siguiente día
      midia = midia + 1;
      diames.setDate(midia);
    }
  }
}

//Ver mes anterior
function mesantes() {
  nuevomes = new Date() //nuevo objeto de fecha
  primeromes--; //Restamos un día al 1 del mes visualizado
  nuevomes.setTime(primeromes) //cambiamos fecha al mes anterior 
  mescal = nuevomes.getMonth() //cambiamos las variables que usarán las funciones
  annocal = nuevomes.getFullYear()
  cabecera() //llamada a funcion de cambio de cabecera
  escribirdias() //llamada a funcion de cambio de tabla.
}

//ver mes posterior
function mesdespues() {
  nuevomes = new Date() //nuevo obejto fecha
  tiempounix = primeromes.getTime() //tiempo de primero mes visible
  tiempounix = tiempounix + (45 * 24 * 60 * 60 * 1000) //le añadimos 45 días 
  nuevomes.setTime(tiempounix) //fecha con mes posterior.
  mescal = nuevomes.getMonth() //cambiamos variables 
  annocal = nuevomes.getFullYear()
  cabecera() //escribir la cabecera 
  escribirdias() //escribir la tabla
}

//volver al mes actual
function actualizar() {
  mescal = hoy.getMonth(); //cambiar a mes actual
  annocal = hoy.getFullYear(); //cambiar a año actual 
  cabecera() //escribir la cabecera
  escribirdias() //escribir la tabla
}
