//Nina Sisovic

var all_items_prototype = [
  {
    tag: "akcija%",
    imageSrc: "images/product_01.png",
    productName: "Bioderma",
    price_txt: "<del>9500</del> &mdash; rsd 5500",
    price: 9500,
    sale_price: 5500,
    kategorija: "kozmetika",
    shop_single: "shop-single.html"
  },
  {
    tag: "",
    imageSrc: "images/product_02.png",
    productName: "Chanca Piedra",
    price_txt: "rsd 7000",
    price: 7000,
    kategorija: "lekovi",
    shop_single: "shop-single.html"
  },
  {
    tag: "",
    imageSrc: "images/product_03.png",
    productName: "Umcka Cold Care",
    price_txt: "rsd 12000",
    price: 12000,
    kategorija: "lekovi",
    shop_single: "shop-single.html"
  },
  {
    tag: "akcija%",
    imageSrc: "images/CAMU_CAMU.png",
    productName: "Camu Camu",
    price_txt: "<del>rsd 2250</del> &mdash; rsd 1489",
    price: 2250,
    sale_price: 1489,
    kategorija: "suplementi",
    shop_single: "shop-single.html"
  },
  {
    tag: "",
    imageSrc: "images/product_05.png",
    productName: "CLA Core",
    price_txt: "rsd 3800",
    price: 3800,
    kategorija: "suplementi",
    shop_single: "shop-single.html"
  },
  {
    tag: "akcija%",
    imageSrc: "images/product_06.png",
    productName: "Poo Pourri",
    price_txt: "<del>rsd 8900</del> &mdash; rsd 3800",
    price: 8900,
    sale_price: 3800,
    kategorija: "kozmetika",
    shop_single: "shop-single.html"
  },
];

var items_currently_on_page = [];
var filtered_items = all_items_prototype;

var filter_min_price = 0;
var filter_max_price = 300;
var filter_search_word = "";
var filter_kategorije = [];

function ucitajProizvode() {
  var div = document.getElementById("svi_proizvodi");

  filter_min_price = 0;
  filter_max_price = 300;
  filter_search_word = "";
  filter_kategorije = [];


  var items = all_items_prototype;
  items_currently_on_page = items;

  for (var i = 0; i < items.length; i++) {
    add_to_page(div, items[i]);
  }
}

function add_to_page(div, item) {
  var newItem = document.createElement("div");
  newItem.classList.add("col-sm-6", "col-lg-4", "text-center", "item", "mb-4");

  
  newItem.innerHTML = `
            ${item.tag ? '<span class="tag">' + item.tag + "</span>" : ""}
            <a href="${item.shop_single}"> <img src="${
              item.imageSrc
            }" alt="Image"></a>
            <h3 class="text-dark"><a href="shop-single.html">${
              item.productName
            }</a></h3>
            <p class="price">${item.price_txt}</p>
        `;

  div.appendChild(newItem);
}

function sort_naziv(a, b) {
  return a.productName.localeCompare(b.productName);
}

function sort_cena_asc(a, b) {
  a_price = a.price;
  b_price = b.price;
  if (a.sale_price != null) a_price = a.sale_price;
  if (b.sale_price != null) b_price = b.sale_price;
  return a_price - b_price;
}

function sort_cena_desc(a, b) {
  a_price = a.price;
  b_price = b.price;
  if (a.sale_price != null) a_price = a.sale_price;
  if (b.sale_price != null) b_price = b.sale_price;
  return b_price - a_price;
}

function filter_naziv() {
  var div = document.getElementById("svi_proizvodi");
  var items = filtered_items;
  div.innerHTML = "";
  items.sort(sort_naziv);
  filtered_items = items;
  for (var i = 0; i < items.length; i++) {
    add_to_page(div, items[i]);
  }
  filter_all();
}

function filter_cena_asc() {
  var div = document.getElementById("svi_proizvodi");
  var items = filtered_items;
  div.innerHTML = "";
  items.sort(sort_cena_asc);
  filtered_items = items;
  for (var i = 0; i < items.length; i++) {
    add_to_page(div, items[i]);
  }
  filter_all();
}

function filter_cena_desc() {
  var div = document.getElementById("svi_proizvodi");
  var items = filtered_items;
  div.innerHTML = "";
  items.sort(sort_cena_desc);
  filtered_items = items;
  for (var i = 0; i < items.length; i++) {
    add_to_page(div, items[i]);
  }
  filter_all();
}

function filter_cena_range() {
  filter_min_price = $("#slider-range").slider("values", 0);
  filter_max_price = $("#slider-range").slider("values", 1);

  filter_all();
  
}

function filtiriraj_pretraga() {
  filter_search_word = $("#search_bar").val().toLowerCase();
  filter_all();

}

function filtriraj_kategorije() {
  filter_kategorije = [];
  if (document.getElementById("filter_suplementi").checked)
    filter_kategorije.push("suplementi");
  if (document.getElementById("filter_lekovi").checked)
    filter_kategorije.push("lekovi");
  if (document.getElementById("filter_kozmetika").checked)
    filter_kategorije.push("kozmetika");
  if (document.getElementById("filter_bebe").checked)
    filter_kategorije.push("bebe");

  filter_all();

}

function filter_all() {
  var div = document.getElementById("svi_proizvodi");
  div.innerHTML = "";

  var items = filtered_items;

  var items_priced = [];


  if (filter_max_price == 30000 && filter_min_price == 0) items_priced = items;
  else {
    for (var i = 0; i < items.length; i++) {
      curr_price = items[i].price;
      if (items[i].sale_price != null) curr_price = items[i].sale_price;
      if ((curr_price >= filter_min_price) & (curr_price <= filter_max_price))
        items_priced.push(items[i]);
    }
  }

  var items_searched=[]
  if (filter_search_word=="") items_searched=items_priced;
  else
  {
    items_searched = $(items_priced).filter(function () {
        product_name = this.productName.toLowerCase();
        return (
          product_name.indexOf(filter_search_word) !== -1
        ); 
      });
  }

  var items_categories=[]

  if (filter_kategorije.length==0) items_categories=items_searched
  else
  {
    for (var i = 0; i < items_searched.length; i++) {
        if (filter_kategorije.includes(items_searched[i].kategorija)) items_categories.push(items_searched[i]);
      }
  }

  for (var i = 0; i < items_categories.length; i++) {
    add_to_page(div, items_categories[i]);
  }
}
