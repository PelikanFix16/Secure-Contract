
//------------------------------------------------------------------------
function closeAlertBox(){
    alertBox = document.getElementById("alertBox");
    alertBox.style.visibility = "hidden";
}
//------------------------------------------------------------------------
window.alert = function(msg){
    var id = "alertBox", alertBox, closeId = "alertClose", alertClose;
    alertText = document.createElement("p");
    alertBox = document.createElement("div");
    imgAlert = document.createElement("img");
    alertBox.appendChild(alertText);
    alertBox.appendChild(imgAlert);
    document.body.appendChild(alertBox);
    alertBox.id = id;
    alertText.innerHTML = msg;
    alertText.id = "alertText";
    alertBox.style.visibility = "visible";
    alertBox.onclick = closeAlertBox;
};
//---------------------------------------------------------------------------
function createAccount(password){


var params = { keyBytes: 32, ivBytes: 16 };


var dk = window.keythereum.create(params);

var kdf = "pbkdf2";
     var options = {
  kdf: "pbkdf2",
  cipher: "aes-128-ctr",
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: "hmac-sha256"
  }
};

var keyObject = window.keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);

return {
    adr:keyObject.address,
    filename:window.keythereum.generateKeystoreFilename(keyObject.address),
    fileContent:window.keythereum.exportToFile(keyObject),

};

}

//----------------------------------------------------------------------------

var clicked = true;


//------------------------------------------------------------------------
function validateInputAddresses(address) {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
}

//------------------------------------------------------------------------

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
        window.location = "./page2.html?address="+prefix;
    }
};

window.onload = () =>{

    Register.style.width = window.innerWidth/3.5+"px";

};

window.addEventListener("resize",function(){

    Register.style.width = window.innerWidth/3.5+"px";

});


Register.onclick = () => {


       var Log  = document.getElementById("LoginShow");
       var Pass =  document.getElementById("RegisterShow");
    if(clicked){
        Log.style.display = "none";
        Pass.style.display = "block";
        Register.innerHTML = "Login";
    }else {

        Log.style.display = "block";
        Pass.style.display = "none";
        if(document.getElementById("alertBox")){
            document.getElementById("alertBox").style.visibility = "hidden";
        }
        Register.innerHTML = "Register";


    }
    clicked = !clicked;



};


var MakeAc = document.getElementById("PasswordBtn");




MakeAc.onclick = function(){
    var pass = document.getElementById("PasswordInput");
    if(pass.value.length < 9){

        if(document.getElementById("alertBox")){
            document.getElementById("alertBox").style.visibility = "visible";
        }else{
        alert("Your password must be at least 9 characters. Please ensure it is a strong password. ");
        }
        return;
    }else {

        if(document.getElementById("alertBox")){
        document.getElementById("alertBox").style.visibility = "hidden";
        }
    }



    var Login = document.getElementById("Register1");


    pass.style.visibility = "hidden";

    MakeAc.style.visibility = "hidden";

    var acc = createAccount(pass.value);


    var element = document.createElement('a');
    var node = document.createTextNode("Download Key");
    element.appendChild(node);
    element.setAttribute('download', acc.filename);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(acc.fileContent));

    var showreg = document.getElementById("RegisterShow");
    showreg.appendChild(element);
    element.style.visibility = "hidden";
    element.id = "DownloadKey";
    Login.innerHTML = "Account Generated save key in safe place <br> Address: "+acc.adr;
    MakeAc.style.visibility = "visible";
    MakeAc.innerHTML = "Download Key";
    MakeAc.onclick = () => {
        element.click();
    };
    Login.style.color = "#00ff00";

};


var inLog = document.getElementById("PasswordInput");

inLog.addEventListener("keyup",function(e){
    if(e.keyCode == 13){
        MakeAc.click();
    }
});

