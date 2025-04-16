function email(){
    let text = input_email.value;
    let haveAt = text.indexOf('@');
    if(haveAt == -1){
        input_email.style.border = "2px solid red";
        input_email.value = "Email inválido!";
        return false;
    }else{
        input_email.style.border = "2px solid green";
        return true;
    }
}
function phone(){

}
function emptyName(){
    let text = input_name.value;
    if(text == ""){
        input_name.style.border = "2px solid red";
        input_name.value = "O nome não pode ficar vazio!";
        return false;
    } else{
        input_name.style.border = "2px solid green";
        return true;
    }
}
function emptyLastname(){
    let text = input_lastname.value;
    if(text == ""){
        input_lastname.style.border = "2px solid red";
        input_lastname.value = "O sobrenome não pode ficar vazio!";
        return false;
    } else{
        input_lastname.style.border = "2px solid green";
        return true;
    }
}
function cpf(){

}
function password(){

}
function confirmPassword(){

}