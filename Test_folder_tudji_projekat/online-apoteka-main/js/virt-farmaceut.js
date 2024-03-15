//Nina Sisovic

function preporukaLeka(){
    document.getElementById("simptom_glavobolja").focus();

    var preporuke=document.getElementById("preporuke");

    if (preporuke.children.length!=0) return;

    var div1=document.createElement('div');
    div1.className="col-sm-6 col-lg-4 text-center item mb-4";

    var span1=document.createElement('span');
    span1.className="tag";
    span1.innerText="akcija%";

    var a1=document.createElement('a');
    a1.href="shop-single.html";

    var slika1=document.createElement("img");
    slika1.src="images/product_01.png"

    a1.appendChild(slika1);

    var h1=document.createElement("h3");
    h1.className="text-dark";
    h1.innerText="Bioderma"

    var p1=document.createElement("p");
    p1.className="price";
    p1.innerText="rsd 5000";

    div1.appendChild(span1);
    div1.appendChild(a1);
    div1.appendChild(h1);
    div1.append(p1);

    var div2=document.createElement('div');
    div2.className="col-sm-6 col-lg-4 text-center item mb-4";

    var a2=document.createElement('a');
    a2.href="shop-single.html";

    var slika2=document.createElement("img");
    slika2.src="images/product_02.png"

    a2.appendChild(slika2);

    var h2=document.createElement("h3");
    h2.className="text-dark";
    h2.innerText="Chanca Piedra"

    var p2=document.createElement("p");
    p2.className="price";
    p2.innerText="rsd 7000";

    div2.appendChild(a2);
    div2.appendChild(h2);
    div2.append(p2);

    var div3=document.createElement('div');
    div3.className="col-sm-6 col-lg-4 text-center item mb-4";

    var a3=document.createElement('a');
    a3.href="shop-single.html";

    var slika3=document.createElement("img");
    slika3.src="images/product_03.png"

    a3.appendChild(slika3);

    var h3=document.createElement("h3");
    h3.className="text-dark";
    h3.innerText="Umcka Cold Care"

    var p3=document.createElement("p");
    p3.className="price";
    p3.innerText="rsd 12000";

    div3.appendChild(a3);
    div3.appendChild(h3);
    div3.append(p3);

    preporuke.appendChild(div1);
    preporuke.appendChild(div2);
    preporuke.appendChild(div3);

    /*<div class="col-sm-6 col-lg-4 text-center item mb-4">
            <span class="tag">Sale</span>
            <a href="shop-single.html"> <img src="images/product_01.png" alt="Image"></a>
            <h3 class="text-dark"><a href="shop-single.html">Bioderma</a></h3>
            <p class="price"><del>95.00</del> &mdash; $55.00</p>
          </div>
          <div class="col-sm-6 col-lg-4 text-center item mb-4">
            <a href="shop-single.html"> <img src="images/product_02.png" alt="Image"></a>
            <h3 class="text-dark"><a href="shop-single.html">Chanca Piedra</a></h3>
            <p class="price">$70.00</p>
          </div>
          <div class="col-sm-6 col-lg-4 text-center item mb-4">
            <a href="shop-single.html"> <img src="images/product_03.png" alt="Image"></a>
            <h3 class="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
            <p class="price">$120.00</p>
          </div>*/
}