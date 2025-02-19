const frutas = ["manzana", "fresa", "mandarina", "manzana", "naranja", "fresa", "manzana", "mandarina", "piña", "naranja"];

const contadorFrutas = {};

for (let i = 0; i < frutas.length; i++) {
    let fruta = frutas[i];
    if (contadorFrutas[fruta]) {
        contadorFrutas[fruta]++;
    } else {
        contadorFrutas[fruta] = 1;
    }
}

console.log("Conteo de frutas usando for:", contadorFrutas);

const contadorFrutasWhile = {};
let index = 0;

while (index < frutas.length) {
    let fruta = frutas[index];
    if (contadorFrutasWhile[fruta]) {
        contadorFrutasWhile[fruta]++;
    } else {
        contadorFrutasWhile[fruta] = 1;
    }
    index++;
}

console.log("Conteo de frutas usando while:", contadorFrutasWhile);