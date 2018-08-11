function closeAlertBox(){
    alertBox = document.getElementById("alertBox");
    alertBox.style.visibility = "hidden";
}
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
    filename:window.keythereum.generateKeystoreFilename(keyObject.address),
    fileContent:window.keythereum.exportToFile(keyObject)
};

}


window.onload = () => {

    var Register = document.getElementById("Register");

    Register.innerHTML = "Login";

    Register.style.backgroundColor = "#66ff99";

    Register.onclick = () => {

        window.location = "./index.html"
    };
};

var MakeAc = document.getElementById("AccountCreate");

MakeAc.onclick = () => {

    var pass = document.getElementById("PasswordInput");

    if(pass.value.length < 9){

        alert("Your password must be at least 9 characters. Please ensure it is a strong password. ");

        return;
    }


    //var ac = createAccount(pass.value);
    var Login = document.getElementById("Login");

    Login.innerHTML = "Account Generated save key in safe place";

    pass.style.visibility = "hidden";

    MakeAc.style.visibility = "hidden";

    var acc = createAccount(pass.value);


    var element = document.createElement('a');
    var node = document.createTextNode("Download Key");
    element.appendChild(node);
    element.setAttribute('download', acc.filename);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(acc.fileContent));
    document.body.appendChild(element);

    element.style.visibility = "hidden";
    element.id = "DownloadKey";


    MakeAc.style.visibility = "visible";

    MakeAc.innerHTML = "Download Key";

    MakeAc.onclick = () =>{

        element.click();

    };

    Login.style.color = "#00ff00";


};


