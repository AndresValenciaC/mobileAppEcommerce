<?php
// https://stackoverflow.com/questions/49205035/react-native-fetch-sending-array-to-php 

// Codigo donde el usuario procede al proceso del pedido-pago entrando a session primero
// Importing DBConfig.php file.
include 'dbconfig.php';

 if ($con->connect_error) {
 
 die("Connection failed: " . $con->connect_error);
} 
// Creating connection.
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
// Getting the received JSON.
$json = file_get_contents('php://input');
 
// Problemas con el true 
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

// ---------------  ******************************  ------------------------

// variables
$idPerfil = 3;

$pedidoEstado = 1; 
$carrito = $obj['carrito'];
$totalOrden = $obj['granTotal'];
$fecha = $obj['date1'];
$horario = $obj['date2'];
$userId = $obj['userId'];
$idCom = $obj['idComercio'];

// Check the values before insert in table
//echo json_encode([$userId,$idCom,$fecha,$carrito]);

// ---------------  ******************************  ------------------------

// Firts insert in table Pedido to generate the idPedido
 
$sqlInsertarPedido = "Insert into pedidoProducto (idPedido,idUsuario,idComercio,fechaPedido,pedidoEstado) values ('','".$userId."','".$idCom."','".$fecha."','".$pedidoEstado."')";  

mysqli_query($con,$sqlInsertarPedido);
 

// ---------------  ******************************  ------------------------
// Second insert in table itemPedido to generate the list of items bought


// Before insert products in table, need to colect the last value from pedidoProducto 


$idPedidoSQL = "SELECT idPedido FROM pedidoProducto ORDER BY idPedido DESC 
LIMIT 1 ";

$id = mysqli_fetch_array(mysqli_query($con,$idPedidoSQL));
$idPedido = $id[0];
//echo json_encode($id[0]);

if(is_array($carrito)){
//echo json_encode($carrito); 
//die();
//$arr = array();
$sqlInsertarItemPedido = '';
foreach($carrito as $item) {

$i_c = $item['item'];
  
$cantPCompra = $item['Cantidad'];
    
//$cantPStock = $i_c['cantidadProducto']; 
    
$idComercioP = $i_c['idComercioProducto'];
    
$idPrecioP = $i_c['precioUnidadProducto'];

$sqlInsertarItemPedido = "Insert into itemPedido (idItemPedido,idPedido,idComercioProducto,cantidadCompra,precioUnidad) values ('','$idPedido','$idComercioP','$cantPCompra','$idPrecioP')"; 

mysqli_query($con,$sqlInsertarItemPedido);
//  .= sum para imprimir    $arr[] = [$idPedido,$cantPCompra,$cantPStock,$idComercioP,$idPrecioP];
}
//echo json_encode($arr);die();
echo json_encode($sqlInsertarItemPedido);
}
 
die(); 
$con->close();
//echo json_encode(mysqli_query($con,$sqlInsertarPedido)); gives true or false
//$carrito = json_encode($carrito[0]['Cantidad']); Get value 
?>