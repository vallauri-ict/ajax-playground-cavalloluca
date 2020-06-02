<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("CodProcuratore");
	
   	// 1. connessione
	$con=_connection("db_calciatori");
	
	// 2. Lettura parametri 
	$codP = $_SESSION["CodProcuratore"];
 
	// 3. Query
    $sql = "SELECT Nominativo, Nazionalità FROM procuratori WHERE CodProcuratore!='$codP';";
    $players = _eseguiQuery($con, $sql);
    echo json_encode($players);
    
    // 4. close
    $con->close();
?>