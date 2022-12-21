// fetchData()
const img = document.getElementById('imagen');
let arrayMoment=[]

const fetchimg = async (id) => {
    const pokemonos = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const dataimg = await pokemonos.json();
    img.setAttribute('src', dataimg.sprites.other.dream_world.front_default);
}
const fetchData = async () => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/generation/generation-i`);
        const pokemonos = await fetch('https://pokeapi.co/api/v2/pokemon/1');
        const dataimg = await pokemonos.json();
        const data = await res.json();
        const pokemon = { img: dataimg.sprites.other.dream_world.front_default, name: data.name, lista: data.pokemon_species };
        llenarSelect(pokemon.lista);
        
    } catch (error) {
        console.log(error)
    }
}
    fetchData()

    //Lenar select

const llenarSelect = (lista) => {
    const select = document.getElementById('pokemones');
    select.addEventListener('change', ( event ) => {
        name = event.target.value
        fetchimg(event.target.value)
        let container =document.querySelector(".contenedor")
        let parrafo= document.getElementById("pokemon")
        parrafo.textContent=name
     })

    for (const key in lista) {
        const opcion = document.createElement('option');
        opcion.setAttribute('value', lista[key].name)
        opcion.textContent = lista[key].name;
        select.append(opcion)
    }              
}



    // CONFETI------------------------------------
    const jsConfetti = new JSConfetti()

    //Boton e icono global------------------------
    let enviarConfeti = document.getElementById("enviarConfeti")

    let button = document.getElementById("button")
    const icono =document.getElementById("bi")

    //Confeti funcion
        enviarConfeti.addEventListener("click", (e) => {
        jsConfetti.addConfetti()
    })

    //Botones Efectos

    button.addEventListener("click", function(){
    
        icono.style.color="white"
        button.style.backgroundColor="#dc3545"
        button.style.color="white"
    })

    //Selector al cambiar de pokemon el button vuelva a su estado normal
    const select = document.getElementById('pokemones');
    select.addEventListener('change', function() {
        
        icono.style.color="#dc3545"
        button.style.backgroundColor="white"
        button.style.color="#dc3545"

        parrafo.style.color="black"
    })
    const container = document.querySelector(".contenedor")
    const parrafo = document.getElementById("pokemon")
    button.addEventListener("click",function(){
        parrafo.style.color="#dc3545"
    })

//API
// Mostrar un usuario por ID
    

        fetch(`http://localhost:3000/api/usuarios/63a231c6bc21e97d1b6747e3`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            arrayMoment=[...data.pokefavoritos]
            console.log(arrayMoment)
        } )
   

    // intento de YOUTUBE
    enviarConfeti.addEventListener("click", function(){
        llenarSelect()
        arrayMoment.push(name)
        // console.log(arrayMoment)
        let url="http://localhost:3000/api/usuarios/63a231c6bc21e97d1b6747e3"

    let payload = {
        // nombre:"Michel",
        // apellido: "vacomix",
        // usuario: "NoobMaster69",
        // email: "Vacomilay@gmail.com",
        // password: "almohadin",
        pokefavoritos:arrayMoment
    }

    let options ={
        method:"PUT",
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }

    fetch(url, options)
        .then(response => console.log(response.status))

    })