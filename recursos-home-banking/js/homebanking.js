

document.addEventListener("DOMContentLoaded",() =>{

    readJson().then(
        (data) => {
            cuentas = data
            document.getElementById('modal-button').addEventListener("click",() => {
                  
            var cuenta = iniciarSesion();
            console.log(cuenta);
            
            if (cuenta == null) 
            {

                console.log("no inicio sesion");
                
                alert("no existe")
            } else {
                console.log("inicio sesion");
                

                alert("Bienvenido :" + cuenta.userName);
                document.querySelector('.bg-modal').style.display = 'none';
                document.querySelector('.bg-modal').style.zIndex = -1;
                document.querySelector('.modal-content').style.zIndex = -1;

                cargarNombreEnPantalla(cuenta.userName);
                actualizarSaldoEnPantalla(cuenta.saldoCuenta);
                actualizarLimiteEnPantalla(cuenta.limiteExtraccion);
                cambiarLimiteDeExtraccion(cuenta);
                extraerDinero(cuenta);
                depositarDinero(cuenta);
                pagarServicio(cuenta);
                transferirDinero(cuenta);
            }

            })
            
    
        }
    ).catch(function(e){
        console.error("no se encuentra el archivo json");
        console.log(e)
    });

    


})

// local Storage

var accounts;

function cargarCuentas(){
    var rta = localStorage.getItem("accounts");
    console.log(rta);

    if (rta){
        accounts = JSON.parse(rta);
        console.log(accounts);
    }else{
        $getJson("js/usuarios.json", (data) => {
            var rta = JSON.stringify(data);
            console.log(rta);
            localStorage.setItem("accounts",rta);
            accounts = data;
            console.log(accounts);
        })
    }
}






//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
}


function cambiarLimiteDeExtraccion(cuenta) {
    document.getElementById('limit-btn').addEventListener('click', () =>{
        var nuevoLimite = prompt("Ingrese su nuevo limite de extraccion");

    while(nuevoLimite < 0){
        nuevoLimite = prompt("Ingrese un limite valido");
    }

    cuenta.limiteExtraccion = nuevoLimite;
    actualizarLimiteEnPantalla(nuevoLimite);
    } )
    
}

function extraerDinero(cuenta) {
    document.getElementById('extraer-btn').addEventListener('click',() =>{

    var cantidad = prompt("Ingrese la cantidad que desea retirar");
    var rta;

    if(cuenta.saldoCuenta <= 0 ){
        return "Saldo insuficiente";
    }
    while(cantidad > cuenta.saldoCuenta || cantidad > cuenta.limiteExtraccion){
        cantidad = prompt("Saldo actual de :" +cuenta.saldoCuenta +"ingrese un monto valido dentro de los limites de extracion");
    }


    cuenta.saldoCuenta = cuenta.saldoCuenta - cantidad ;
    rta = cuenta.saldoCuenta;

    actualizarSaldoEnPantalla(rta);
    })

    

}

function depositarDinero(cuenta) {
   document.getElementById('deposit-btn').addEventListener('click',() => {
    var rta;
    var monto = prompt("Ingrese el monto a depositar");
    monto = parseInt(monto);
    while(monto < 0){
        monto = prompt("Monto invalido,intente nuevamente");
    }

    cuenta.saldoCuenta = cuenta.saldoCuenta +  monto;
    rta = cuenta.saldoCuenta;
    actualizarSaldoEnPantalla(rta);
   })

}

function pagarServicio(cuenta) {

    document.getElementById('pay-btn').addEventListener('click',() => {
        var opcion = prompt("1.Luz = $1200"+"/2.Gas = $900"+"/3.Agua = $750");
    opcion = parseInt(opcion);
    var rta;

    switch(opcion){        
        
        case 1 :
            var monto = 1200
            cuenta.saldoCuenta = cuenta.saldoCuenta - monto;
            rta = cuenta.saldoCuenta;
            actualizarSaldoEnPantalla(rta);
            break;
            
        case 2 : 
            "Monto a pagar : $900";
            cuenta.saldoCuenta = cuenta.saldoCuenta - 900;
            rta = cuenta.saldoCuenta;
            actualizarSaldoEnPantalla(rta);
            break;
        
        case 3 :
            "Monto a pagar : $750";
            cuenta.saldoCuenta = cuenta.saldoCuenta - 750;
            rta = cuenta.saldoCuenta;
            actualizarSaldoEnPantalla(rta);
            break;


    }
    })

}

function transferirDinero(cuenta) {
    
    console.log("inicio")
    document.getElementById('transfer-btn').addEventListener('click',() => {
        console.log("entro");
        
        var rta;
        var cbu = prompt("Ingrese el cbu de la cuenta destino");
        
          for(var i = 0 ; i < cuenta.cuentaAmiga.length ; i++){
            if(cbu == cuenta.cuentaAmiga[i].cbu){
    
                var a = prompt("Ingrese el monto a transferir");
                while(a <= 0){
                    a = prompt("Ingrese un monto valido");
                }
                while(a > cuenta.saldoCuenta){
                    a = prompt("Ingrese un monto menor o igual a :" +cuenta.saldoCuenta);
                }
                cuenta.saldoCuenta = cuenta.saldoCuenta - a;
                rta = cuenta.saldoCuenta;
                actualizarSaldoEnPantalla(rta);
                parseInt(a);
                cuenta.cuentaAmiga[i].saldo =   cuenta.cuentaAmiga[i].saldo + a;
                return "Usted transfirio : $" + a +"de forma exitosa";
            }
            return "numero de cuenta no econtrado";
        }
    })

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
iniciarSesion

var arrIndex = 0 ;
    

function iniciarSesion() {
    
    var accountNumber = document.getElementById("modal-account").value;
    accountNumber = parseInt(accountNumber);
    var pass = document.getElementById("modal-pass").value;
    pass = parseInt(pass);
    var statusCode;
    var user;
    

            for(var i = 0 ; i < cuentas.length ; i++){
                if(accountNumber == cuentas[i].numeroCuenta && pass == cuentas[i].codigoSeguridad){
                    user = cuentas[i];
                    var j = i;
                    arrIndex = i;
                    i = cuentas.length + 1;
                    statusCode = 1;
                    

                        return user;
                    
                }
            }
            return null
            if(statusCode != 1){
                alert('usuario no encontrado');
            }
            
    
            
            
            

}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla(name) {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + name;
}

function actualizarSaldoEnPantalla(saldo) {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldo;
}

function actualizarLimiteEnPantalla(limite) {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limite;
}

