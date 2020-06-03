"use strict"

$(document).ready(function() {	
	let _username = $("#agentName")
	let _password = $("#agentPassword")
	let _signIn=$("#registrati");
	let _usernameError, _passError, _lblErrore;
	
	$("#btnLogin").on("click", controllaLogin);
	
	$(document).on('keydown', function(event) {	
	   if (event.keyCode == 13)  
		   controllaLogin();
	});

	/* password e/o username sbagliati*/
	_lblErrore=$("<div>").addClass("alert alert-danger alert-dismissible")
			.html("Username or Password aren't right! Try again.")
			.css({
				"font-weight":"bold",
				"height": "45%",
				"padding": "3%"
			}).appendTo("#form1");

	/* username mancante */
	_usernameError=$("<div>").addClass("alert alert-danger alert-dismissible")
			.html("Inserire il proprio nominativo!").appendTo("#form1");

	/* password mancante */
	_passError=$("<div>").addClass("alert alert-danger alert-dismissible")
			.html("Inserire la password per accedere!").appendTo("#form1");
	
	_lblErrore.hide();
	_usernameError.hide();
	_passError.hide();
	
	
	function controllaLogin(){
		
        _username.removeClass("is-invalid");
		_username.prev().removeClass("icona-rossa"); 		
        _password.removeClass("is-invalid");
		_password.prev().removeClass("icona-rossa"); 

		
		_username.on("keyup",function(){
			UPkeyup(_usernameError, _passError,_lblErrore);
		})

		_password.on("keyup",function(){
			UPkeyup(_usernameError,_passError,_lblErrore);
		})
		
		if(_username.val()=="" && _password.val()=="")
			UPkeyup(_usernameError, _passError,_lblErrore);
		else if(_username.val()!="" && _password.val()==""){
			UPkeyup(_usernameError, _passError,_lblErrore);
		}
		else if(_username.val()=="" && _password.val()!=""){
			UPkeyup(_passError, _usernameError,_lblErrore);
		}
		else if(_username.val()!="" && _password.val()!=""){
			let agent=_username.val();
			let pass=CryptoJS.MD5(_password.val()).toString();
			
			let _richiestaLogin= inviaRichiesta("POST", "server/login.php", { "agentName":agent, "agentPassword":pass } );
			_richiestaLogin.fail(function(jqXHR, test_status, str_error) {
				if (jqXHR.status == 401) { 
					creaError();
				} else
					error(jqXHR, test_status, str_error)
			});
			_richiestaLogin.done(function(data) {
				if(data.ris=="ok"){ 
					window.location.href = "index.html"
				}
			});
		}
	}

	/*_signIn.on("click",function(){

	});*/
	
	

	function creaError(){
		$("#divcontid").removeClass("divcontid");
		$("#divcontid").removeClass("divcontidDouble");
		$("#divcontid").removeClass("divcontidUP");
		$("#divcontid").addClass("divcontidError");
		_usernameError.hide();
		_passError.hide();
		_lblErrore.show();
	    $("<button>").addClass("close").attr("prop","button").appendTo(_lblErrore);

		_lblErrore.children("button").on("click", function(){
			_lblErrore.hide();
		})
	}

	function UPkeyup(label1, label2, label3){
		if(_username.val()=="" && _password.val()==""){
			label1.show();
			label2.show();
			label3.hide();
			_lblErrore.hide();
			_username.addClass("is-invalid");
			_password.addClass("is-invalid");
			_username.prev().addClass("icona-rossa"); 
			_password.prev().addClass("icona-rossa"); 
			$("#divcontid").removeClass("divcontidError");
			$("#divcontid").addClass("divcontidDouble");
		}
        else if (_username.val() == "") {
			_username.addClass("is-invalid"); 
			_username.prev().addClass("icona-rossa"); 
			_password.removeClass("is-invalid");
			_password.prev().removeClass("icona-rossa");
			_password.removeClass("is-invalid");
			_password.prev().removeClass("icona-rossa");
			label1.show();
			label2.hide();
			label3.hide();
			$("#divcontid").removeClass("divcontidDouble");
			$("#divcontid").removeClass("divcontidError");
			$("#divcontid").addClass("divcontidUP");
		} 
		else if (_password.val() == "") {
			_password.addClass("is-invalid");
			_password.prev().addClass("icona-rossa"); 
			_username.removeClass("is-invalid");
			_username.prev().removeClass("icona-rossa"); 
			_username.removeClass("is-invalid");
			_username.prev().removeClass("icona-rossa"); 
			label1.hide();
			label2.show();
			label3.hide();
			$("#divcontid").removeClass("divcontidDouble");
			$("#divcontid").removeClass("divcontidError");
			$("#divcontid").addClass("divcontidUP");
		}
		else{
			$("#divcontid").addClass("divcontid");
			$("#divcontid").removeClass("divcontidDouble");
			$("#divcontid").removeClass("divcontidUP");
			$("#divcontid").removeClass("divcontidError");
			_usernameError.hide();
			_passError.hide();
			_lblErrore.hide();
			_username.removeClass("is-invalid");
			_username.prev().removeClass("icona-rossa"); 		
        	_password.removeClass("is-invalid");
			_password.prev().removeClass("icona-rossa"); 
		}
	}


});