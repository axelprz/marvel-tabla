const apiKey = "d91ffde7da3de8ec1bdc6b817165fdd5";
const ts = "08/04/2024, 22:05:23";
const hash = "eb310f9246b511aa08f1807fc3f921b1";
let offset = 0;
let url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}`;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnBuscar = document.getElementById("btnBuscar");
let totalPersonajes = 1564;
let terminoBusqueda = "";
let numeroPagina;
let numeroMaxPagina;
let comics;

const obtenerPagina = () => {
    numeroPagina = Math.floor(offset / 20 + 1);
    numeroMaxPagina = Math.floor(totalPersonajes / 20 + 1);
    const p = document.getElementById("numPagina");
    p.innerText = `Página ${numeroPagina} de ${numeroMaxPagina}`;
}

btnSiguiente.addEventListener("click", () => {
    if(numeroPagina < numeroMaxPagina){
        offset += 20;
        if(terminoBusqueda === ""){
            url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}`;
        }else{
            url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}&nameStartsWith=${terminoBusqueda}`;
        }
        cargarPersonajes();
    }
});
btnAnterior.addEventListener("click", () => {
    if(numeroPagina > 1){
        offset -= 20;
        if(terminoBusqueda === ""){
            url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}`;
        }else{
            url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&ts=${ts}&hash=${hash}&offset=${offset}&nameStartsWith=${terminoBusqueda}`;
        }
        cargarPersonajes();
    }
})

btnBuscar.addEventListener("click", (event) =>{
    event.preventDefault();
    offset = 0;
    terminoBusqueda = document.getElementById("inputBuscar").value.trim();
    if(terminoBusqueda != ""){
        url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&ts=${ts}&hash=${hash}&nameStartsWith=${terminoBusqueda}`;
    }else{
        alert("Por favor, ingrese un termino de búsqueda válido");
    }
    cargarPersonajes();
});

const cargarPersonajes = async() => {
    try{
        const respuesta = await fetch(url);
        
        if(respuesta.status === 200){

            const mostrarData = (datos) => {
                let body = "";
                for(let i = 0; i < datos.length; i++){
                    try{
                        comics = datos[i].urls[2].url;
                    }catch(err){
                        comics = datos[i].urls[1].url;
                    }
                    body += `<tr><td>${datos[i].id}</td><td>${datos[i].name}</td><td><img src="${datos[i].thumbnail.path}.${datos[i].thumbnail.extension}"/></td><td><a target="_blank" href="${comics}"><i class="bi bi-box-arrow-up-right"></i></a></td></tr>`
                }
                document.getElementById("data").innerHTML = body;
                
            }

            const datos = await respuesta.json();
            totalPersonajes = datos.data.total;
            console.log(datos.data.results);
            obtenerPagina();
            mostrarData(datos.data.results);
        }else{
            console.log("Hubo un error");
        }
    }catch(error){
        console.log(error);
    }
}

cargarPersonajes();
