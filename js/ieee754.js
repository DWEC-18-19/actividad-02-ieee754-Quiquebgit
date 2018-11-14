'use strict';

function ieee754aBinario(numero) {

	var bitSigno = "0";
	if(Math.sign(numero) == -1){
		bitSigno = "1";
	}
	numero = numero.replace("-", "");
	var numeroBinario = pasarABinario(numero);
	if(numeroBinario.toString().indexOf(".") != -1){
		var desplazamientos = numeroBinario.toString().indexOf(".")-1;
	} else {
		var desplazamientos = numeroBinario.toString().length-1;
	}
	var exponente = pasarABinario((desplazamientos+127).toString());
	while (exponente.toString().length < 8) {
		exponente = "0"+exponente;
	}

	var bits = numeroBinario.toString().replace(".", "").substring(1).substring(0, 23);
	while (bits.length < 23) {
		bits += "0";
	}
	console.log("ieee754aBinario: ["+bitSigno+"]["+exponente+"]["+bits+"]");
	return bitSigno+exponente+bits;
}

function pasarABinario(numero) {
	var binario = "";
	var binarioDecimal = "";
	var producto;

	if(numero.indexOf(".") != -1){
		var parteEntera = numero.split(".")[0];
		var parteDecimal = "0."+numero.split(".")[1];

		do {
			binario = parteEntera%2+binario;
			parteEntera /= 2;
			parteEntera = parseInt(parteEntera);
		} while (parteEntera/2!=0);
		while (parteDecimal != 0 && binarioDecimal.toString().length < 24){
			producto = parteDecimal *= 2;
			binarioDecimal += producto.toString().split(".")[0];
			parteDecimal = "0."+producto.toString().split(".")[1];
			parteDecimal = parseFloat(parteDecimal);
		}
		binario = binario+"."+binarioDecimal;
	} else {
		do {
			binario = numero%2+binario;
			numero /= 2;
			numero = parseInt(numero);
		} while (numero/2!=0);
	}
	console.log("Número binario: "+binario);
	return binario;
}


