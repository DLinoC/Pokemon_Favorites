const formhtml = document.getElementById('form');
const boton = document.getElementById('boton');

const indicarLlenado = (tipo) => {
    const cajaimg = document.getElementById('box_img');
    if(tipo === 'llenado') {
        cajaimg.innerHTML = `
            <img class="main__img my-4" src="./img/gato2.png" alt="">

            <div class="box_texto" id="box_texto">
                <span class="llenado">¡Genio tienes que llenar todos los campos! 🤡</span>
            </div>    
        `
    } else {
        cajaimg.innerHTML = `
            <img class="main__img my-4" src="./img/gato3.png" alt="">

            <div class="box_texto" id="box_texto">
                <span class="noexiste">¡Tu Usuario o Contraseña es incorrecta! 😒</span>
            </div>    
        `
    }
}

formhtml.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!formhtml.checkValidity()) {
        //LA VALIDACION DE LLENADAO ESTA MAL
        indicarLlenado('llenado')
        e.stopPropagation()
        formhtml.classList.add('was-validated')
    }else{
        //TODO VA BIEN
        const valoruser = document.getElementById('user');
        console.log(valoruser)
        const valorpass = document.getElementById('password');

        // Mostrar todos los usuarios
        let usuariosbdd = [];

        const response = await fetch('http://localhost:3000/api/usuarios');
        const data = await response.json();
        usuariosbdd = [...data];


        let uss = usuariosbdd.filter( (obj) =>obj.usuario === valoruser.value);
        let pas = usuariosbdd.filter( (obj) =>obj.password === valorpass.value);
        
        if(uss.length > 0 && pas.length > 0) {
            console.log(uss);
            console.log(uss[0]._id);


            localStorage.setItem('idpoke', JSON.stringify(uss[0]._id) );

            window.location.href = "favopoke.html"
            formhtml.reset();
        } else {
            indicarLlenado('gato');
        }

        formhtml.classList.remove('was-validated');
    }

}, false)
