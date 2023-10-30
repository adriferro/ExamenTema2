//Adrián Fernández Rodríguez
//

window.addEventListener("load",iniciarSesion)

let saldo = 1000;
let PIN_CORRECTO = "1234";
let intentos = 3;

const depositarBtn = document.getElementById("depositar")
const retirarBtn = document.getElementById("retirar")
const transferirBtn = document.getElementById("transferir")
const cambiarBtn = document.getElementById("cambiarPIN")
const salirBtn = document.getElementById("salir")
const saldoAct = document.getElementById("saldo")


function actualizarSaldo(){
    saldoAct.innerText = `El saldo es: ${saldo} €.`
}

function iniciarSesion(){
    let PIN = prompt("Introduzca su PIN:")
    while(PIN !== PIN_CORRECTO && intentos > 1){
        intentos--
        alert(`PIN incorrecto. Le quedan ${intentos} intentos restantes.`)
        PIN = prompt("Vuelva a introducir su PIN:")
    }

    if(PIN !== PIN_CORRECTO){
        alert("El cajero se ha bloqueado.")
        window.location.replace("templates/blocked.html")
    }else{
        alert("Inicio de sesión exitoso.")
        actualizarSaldo()
    }
}


function depositar(){
    let deposito = parseFloat(prompt("Introduzca cantidad a ingresar:"))
    if(!isNaN(deposito) || deposito < saldo || deposito < 0){
        saldo += deposito
        alert(`Usted ha ingresado ${deposito.toFixed(2)} €.`)
        actualizarSaldo()
    }else{
        alert("Cantidad inválida. Pruebe de nuevo.")
    }
}

depositarBtn.addEventListener("click", depositar)


function retirar(){
    let retiro = parseFloat(prompt("Introduzca cantidad a retirar:"))
    if(!isNaN(retiro) || retiro < saldo || retiro > 0){
        saldo -= retiro
        alert(`Usted ha retirado ${retiro.toFixed(2)} €.`)
        actualizarSaldo()
    }else{
        alert("Cantidad inválida. Pruebe de nuevo.")
    }
}

retirarBtn.addEventListener("click", retirar)


function transferir(){
    let transf = parseFloat(prompt("Introduzca cantidad a transferir:"))
    if(!isNaN(transf) || transf < saldo || transf > 0){
        const cuenta = prompt("Ingrese una cuenta de destino:")
        if(!validar(cuenta)){
            alert(`La cuenta ${cuenta} no es válida. Pruebe de nuevo.`)
            return
        }
        saldo -= transf
        alert(`Usted ha transferido ${transf.toFixed(2)} € a la cuenta ${cuenta}.`)
        actualizarSaldo()
    }else{
        alert("Cantidad inválida. Pruebe de nuevo.")
    }
}

transferirBtn.addEventListener("click", transferir)


function cambiarPIN(){
    let PIN = prompt("Introduzca su PIN:")
    if(PIN === PIN_CORRECTO){
        PIN_CORRECTO = prompt("Introduzca su nueva contraseña:")
        alert(`Su nuevo PIN es: ${PIN_CORRECTO}`)
    }else{
        alert("PIN incorrecto. Pruebe de nuevo.")
    }
}

cambiarBtn.addEventListener("click", cambiarPIN)


salirBtn.addEventListener("click", () => {
    alert(`Usted ha seleccionado salir.`)
    window.location.replace("templates/exit.html")
})


function validar(iban){
    let expresion = /^(ES\d{22}$)/
    return expresion.test(iban)
}