//Declaración de variables
 //declaracion de cuenta para transferencias de dinero
var cuenta = {
    cbu : 0,
    saldo : 0,
    
};
// cuentas p/ transferencia de dinero
var cuentasAmigas = new Array;

//declaracion de user para login
var usuario = {
    userName: "admin",
    numeroCuenta : 123123,
    saldoCuenta : 9000,
    codigoSeguridad : 123,
    limiteExtraccion: 500,
    
};

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var nuevoLimite = prompt("Ingrese su nuevo limite de extraccion");

    while(nuevoLimite < 0){
        nuevoLimite = prompt("Ingrese un limite valido");
    }

    limiteExtraccion = nuevoLimite;
    return limiteExtraccion;
    

}

function extraerDinero() {
    var cantidad = prompt("Ingrese la cantidad que desea retirar");

    if(usuario.saldoCuenta <= 0 ){
        return "Saldo insuficiente";
    }
    while(cantidad > usuario.saldoCuenta || cantidad > usuario.limiteExtraccion){
        cantidad = prompt("Saldo actual de :" +usuario.saldoCuenta +"ingrese un monto valido dentro de los limites de extracion");
    }
    


    usuario.saldoCuenta = usuario.saldoCuenta - cantidad ;
    actualizarSaldoEnPantalla()

    

}

function depositarDinero() {
    var monto = prompt("Ingrese el monto a depositar");
    while(monto < 0){
        monto = prompt("Monto invalido,intente nuevamente");
    }
    saldoCuenta = saldoCuenta +  monto;
    return saldoCuenta;

}

function pagarServicio() {

    var servicio = prompt(

        "Ingrese el numero del servico que desea pagar:"+

        "1.Luz"+
        "2.Gas"+
        "3.Agua"+
        "4.Telefonia"+
        "5.Internet"+
        "6.Seguro"
        
    );
    switch(servicio){

        // note =>  la funcionalidad de descontar el monto del saldo debe delegarse a otra funcion para mayor modularidad
        // y facilidad de mantenimiento

        case  1 :
            "Monto a pagar : $1200";
            usuario.saldoCuenta = usuario.saldoCuenta - 1200;
            actualizarSaldoEnPantalla();
            break;
            
        case 2 : 
            "Monto a pagar : $900";
            usuario.saldoCuenta = usuario.saldoCuenta - 900;
            actualizarSaldoEnPantalla();
            break;
        
        case 3 :
            "Monto a pagar : $750";
            usuario.saldoCuenta = usuario.saldoCuenta -750;
            actualizarSaldoEnPantalla();
            break;

        case 4 :
            "Monto a pagar : $500";
            saldoCuenta = saldoCuenta - 500;
            actualizarSaldoEnPantalla();
            break;

        case 5 :
            "Monto a pagar : $2000";
            saldoCuenta = saldoCuenta - 2000;
            "Nuevo saldo de cuenta :" +saldoCuenta;
            break;

        case 6 :
            "Monto a pagar : $1700";
            saldoCuenta = saldoCuenta -1700;
            "Nuevo saldo de cuenta :" +saldoCuenta;
            break;


    }

}

function transferirDinero() {
    if(saldoCuenta < 0){
        return "Saldo insuficiente";
    }
    var cbu = prompt("Ingrese el cbu de la cuenta destino");
    for(i = 0 ; i < cuentasAmigas.length() ;i++){
        if(cbu === cuentasAmigas[i].cbu){
            var a = prompt("Ingrese el monto a transferir");
            while(a < saldoCuenta){
                a = prompt("Ingrese un monto menor o igual a :" +saldoCuenta);
            }
            cuentasAmigas[i].saldo = saldo + a;
            return "Usted transfirio : $" +a +"de forma exitosa";
        }
    }

    return "numero de cuenta no econtrado";
    

}

function iniciarSesion() {
    var accountNumber = prompt ("Ingrese su numero de cuenta");
        while(accountNumber != usuario.numeroCuenta){
            accountNumber = prompt("Cuenta invalida , intente nuevamente");
        }
        var pass = prompt("Ingrese su codigo de seguridad");
        if(pass != codigoSeguridad){
            saldoCuenta = 0;
            return "Codigo incorrecto , retencion de saldo";
        }

        return "Acceso exitoso , bienvenido :" +usuario.userName;

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + usuario.userName;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + usuario.saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + usuario.limiteExtraccion;
}

