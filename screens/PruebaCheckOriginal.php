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
$payment = $obj['radioButtonChoose'];

// Check the values before insert in table
//echo json_encode([$userId,$idCom,$fecha,$carrito]);

// ---------------  ******************************  ------------------------

// Firts insert in table Pedido to generate the idPedido
 
$sqlInsertarPedido = "Insert into pedidoProducto (idUsuario,idComercio,fechaPedido,horaPedido,pedidoEstado) values ('$userId','$idCom','$fecha','$horario','$pedidoEstado')";  
//$arr[] = [$userId,$idCom,$fecha,$pedidoEstado,$totalOrden,$horario,$payment];

mysqli_query($con,$sqlInsertarPedido);
//echo json_encode($arr);die();
echo json_encode($sqlInsertarPedido);
//echo json_encode(mysqli_query($con,$sqlInsertarPedido));die();

/**
{
	
	"userId": 3,
    "date1": "30/4/2020",
    "date2": "15:24:43",
    "carrito": 3
	
}


 */



/**RespuestaServerCarrito *---* Array [
  Array [
    "3",
    Array [
      "1",   idComercio --> pedido 100
      "6",   idComercio ---> pedido 101
      "87", idComercio ---> pedido 102
    ],
    "30/4/2020 ",
    1,
    31800,
    "11:5:28",
    "",
    Array [
      Object {
        "Cantidad": 1,
        "cantidadProducto": "11",
        "descripcionProducto": "prueba galletas",
        "detalleComercio": "Restaurante de comida tradicional vallecaucana",
        "idComercio": "1",
        "idComercioProducto": "30",
        "idProducto": "23",
        "imagenComercio": "http://andresteccorp.club/TesisAndres/imagenesProyecto/imagenesProyecto/imagenComercio/antinos.jpg",
        "imagenProducto": "https://image.shutterstock.com/image-photo/chocolate-cookies-on-wooden-table-260nw-661622035.jpg",
        "nombreProducto": "Galletas",
        "nombreTienda": "Antinos",
        "precioUnidadProducto": "3000",
      },
      Object {
        "Cantidad": 1,
        "cantidadProducto": "8",
        "descripcionProducto": "Deliciosa bandeja paisa preparada con Arroz blanco chorizo, platano maduro,chicharron,carne molida y",
        "detalleComercio": "Comidas tradicionales Colombianas y comidas rapidas",
        "idComercio": "6",
        "idComercioProducto": "18",
        "idProducto": "18",
        "imagenComercio": "http://andresteccorp.club/TesisAndres/imagenesProyecto/imagenesProyecto/imagenComercio/peperestaurant.jpg",
        "imagenProducto": "https://media-cdn.tripadvisor.com/media/photo-s/02/ea/30/5d/little-city-el-pueblito.jpg",
        "nombreProducto": "Bandeja Paisa",
        "nombreTienda": "PepeRestaurante",
        "precioUnidadProducto": "12000",
      },
      Object {
        "Cantidad": 1,
        "cantidadProducto": "100",
        "descripcionProducto": "Burritos",
        "detalleComercio": "Autentico Sabor mexicano",
        "idComercio": "87",
        "idComercioProducto": "126",
        "idProducto": "74",
        "imagenComercio": "http://andresteccorp.club/TesisAndres/imagenesProyecto/imagenesProyecto/imagenComercio/aztecas.jpg",
        "imagenProducto": "http://andresteccorp.club/TesisAndres/imagenesProyecto/imagenesProyecto/imagenProductosComercio/burritosMexicanos.jpg",
        "nombreProducto": "Burritos Mexicanos",
        "nombreTienda": "Aztecas",
        "precioUnidadProducto": "12000",
      },
      Object {
        "Cantidad": 1,
        "cantidadProducto": "59",
        "descripcionProducto": "Empanadas crujientes",
        "detalleComercio": "Comidas tradicionales Colombianas y comidas rapidas",
        "idComercio": "6",
        "idComercioProducto": "98",
        "idProducto": "2",
        "imagenComercio": "http://andresteccorp.club/TesisAndres/imagenesProyecto/imagenesProyecto/imagenComercio/peperestaurant.jpg",
        "imagenProducto": "https://www.divinacocina.es/wp-content/uploads/empanadillas-de-pollo-al-curry.jpg",
        "nombreProducto": "Empanadas",
        "nombreTienda": "PepeRestaurante",
        "precioUnidadProducto": "2300",
      },
      Object {
        "Cantidad": 1,
        "cantidadProducto": "100",
        "descripcionProducto": "Refrescantes gaseosas de diferentes sabores",
        "detalleComercio": "Restaurante de comida tradicional vallecaucana",
        "idComercio": "1",
        "idComercioProducto": "34",
        "idProducto": "25",
        "imagenComercio": "http://andresteccorp.club/TesisAndres/imagenesProyecto/imagenesProyecto/imagenComercio/antinos.jpg",
        "imagenProducto": "http://andresteccorp.club/TesisAndres/imagenesProyecto/imagenesProyecto/imagenProductosComercio/gaseosa.jpg",
        "nombreProducto": "Gaseosa",
        "nombreTienda": "Antinos",
        "precioUnidadProducto": "2500",
      },
    ],
  ],
] */



// ---------------  ******************************  ------------------------
// Second insert in table itemPedidos to generate the list of items bought


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
//$sqlInsertarItemPedido = '';
foreach($carrito as $item) {

$i_c = $item['item'];
  
$cantPCompra = $item['Cantidad'];
    
//$cantPStock = $i_c['cantidadProducto']; 
    
$idComercioP = $i_c['idComercioProducto'];
    
$idPrecioP = $i_c['precioUnidadProducto'];

$sqlInsertarItemPedido = "Insert into itemPedidos (idPedido,idComercioProducto,cantidadCompra,precioUnidad) values ('$idPedido','$idComercioP','$cantPCompra','$idPrecioP')"; 

mysqli_query($con,$sqlInsertarItemPedido);
//echo json_encode(mysqli_query($con,$sqlInsertarItemPedido));
//  .= sum para imprimir    $arr[] = [$idPedido,$cantPCompra,$cantPStock,$idComercioP,$idPrecioP];
}
//echo json_encode($arr);die();
//echo json_encode($sqlInsertarItemPedido);
}
 
die(); 
$con->close();
//echo json_encode(mysqli_query($con,$sqlInsertarPedido)); gives true or false
//$carrito = json_encode($carrito[0]['Cantidad']); Get value 
?>