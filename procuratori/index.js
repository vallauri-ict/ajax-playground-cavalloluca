"use strict"

$(document).ready(function() {
	let _wrapper=$("#wrapper");	
	let _navItem1 = $("#navItem1");  //my players
	let _navItem2 = $("#navItem2");  //soccer agents
	let _serieA = $("#serieA");
	let _liga = $("#liga");
	let _premierLeague = $("#premierLeague");
	let _liexit = $("#liexit");
	let _divPlayers= $("#divPlayers");
	let _divSquadre= $("#divSquadre");
	let _divAgents=$("#divAgents");
	let _imgProc;
	let _divFeat=$("<div>").css({"width":"50%","background-color":"rgba(0,0,0,0.7)","margin":"0px auto"}).appendTo(_wrapper);
	let _divTeam=$("#divTeam").css({"width":"50%","background-color":"rgba(0,0,0,0.7)","margin":"0px auto"}).appendTo(_wrapper);
	let _divAdd=$("<div>").css({"text-align":"center", "padding":"2%"}).appendTo(_divPlayers);
	let _table;
	let _divClickAdd=$("<div>").css({"width":"40%","background-color":"rgba(0,0,0,0.7)","margin":"0px auto","text-align":"center"}).appendTo(_wrapper);;;

	// nome e foto procuratore
	let _richiestaNominativo = inviaRichiesta("get", "server/nomeProcuratore.php");
	
	_richiestaNominativo.fail(function(jqXHR, test_status, str_error) {
		if (jqXHR.status == 403) {  
			window.location.href="login.html";
		} 
		else
			error(jqXHR, test_status, str_error)
	});
	
	_richiestaNominativo.done(function (data) {
		console.log(data);
		_wrapper.show();
		nascondi();

		$("<a>").css({
			"color":"white",
			"position": "right",
			"text-decoration" : "underline"
		}).text("Agent: " + data["name"]).addClass("nav-link").appendTo($("#liName"));

		_imgProc=$("<img>").addClass(".rounded mx-auto d-block").attr("src","img/" + data["img"]).appendTo($("#foto"));

	});

	//lista dei giocatori del procuratore loggato
	_navItem1.on("click",function(){
		let _richiestaGiocatori = inviaRichiesta("get", "server/elencoGiocatori.php",);
	
		_richiestaGiocatori.fail(function(jqXHR, test_status, str_error) {
			if (jqXHR.status == 403) {  
				window.location.href="login.html";
			} 
			else
				error(jqXHR, test_status, str_error)
		});
		
		_richiestaGiocatori.done(function (data) {
			console.log(data);
			_imgProc.remove();
			nascondi();
			_divPlayers.show();
			
			_table = _divPlayers.find("tbody");
			_table.html("");
			if(data.length == 0)
				$("<td>").html("<b>There aren't players</b>.").appendTo(_table);
			else{
				for (let record of data) {
					let _tr = $("<tr>").on("click",function(){
						caratteristiche(record["Id"]);
					}).css("cursor","default").appendTo(_table);
					for (let key in record){
						if(key!="Id"){
							if(key == "Cognome" || key=="Nome"){
								$("<td>", {
									"text": record[key]
								}).css({ "font-weight":"bold","cursor":"help"}).appendTo(_tr);
							}
							else{
								$("<td>", {
									"text": record[key]
								}).appendTo(_tr);
							}
						}
					}
					$(_tr).children(":last-child").html("<img height='20' src='"+ record["Logo"] + "'>");
				}
				_divPlayers.find("table").DataTable();
			}
			_divAdd.children().remove();
			_divPlayers.children("input").remove();
			$("<input type='button'>").val("Click here to add a new player in your list").on("click",function(){
				aggiungi(_divAdd);
			}).appendTo(_divPlayers).css({"font-weight":"bold", "background-color":"lightblue"});
			
		});
	})

	// lista di tutti i procuratori
	_navItem2.on("click",function(){
		let _richiestaProcuratori = inviaRichiesta("get", "server/elencoProcuratori.php");
	
		_richiestaProcuratori.fail(function(jqXHR, test_status, str_error) {
			if (jqXHR.status == 403) {  
				window.location.href="login.html";
			} 
			else
				error(jqXHR, test_status, str_error)
		});
		
		_richiestaProcuratori.done(function (data) {
			console.log(data);
			_imgProc.remove();
			nascondi();
			_divAgents.show();
			
			let _table = _divAgents.find("tbody");
			_table.html("");
			if(data.length == 0)
				$("<td>").html("<b>No one but you.</b>").appendTo(_table);
			else{
				for (let record of data) {
					let _tr = $("<tr>").css("cursor","default").appendTo(_table);
					for (let key in record)
						$("<td>", {
							"text": record[key]
						}).appendTo(_tr);
				}
				_divAgents.find("table").DataTable();
			}
		});
	})

	// lista di tutte le squadre di serie a
	_serieA.on("click",function(){
		squadreCampionato($(this).text());
	})

	// lista di tutte le squadre della liga
	_liga.on("click",function(){
		squadreCampionato($(this).text());
	})

	// lista di tutte le squadre della premier
	_premierLeague.on("click",function(){
		squadreCampionato($(this).text());
	})

	// logout
	_liexit.on("click",function(){
		let _richiestaLogout = inviaRichiesta("POST", "server/logout.php");		
		_richiestaLogout.fail(error);
		_richiestaLogout.done(function (data) { 
			if (data["ok"]==true){
				window.location.href="login.html";
			}
		});
	})


	function caratteristiche(id){
		// richiesta di tutti dati del giocatore
		console.log(id);
		let _richiestaDati = inviaRichiesta("get", "server/elencoGiocatori_Dati.php",{"idPlayer": id});
	
		_richiestaDati.fail(function(jqXHR, test_status, str_error) {
			if (jqXHR.status == 403) {  
				window.location.href="login.html";
			} 
			else
				error(jqXHR, test_status, str_error)
		});
		
		_richiestaDati.done(function (data) {
			console.log(data)
			nascondi();
			_divFeat.show();
			
			_divFeat.find("p").remove();
		    _divFeat.show();
			$("<p>", {
				"css": {"text-align":"center", "color":"white", "font-size":"16pt"},
				"html" : "Id player: <b>" + data[0]["Id"] + "</b><br>" + 
						 "Surname: <b>" + data[0]["Cognome"] + "</b><br>" + 
						 "Name: <b>" + data[0]["Nome"] + "</b><br>" + 
						 "Team: <b>" + data[0]["NomeSquadra"] + "</b><br>" + 
						 "Role: <b>" + data[0]["Ruolo"] + "</b><br>" +
						 "Year of birth: <b>" + data[0]["AnnoDiNascita"] + "</b><br>" + 
						 "Nationality: <b>" + data[0]["Nazionalità"] + "</b><br>" +
						 "Value (€): <b>" + data[0]["Valore"] + "</b><br>"
			}).appendTo(_divFeat);
			let _divDelete=$("<div>").css({"text-align":"center", "padding-bottom":"2%"}).appendTo(_divFeat);
			$("<input type='button'>").val("Click here to remove this player from your list").on("click",function(){
				rimuovi(data[0]["Id"]);
			}).appendTo(_divDelete).css({"font-weight":"bold", "background-color":"lightblue"});
		});
	}

	function squadreCampionato(league){
		let _richiestaSquadre = inviaRichiesta("get", "server/elencoSquadre.php", {"campionato":league});
	
		_richiestaSquadre.fail(function(jqXHR, test_status, str_error) {
			if (jqXHR.status == 403) {  
				window.location.href="login.html";
			} 
			else
				error(jqXHR, test_status, str_error)
		});
		
		_richiestaSquadre.done(function (data) {
			console.log(data);
			_imgProc.remove();
			nascondi();
			_divSquadre.show();
			
			let _table = _divSquadre.find("tbody");
			_divSquadre.find("td").remove();
			if(data.length == 0)
				$("<td>").html("<b>No players in this league.</b>").appendTo(_table);
			else{
				for (let record of data) {
					let _tr = $("<tr>").css("cursor","default").on("click",function(){
						caratteristicheSquadra(record["NomeSquadra"]);
					}).appendTo(_table);
					for (let key in record){
						if(key=="Logo")
							$("<td>").html("<img height='20' src='"+ record["Logo"] + "'>").appendTo(_tr);
						else if(key=="NomeSquadra"){
							$("<td>", {
								"text": record[key]
							}).css({ "font-weight":"bold","cursor":"help"}).appendTo(_tr);
						}
						else{
							$("<td>", {
								"text": record[key]
							}).appendTo(_tr);
						}
					}
				}
				_divSquadre.find("table").DataTable();
			}
		});
	}

	function caratteristicheSquadra(nome){
		// richiesta di tutti dati della squadra
		let _richiestaDatiSquadra = inviaRichiesta("get", "server/elencoSquadre_Dati.php",{"NomeSquadra": nome});

		_richiestaDatiSquadra.fail(function(jqXHR, test_status, str_error) {
			if (jqXHR.status == 403) {  
				window.location.href="login.html";
			} 
			else
				error(jqXHR, test_status, str_error)
		});

		_richiestaDatiSquadra.done(function (data) {
			console.log(data);
			nascondi();
			_divTeam.show();
			
			_divTeam.find("p").remove();
			_divTeam=$("<div>").css({"width":"50%","background-color":"rgba(0,0,0,0.7)","margin":"0px auto"}).appendTo(_wrapper);
			$("<p>", {
				"css": {"text-align":"center", "color":"white", "font-size":"16pt"},
				"html" : "Codice squadra: <b>" + data[0]["CodSquadra"] + "</b><br>" + 
						"Nome: <b>" + data[0]["NomeSquadra"] + "</b><br>" + 
						"Campionato: <b>" + data[0]["Nome"] + "</b><br>" + 
						"Nazione: <b>" + data[0]["Nazione"] + "</b><br>" + 
						"Città: <b>" + data[0]["Città"] + "</b><br>" + 
						"Stadio: <b>" + data[0]["Stadio"] + "</b><br>"
			}).appendTo(_divTeam);
		});
	}

	function rimuovi(id){
		let _rimouviPlayer = inviaRichiesta("get", "server/rimuoviPlayer.php", {"idPlayer":id});
	
		_rimouviPlayer.fail(function(jqXHR, test_status, str_error) {
			if (jqXHR.status == 403) {  
				window.location.href="login.html";
			} 
			else
				error(jqXHR, test_status, str_error)
		});
		
		_rimouviPlayer.done(function (data) {
			console.log(data);
			_divFeat.find("input").remove();
			_divFeat.find("p").html("");
			$("<p>", {
				"css": {"text-align":"center", "color":"white", "font-size":"16pt"},
				"html" : "The player has been removed from your list."
			}).appendTo(_divFeat);
		});
	}

	function aggiungi(_divAdd){
		_divPlayers.hide();
		_divClickAdd.children().remove();
		//_divClickAdd=$("<div>").css({"width":"40%","background-color":"rgba(0,0,0,0.7)","margin":"0px auto","text-align":"center"}).appendTo(_wrapper);
		_divClickAdd.show();
		//cognome
		$("<p>").html("Surname:").css({"display":"inline-block", "color":"white"}).appendTo(_divClickAdd);
		let _cog=$("<input type='text'>").css({"margin-left":"1%","margin-top":"1%"}).appendTo(_divClickAdd);
		$("<br>").appendTo(_divClickAdd);
		//nome
		$("<p>").html("Name:").css({"display":"inline-block", "color":"white"}).appendTo(_divClickAdd);
		let _nome=$("<input type='text'>").css({"margin-left":"1%","margin-top":"1%"}).appendTo(_divClickAdd);
		$("<br>").appendTo(_divClickAdd);
		//codSquadra
		$("<p>").html("CodTeam:").css({"display":"inline-block", "color":"white"}).appendTo(_divClickAdd);
		let _codS=$("<input type='text'>").css({"margin-left":"1%","margin-top":"1%"}).appendTo(_divClickAdd);
		$("<br>").appendTo(_divClickAdd);
		//anno di nascita
		$("<p>").html("Year of birth:").css({"display":"inline-block", "color":"white"}).appendTo(_divClickAdd);
		let _anno=$("<input type='text'>").css({"margin-left":"1%","margin-top":"1%"}).appendTo(_divClickAdd);
		$("<br>").appendTo(_divClickAdd);
		//valore
		$("<p>").html("Value (€):").css({"display":"inline-block", "color":"white"}).appendTo(_divClickAdd);
		let _valore=$("<input type='text'>").css({"margin-left":"1%","margin-top":"1%"}).appendTo(_divClickAdd);
		$("<br>").appendTo(_divClickAdd);
		//nazionalità
		$("<p>").html("Nationality:").css({"display":"inline-block", "color":"white"}).appendTo(_divClickAdd);
		let _nat=$("<input type='text'>").css({"margin-left":"1%","margin-top":"1%"}).appendTo(_divClickAdd);
		$("<br>").appendTo(_divClickAdd);
		//ruolo
		$("<p>").html("Role:").css({"display":"inline-block", "color":"white"}).appendTo(_divClickAdd);
		let _ruolo=$("<input type='text'>").css({"margin-left":"1%","margin-top":"1%"}).appendTo(_divClickAdd);
		$("<br>").appendTo(_divClickAdd);
		//codCampionato
		$("<p>").html("CodLeague:").css({"display":"inline-block", "color":"white"}).appendTo(_divClickAdd);
		let _codCamp=$("<input type='text'>").css({"margin-left":"1%","margin-top":"1%"}).appendTo(_divClickAdd);
		$("<br>").appendTo(_divClickAdd);
		
		$("<input type='button'>").val("Add player!").on("click",function(){
			clickAdd(_cog.val(),_nome.val(),_codS.val(),_anno.val(),_valore.val(),_nat.val(),_ruolo.val(),_codCamp.val());
		}).appendTo(_divClickAdd).css({"font-weight":"bold", "background-color":"lightblue"});
	}

	function clickAdd(_cog,_nome,_codS,_anno,_valore,_nat,_ruolo,_codCamp){
		if(_cog=="" || _nome=="" || _codS=="" || _anno=="" || _valore=="" || _nat=="" || _ruolo=="" || _codCamp=="")
			alert("You must fill in all fields");
		else{
			let _addPlayer = inviaRichiesta("get", "server/inserisciPlayer.php", {
				"cognome":_cog,"nome":_nome,"codSquadra":_codS,"anno":_anno,
				"valore":_valore,"nazion":_nat,"ruolo":_ruolo,"codCampionato":_codCamp });
	
			_addPlayer.fail(function(jqXHR, test_status, str_error) {
				if (jqXHR.status == 403) {  
					window.location.href="login.html";
				} 
				else
					error(jqXHR, test_status, str_error)
			});
			
			_addPlayer.done(function (data) {
				console.log(data);
				/*$("<p>", {
					"color":"black",
					"css": {"text-align":"center", "color":"white", "font-size":"16pt"},
					"html" : "The player was successfully added to your list."
				}).appendTo(_divClickAdd);*/
				_divClickAdd.find("input[type='text']").val("");
			});
		}
	}

	function nascondi(){
		_divPlayers.hide();
		_divAgents.hide();
		_divSquadre.hide();
		_divFeat.hide();
		_divTeam.hide();
		_divClickAdd.hide();
	}
	
});