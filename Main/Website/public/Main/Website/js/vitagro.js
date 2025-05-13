


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



var login_i=0;
function checkAllLoginSubmit(){
    let emailValid = input_email.value;
    let passwordValid = input_password.value;
    let validAll = checkAllLogin();
    const arrayEmail = ['hercules@vitagro.com', 'guilherme@vitagro.com', 'leonardo@vitagro.com', 'isabelle@vitagro.com', 'miguel@vitagro.com']
    const arrayPassword = ['Hercules123!', 'Guilherme123!', 'Leonardo123!', 'Isabelle123!', 'Miguel123!']

    if (login_i == 2) {
        invalid_data.innerHTML = "<img src='img/denied.png'> <span class='denied'> Você excedeu o número de tentativas, contate a sua empresa. </span>";
        input_email.style.border = "2px solid red";
        input_password.style.border = "2px solid red";
        input_password.value = "";
        login_submit_button.disabled = true;
        login_submit_button.style.cursor = "not-allowed";
        return;
    }




    for (i=0; i< arrayEmail.length; i++) {
        if (validAll && emailValid==arrayEmail[i] && passwordValid==arrayPassword[i]) {
            invalid_data.innerHTML ='';
            window.location.href = "dashboard.html";
            login_i=0;
            return true;
        } else if(validAll && emailValid==arrayEmail[i] && passwordValid!=arrayPassword[i]){
            invalid_data.innerHTML = "<img src='img/denied.png'> <span class='denied'> A senha inserida não confere! </span>";
            input_password.style.border = "2px solid red";
            input_password.value = "";
            invalid_password.innerHTML = "<img src='img/denied.png'> <span class='denied'> Insira a senha novamente! </span>";
            login_i++
            return;

        } else {
            invalid_data.innerHTML = "<img src='img/denied.png'> <span class='denied'> As credenciais inseridas não conferem! </span>";
            input_email.style.border = "2px solid red";
            input_email.value = "";
            invalid_email.innerHTML = "<img src='img/denied.png'> <span class='denied'> Insira o email novamente! </span>";
            input_password.style.border = "2px solid red";
            input_password.value = "";
            invalid_password.innerHTML = "<img src='img/denied.png'> <span class='denied'> Insira a senha novamente! </span>"; 
        }
   }
}