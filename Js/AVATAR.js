
//Mapa Responsive: Para crear un mapa responsive debemos utilizar una regla de tres simples, si nuestro mapa tiene una resolucion de 800x600 entonces multiplicar nuestro nuevo ancho por el alto divido el ancho.
//El atributo innerWidth en window nos permite conseguir el ancho de la pantalla.  

const SectionReiniciar = document.getElementById("reiniciar")
const SectionAtaque = document.getElementById("eleccion-ataque")
const sectionInicio = document.getElementById("inicio")
const botonCombateSimple = document.getElementById("combate-simple")
const botonCombateRandom = document.getElementById ("combate-random")
const SectionMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const SectionCajaDeDirecciones = document.getElementById("caja-de-teclas")

const contenedorDeAtaques = document.getElementById("contenedor-de-ataques")

const spanJugador = document.getElementById("jugador")
const botonSeleccionarModo = document.getElementById("boton-seleccionar-modo")
const botonSeleccionar = document.getElementById("boton-seleccionar")
const SectionSeleccionPersonaje = document.getElementById("seleccionar-personaje")
const botonReiniciar = document.getElementById("boton-reiniciar")

const spanEnemigo = document.getElementById("enemigo")
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const spanVictoriasJugador = document.getElementById("victorias-jugador")
const spanVictoriasEnemigo = document.getElementById("victorias-enemigo")

const spanMensaje = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataques-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataques-del-enemigo")

const cajaDePersonajes = document.getElementById ("caja-de-personajes")


let lienzo = mapa.getContext("2d") 
//El metodo "getContext() nos permite definir el contexto en el que vamos a dibujar en nuestro Canvas, por ejemplo en este caso seria un lienzo 2d, por tanto el atributo que se le concede entre parentesis es "(2d)"//

let jugadorId = null
let eleccionEnemigo = 0
let numerosNoRepetitivos = []
let combatientes = []
let opcionesDeCombatientes 
let opcionesDeAtaques
let inputmang 
let inputmatara
let inputmuko
let inputtopo 
let inputSokku
let personajeSeleccionado
let combatiente = []
let botones = []  
let ataqueJugador = []
let ataqueEnemigo = []
let contenedorAtaquesEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let resultado
let indexjugador
let indexEnemigo
let intervalo
let intervalo2
let mapaBackground = new Image
mapaBackground.src = "./assets/Mapa.png"
var porcentajeDeReduccionDePersonajesX = 0.0
var porcentajeDeReduccionDePersonajesY = 0.0
let anchoOriginalDelMapa = 600
let altoOriginalDelMapa = 450
let ultimoAnchoDeVentana
let altoUltimoDeMapa 
let anchoUltimoDeMapa

let anchoDelMapa 
let alturaQueBuscamos 
const anchoMaximoDelMapa = 600

class Personaje {
    constructor (nombre, foto, vida, tribu, fotoMapa, x =20, y = 30, tipo = "jugador") {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.tribu = tribu
        this.ataques = []
        this.x = x
        this.y = y
        this.tipo = tipo
        this.ancho = 80
        this.alto = 80
        this.velocidadX = 0
        this.velocidadY = 0
        this.fotoMapa = new Image
        this.fotoMapa.src = fotoMapa
    }
    pintarPersonaje() {
    lienzo.drawImage(
        this.fotoMapa,
        this.x,
        this.y,
        this.ancho,
        this.alto,
        )
    }
}
let Mang = new Personaje ("Mang", "./assets/Mang.png", 5, "TIERRA","./assets/Mang_head.png", 490, 300)
let Matara = new Personaje ("Matara", "./assets/Matara.png", 5, "AGUA", "./assets/Matara_head.png", 270, 45)
let Muko = new Personaje ("Muko", "./assets/Muko.png", 5, "FUEGO","./assets/Muko_head.png", 35, 300)
let Topo = new Personaje ("Topo", "./assets/Topo.png", 5, "TIERRA","./assets/Topo_head.png", 490, 60)
let Sokku = new Personaje ("Sokku", "./assets/Sokku.png", 5, "AGUA","./assets/Sokku_head.png", 35, 55)

