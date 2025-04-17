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
    var phone = input_phone.value;
    phone = phone.replaceAll('-','');
    phone = phone.replaceAll('(','');
    phone = phone.replaceAll(')','');
    phone = phone.replaceAll(' ','');
    phone = phone.replaceAll('+','');
    let phoneLength = phone.length;
    let text='';
    if (phoneLength < 13 || phoneLength > 13){
        input_phone.style.border = "2px solid red";
        input_phone.value = "Número Inválido!";
        return false;
    } else{
        if(phone[5] != 9){
            input_phone.style.border = "2px solid red";
            input_phone.value = "Número Inválido!";
            return false;
        }
        text = phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
        console.log(text);
        input_phone.value = text;
        input_phone.style.border = "2px solid green";
        return true;
    }
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
    var cpf = input_cpf.value;
    cpf = cpf.replaceAll('.','');
    cpf = cpf.replaceAll('-','');
    let cpfLength = cpf.length;
    let text='';
    if (cpfLength < 11 || cpfLength > 11){
        input_cpf.style.border = "2px solid red";
        input_cpf.value = "O CPF deve ter 11 dígitos!";
        return false;
    } else{
        text = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        console.log(text);
        console.log(cpf);
        input_cpf.value = text;
        input_cpf.style.border = "2px solid green";
        return true;
    }
    
}
function password(){

}
function confirmPassword(){

}