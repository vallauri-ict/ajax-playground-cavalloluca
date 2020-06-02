<?php
    header("Content-type:application/json;charset=utf-8");
    require ("_libreria.php");
	
	_checkSession("CodProcuratore");
    	
	// 1. connessione
	$con=_connection("db_calciatori");

	// 2. Lettura parametri 
	$codP = $_SESSION["CodProcuratore"];
	
	// 3. Query
	$sql="SELECT Nominativo, immagine from procuratori where CodProcuratore = '$codP';";
	$user = _eseguiQuery($con, $sql);
	
	$data = array("name"=>$user[0]["Nominativo"], "img"=>$user[0]["immagine"]);
	echo json_encode($data);
    
	// 4. close
    $con->close();
?>