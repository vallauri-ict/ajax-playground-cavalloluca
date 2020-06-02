<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("CodProcuratore");
    
    //controllo parametri 
    if (!isset($_REQUEST["idPlayer"])) {
        http_response_code(422);
        die("Parametro mancante.");
    }

   	// 1. connessione
	$con=_connection("db_calciatori");
	
	// 2. Lettura parametri 
    $idPlayer = $_REQUEST["idPlayer"];
    $codP = $_SESSION["CodProcuratore"];
 
	// 3. Query
    $sql = "SELECT calciatori.Id, calciatori.Cognome, calciatori.Nome, squadre.NomeSquadra, calciatori.AnnoDiNascita,
                   calciatori.Valore, calciatori.Nazionalità, calciatori.Ruolo
            FROM calciatori, squadre
            WHERE calciatori.Id = '$idPlayer' AND calciatori.CodSquadra = squadre.CodSquadra";
    $data = _eseguiQuery($con, $sql);

    echo json_encode($data);

    // 4. close
    $con->close();


    /*  per eventuali chiamate che non ritornano dati
    echo json_encode(array("ris"=>"ok"));*/
?>