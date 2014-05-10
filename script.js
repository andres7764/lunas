window.onload = function()
{
	inicio();
}

function inicio()
{
	/*
	Tamaño/tomaño del sol = %
	*/
	function movimiento(path, obj, vel)
    {
        //console.log("Vel de: "  + obj + " es: " + vel);
        var pathLength = path.getTotalLength();
        var tween = new TWEEN.Tween({ length: 0  }).to({ length: pathLength }, vel).onUpdate(function()
        {
            var point = path.getPointAtLength(this.length);
            obj.style.webkitTransform = 'translate('+ point.x + 'px,'+ point.y +'px)';
        }).repeat(999999999).start();
        animate = function()
        {
            requestAnimationFrame(animate)
            TWEEN.update()
        }
        animate();
    }
    var tamReal = false;
	var creaPlanetas = function(objeto, planeta)
    {
        var tamanoPlaneta = planeta.tamano;
        //console.debug(objeto);
        if(tamReal)
        {
            //console.log("Ingresa");
            tamanoPlaneta = Math.round(elSol.tamano * (planeta.porcentaje / 100));
            //console.log(planeta.nombre + " = " + tamanoPlaneta);
        }
        objeto.style.width = tamanoPlaneta + "px";
        objeto.style.height = tamanoPlaneta + "px";
        objeto.style.backgroundImage = "url('img/"+planeta.imagen+"')";
        objeto.style.backgroundSize = tamanoPlaneta + "px " + tamanoPlaneta + "px";
        var margen = (Math.round(tamanoPlaneta / 2)) * -1;
        objeto.style.marginTop = margen + "px";
        objeto.style.marginLeft = margen + "px";
        objeto.style.borderRadius = "50%";
        objeto.style.position = "absolute";
        //console.debug(objeto);
        //console.log("basePlaneta " + planeta.imagen);
        //objeto.style.border = "thick solid #FFF";
        //objeto.setAttribute("class", "basePlaneta " + planeta.imagen);
    }
	var planetas = [
                {nombre: "dione", 
                 imagen: "dione.gif",
                 porcentaje: 0.4,
                 tamano: 30 
                },
                {nombre: "mimas", 
                 imagen: "mimas.jpg",
                 porcentaje: 0.9,
                 tamano: 20 
                },
                {nombre: "rhea", 
                 imagen: "rhea.jpg",
                 porcentaje: 0.9,
                 tamano: 20 
                },
                {nombre: "tethys", 
                 imagen: "tethys.jpg",
                 porcentaje: 0.5,
                 tamano: 15 
                }];

    var objSol = div('sol_svg');
    var elSol = {
        tamano: objSol.height.baseVal.value, 
        x : objSol.x.baseVal.value, 
        y : objSol.y.baseVal.value
    };
    var objeto = "";
    var ruta = "";
    var velInicia = 31000;
    for(var i = 1; i <= planetas.length; i++)
    {
    	objeto = div("objeto_" + i);
    	ruta = div("svg_" + i);
        console.log(ruta);
    	creaPlanetas(objeto, planetas[i - 1]);
    	movimiento(ruta, objeto, velInicia);
    	velInicia += 100;
    }
    function div(div){ return document.getElementById(div); }
}