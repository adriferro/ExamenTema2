//Adrián Fernández Rodríguez
//

window.addEventListener("load",logIn)

let money = 1000;
let PIN_TRUE = "1234";
let tries = 3;

const depositBtn = document.getElementById("deposit")
const retireBtn = document.getElementById("retire")
const transferBtn = document.getElementById("transfer")
const changeBtn = document.getElementById("changePIN")
const exitBtn = document.getElementById("exit")
const updateMoney = document.getElementById("money")


function update(){
    updateMoney.innerText = `El saldo es: ${money.toFixed(2)} €.`
}

function logIn(){
    let PIN = prompt("Introduzca su PIN:")
    while(PIN !== PIN_TRUE && tries > 1){
        tries--
        alert(`PIN incorrecto. Le quedan ${tries} intentos restantes.`)
        PIN = prompt("Vuelva a introducir su PIN:")
    }

    if(PIN !== PIN_TRUE){
        alert("El cajero se ha bloqueado.")
        window.location.replace("templates/blocked.html")
    }else{
        alert("Inicio de sesión exitoso.")
        update()
    }
}


function deposit(){
    let mondep = parseFloat(prompt("Introduzca cantidad a ingresar:"))
    if(!isNaN(mondep) && mondep > 0){
        money += mondep
        alert(`Usted ha ingresado ${mondep.toFixed(2)} €.`)
        update()
    }else{
        alert("Cantidad inválida. Pruebe de nuevo.")
    }
}

depositBtn.addEventListener("click", deposit)


function retire(){
    let monret = parseFloat(prompt("Introduzca cantidad a retirar:"))
    if(!isNaN(monret) && monret <= money && monret > 0){
        money -= monret
        alert(`Usted ha retirado ${monret.toFixed(2)} €.`)
        update()
    }else{
        alert("Cantidad inválida. Pruebe de nuevo.")
    }
}

retireBtn.addEventListener("click", retire)


function transfer(){
    let transf = parseFloat(prompt("Introduzca cantidad a transferir:"))
    if(!isNaN(transf) && transf <= money && transf > 0){
        const account = prompt("Ingrese una cuenta de destino:")
        if(!validate(account)){
            alert(`La cuenta ${account} no es válida. Pruebe de nuevo.`)
            return
        }
        money -= transf
        alert(`Usted ha transferido ${transf.toFixed(2)} € a la cuenta ${account}.`)
        update()
    }else{
        alert("Cantidad inválida. Pruebe de nuevo.")
    }
}

transferBtn.addEventListener("click", transfer)


function changePIN(){
    let PIN = prompt("Introduzca su PIN:")
    if(PIN === PIN_TRUE){
        PIN_TRUE = prompt("Introduzca su nueva contraseña:")
        alert(`Su nuevo PIN es: ${PIN_TRUE}`)
    }else{
        alert("PIN incorrecto. Pruebe de nuevo.")
    }
}

changeBtn.addEventListener("click", changePIN)


exitBtn.addEventListener("click", () => {
    alert(`Usted ha seleccionado salir.`)
    window.location.replace("templates/exit.html")
})


function validate(iban){
    let expresion = /^(ES\d{22}$)/
    return expresion.test(iban)
}