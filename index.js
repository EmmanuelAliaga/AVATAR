const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())


const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarCombatiente(combatiente) {
        this.combatiente = combatiente
    }
}
class Combatiente {
    constructor(nombre) {
        this.nombre = nombre 
    }
     
}

app.get("/unirse", (req, res) =>{
    const id = `${Math.random()}`

    const jugador = new Jugador (id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/personaje/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.personaje || ""
    const combatiente = new Combatiente(nombre)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarCombatiente(combatiente)
        console.log(jugadorIndex)
    }
    console.log(jugadores)
})

app.listen(8080, () =>{
    console.log("Servidor funcionando")
})