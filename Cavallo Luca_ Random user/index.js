"use strict"
let nProfili,
    risultati,
    nPos = 0,
    lastIcon,
    pInfo;

$(document).ready(function () {
    inizializzazione();
    inviaRichiesta();
    

    function inizializzazione() {
        pInfo = $("#pInfo");
        $("#phrase").text("Hi, my name is");
        $("#profilo");

        let _btnGenerate = $("#btnGenerate");
        _btnGenerate.on("click", inviaRichiesta);

        let _rangeProfili = $("#rangeProfili");
        _rangeProfili.on("input", aggiornaSpan);

        //Associazione evento di click per le frecce
        let _frecciaSX = $("#frecciaSX");
        _frecciaSX.on("click", frecciaSX);
        let _frecciaDX = $("#frecciaDX");
        _frecciaDX.on("click", frecciaDX);

        //Associazione evento di mouseover per ogni simbolo
        let _profilo = $("#profilo");
        _profilo.on("mouseover", mostraProfilo);
        let _emailImg = $("#emailImg");
        _emailImg.on("mouseover", mostraEmail);
        let _birthday = $("#birthday");
        _birthday.on("mouseover", mostraBD);
        let _map = $("#map");
        _map.on("mouseover", mostraMappa);
        let _cell = $("#cell");
        _cell.on("mouseover", mostraPhone);
        let _passwordImg = $("#passwordImg");
        _passwordImg.on("mouseover", mostraPwd);
    }    
});

function inviaRichiesta() {
    nProfili = $("#rangeProfili").val();
    let i = 0;
    while ($("input:radio[name=radioGenere]").eq(i).is(":checked") ==false)
        i++;
    let genere = $("input:radio[name=radioGenere]").eq(i).prop("id").split('-')[1];
    //console.log(genere);
    if (genere == "all")
        genere = "";
    let nazioni = "";
    for (let i = 0; i < $("input:checkbox[name=chkNazione]").length; i++)
        if ($("input:checkbox[name=chkNazione]").eq(i).is(":checked"))
            nazioni += $("input:checkbox[name=chkNazione]").eq(i).prop("id").split('-')[1] + ",";
    nPos = 0;
    //console.log(nazioni);

    $.ajax({
        url: "https://randomuser.me/api",
        type: "GET",
        data: "results=" + nProfili + "&gender=" + genere + "&nat=" + nazioni,
        contentType: "application/x-www-form-urlencoded, charset-UTF-8",
        dataType: "json",
        async: true,
        timeout: 5000,
        success: function (date) { risultati = date["results"], aggiornaPagina() },
        error: function (jqXHR, test_status, str_error) {
            alert("Server error: " + jqXHR.status + " - " + jqXHR.responseText)
        }
    })
	
}

function aggiornaPagina() {
    $("#img").prop("src",risultati[nPos]["picture"]["large"]);
    pInfo.html(risultati[nPos]["name"]["first"] + " " + risultati[nPos]["name"]["last"]);
    if (lastIcon)
        lastIcon.css({
            "background-position-y": "-48px"
        });
    lastIcon = $("#profilo");
    mostraProfilo();
    aggiornaCounter();
}

function aggiornaCounter() {
    $("#progressProfile").html("Profile " + (nPos + 1) + " of " + nProfili);
    $("#progressProfile").css({
        "margin-top": "10px",
        "margiin-bottom": "10px"
    })
}

function aggiornaSpan() {
    $("#nCorrente").html($("#rangeProfili").val());
}

function frecciaSX() {
    if (nPos != 0) {
        nPos--;
        if (nPos == 0)
            $("#frecciaSX").css({ disabled: true, opacity: 0.5 });
        aggiornaPagina();
    }
    $("#frecciaDX").css({ disabled: true, opacity: 1 });
}

function frecciaDX() {
    if (nPos != nProfili - 1) {
        nPos++;
        if (nPos == nProfili - 1)
            $("#frecciaDX").css({ disabled: true, opacity: 0.5 });
        aggiornaPagina();
    }
    $("#frecciaSX").css({ disabled: true, opacity: 1 });
}

function mostraProfilo() {
    $("#phrase").html("Hi, my name is");
    lastIcon = $("#profilo");
    pInfo.html(risultati[nPos]["name"]["first"] + " " + risultati[nPos]["name"]["last"]);
}

function mostraEmail() {
    $("#phrase").html("My email address is");
    lastIcon = $("#emailImg");
    pInfo.html(risultati[nPos]["email"]);
}

function mostraBD() {
    $("#phrase").html("My birthday is");
    lastIcon = $("#birthday");
    pInfo.html(risultati[nPos]["dob"]["date"].split("T")[0]);
}

function mostraMappa() {
    $("#phrase").html("My address is");
    lastIcon = $("#map");
    pInfo.html(risultati[nPos]["location"]["street"]["number"] + " " + risultati[nPos]["location"]["street"]["name"]);
}

function mostraPhone() {
    $("#phrase").html("My phone number is");
    lastIcon = $("#cell");
    pInfo.html(risultati[nPos]["phone"]);
}

function mostraPwd() {
    $("#phrase").html("My password is");
    lastIcon = $("#passwordImg");
    pInfo.html(risultati[nPos]["login"]["password"]);
}

/*function aggiornaPagina(data) {
    console.log(data)
    let person = data.results[0];
    let st = person.name.title + " " + person.name.first + " " + person.name.last
    $("#name").html(st);
    let foto = person.picture.medium;
    $("#idFoto").attr("src",foto);
}*/



