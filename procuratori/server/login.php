<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// 1. controllo parametri
		if(!isset($_POST["agentName"])){
			http_response_code(400);
			die("Inserire il nominativo");
		}
		if(!isset($_POST["agentPassword"])){
			http_response_code(400);
			die("Inserire la password");
		}	
		
		// 2. connessione
		$con = _connection("db_calciatori");
		$agent = $con->real_escape_string($_POST["agentName"]);
		$password = $con->real_escape_string($_POST["agentPassword"]);
		
		// 3. query
		$sql = "SELECT * from procuratori where Nominativo='$agent'";
		$data= _eseguiQuery($con, $sql);
		if(count($data)==0){
			http_response_code(401);
			die("Nominativo non valido");
		}
		else if($data[0]['password']!= $password){
			http_response_code(401);
			die("Password non valida");
		}

		// 4. creazione session e restituzione risultato
		else{
			session_start();
			$_SESSION["CodProcuratore"]=$data[0]['CodProcuratore'];
			$_SESSION["scadenza"] = time() + SCADENZA;
			setcookie(session_name(), session_id(), time()+SCADENZA, "/");
			//per eventuali chiamate che non ritornano dati
			//echo(json_encode({"ris":"ok"}))
			echo(json_encode(array("ris"=>"ok")));			
		}

		// 5. close
		$con->close();		
	}
	
?>