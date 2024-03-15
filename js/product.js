//Elena Galjak 2021/0085
$(document).ready(function(){
    var korpa=[];
    function inicijalizujPodatke(){
        if(localStorage.getItem("korpa")!=null){
            korpa=JSON.parse(localStorage.getItem("korpa"));
        }
        else
        {
            localStorage.setItem("korpa",JSON.stringify(korpa));
        }
        
    }
    inicijalizujPodatke();
    $("#dodaj").click(function(event){
        event.preventDefault();
        var ponuda={};
        console.log("j");
        ponuda["ime"]=$("#proizvod").text();
        ponuda["slika"]=$("#pictur").attr("src");
        ponuda["cena"]=$("#price").text().replace("\n","").trim();
        ponuda["kolicina"]=parseInt($("#amounts").val());
        let l=1;
        for(let i=0;i<korpa.length;i++){
            if(korpa[i]["ime"]==ponuda["ime"]){
                korpa[i]["kolicina"]+=ponuda["kolicina"];
                l=0;
                break;
            }
        }
        if(l==1)
        korpa.push(ponuda);
        
        localStorage.setItem("korpa",JSON.stringify(korpa));
        alert("Dodato u korpu");
    });
    
});