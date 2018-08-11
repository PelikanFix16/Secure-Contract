

function validateInputAddresses(address) {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
}


var Register = document.getElementById("Register");


var BtnLogin = document.getElementById("LoginBtn");

BtnLogin.onclick = () => {

    var inputLogin = document.getElementById("LoginInput");

    var tempValue = inputLogin.value;

    var prefix = "0x";

    if(tempValue[0] != "0" && tempValue[1] != "x"){
        prefix+=tempValue;
    }else{
        prefix = tempValue;
    }

    if(validateInputAddresses(prefix)){
        window.location = "./page2.html";
    }
};

Register.onclick = () => {

    window.location = "./page3.html"




};
