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

// ---------------  *************************************  ------------------------
// variables
$idPerfil = 3;
$pedidoEstado = 1; 
$carrito = $obj['carrito'];
$totalOrden = $obj['granTotal'];
$userId = $obj['userId'];
$fecha = $obj['date1'];
$horario = $obj['date2'];
$idCom = $obj['idComercio'];
$payment = $obj['radioButtonChoose'];
$domicilio = $obj['domicilio'];

 
// Check the values before insert in table
//$arr[] = [$carrito,$totalOrden,$fecha,$horario,$userId,$payment,$idCom,$domicilio];
//echo json_encode($arr);


// 1 ---------------  ******************************  ------------------------

// Firts insert in table Pedido to generate the idPedido, por cada comercio ya sea repetido es un pedido

 

foreach($idCom as $item) {

$idComercio = $item;

$sqlInsertarPedido = "Insert into pedidoProducto (idUsuario,idComercio,fechaPedido,horaPedido,pedidoEstado) values ('$userId','$idComercio','$fecha','$horario','$pedidoEstado')";  
mysqli_query($con,$sqlInsertarPedido);

//echo json_encode($sqlInsertarPedido);
//echo json_encode(mysqli_query($con,$sqlInsertarPedido)); gives true or false
}



// 2 ---------------  ******************************  ------------------------
// Before insert products in table, need to colect the idPedido and idComercio from pedidoProducto 


$idPedidoSQL = "Select idPedido, idComercio from pedidoProducto Where idUsuario = '$userId' and fechaPedido = '$fecha' and horaPedido = '$horario'";
$result = $con->query($idPedidoSQL);

// idComercio 6 idPedido 197.   87 -- 198 y idUsuario 3


if ($result->num_rows == 0) {
    
$mensaje = "NoExistePedidosProductos";
// Converting the message into JSON format.
$NoSuccessMensaje = json_encode($mensaje);
    
echo $NoSuccessMensaje;   
    
  
} else {
      
while($row[] = $result->fetch_assoc()) {
$tem = $row;
//$arregloCombined = array_merge_recursive($tem,$carrito);

foreach($tem as $item1) {
$idCom1 = $item1['idComercio'];
$idPedido = $item1['idPedido'];

foreach($carrito as $item2){
$idCom2 = $item2['idComercio'];
$nombreTienda = $item2['nombreTienda'];
$idComercioProducto = $item2['idComercioProducto'];
$cantidadCompra = $item2['Cantidad'];
$precioUnidadProducto = $item2['precioUnidadProducto'];

if($idCom1 === $idCom2 && $idPerfil === 3){

$arr[] = [$idCom1,$idPedido,$nombreTienda,$idComercioProducto,$cantidadCompra,$precioUnidadProducto];

//$sqlInsertarItemPedido = "Insert into itemPedidos (idPedido,idComercioProducto,cantidadCompra,precioUnidad) values ('$idPedido','$idComercioProducto','$cantidadCompra','$precioUnidadProducto')"; 
//mysqli_query($con,$sqlInsertarItemPedido);

}


}

}

}

//echo json_encode($sqlInsertarItemPedido);
echo json_encode($arr);
}
 


$con->close(); 

?>