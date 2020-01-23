//Declaración de variables

 //declaracion de cuenta para transferencias de dinero
/*var cuentaAmiga = {
    cbu : 321321,
    saldo : 5000,
    
};


var usuario = {
    userName: "admin",
    numeroCuenta :123123,
    saldoCuenta : 9000,
    codigoSeguridad :123,
    limiteExtraccion: 500,
    cuentaAmiga : new Array,
    
};*/




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

    usuario.limiteExtraccion = nuevoLimite;
    actualizarLimiteEnPantalla()
    

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
    monto = parseInt(monto);
    while(monto < 0){
        monto = prompt("Monto invalido,intente nuevamente");
    }

    usuario.saldoCuenta = usuario.saldoCuenta +  monto;
    actualizarSaldoEnPantalla()

}

function pagarServicio() {

    var opcion = prompt("1.Luz = $1200"+"/2.Gas = $900"+"/3.Agua = $750");
    opcion = parseInt(opcion);

    switch(opcion){

        
        
        case 1 :
            var monto = 1200
            usuario.saldoCuenta = usuario.saldoCuenta - monto;
            actualizarSaldoEnPantalla()
            break;
            
        case 2 : 
            "Monto a pagar : $900";
            usuario.saldoCuenta = usuario.saldoCuenta - 900;
            actualizarSaldoEnPantalla();
            break;
        
        case 3 :
            "Monto a pagar : $750";
            usuario.saldoCuenta = usuario.saldoCuenta - 750;
            actualizarSaldoEnPantalla();
            break;


    }

}

function transferirDinero() {

    var cbu = prompt("Ingrese el cbu de la cuenta destino");
    
        if(cbu == cuentaAmiga.cbu){
            
            
            var a = prompt("Ingrese el monto a transferir");
            while(a <= 0){
                a = prompt("Ingrese un monto valido");
            }
            while(a > usuario.saldoCuenta){
                a = prompt("Ingrese un monto menor o igual a :" +usuario.saldoCuenta);
            }
            usuario.saldoCuenta = usuario.saldoCuenta - a;
            actualizarSaldoEnPantalla();
            parseInt(a);
            cuentaAmiga.saldo = cuentaAmiga.saldo + a;
            return "Usted transfirio : $" + a +"de forma exitosa";
        }
        return "numero de cuenta no econtrado";
    }

async function readJson(){
    try{
        var response =await fetch("usuarios.json")
        var data = await response.json()
        return data
    }
    catch(error){
        throw(error)

    }
    
}

var cuentas
    readJson().then(
        (data) => {
            cuentas = data
            
        }
    ).catch(function(e){
        console.error("no se encuentra el archivo json");
        console.log(e)
    })

    console.log(cuentas);

function iniciarSesion() {
    
    var accountNumber = document.getElementById("modal-account").value;
    accountNumber = parseInt(accountNumber);
    var pass = document.getElementById("modal-pass").value;
    pass = parseInt(pass);

    console.log(usuario[0]);

    
            
            if(accountNumber == usuario.accountNumber || pass == usuario.codigoSeguridad){
                alert("Acceso concedido ,bienvenido :" + usuario.userName);
                document.querySelector('.bg-modal').style.display = 'none';
                document.querySelector('.bg-modal').style.zIndex = -1;
                document.querySelector('.modal-content').style.zIndex = -1;
                
            }

            else{
                alert("Datos invalidos,cuenta suspendida");
                usuario.saldoCuenta = 0;
            }

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

