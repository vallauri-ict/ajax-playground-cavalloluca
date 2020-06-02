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
    $sql = "DELETE FROM calciatori WHERE calciatori.Id = '$idPlayer';";
    $data = _eseguiQuery($con, $sql);

    echo json_encode($data);

    // 4. close
    $con->close();
?>