
const tabla = document.querySelector('#lista-usuarios tbody');
            
let boton = document.getElementById("mostrar")

boton.addEventListener("click", function() {
    function cargarUsuarios() {
        fetch(`http://localhost:3000/api/usuarios/63a231c6bc21e97d1b6747e3`)
            .then(respuesta => respuesta.json()) //Indicamos el formato en que se desea obtener la información
            .then(usuarios => {
                console.log(usuarios)
                 usuarios.pokefavoritos.forEach(pokemon => {
                     const row = document.createElement('tr');
                    row.innerHTML += `
                          <td>${pokemon}</td>
                      `;
                      tabla.appendChild(row)})


        fetch(`http://localhost:3000/api/usuarios`)   
                .then(respuesta => respuesta.json())
                .then(data => {
                    console.log(data)
                obtusuarios=data.map(user.usuario)
                console.log(obtusuarios)})    

                    // tabla.appendChild(row);
    
                    // const card = document.createElement('card');
                    // card.classList = 'card';
                    // card.innerHTML += `
                    //                 <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style="width:100%">
                    //                     <div class="container1">
                    //                         <h4><b>${usuario.pokefavoritos}</b></h4>
                                            
                    //                     </div>
                                
                    //             `;
    
                    // tabla.appendChild(card);
    
                
            }) // Aquí mostramos dicha información
            .catch(error => console.log('Hubo un error : ' + error.message))
    }
    cargarUsuarios();
})




  
const lists__pokemons = document.getElementById('lists__pokemons')
const buttons = document.getElementById('buttons')
let urlPokemon = ' https://pokeapi.co/api/v2/pokemon'
let btnNext;
let btnPrevious;
let templateHtml;
console.log('⏮⏩')

const GetPokemons = async (url) => {
    try {
        const response = await fetch(url)
        const results = await response.json();
        console.log(results)
        DataPokemons(results.results)

        btnNext=results.next ? `<button class="btn" data-url=${results.next}>⏩</button>` : ''
        btnPrevious=results.previous ? `<button class="btn" data-url=${results.previous}>⏮</button>` : ''
        buttons.innerHTML=btnPrevious + " " + btnNext
        

    } catch (error) {
        console.log(error)
    }
}
GetPokemons(urlPokemon)

const DataPokemons = async (data) => {
    lists__pokemons.innerHTML = '';
    try {
        for (let index of data) {

            const resp = await fetch(index.url)
            const resul = await resp.json();
            console.log(resul)
            templateHtml=`
            <div class="pokemon__img">
            <img src=${resul.sprites.other.dream_world.front_default} alt=${resul.name}/>
            <p>${resul.name}</p>
            </div>
            `
            lists__pokemons.innerHTML+=templateHtml
        }
        
    } catch (error) {
        console.log(error)
    }
}

buttons.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn')){
        let value=e.target.dataset.url
        console.log(value)
        GetPokemons(value)
    }
})