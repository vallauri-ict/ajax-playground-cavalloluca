"use script"
let _table;
$(document).ready(function () {
    let cmbSymbol = $("#cmbAziende");
    let txtSearch = $("#txtSearch");
    let cmbRank = $("#cmbRank");
    _table = $("#table");
    
    $("#wrapper").hide();
    
    cmbSymbol.prop("selectedIndex", "-1");

    caricaCmbRank(cmbRank);
    let timer = setTimeout(function () {
        cmbRank.prop("selectedIndex", "-1");
    }, 500);

    cmbSymbol.on("change", function () {
        txtSearch.prop("value", "");
        getGlobalQuotes(this.value);
        $("#grafico").children().remove();
    });

    txtSearch.on("keyup", function () {
        cmbSymbol.prop("selectedIndex", "-1");
        cmbRank.prop("selectedIndex", "-1");
        getSymbolSearch(this.value);
        $("#grafico").children().remove();
    });

    cmbRank.on("change", function () {
        cmbSymbol.prop("selectedIndex", "-1");
        txtSearch.prop("value", "");
        getGrafico(this.value);
        $(".table").remove();
        $("#wrapper").hide();
    });
});

function getGlobalQuotes(symbol) {
    let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=B7U16RFHRIBIVL54";
    $.getJSON(url,
        function (data) {
            let globalQuoteData = data["Global Quote"];
            createHeadTableCmb(globalQuoteData);
            let tr = $("<tr>").appendTo("#table");
            $("<td>").text(globalQuoteData["01. symbol"]).appendTo(tr);
            $("<td>").text(globalQuoteData["02. open"]).appendTo(tr);
            $("<td>").text(globalQuoteData["03. high"]).appendTo(tr);
            $("<td>").text(globalQuoteData["04. low"]).appendTo(tr);
            $("<td>").text(globalQuoteData["05. price"]).appendTo(tr);
            $("<td>").text(globalQuoteData["06. volume"]).appendTo(tr);
            $("<td>").text(globalQuoteData["07. latest trading day"]).appendTo(tr);
            $("<td>").text(globalQuoteData["08. previous close"]).appendTo(tr);
            $("<td>").text(globalQuoteData["09. change"]).appendTo(tr);
            $("#wrapper").show();
        }
    );
}

function getSymbolSearch(str) {
    if (str.length >= 2) {
        let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + str + "&apikey=B7U16RFHRIBIVL54";
        $.getJSON(url,
            function (data) {
                let bestMatches = data["bestMatches"];
                if (bestMatches.length == 0) {
                    $("#wrapper").hide();
                    $(".table").remove();
                    let timer = setTimeout(function () {
                        alert("Nessuna azienda corrispondente alle ricerche.");
                    }, 700);
                }
                else {
                    createHeadTableSearch(bestMatches[0]);
                    for (let i = 0; i < bestMatches.length; i++) {
                        let tr = $("<tr>").appendTo("#table");
                        $("<td>").text(bestMatches[i]["1. symbol"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["2. name"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["3. type"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["4. region"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["5. marketOpen"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["6. marketClose"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["7. timezone"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["8. currency"]).appendTo(tr);
                        $("<td>").text(bestMatches[i]["9. matchScore"]).appendTo(tr);
                        $("#wrapper").show();
                    }
                }
            }
        );
    }   
}

function getGrafico(strRank) {
    $("#grafico").children().remove();
    $("<label>").text("Grafico").appendTo("#grafico");
    $("<canvas>").prop("id","myChart").css({"width":"400", "height":"400"}).appendTo("#grafico");
    $.getJSON("http://localhost:3000/chart", function (dataChart) {
        $.getJSON("http://localhost:3000/sectors", function (dataSectors) {
            var ctx = document.getElementById('myChart').getContext('2d');
            let array = Object.keys(dataSectors[strRank]);
            for (let i = 0; i < array.length; i++) {
                dataChart["data"]["labels"][i] = array[i];
                dataChart["data"]["datasets"]["0"]["data"][i] = dataSectors[strRank][i];
            }
            dataChart["data"]["datasets"]["0"]["label"] = "Valori percentuali";
            let i = 0;
            for (let key in dataSectors[strRank]) {
                dataChart["data"]["datasets"][0]["data"][i] = dataSectors[strRank][key].substring(0, dataSectors[strRank][key].length - 2);
                if (dataChart["data"]["datasets"][0]["data"][i] > 0) {
                    dataChart["data"]["datasets"][0]["backgroundColor"][i] = "rgba(0,255,0,0.5)";
                    dataChart["data"]["datasets"][0]["borderColor"][i] = "rgb(0,255,0)";
                }
                else {
                    dataChart["data"]["datasets"][0]["backgroundColor"][i] = "rgba(255,0,0,0.5)";
                    dataChart["data"]["datasets"][0]["borderColor"][i] = "rgb(255,0,0)";
                }
                i++;
            }
            var myChart = new Chart(ctx, dataChart);
        });
    });
}

function createHeadTableCmb(globalQuoteData) {
    $(".table").remove();
    let _table = $("<table>").attr("id", "table").addClass("table").appendTo("#wrapper");
    let GQData = Object.keys(globalQuoteData);
    let _tr = $("<tr>").appendTo(_table);
    for (let i = 0; i < GQData.length - 1; i++) {
        let _th = $("<th>").text(GQData[i].substr(3).toUpperCase()).appendTo(_tr);
    }
}

function createHeadTableSearch(bestMatches) {
    $(".table").remove();
    let _table = $("<table>").attr("id", "table").addClass("table").appendTo("#wrapper");
    let array = Object.keys(bestMatches);
    let _tr = $("<tr>").appendTo(_table);
    for (let i = 0; i < array[0].length; i++) {
        let _th = $("<th>").text(array[i].substr(3).toUpperCase()).appendTo(_tr);
    }
}

function caricaCmbRank(cmbRank) {
    let url = "http://localhost:3000/sectors";
    $.getJSON(url,
        function (data) {
            let sectors = Object.keys(data);
            for(let key of sectors) {
                if (key != "Meta Data") {
                    $("<option>").text(key).prop("value",key).appendTo(cmbRank);
                }
            }
        });
}