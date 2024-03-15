/** Nikola Milina */

$(document).ready(function () {
  $("#datepicker").datepicker({
    format: "dd-mm-yyyy",
    autoclose: true,
    todayHighlight: true,
    startDate: "1900-01-01",
    endDate: new Date(), // Set end date to today
  });

  // Show datepicker on input field click
  $("#datepicker").on("click", function () {
    $(this).datepicker("show");
  });
});

let nizkorisnika = [
  {
    ime: "*",
    prezime: "*",
    mejl: "*",
    telefon: "*",
    lozinka: "*",
    datum_rodjenja: "*",
    adresa: "*",
    grad: "*",
    post_broj: "*",
  },
  {
    ime: "admin",
    prezime: "admin",
    mejl: "@admin",
    telefon: "*",
    lozinka: "admin1234",
    datum_rodjenja: "*",
    adresa: "*",
    grad: "*",
    post_broj: "*",
  },
];

function inicijalizujPodatke() {
  let korisnici = localStorage.getItem("korisnici");
  if (korisnici != null) {
    nizkorisnika = JSON.parse(korisnici);
  } else {
    localStorage.setItem("korisnici", JSON.stringify(nizkorisnika));
  }
}

function registrujSe() {
  let ime = document.getElementById("create_fname").value;
  let prezime = document.getElementById("create_lname").value;
  let mejl = document.getElementById("create_email").value;
  let telefon = document.getElementById("create_phone").value;
  let lozinka = document.getElementById("create_password").value;
  let potvrdaLozinke = document.getElementById("create_password_check").value;
  let datum_rodjenja = document.getElementById("datepicker").value;
  let adresa = document.getElementById("create_address").value;
  let grad = document.getElementById("create_city").value;
  let post_broj = document.getElementById("create_postal").value;

  /*
    /regex/.test(...)
    */
  if (ime == null || ime == "") {
    alert("Ime nije u odgovarajucem formatu.");
  } else if (prezime == null || prezime == "") {
    alert("Prezime nije u odgovarajucem formatu.");
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mejl) == false) {
    alert("Mejl adresa nije u odgovarajucem formatu.");
  } else if (/^\+3816[0-9]{6,8}$/.test(telefon) == false) {
    alert("Broj telefona nije u odgovarajucem formatu.");
  } else if (/^.{6,}$/.test(lozinka) == false) {
    alert("Lozinka nije u odgovarajucem formatu.");
  } else if (lozinka != potvrdaLozinke) {
    alert("Lozinke se ne podudaraju.");
  } else {
    if (proveriJedinstvenostMaila(mejl) == false) {
      alert("Email se vec koristi");
    } else {
      dodajKorisnika(
        ime,
        prezime,
        mejl,
        telefon,
        lozinka,
        datum_rodjenja,
        adresa,
        grad,
        post_broj
      );
      alert("Korisnik uspesno dodat.");
    }
  }
}

function proveriJedinstvenostMaila(mail) {
  for (let i = 0; i < nizkorisnika.length; i++) {
    if (mail == nizkorisnika[i].mejl) return false;
  }
  return true;
}

function dodajKorisnika(i, p, m, tel, loz, dat, adr, gr, pbr) {
  nizkorisnika.push({
    ime: i,
    prezime: p,
    mejl: m,
    telefon: tel,
    lozinka: loz,
    datum_rodjenja: dat,
    adresa: adr,
    grad: gr,
    post_broj: pbr,
  });

  localStorage.setItem("korisnici", JSON.stringify(nizkorisnika));
  //localStorage.getItem("korisnici");
}

function prijaviSe() {
  let email = document.getElementById("submit_email").value;
  let lozinka = document.getElementById("submit_password").value;

  for (let i = 0; i < nizkorisnika.length; i++) {
    if (
      email == nizkorisnika[i].mejl &&
      lozinka == nizkorisnika[i].lozinka &&
      email != "*" &&
      lozinka != "*"
    ) {
      localStorage.setItem("trkorisnik", email);
      window.close();
      if (email == "@admin") {
        window.open("admin.html");
        return;
      } else {
        window.open("user-account.html");
        return;
      }
    }
  }

  alert("Pogresan username ili password");
}

function odjava() {
  localStorage.setItem("trkorisnik", "*");
  window.close();
  window.open("user.html");
}