function reajustarMapa () {
    anchoDelMapa = window.innerWidth - 20
    if (anchoDelMapa > anchoMaximoDelMapa) {
        anchoDelMapa = anchoMaximoDelMapa
    }
    alturaQueBuscamos = anchoDelMapa * 600 / 800

    mapa.width = anchoDelMapa
    mapa.height = alturaQueBuscamos
}
Mang.ataques.push (
    { nombre:"🏔️", id:"boton-tierra"},
    { nombre:"🏔️", id:"boton-tierra"},
    { nombre:"🏔️", id:"boton-tierra"},
    { nombre:"🔥", id:"boton-fuego"},
    { nombre:"💧", id:"boton-agua"},
        )
    Topo.ataques.push (
        { nombre:"🏔️", id:"boton-tierra"},
        { nombre:"🏔️", id:"boton-tierra"},
        { nombre:"🏔️", id:"boton-tierra"},
        { nombre:"🔥", id:"boton-fuego"},
        { nombre:"💧", id:"boton-agua"},
    )
    Matara.ataques.push (
        { nombre:"💧", id:"boton-agua"},
        { nombre:"💧", id:"boton-agua"},
        { nombre:"💧", id:"boton-agua"},
        { nombre:"🔥", id:"boton-fuego"},
        { nombre:"🏔️", id:"boton-tierra"},
    )
    Sokku.ataques.push (
        { nombre:"💧", id:"boton-agua"},
        { nombre:"💧", id:"boton-agua"},
        { nombre:"💧", id:"boton-agua"},
        { nombre:"🔥", id:"boton-fuego"},
        { nombre:"🏔️", id:"boton-tierra"},
    )
    Muko.ataques.push (
        { nombre:"🔥", id:"boton-fuego"},
        { nombre:"🔥", id:"boton-fuego"},
        { nombre:"🔥", id:"boton-fuego"},
        { nombre:"🏔️", id:"boton-tierra"},
        { nombre:"💧", id:"boton-agua"},
    )
combatientes.push(Mang, Matara, Muko, Topo, Sokku)

function reajustarTamaños () {
    porcentajeDeReduccionDePersonajesX = anchoDelMapa / anchoUltimoDeMapa
    porcentajeDeReduccionDePersonajesY = alturaQueBuscamos / altoUltimoDeMapa
    
    combatientes.forEach(combatiente => {
        combatiente.x = combatiente.x * porcentajeDeReduccionDePersonajesX
        combatiente.y = combatiente.y * porcentajeDeReduccionDePersonajesY
        combatiente.alto = combatiente.alto * porcentajeDeReduccionDePersonajesY
        combatiente.ancho = combatiente.ancho * porcentajeDeReduccionDePersonajesX
    });
    ultimoAnchoDeVentana = window.innerWidth + 20
    anchoUltimoDeMapa = anchoDelMapa
    altoUltimoDeMapa = alturaQueBuscamos
}
reajustarMapa ()
anchoUltimoDeMapa = anchoOriginalDelMapa
altoUltimoDeMapa = altoOriginalDelMapa
reajustarTamaños ()

function revisarTamaño () {
    if (window.innerWidth + 20 !== ultimoAnchoDeVentana) {
        reajustarMapa ()
        reajustarTamaños ()
    }
}

