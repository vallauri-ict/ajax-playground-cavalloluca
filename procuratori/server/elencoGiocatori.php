<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("CodProcuratore");
	
   	// 1. connessione
	$con=_connection("db_calciatori");
	
	// 2. Lettura parametri 
	$codP = $_SESSION["CodProcuratore"];
 
	// 3. Query
    $sql = "SELECT calciatori.Cognome, calciatori.Nome, squadre.NomeSquadra, squadre.Logo, calciatori.Id
            FROM calciatori, procuratori, squadre
            WHERE procuratori.CodProcuratore = '$codP' AND procuratori.CodProcuratore = calciatori.CodProcuratore
            AND calciatori.CodSquadra = squadre.CodSquadra;";
    $players = _eseguiQuery($con, $sql);
    echo json_encode($players);
    
    // 4. close
    $con->close();
?>