function ucitajKorisnika() {
  let korisnik_div = document.getElementById("customer_welcome");
  let korisnik_p = document.createElement("p");

  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("korisnici")).length;
    i++
  ) {
    if (
      JSON.parse(localStorage.getItem("korisnici"))[i].mejl ==
      localStorage.getItem("trkorisnik")
    ) {
      let text =
        JSON.parse(localStorage.getItem("korisnici"))[i].ime +
        " " +
        JSON.parse(localStorage.getItem("korisnici"))[i].prezime;

      korisnik_p.textContent = text;
      korisnik_div.appendChild(korisnik_p);

      let info_ime = document.getElementById("info_firstName");
      info_ime.placeholder = JSON.parse(localStorage.getItem("korisnici"))[
        i
      ].ime;
      info_ime.setAttribute("readonly", "true");

      let info_prezime = document.getElementById("info_lastName");
      info_prezime.placeholder = JSON.parse(localStorage.getItem("korisnici"))[
        i
      ].prezime;
      info_prezime.setAttribute("readonly", "true");

      let info_mejl = document.getElementById("info_email");
      info_mejl.placeholder = JSON.parse(localStorage.getItem("korisnici"))[
        i
      ].mejl;
      info_mejl.setAttribute("readonly", "true");

      let info_telefon = document.getElementById("info_telephone");
      info_telefon.placeholder = JSON.parse(localStorage.getItem("korisnici"))[
        i
      ].telefon;
      info_telefon.setAttribute("readonly", "true");

      let info_adresa = document.getElementById("info_address");
      info_adresa.placeholder = JSON.parse(localStorage.getItem("korisnici"))[
        i
      ].adresa;
      info_adresa.setAttribute("readonly", "true");

      let info_grad = document.getElementById("info_city");
      info_grad.placeholder = JSON.parse(localStorage.getItem("korisnici"))[
        i
      ].grad;
      info_grad.setAttribute("readonly", "true");

      let info_postal = document.getElementById("info_postal");
      info_postal.placeholder = JSON.parse(localStorage.getItem("korisnici"))[
        i
      ].post_broj;
      info_postal.setAttribute("readonly", "true");
    }
  }
}

function promenaPodataka() {
  let button_promena = document.getElementById("promena_podataka");
  let button_promena_lozinke = document.getElementById("promena_lozinke");
  let button_sacuvaj = document.getElementById("sacuvaj_promene");
  let button_otkazi = document.getElementById("otkazi_promene");

  let info_ime = document.getElementById("info_firstName");
  let info_prezime = document.getElementById("info_lastName");
  let info_mejl = document.getElementById("info_email");
  let info_telefon = document.getElementById("info_telephone");
  let info_adresa = document.getElementById("info_address");
  let info_grad = document.getElementById("info_city");
  let info_postal = document.getElementById("info_postal");

  info_ime.removeAttribute("readonly");
  info_prezime.removeAttribute("readonly");
  info_mejl.removeAttribute("readonly");
  info_telefon.removeAttribute("readonly");
  info_adresa.removeAttribute("readonly");
  info_grad.removeAttribute("readonly");
  info_postal.removeAttribute("readonly");

  button_promena.setAttribute("hidden", "true");
  button_promena_lozinke.setAttribute("hidden", "true");
  button_sacuvaj.removeAttribute("hidden");
  button_otkazi.removeAttribute("hidden");
}

