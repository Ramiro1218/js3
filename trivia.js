const usuarios = [{
    nombre: 'Homero',
    mail: 'Homerosimpson@hotmail.com',
    pass: 'polipolicias'
},
{
    nombre: 'Marge',
    mail: 'Margebouvier@gmail.com',
    pass: 'mmmm'
},
{
    nombre: 'Bart',
    mail: 'BartSimpson@outlook.com',
    pass: 'cometemispantaloncillos'
}]
const personajes = [{
    nombre: "Homero",
    profecion: "Tecnico nuclear",
    edad: 36,
    peso: 108,
    img: './imagenes/HomeroSimpson.jpg'
}, {
    nombre: "Marge",
    profecion: "Ama de Casa",
    edad: 34,
    peso: 59,
    img: './imagenes/Marge.jpg'
}, {
    nombre: "Bart",
    profecion: "Estudiante",
    edad: 10,
    peso: 40,
    img: './imagenes/Bart.png'
}, {
    nombre: "Lisa",
    profecion: "Estudiante",
    edad: 8,
    peso: 35,
    img: './imagenes/Lisa.jpg'
}]

const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');

function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);

    if (typeof encontrado === 'undefined') {
        return false;
    } else {

        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }
    storage.setItem('usuario', JSON.stringify(usuario));
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}

function estaLogueado(usuario) {
    if (usuario) {
        saludar(usuario);
        mostrarInfoPersonajes(personajes);
        presentarInfo(toggles, 'd-none');
    }
}

function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

function mostrarInfoPersonajes(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardPersonajes" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nombrePersonaje">Nombre: ${element.nombre}</h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoPersonaje">
                <div class="card-body">
                    <p class="card-text" id="profecionPersonaje">Profecion: ${element.profecion}</p>
                    <p class="card-text" id="edadPersonaje">Edad: ${element.edad} años</p>
                    <p class="card-text" id="pesoPersonaje">Peso: ${element.peso} kilos</p>
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    
    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos');
    } else {
        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {
           
            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            
            modal.hide();

            mostrarInfoPersonajes(personajes);
            presentarInfo(toggles, 'd-none');
        }
    }
   
});

btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});
window.onload = () => estaLogueado(recuperarUsuario(localStorage)); 