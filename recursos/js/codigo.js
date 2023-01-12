var removido =false
var mensaje
var validado
var txtInv
const elementos = document.getElementById("elementos-resultado")
const resultado = document.createElement("textarea")
const boton = document.createElement("button")
const encrip = ["enter","imes","ai","ober","ufat"]
const base = ["e","i","a","o","u"]
//se usan arrays para los caracteres para facilitar la funcion de encriptado y desencriptado

//Codigo para evitar que el textarea reciba intro y reinicie el formato
window.onkeydown=function(event){
    if(event.keyCode==13){
        if(event.preventDefault) event.preventDefault()
        return false
    }
}
    /*Funcion para remover imagenes iniciales en zona destino del mensaje y 
    dejar los nuevos elementos en su lugar*/
function remover(){
    if(removido == false){
        let muneco = document.getElementById("muneco");
        let msjResultado1 = document.getElementById("msj-res1")
        let msjResultado2 = document.getElementById("msj-res2")
        muneco.remove();
        msjResultado1.remove();
        msjResultado2.remove();
        resultado.className = "resultado"
        resultado.readOnly = true
        resultado.id = "resultado"
        boton.className = "boton-copiar"
        boton.textContent = "Copiar"
        boton.setAttribute("onClick", "copiar()")
        document.getElementById("elementos-resultado").appendChild(resultado)
        document.getElementById("elementos-resultado").appendChild(boton)
        removido = true
        //Al finalizar cambia valor para no repetir el ciclo posteriormente
    }
}
/*Funcion para  validar si el texto se introdujo correctamente, adicionalmente prepara un
    mensaje con el error en formato para el usuario */
function validar(){
    let incorrecto
    let elem = document.getElementById("texto").value
    let rev = new RegExp(/^[a-z\s,.!]+$/)
    //con este if se valida si el formato de texto es correcto a las especificaciones
    if (rev.test(elem)){
        incorrecto = false
    } else {
        incorrecto = true
    }
    //tras la validacion este if prepara el resultado y el mensaje en caso de error
    if(incorrecto && elem == ""){
        txtInv = "No ha introducido ningun texto"
        validado = false
        return validado, txtInv
    } else if(incorrecto){
        txtInv = "Solo minúsculas, sin acentos ni caracteres especiales"
        validado = false
        return validado, txtInv
    } else {
        validado = true
        return validado
    }
}
//Funcion vinculada al boton correspondiente, inicia encriptado
function encriptar(){
    let inic = base
    let sec = encrip
    encriptador(inic,sec)
}
//Funcion vinculada al boton correspondiente, inicia desencriptado
function desencriptar(){
    let inic = encrip
    let sec = base
    encriptador(inic,sec)
}
//Funcion para realizar el reemplazo de caracteres, con arrays se logra hacer ambas tareas en una sola funcion
function encriptador(inic,sec){
    validar()
    if(validado){
        let texto = document.getElementById("texto").value
        mensaje = texto.replaceAll(inic[0],sec[0]).replaceAll(inic[1],sec[1]).replaceAll(inic[2],sec[2]).replaceAll(inic[3],sec[3]).replaceAll(inic[4],sec[4])
        console.log(mensaje)
        remover();
        resultado.innerHTML = mensaje
        document.getElementById("boton-encriptar").value = "¡Mensaje encriptado!"
        setTimeout(reiniciar, 2000)
    } else {
        //aviso con el error
        alert(txtInv)
    }
}
//Funcion para copiar el texto en la zona de resultado
function copiar(){
    let textoCopiado = mensaje
    navigator.clipboard.writeText(textoCopiado)  
    boton.textContent = "¡Mensaje copiado!"
    setTimeout(reiniciar, 2000)
}
//funcion para reiniciar textos de botones cuando cambien por alguna interaccion
function reiniciar(){
    boton.textContent = "Copiar"
    document.getElementById("boton-encriptar").value = "Encriptar"
    document.getElementById("boton-desencriptar").value = "Desencriptar"
    document.getElementById("texto").setCustomValidity("")
}
