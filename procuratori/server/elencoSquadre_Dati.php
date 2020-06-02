<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("CodProcuratore");
    
    //controllo parametri 
    if (!isset($_REQUEST["NomeSquadra"])) {
        http_response_code(422);
        die("Parametro mancante.");
    }

   	// 1. connessione
	$con=_connection("db_calciatori");
	
	// 2. Lettura parametri 
    $nomeSquadra = $_REQUEST["NomeSquadra"];
    $codP = $_SESSION["CodProcuratore"];
 
	// 3. Query
    $sql = "SELECT squadre.CodSquadra, squadre.NomeSquadra, campionati.Nome,campionati.Nazione, squadre.Città, squadre.Stadio
            FROM squadre, campionati
            WHERE squadre.NomeSquadra = '$nomeSquadra' AND squadre.CodCampionato=campionati.CodCampionato;";
    $data = _eseguiQuery($con, $sql);

    echo json_encode($data);

    // 4. close
    $con->close();
?>