function random (min, max) {
    return Math.floor (Math.random () * (max - min + 1) + min)
}
function randomNoSeRepite(cantidad, rango) {
    let i = 0
    numerosNoRepetitivos.length = rango
    // numerosNoRepetitivos[i] =  Math.floor (Math.random() *rango)
    for (let i = 0; i < cantidad; i++) {
        numerosNoRepetitivos[i] = Math.floor (Math.random() *rango)
        for (let j = 0; j < i; j++) {
            if (numerosNoRepetitivos[i] == numerosNoRepetitivos[j]) {
                i--
            }
        }
    }
}
function iniciarjuego() {
    SectionReiniciar.style.display = "none"
    SectionAtaque.style.display = "none"
    SectionMapa.style.display = "none"
    SectionSeleccionPersonaje.style.display = "none"
    intervalo2= setInterval (revisarTamaño, 500)

    combatientes.forEach((Personaje) => {
        opcionesDeCombatientes = `
        <input type="radio" name="personaje" id=${Personaje.nombre}>
        <label class="tarjeta" for=${Personaje.nombre}>
        <p>${Personaje.nombre}</p>
        <img src=${Personaje.foto} alt=${Personaje.nombre}>
        </label>
        `
        cajaDePersonajes.innerHTML += opcionesDeCombatientes
        
        inputmang = document.getElementById("Mang")
        inputmatara = document.getElementById("Matara")
        inputmuko = document.getElementById("Muko") 
        inputtopo = document.getElementById("Topo") 
        inputSokku = document.getElementById("Sokku") 
    })
    botonSeleccionarModo.addEventListener ("click", seleccionDeModo)
    botonSeleccionar.addEventListener ("click", seleccionDePersonaje)
    unirseAlJuego()
}
function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then (function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionDeModo() {
    if (botonCombateSimple.checked) {
        sectionInicio.style.display = "none"
        SectionSeleccionPersonaje.style.display = "flex"
    }else {
        alert("Debes seleccionar un modo para continuar")
    }
}

function seleccionDePersonaje() {
    if (inputmang.checked) {
        spanJugador.innerHTML = inputmang.id
        personajeSeleccionado = inputmang.id
    } else if (inputmatara.checked) {
        spanJugador.innerHTML = inputmatara.id
        personajeSeleccionado = inputmatara.id
    } else if (inputmuko.checked) {
        spanJugador.innerHTML= inputmuko.id
            personajeSeleccionado = inputmuko.id
        } else if (inputtopo.checked) {
            spanJugador.innerHTML= inputtopo.id
            personajeSeleccionado = inputtopo.id
        } else if (inputSokku.checked) {
            spanJugador.innerHTML= inputSokku.id
            personajeSeleccionado = inputSokku.id
        } else {
            alert("Debes elegir un personaje para continuar la aventura")
            return
        } 
            
            seleccionarPersonaje(personajeSeleccionado)
            

            SectionSeleccionPersonaje.style.display = "none"
            SectionCajaDeDirecciones.style.display = "grid"
        extraerAtaques (personajeSeleccionado)
        iniciarMapa ()
        }
function seleccionarPersonaje (personajeSeleccionado) {
    fetch(`http://localhost:8080/personaje/${jugadorId}`,{
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            personaje: personajeSeleccionado
        })
    } )
}

function extraerAtaques (personajeSeleccionado) {
        let ataques
        let tribuJugador
        for (let i = 0; i < combatientes.length; i++) {
            if (personajeSeleccionado === combatientes[i].nombre) 
            {   tribuJugador = combatientes[i].tribu
                ataqueExtra(tribuJugador, combatientes[i].ataques)                
                ataques = combatientes[i].ataques
                combatiente = combatientes[i]
            }
        }
        mostrarAtaques(ataques)
        }
        
function ataqueExtra (tribu, listaDeAtaques) {
        if (tribu === "FUEGO") {
            listaDeAtaques.push ({nombre:"🔥", id:"boton-fuego"})
        }else if (tribu === "AGUA") {
            listaDeAtaques.push ({nombre:"💧", id:"boton-agua"})
        }else {
            listaDeAtaques.push ({nombre:"🏔️", id:"boton-tierra"})}
        }

function pintarCanvas () {
    //el metodo "drawImage() es para insertar una imegen en nuestro canvas" 
    //el metodo "fillRect" Nos permite dibujar cuadrados o rectangulos en nuestro canvas//
    //el metodo clearRect () sirve para limpiar el canvas, para eso hay que darle las medidas que quieres limpiar del mapa
    combatiente.x = combatiente.velocidadX + combatiente.x
    combatiente.y = combatiente.velocidadY + combatiente.y
    lienzo.clearRect (0, 0, mapa.width, mapa.height)
    lienzo.drawImage (
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    combatiente.pintarPersonaje()
    enviarPosicion(combatiente.x, combatiente.y)
    pintarEnemigos()
    if (combatiente.velocidadX !== 0 || combatiente.velocidadY !== 0 ) {
        for (let i = 0; i < combatientes.length; i++) {
            if (combatientes[i].nombre !== combatiente.nombre) {
            revisarColisiones (combatientes[i])}
        }
    }
}
function enviarPosicion(x, y) {
fetch(`http://localhost:8080/personaje/${jugadorId}/posicion`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify ({
        x,
        y
    })
})
}
function pintarEnemigos () {
    for (let i = 0; i < combatientes.length; i++) {
        if (combatientes[i].nombre != combatiente.nombre) {
        combatientes[i].pintarPersonaje()
        }
    }
}
function moverIzquierda () {
        combatiente.velocidadX = -5
        pintarCanvas ()
        }
function moverDerecha () {
        combatiente.velocidadX = 5
        pintarCanvas ()
        }
function moverArriba () {
        combatiente.velocidadY = -5
        pintarCanvas ()
        }
function moverAbajo () {
        combatiente.velocidadY = 5
        pintarCanvas ()
        }
