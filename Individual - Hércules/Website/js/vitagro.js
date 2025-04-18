function emptyName(){
    let text = input_name.value;
    if(text == ""){
        input_name.style.border = "2px solid red";
        invalid_name.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> Nome Inválido! </span>";
        return false;
    } else{
        input_name.style.border = "2px solid green";
        invalid_name.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> Nome Ok! </span>";
        return true;
    }
}
function emptyLastname(){
    let text = input_lastname.value;
    if(text == ""){
        input_lastname.style.border = "2px solid red";
        invalid_lastname.innerHTML = "<img src='assets/imgs/denied.png'><span class='denied'> Sobrenome Inválido! </span>";
        return false;
    } else{
        input_lastname.style.border = "2px solid green";
        invalid_lastname.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> Sobrenome Ok! </span>";
        return true;
    }
}
function tolken(){
    let text = input_tolken.value;
    if(text == ""){
        input_tolken.style.border = "2px solid red";
        invalid_tolken.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> Tolken Inválido! </span>";
        return false;
    } else{
        input_tolken.style.border = "2px solid green";
        invalid_tolken.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> Tolken Ok! </span>";
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
        invalid_cpf.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> O CPF deve ter 11 dígitos!</span>";
        return false;
    } else{
        text = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        input_cpf.value = text;
        input_cpf.style.border = "2px solid green";
        invalid_cpf.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> CPF Ok! </span>";
        return true;
    }
    
}
function email(){
    let text = input_email.value;
    let haveAt = text.indexOf('@');
    if(haveAt == -1){
        input_email.style.border = "2px solid red";
        invalid_email.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> Email Inválido! </span>";
        return false;
    }else{
        input_email.style.border = "2px solid green";
        invalid_email.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> Email Ok! </span>";
        return true;
    }
}
function phone(){
    let phone = input_phone.value;
    phone = phone.replaceAll('-','');
    phone = phone.replaceAll('(','');
    phone = phone.replaceAll(')','');
    phone = phone.replaceAll(' ','');
    phone = phone.replaceAll('+','');
    let phoneLength = phone.length;
    let text='';
    if (phoneLength < 13 || phoneLength > 13){
        input_phone.style.border = "2px solid red";
        invalid_phone.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> Número Inválido! </span>";
        return false;
    } else{
        if(phone[4] != 9){
            input_phone.style.border = "2px solid red";
            invalid_phone.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> O primeiro dígito do número deve ser '9'! </span>";
            return false;
        }
        text = phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
        input_phone.value=text;
        invalid_phone.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> Telefone Ok! </span>";
        input_phone.style.border = "2px solid green";
        return true;
    }
}
function password(){
    let password='';
    let haveUpper = passoword.indexOf('');


    
}
function confirmPassword(){

}