//Elena Galjak 2021/0085

$(document).ready(function(){
    var korpa=[],korpa2=[];
    function inicijalizujPodatke(){
        if(localStorage.getItem("korpa")!=null){
            korpa=JSON.parse(localStorage.getItem("korpa"));
            korpa2=JSON.parse(localStorage.getItem("korpa"));
        }
        else
        {
            localStorage.setItem("korpa",JSON.stringify(korpa));
        }
        
    }
    function popunijedan(i,artikli){
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td"); 
        let td3=document.createElement("td");
        let td4=document.createElement("td");
        let td5=document.createElement("td");
        let td6=document.createElement("td");

        let imag=document.createElement("img");

        let divbig=document.createElement("div");
        let div1=document.createElement("div");
        let btn1=document.createElement("button");
        let inpu=document.createElement("input");
        let div2=document.createElement("div");
        let btn2=document.createElement("button");

        let h2=document.createElement("h2");

        let link=document.createElement("a");

        td1.className="product-thumbnail";
        imag.className="img-fluid";
        imag.src=korpa[i]["slika"];
        imag.alt="Image";

        td2.className="product-name"
        h2.className="h5 text-black";//

        divbig.className="input-group mb-3";
        divbig.style="max-width: 120px";

        div1.className="input-group-prepend";
        btn1.className="btn btn-outline-primary js-btn-minus";
        btn1.type="button";

        btn2.className="btn btn-outline-primary js-btn-plus";
        btn2.type="button";

        inpu.className="form-control text-center kolicine";
        inpu.type="text";
        inpu.value=korpa[i]["kolicina"].toString();
        inpu.placeholder="";
        div2.className="input-group-append"

        link.className="btn btn-primary height-auto btn-sm";
        link.href="#";

        btn1.innerHTML="&minus;";
        btn2.innerHTML="&plus;";
        let cene=korpa[i]["cena"].split(" ");
        let bb=0;
        if (cene.length==4)
        {
            bb=parseFloat(korpa[i]["cena"].split(" ")[3].substring(0))*korpa[i]["kolicina"];
        }
        else bb=parseFloat(korpa[i]["cena"].split(" ")[1].substring(0))*korpa[i]["kolicina"];
       
        td5.innerHTML="rsd "+bb.toString();//????????????????
        if (cene.length==4)
        {
            td3.innerHTML='<del>'+cene[0]+' '+cene[1]+'</del>'+' '+cene[2]+' '+cene[3];
        }
        else td3.innerHTML=korpa[i]["cena"];
        h2.innerHTML=korpa[i]["ime"];
        link.innerHTML="X";

        link.addEventListener("click", function() {
        
            for(let j=0;j<korpa2.length;j++){
                if(korpa[i]["ime"]==korpa2[j]["ime"]){
                    console.log("da");
                    korpa2.splice(j,1);
                    localStorage.setItem("korpa", JSON.stringify(korpa2));
                    break;
                }
            }
            korpa.splice(i, 1);
            // Save the updated array to sessionStorage
            localStorage.setItem("korpa", JSON.stringify(korpa));
            // Remove the corresponding list item from the DOM
            artikli.removeChild(tr);
            location.reload();
    
            });
        
        div1.appendChild(btn1);
        div2.appendChild(btn2);
        divbig.appendChild(div1);
        divbig.appendChild(inpu);
        divbig.appendChild(div2);
        td1.appendChild(imag);
        td2.appendChild(h2);
        td4.appendChild(divbig);
        td6.appendChild(link);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);  

        artikli.appendChild(tr);


    }
    inicijalizujPodatke();
    function popuniPonude(){
        let artikli = document.getElementById("postojece")
        for(let i=0;i<korpa.length;i++){
            popunijedan(i,artikli);
        }
    }
    function naplata(){
        let s=0;
        for(let i=0;i<korpa.length;i++){
            let cene=korpa[i]["cena"].split(" ");
            let bb=0;
            if (cene.length==4){
            bb=parseFloat(cene[3])*korpa[i]["kolicina"];}
            else{
            bb=parseFloat(cene[0])*korpa[i]["kolicina"];
            }
            s+=bb;
        }
        
        document.getElementById("racun2").innerHTML="rsd "+s.toString();
        document.getElementById("poeni2").innerHTML=Math.floor(s/200).toString()+'<img src="images/star.png" style="height:15px;margin-bottom: 3px;">';
    }
    popuniPonude();
    naplata();

    $("#update").click(function(){
        let v=document.getElementsByClassName("kolicine");
        for(let i=0;i<v.length;i++){
            korpa[i]["kolicina"]=parseInt(v[i].value);
            console.log(v[i].value);
        }
        localStorage.setItem("korpa", JSON.stringify(korpa));
        location.reload();   
    });
    $("#nastavi").click(function(){
        window.location.href = 'shop.html';   
    });
});