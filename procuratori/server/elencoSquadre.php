<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("CodProcuratore");
    
    //controllo parametri 
    if (!isset($_REQUEST["campionato"])) {
        http_response_code(422);
        die("Parametro mancante.");
    }

   	// 1. connessione
	$con=_connection("db_calciatori");
	
	// 2. Lettura parametri 
    $nomeCampionato = $_REQUEST["campionato"];
    $codP = $_SESSION["CodProcuratore"];
 
	// 3. Query
    $sql = "SELECT squadre.Logo, squadre.NomeSquadra, squadre.Città, count(calciatori.Id)
            FROM calciatori, campionati, procuratori, squadre
            WHERE campionati.Nome = '$nomeCampionato' AND campionati.CodCampionato = calciatori.CodCampionato 
            AND calciatori.CodProcuratore =  procuratori.CodProcuratore AND procuratori.CodProcuratore = '$codP'
            AND calciatori.CodSquadra = squadre.CodSquadra
            GROUP BY squadre.NomeSquadra;";
    $data = _eseguiQuery($con, $sql);

    echo json_encode($data);

    // 4. close
    $con->close();

?>