function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
    
        default:
            break;
    }
}
function detenerMovimiento () {
    combatiente.velocidadX = 0
    combatiente.velocidadY = 0
}
function iniciarMapa () {
    intervalo = setInterval (pintarCanvas, 50)
    SectionMapa.style.display = "flex"
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function revisarColisiones (enemigo) {

    const arribaCombatiente = combatiente.y
    const abajoCombatiente = combatiente.y + combatiente.alto
    const izquierdaCombatiente = combatiente.x 
    const derechaCombatiente = combatiente.x + combatiente.ancho
    
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x 
    const derechaEnemigo = enemigo.x + enemigo.ancho
    
    if (
        abajoCombatiente < arribaEnemigo ||
        arribaCombatiente > abajoEnemigo ||
        derechaCombatiente < izquierdaEnemigo ||
        izquierdaCombatiente > derechaEnemigo
    ){
        return;
    }
    removeEventListener("keydown", sePresionoUnaTecla)
    detenerMovimiento
    clearInterval(intervalo)
    SectionAtaque.style.display = "flex"
    SectionMapa.style.display = "none"
    SeleccionEnemigo(enemigo)
    // alert("Hay colision")

}
function mostrarAtaques(ataques) {
        ataques.forEach((ataque) => {
            opcionesDeAtaques = `<button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
            contenedorDeAtaques.innerHTML += opcionesDeAtaques
        }) 
        botones = document.querySelectorAll (".BAtaque")
        }
function SeleccionEnemigo (enemigo) { 
    spanEnemigo.innerHTML = enemigo.nombre
    contenedorAtaquesEnemigo = enemigo.ataques
    randomNoSeRepite(contenedorAtaquesEnemigo.length, contenedorAtaquesEnemigo.length)
    secuenciaDeAtaque ()
}
function secuenciaDeAtaque () {
    botones.forEach ((boton) => {
        boton.addEventListener ("click", (e) => {        
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("🔥")
            boton.style.background = "#112f58"
            boton.disabled = true
        }
        else if (e.target.textContent === "💧") {
            ataqueJugador.push("💧")
            boton.style.background = "#112f58"
            boton.disabled = true
        }
        else {
            ataqueJugador.push("🏔️")
            boton.style.background = "#112f58"
            boton.disabled = true
        }
        iniciarPelea ()
    })
    })
}
function ataqueEnemigoAleatorio () {
    for (let i = 0; i < contenedorAtaquesEnemigo.length; i++) {
            ataqueEnemigo.push(contenedorAtaquesEnemigo[numerosNoRepetitivos[i]].nombre)
    }
    }   
function indexOponentes (jugador, enemigo) {
    indexjugador = ataqueJugador[jugador]
    indexEnemigo = ataqueEnemigo[enemigo]
}
function iniciarPelea () {
    if (ataqueJugador.length === 5) {
        ataqueEnemigoAleatorio ()
        definirResultado ()
    }
}
function definirResultado () {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexOponentes(index, index)
            crearParrafo ("Empate")
        }else if (ataqueJugador[index] === "🔥" && ataqueEnemigo[index] === "🏔️"){
            indexOponentes(index, index)
            victoriasJugador++
            crearParrafo("GANASTE")
            spanVictoriasJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[index] === "💧" && ataqueEnemigo[index] === "🔥") {
            indexOponentes(index, index)
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
            crearParrafo("GANASTE")
        }else if (ataqueJugador[index] === "🏔️" && ataqueEnemigo[index] === "💧") {
            indexOponentes(index, index)
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
            crearParrafo("GANASTE")
        }else { 
            indexOponentes(index, index)
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
            crearParrafo("PERDISTE")
        }}
            revisarVidas ()
        }
function revisarVidas() {
        if (victoriasJugador === victoriasEnemigo ) {
        crearMensajeFinal ("Esto fue un empate!")
        } else if (victoriasJugador > victoriasEnemigo) {
            crearMensajeFinal("Felicidades, ¡Ganaste!")
        } else {
            crearMensajeFinal("Lo siento, perdiste")
        }
    }
function crearParrafo (resultado) {    
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    spanMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexjugador
    nuevoAtaqueDelEnemigo.innerHTML = indexEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    }
function crearMensajeFinal (resultadoFinal) {
    let parrafo = document.createElement("p")
    let botonTierra = document.getElementById("boton-tierra")

    SectionReiniciar.style.display = "flex"
    spanMensaje.innerHTML = resultadoFinal
    spanMensaje.appendChild(parrafo)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    }
function reiniciarJuego () {
    location.reload()
    }
    window.addEventListener("load", iniciarjuego)