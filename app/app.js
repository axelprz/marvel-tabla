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