// Ejercicio 1 interactuar cadenas

function interactuarCadenas(cadena1, cadena2) {
  // dos cadenas de igual longitud -----> una nueva cadena con las recomendaciones
  let resultado = '';
  for (let i = 0; i < cadena1.length; i ++) {
      if (cadena1[i] === '+' && cadena2[i] === '+') {
        resultado += '+';
      } else if (cadena1[i] === '-' && cadena2[i] === '-') {
        resultado += '-';
    } else if ((cadena1[i] === '+' && cadena2[i] === '-') || (cadena1[i] === '-' && cadena2[i] === '+')) {
        resultado += '0';
  }
}
  return resultado;
}




// Ejercicio 2 Generar Apodo

function generarApodo(nombre) {
  if (nombre.length < 4) {
      throw new Error("Nombre muy corto");
  }
  // Definir las vocales
  const vocales = "aeiou";
  // Obtener la tercera letra
  const terceraLetra = nombre[2].toLowerCase();
  // Verificar si la tercera letra es una vocal
  if (vocales.includes(terceraLetra)) {
      return nombre.slice(0, 4);
  } else {
      return nombre.slice(0, 3);
  }
}

// Ejercicio 3 obtener marcador

function obtenerMarcador(texto) {
  // Diccionario para convertir palabras numéricas a números
  const diccionarioNumeros = {
      'cero': 0, 
      'uno': 1, 
      'dos': 2, 
      'tres': 3, 
      'cuatro': 4,
      'cinco': 5, 
      'seis': 6, 
      'siete': 7, 
      'ocho': 8, 
      'nueve': 9
  };

  // Expresión regular para encontrar números en el rango 0-9 y palabras numéricas
  const alfanumeros = /\b(?:cero|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|[0-9])\b/g;

  // Buscar todos los números y palabras numéricas en el texto
  const coincidencias = texto.match(alfanumeros);

  // Si no se encuentran números ni palabras numéricas, devolver [0, 0]
  if (!coincidencias) {
      return [0, 0];
  }

  // Convertir las coincidencias a números
  const numeros = coincidencias.map(coincidencia => {
      if (diccionarioNumeros.hasOwnProperty(coincidencia)) {
          return diccionarioNumeros[coincidencia];
      } else {
          return parseInt(coincidencia, 10);
      }
  });

  // Si se encuentran menos de 2 números, asumimos que falta información y completamos con ceros
  while (numeros.length < 2) {
      numeros.push(0);
  }

  // Devolver solo los dos primeros números encontrados
  return numeros.slice(0, 2);
}


// Ejercicio 4 barco

class Barco {
  // clase que recibe dos argumentos y un metodo 
  constructor (calado, tripulacion) {
      this.calado = calado;
      this.tripulacion = tripulacion;
  }

  valeLaPena() {
     const unidades = this.tripulacion * 1.5;
   const nuevocalado = this.calado - unidades ;
    return nuevocalado > 20
    }
  }


const perlaNegra = new Barco(32, 5);
perlaNegra.valeLaPena();  // true
const titanic = new Barco(15, 10);
titanic.valeLaPena();  //  false
const barco = new Barco(25, 3);
barco.valeLaPena(); // true
const barco2 = new Barco(18, 5);
barco2.valeLaPena(); // false
const barco3 = new Barco(23, 2);
barco3.valeLaPena(); // false