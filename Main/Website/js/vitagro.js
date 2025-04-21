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
function token(){
    let text = input_token.value;
    if(text == ""){
        input_token.style.border = "2px solid red";
        invalid_token.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> Token Inválido! </span>";
        return false;
    } else{
        input_token.style.border = "2px solid green";
        invalid_token.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> Token Ok! </span>";
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
    var password= input_password.value;
    let passwordLength = password.length;
    let haveNumber = /\d/.test(password);
    let haveSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let haveLower = /[a-z]/.test(password);
    let haveUpper = /[A-Z]/.test(password);
    if(passwordLength < 8 || passwordLength > 20){
        input_password.style.border = "2px solid red";
        invalid_password.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> A senha deve ter entre 8 e 20 dígitos! </span>";
        return false;
    } else if(!haveNumber || !haveSpecial || !haveLower || !haveUpper){
        input_password.style.border = "2px solid red";
        invalid_password.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais! </span>";
        return false;
    } else{
        input_password.style.border = "2px solid green";
        invalid_password.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> Senha Ok! </span>";
        return true;
    }
}
function confirmPassword(){
    let confirmPassword = input_confirm_password.value;
    if(confirmPassword != input_password.value ){
        input_confirm_password.style.border = "2px solid red";
        invalid_confirm_password.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> As senhas não conferem! </span>";
        return false;
    } else if(input_confirm_password.value == ""){
        input_confirm_password.style.border = "2px solid red";
        invalid_confirm_password.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> Esse campo não pode ficar vazio! </span>";
        return false;
    } else{
        input_confirm_password.style.border = "2px solid green";
        invalid_confirm_password.innerHTML = "<img src='assets/imgs/accept.png'> <span class='accept'> Senha Ok! </span>";
        return true;
    }
}
function checkAll(){
    let nameValid = emptyName();
    let lastnameValid = emptyLastname();
    let tokenValid = token();
    let cpfValid = cpf();
    let emailValid = email();
    let phoneValid = phone();
    let passwordValid = password();
    let confirmPasswordValid = confirmPassword();
    if(nameValid && lastnameValid && tokenValid && cpfValid && emailValid && phoneValid && passwordValid && confirmPasswordValid){
        credential_submit_button.disabled = false;
        credential_submit_button.style.cursor = "pointer";
        return true;
    }else{
        credential_submit_button.disabled = true;
        credential_submit_button.style.cursor = "not-allowed";
        return false;
    }
}
function checkAllLogin(){
    let emailValid = email();
    let passwordValid = password();
    if(emailValid && passwordValid){
        login_submit_button.disabled = false;
        login_submit_button.style.cursor = "pointer";
        return true;
    }else{
        login_submit_button.disabled = true;
        login_submit_button.style.cursor = "not-allowed";
        return false;
    }
}
function checkAllLoginSubmit(){
    let emailValid = input_email.value;
    let passwordValid = input_password.value;
    let validAll = checkAllLogin();
    if (validAll && emailValid=='adm@vitagro.com' && passwordValid=='Vitagro123!') {
        invalid_data.innerHTML ='';
        window.location.href = "dashboard.html";
        return true; 
    } else {
        invalid_data.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> As credenciais inseridas não conferem! </span>";
        input_email.style.border = "2px solid red";
        input_email.value = "";
        invalid_email.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> Insira o email novamente! </span>";
        input_password.style.border = "2px solid red";
        input_password.value = "";
        invalid_password.innerHTML = "<img src='assets/imgs/denied.png'> <span class='denied'> Insira a senha novamente! </span>";
        return false; 
    }
}
