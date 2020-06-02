<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("CodProcuratore");
    	
	// 1. connessione
	$con=_connection("db_calciatori");

	//controllo parametri 
	if (!isset($_REQUEST["cognome"])) {
		http_response_code(422);
		die("Parametro mancante.");
	}
	if (!isset($_REQUEST["nome"])) {
		http_response_code(422);
		die("Parametro mancante.");
	}
	if (!isset($_REQUEST["codSquadra"])) {
		http_response_code(422);
		die("Parametro mancante.");
	}
	if (!isset($_REQUEST["anno"])) {
		http_response_code(422);
		die("Parametro mancante.");
	}
	if (!isset($_REQUEST["valore"])) {
		http_response_code(422);
		die("Parametro mancante.");
	}
	if (!isset($_REQUEST["nazion"])) {
		http_response_code(422);
		die("Parametro mancante.");
	}
	if (!isset($_REQUEST["ruolo"])) {
		http_response_code(422);
		die("Parametro mancante.");
	}
	if (!isset($_REQUEST["codCampionato"])) {
		http_response_code(422);
		die("Parametro mancante.");
	}

	// 2. Lettura parametri 
	$codP = $_SESSION["CodProcuratore"];
	$cognome = $_REQUEST["cognome"];
	$nome = $_REQUEST["nome"];
	$codSquadra = $_REQUEST["codSquadra"];
	$anno = $_REQUEST["anno"];
	$valore = $_REQUEST["valore"];
	$naz = $_REQUEST["nazion"];
	$ruolo = $_REQUEST["ruolo"];
	$codCampionato = $_REQUEST["codCampionato"];
	
	// 3. Query
	$sql="INSERT INTO calciatori (Cognome,Nome,CodSquadra,AnnoDiNascita,Valore,Nazionalità,Ruolo,CodProcuratore,CodCampionato)
		  VALUES ('$cognome','$nome','$codSquadra','$anno','$valore','$naz','$ruolo','$codP','$codCampionato')";
	$player = _eseguiQuery($con, $sql);

	/*if($player){
		echo("<br>Inserimento avvenuto correttamente");
	} else{
		echo("<br>Inserimento non eseguito");
	}*/

	echo json_encode($player);
    
	// 4. close
    $con->close();
?>