function sacuvajPromene() {
  let button_promena = document.getElementById("promena_podataka");
  let button_promena_lozinke = document.getElementById("promena_lozinke");
  let button_sacuvaj = document.getElementById("sacuvaj_promene");
  let button_otkazi = document.getElementById("otkazi_promene");

  let info_ime = document.getElementById("info_firstName");
  let info_prezime = document.getElementById("info_lastName");
  let info_mejl = document.getElementById("info_email");
  let info_telefon = document.getElementById("info_telephone");
  let info_adresa = document.getElementById("info_address");
  let info_grad = document.getElementById("info_city");
  let info_postal = document.getElementById("info_postal");

  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("korisnici")).length;
    i++
  ) {
    if (
      JSON.parse(localStorage.getItem("korisnici"))[i].mejl ==
      localStorage.getItem("trkorisnik")
    ) {
      if (info_ime.value != "" && info_ime.value != null) {
        let temp = JSON.parse(localStorage.getItem("korisnici"));
        temp[i].ime = String(info_ime.value);
        localStorage.setItem("korisnici", JSON.stringify(temp));
      }

      if (info_prezime.value != "" && info_prezime.value != null) {
        let temp = JSON.parse(localStorage.getItem("korisnici"));
        temp[i].prezime = String(info_prezime.value);
        localStorage.setItem("korisnici", JSON.stringify(temp));
      }

      if (info_mejl.value != "" && info_mejl.value != null) {
        let temp = JSON.parse(localStorage.getItem("korisnici"));
        temp[i].mejl = String(info_mejl.value);
        localStorage.setItem("trkorisnik", String(info_mejl.value));
        localStorage.setItem("korisnici", JSON.stringify(temp));
      }

      if (info_telefon.value != "" && info_telefon.value != null) {
        let temp = JSON.parse(localStorage.getItem("korisnici"));
        temp[i].telefon = String(info_telefon.value);
        localStorage.setItem("korisnici", JSON.stringify(temp));
      }

      if (info_adresa.value != "" && info_adresa.value != null) {
        let temp = JSON.parse(localStorage.getItem("korisnici"));
        temp[i].adresa = String(info_adresa.value);
        localStorage.setItem("korisnici", JSON.stringify(temp));
      }

      if (info_grad.value != "" && info_grad.value != null) {
        let temp = JSON.parse(localStorage.getItem("korisnici"));
        temp[i].grad = String(info_grad.value);
        localStorage.setItem("korisnici", JSON.stringify(temp));
      }

      if (info_postal.value != "" && info_postal.value != null) {
        let temp = JSON.parse(localStorage.getItem("korisnici"));
        temp[i].post_broj = Number(info_postal.value);
        localStorage.setItem("korisnici", JSON.stringify(temp));
      }
    }
  }

  button_promena.removeAttribute("hidden");
  button_promena_lozinke.removeAttribute("hidden");
  button_sacuvaj.setAttribute("hidden", "true");
  button_otkazi.setAttribute("hidden", "true");

  alert("Promene sacuvane.");
  window.location.reload();
}

function otkaziPromene() {
  let button_promena = document.getElementById("promena_podataka");
  let button_promena_lozinke = document.getElementById("promena_lozinke");
  let button_sacuvaj = document.getElementById("sacuvaj_promene");
  let button_otkazi = document.getElementById("otkazi_promene");

  let info_ime = document.getElementById("info_firstName");
  let info_prezime = document.getElementById("info_lastName");
  let info_mejl = document.getElementById("info_email");
  let info_telefon = document.getElementById("info_telephone");
  let info_adresa = document.getElementById("info_address");
  let info_grad = document.getElementById("info_city");
  let info_postal = document.getElementById("info_postal");

  info_ime.value = "";
  info_prezime.value = "";
  info_mejl.value = "";
  info_telefon.value = "";
  info_adresa.value = "";
  info_grad.value = "";
  info_postal.value = "";

  info_ime.setAttribute("readonly", "true");
  info_prezime.setAttribute("readonly", "true");
  info_mejl.setAttribute("readonly", "true");
  info_telefon.setAttribute("readonly", "true");
  info_adresa.setAttribute("readonly", "true");
  info_grad.setAttribute("readonly", "true");
  info_postal.setAttribute("readonly", "true");

  button_promena.removeAttribute("hidden");
  button_promena_lozinke.removeAttribute("hidden");
  button_sacuvaj.setAttribute("hidden", "true");
  button_otkazi.setAttribute("hidden", "true");

  alert("Promene otkazane.");
}

function promenaLozinke() {
  let password_old = document.getElementById("change_password_old");
  let password_new = document.getElementById("change_password_new");
  let password_new_check = document.getElementById("change_password_new_check");

  password_old.value = "";
  password_new.value = "";
  password_new_check.value = "";
}

function promeniLozinku() {
  let password_old_string = String(
    document.getElementById("change_password_old").value
  );
  let password_new_string = String(
    document.getElementById("change_password_new").value
  );
  let password_new_check_string = String(
    document.getElementById("change_password_new_check").value
  );

  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("korisnici")).length;
    i++
  ) {
    if (
      JSON.parse(localStorage.getItem("korisnici"))[i].mejl ==
      localStorage.getItem("trkorisnik")
    ) {
      if (
        JSON.parse(localStorage.getItem("korisnici"))[i].lozinka ==
        password_old_string
      ) {
        if (password_new_string == password_new_check_string) {
          if (/^.{6,}$/.test(password_new_string) == true) {
            let temp = JSON.parse(localStorage.getItem("korisnici"));
            temp[i].lozinka = password_new_string;
            localStorage.setItem("korisnici", JSON.stringify(temp));
            alert("Lozinka uspesno promenjena.");
            return;
          }

          alert("Lozinka nije u odgovarajucem formatu.");
          return;
        }

        alert("Lozinke se ne podudaraju.");
        return;
      }
      alert("Stara lozinka neispravna.");
      return;
    }
  }
}
