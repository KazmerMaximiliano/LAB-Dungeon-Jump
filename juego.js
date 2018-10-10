//-------------------------------------------------------------
//Accion para saltar

console.log(navigator);

document.addEventListener("keyup", salta);
function salta(evento)
{
	if(evento.keyCode == 32)
	{
		inicio = true;

		if(nivel.muerto == false)
		{
			saltar();
		}
		else
		{
			nivel.velocidad = 4;
			fondo.velocidad = 0.5;
			nivel.muerto = false;
			slime.x = ancho + 100;
			nivel.puntuacion = 0;
			imgKnigth.src = 'img/knight.png';
			imgSlime.src = 'img/slime.png';
		}
	}
}

//-------------------------------------------------------------
//Cargar Imagenes

var imgKnigth, imgFondo, imgSuelo, imgSlime;

function cargaImagenes(){
	imgKnigth = new Image();
	imgFondo = new Image();
	imgSuelo = new Image();
	imgSlime = new Image();

	imgKnigth.src = 'img/knight.png';
	imgFondo.src = 'img/fondo.png';
	imgSuelo.src = 'img/suelo.png';
	imgSlime.src = 'img/slime.png';
}

//-------------------------------------------------------------
// Canvas, variables y funciones

var ancho = 700;
var alto = 300;
var canvas,ctx;

function iniciar()
{
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	cargaImagenes();
	nivel.muerto = true;
}

function borrarCanvas()
{
	canvas.width = ancho;
	canvas.height = alto;
}

//-------------------------------------------------------------
// Caballero, variables y funciones

var suelo = 200

var knight = {
	y: suelo,
	vy: 0,
	gravedad: 2,
	salto: 28,
	vymax: 9,
	saltando: false
};

function dibujaKnigth()
{
	ctx.drawImage(imgKnigth,0,0,50,50,100,knight.y,50,50);
}

function saltar()
{
	if(knight.saltando == false)
	{
		knight.saltando = true;
		knight.vy = knight.salto;
		imgKnigth.src = 'img/knightsaltando.png';
	}
}

function gravedad()
{
	if(knight.saltando == true)
	{
		if(knight.y - knight.vy - knight.gravedad > suelo)
		{
			knight.saltando = false;
			knight.vy = 0;
			knight.y = suelo;
			caballero = imgKnigth;
			imgKnigth.src = 'img/knight.png';
		}
		else
		{
			imgKnigth.src = 'img/knightsaltando.png';
			knight.vy -= knight.gravedad;
			knight.y -= knight.vy;
		}
	}
}

//-------------------------------------------------------------
// Fondo, variables y funciones

var fondo = 
{
	x: 0,
	y: 0,
	velocidad: 0.5
};

function dibujaFondo()
{
	ctx.drawImage(imgFondo,fondo.x,0,700,300,0,fondo.y,700,300)
}

function logicaFondo()
{
	if(fondo.x > 700)
	{
		fondo.x = 0;
	}
	else
	{
		fondo.x += fondo.velocidad;
	}
}

//-------------------------------------------------------------
// Slime, variables y funciones

var nivel = {
	velocidad: 4,
	puntuacion: 0,
	muerto: false
};

var slime = 
{
	x: ancho + 100,
	y: suelo
};

function dibujaSlime()
{
	ctx.drawImage(imgSlime,0,0,50,50,slime.x,slime.y,50,50)
}

function logicaSlime()
{
	if(slime.x < -100)
	{
		slime.x = ancho + 100;
		nivel.puntuacion++;
		nivel.velocidad ++;
	}
	else
	{
		slime.x -= nivel.velocidad;
	}
}

//-------------------------------------------------------------
// Suelo, variables y funciones

var suelog = 
{
	x: 0,
	y: suelo + 50
};

function dibujaSuelo()
{
	ctx.drawImage(imgSuelo,suelog.x,0,700,50,0,suelog.y,700,50)
}

function logicaSuelo()
{
	if(suelog.x > 700)
	{
		suelog.x = 0;
	}
	else
	{
		suelog.x += nivel.velocidad;
	}
}

//-------------------------------------------------------------
//Colision

var puntuacionActual;
var puntuacionMaxima = 0;
var puntuacionDiv = document.getElementById("puntuacion");
var puntuacionMaximaDiv = document.getElementById("puntuacionMaxima");

function colision()
{

	if (slime.x >= 100 && slime.x <= 150) 
	{
		if(knight.y >= suelo)
		{
			nivel.muerto = true;
			nivel.velocidad = 0;
			fondo.velocidad = 0;
			imgKnigth.src = 'img/muerto.png';
			imgSlime.src = '';
			puntuacionActual = nivel.puntuacion
			puntuacionDiv.textContent = "Puntuación actual: " + puntuacionActual;
			if(puntuacionActual > puntuacionMaxima)
			{
				puntuacionMaxima = puntuacionActual;
				puntuacionMaximaDiv.textContent = "Puntuación máxima: " + puntuacionMaxima;
			}
		}
	}
}

//-------------------------------------------------------------
// Puntuacion

var inicio = false;

function puntuacion()
{
	ctx.font = "40px VT323";
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${nivel.puntuacion}`,600,50);

	if(nivel.muerto == true && inicio == false)
	{
		ctx.font = "60px VT323";
		ctx.fillText(`NUEVO JUEGO`,225,150);
		nivel.velocidad = 0;
		fondo.velocidad = 0;
		console.log(inicio);

	}
	if(nivel.muerto == true && inicio == true)
	{
		ctx.font = "60px VT323";
		ctx.fillText(`GAME OVER`,235,150);
		nivel.velocidad = 0;
		fondo.velocidad = 0;
	}
}

//-------------------------------------------------------------
//Bucle principal

var FPS = 50;
setInterval(function(){
	principal();
},1000/FPS);

function principal(){
	borrarCanvas();
	gravedad();
	colision();
	dibujaFondo();
	dibujaSuelo();
	dibujaSlime();
	dibujaKnigth();
	logicaFondo();
	logicaSuelo();
	logicaSlime();
	puntuacion();
}