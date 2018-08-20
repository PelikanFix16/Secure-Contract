var iks = true;


function myFunction(x) {

    x.classList.toggle("change");


    setTimeout(function() {

        bar(x);

    },500);

}

function bar(x) {


    let s = document.getElementById("mySidenav");

      if(iks){


        s.appendChild(x);



        createA("Create Contract","#",s);
        createA("Add Key","#",s);
        createA("Buy valute","#",s);
        createA("About","#",s);

        let ab =  document.getElementById("About");

            let abo1 = document.getElementById("ban");
            let key1 = document.getElementById("keyAdd");
            let contract = document.getElementById("Contracts");
          ab.onclick = function() {

            key1.style.display = "none";
            abo1.style.display="block";
            contract.style.display = "none";

        if(!iks){
            let te = document.getElementById("btn");
            myFunction(te);
        }
        }

          let key = document.getElementById("AddKey");
          key.onclick = function() {
              key1.style.display = "block";
              abo1.style.display = "none";
              contract.style.display = "none";
        if(!iks){
            let te = document.getElementById("btn");
            myFunction(te);
        }

          };
          let con = document.getElementById("CreateContract");
          con.onclick = function() {

        if(!iks){
            let te = document.getElementById("btn");
            myFunction(te);
        }
              key1.style.display = "none";
              abo1.style.display = "none";
              contract.style.display = "block";
          };

        openNav();

          iks = !iks;
    }else{



        while(s.firstChild){
            s.removeChild(s.firstChild);
        }

        closeNav();

        let ma = document.getElementById("main");

        ma.appendChild(x);



          iks = !iks;
    }


}

function createA(text,href,append) {

    let a1 = document.createElement("a");
    let a1T = document.createTextNode(text);
    a1.appendChild(a1T);
    a1.href = href;
    a1.className = "options";
    text1 = text.replace(/\s+/g, '');
    a1.id = text1;
    append.appendChild(a1);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

    var rx = /address=(.*)/g;
    var arr = rx.exec(document.URL);

    address = arr[1];

$(document).ready(function(){

    //  let safe = document.getElementById("SafeContract");
    //safe.style.height = window.innerHeight+"px";

    //    let curr = document.getElementById("CurentContracts");

    //curr.style.height = window.innerHeight+"px";

    //   let hist = document.getElementById("HistoryContracts");
    //hist.style.height = window.innerHeight+"px";

    resizeColumns();
    document.getElementById("navtop").style.height = window.innerHeight/40+"px";
    document.getElementById("mySidenav").style.marginTop = window.innerHeight/40+"px";
    document.getElementById('file-input').addEventListener('change', readSingleFile, false);
    document.getElementById("upload").onclick = function() {
            let s = document.getElementById("file-input").click();
    };


    $(".Info").slideUp(0);

    document.getElementById("LogoBaner").onclick = function() {
        if(!iks){
            let te = document.getElementById("btn");
            myFunction(te);
        }
        $("#info").slideDown();
    };
    document.getElementById("close").onclick = function(){
        $("#info").slideUp();
    };

    $("#info").scroll(function(){
        $("#CloseInfo").css('top',$(this).scrollTop());
    });


    document.getElementById("LogoBanerKey").onclick = function(){

        if(!iks){
            let te = document.getElementById("btn");
            myFunction(te);
        }

        $("#info2").slideDown();

    };

    document.getElementById("close2").onclick = function(){
        $("#info2").slideUp();
    };

    $("#info2").scroll(function(){
        $("#CloseInfo2").css('top',$(this).scrollTop());
    });




});
function readSingleFile(e) {
    var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    // Display file content

      var temp = JSON.parse(contents);

      rec(temp);
  };
    reader.readAsText(file);
}



function rec(file) {


    fileOb = file;

}



window.addEventListener("resize",function(){


    resizeColumns();

    document.getElementById("navtop").style.height = window.innerHeight/40+"px";
    document.getElementById("mySidenav").style.marginTop = window.innerHeight/40+"px";
});


function resizeColumns () {

    document.getElementsByClassName("row")[0].style.width = window.innerWidth/1.2+"px";



    if(window.innerWidth<768){

        document.getElementsByClassName("col-md-4")[0].style.width = window.innerWidth/1.25+"px";

        document.getElementsByClassName("col-md-4")[1].style.left = window.innerWidth/16+"px";

        document.getElementsByClassName("col-md-4")[1].style.width = window.innerWidth/4+"px";
        document.getElementsByClassName("col-md-4")[2].style.width = window.innerWidth/4+"px";

        document.getElementsByClassName("col-md-4")[2].style.bottom = window.innerHeight/1.1+"px";

        document.getElementsByClassName("col-md-4")[2].style.left = window.innerWidth/2+"px";

    document.getElementById("RejectContract").style.marginLeft = window.innerWidth/2+"px";
    document.getElementById("CreateContractBtn").style.left = window.innerWidth/1.8+"px";

        document.getElementById("InputRecipient").style.width = window.innerWidth/2.5+"px";
        document.getElementById("InputData").style.width = window.innerWidth/2.5+"px";
        lenghtAddress = 9;
    }
    else{

        document.getElementsByClassName("col-md-4")[1].style.left = 0+"px";

        document.getElementsByClassName("col-md-4")[2].style.left = 0+"px";

        document.getElementsByClassName("col-md-4")[2].style.bottom = 0+"px";

    document.getElementsByClassName("col-md-4")[0].style.width = window.innerWidth/2+"px";
    document.getElementsByClassName("col-md-4")[1].style.width = window.innerWidth/6+"px";
    document.getElementsByClassName("col-md-4")[2].style.width = window.innerWidth/6+"px";
    document.getElementById("RejectContract").style.marginLeft = window.innerWidth/3+"px";
    document.getElementById("CreateContractBtn").style.left = window.innerWidth/2.5+"px";
        document.getElementById("InputRecipient").style.width = window.innerWidth/4+"px";
        document.getElementById("InputData").style.width = window.innerWidth/4+"px";
        lenghtAddress = 15;

    }

    if(window.innerWidth>3000){

    document.getElementById("RejectContract").style.marginLeft = window.innerWidth/3.7+"px";
        document.getElementById("CreateContractBtn").style.left = window.innerWidth/2.2+"px";
        document.getElementById("InputRecipient").style.width = window.innerWidth/10+"px";
        document.getElementById("InputData").style.width = window.innerWidth/10+"px";


        lenghtAddress = 42;

    }

    document.getElementsByClassName("col-md-4")[0].style.height = window.innerHeight/3.7+"px";

    document.getElementsByClassName("col-md-4")[1].style.height = window.innerHeight/1.1+"px";

    document.getElementsByClassName("col-md-4")[2].style.height = window.innerHeight/1.1+"px";

    document.getElementById("CreatorInfoRej").style.marginLeft = window.innerWidth/4.5+"px";

    document.getElementById("RecipientInfoRej").style.marginLeft = window.innerWidth/4.7+"px";
    //document.getElementById("RejectContract").style.marginLeft = window.innerWidth/3+"px";



}

