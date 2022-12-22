let boton = document.getElementById("mostrar")
let presentacion = document.getElementById('presentacion')
// const contenedorpoke = document.getElementById('lists__pokemons');

// let idusuario = JSON.parse(localStorage.getItem('idpoke'));
// let username;
const contenedorpoke = document.getElementById('lists__pokemons'); let idusuario = JSON.parse(localStorage.getItem('idpoke')); let username;
let arrpokemones = [];
document.addEventListener('DOMContentLoaded', async() => {
    await cargarUsuarios();
})
    function cargarUsuarios() {
        fetch(`http://localhost:3000/api/usuarios/${idusuario}`)
            .then(respuesta => respuesta.json())
            .then(usuario => {

                username = usuario.usuario;

                if(usuario.pokefavoritos.length < 1) {
                    const titulo = `<h1 class="text-center mt-4 mb-4">${username}<span class="text-white"> aún no tienes pokemones favoritos:🥵 Añadelos <a href="listapoke.html" class="text-warning">aquí</a></span></h1>`
                     presentacion.innerHTML = titulo;
                }else {
                    const titulo = `<h1 class="text-center fw-bold text-white mt-4 mb-4">${username}<span class="text-warning"> aqui estan tus pokemones favoritos:</span></h1>`
                    presentacion.innerHTML = titulo;
                    
                    usuario.pokefavoritos.forEach((pokemon, numero) => {
                        arrpokemones.push(pokemon);
                        DataPokemons(pokemon, numero);
                    })
                }

                
            }) // Aquí mostramos dicha información
            .catch(error => console.log('Hubo un error : ' + error.message))
    }
const lists__pokemons = document.getElementById('lists__pokemons')
const buttons = document.getElementById('buttons')

const DataPokemons = async (data, n) => {
    // console.log(arrpokemones);
    lists__pokemons.innerHTML = '';
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
        const resul = await resp.json();
        // console.log(resul)
        templateHtml=`
        <div class="pokemon__img" id="${n}">
        <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
        <p class="text-white">${resul.name}</p>
        <button id="${n}" class="btn btn-danger">Eliminar</button>
        </div>
        `
        lists__pokemons.innerHTML+=templateHtml
        
    } catch (error) {
        console.log(error)
    }
}


// Elimando pokemonos - no tocar
    contenedorpoke.addEventListener('click', (e) => {
        if(e.target.textContent === 'Eliminar') {
            const pokeeliminar = e.target.previousElementSibling.textContent;

            let respuesta = confirm(`Estas seguro de eliminar a ${pokeeliminar}?`)

            if(respuesta) {
                console.log(arrpokemones.indexOf(pokeeliminar));
                arrpokemones.splice(arrpokemones.indexOf(pokeeliminar), 1)

                eliminarPokemoncito(arrpokemones);

            }

        }
       
    }) // Fin de eliminar

    async function eliminarPokemoncito() {
        await fetch(`http://localhost:3000/api/usuarios/${idusuario}`, {
                    method: "PUT",
                    mode: "cors",
                    headers : {'Content-Type': 'application/json'},
                    body: JSON.stringify({pokefavoritos: arrpokemones})
        })
        arrpokemones = []
        cargarUsuarios()

    }



/*** FAVORITOS ***/

// let url = 'http://localhost:3000/api/usuarios/';
// fetch(url)
// .then( response => response.json() )
// .then( data => mostrarData(data) )
// .catch( error => console.log(error) )

// const mostrarData = (data) => {
// console.log(data)
// let body = ""
// for (var i = 0; i < data.length; i++) {
// body+=`<tr><td>${data[i].pokefavoritos}</td><td>${data[i].email}</td></tr>`
// }
// document.getElementById('data').innerHTML = body
// console.log(body)
// }
// mostrarData()
// console.log(data.name)

// document.addEventListener("click", async (e) => {
// if (e.target.matches("button")) {
// const respConfirm = confirm("Eliminar de favoritos?");
// if (respConfirm) {
// const result = await fetch(
// `http://localhost:3000/api/usuarios${e.target.id}`,
// {
// method: "PUT",
// headers: {
// "Content-Type": "application/json",
// },
// }
// );
// const data = await result.json();
// console.log(data);
// cargarPokemones();
// }
// return;
// }
// });
