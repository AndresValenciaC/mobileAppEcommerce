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
$fecha = $obj['date1'];
$horario = $obj['date2'];
$userId = $obj['userId'];
$idCom = $obj['idComercio'];
$payment = $obj['radioButtonChoose'];

 
// Check the values before insert in table
//$arr[] = [$carrito,$totalOrden,$fecha,$horario,$userId,$payment,$idCom,];
//echo json_encode($arr);


// 1 ---------------  ******************************  ------------------------

// Firts insert in table Pedido to generate the idPedido, por cada comercio ya sea repetido es un pedido

 /* 
foreach($idCom as $item) {

$idComercio = $item;

$sqlInsertarPedido = "Insert into pedidoProducto (idUsuario,idComercio,fechaPedido,horaPedido,pedidoEstado) values ('$userId','$idComercio','$fecha','$horario','$pedidoEstado')";  
mysqli_query($con,$sqlInsertarPedido);

echo json_encode($sqlInsertarPedido);
//echo json_encode(mysqli_query($con,$sqlInsertarPedido)); gives true or false
}



*/
// 2 ---------------  ******************************  ------------------------
// Before insert products in table, need to colect the idPedido and idComercio from pedidoProducto 



$idPedidoSQL = "select idPedido, idComercio from pedidoProducto Where idUsuario = '$userId' and fechaPedido = '$fecha' and horaPedido = '$horario'";
$result = $con->query($idPedidoSQL);
echo json_encode($idPedidoSQL);


if ($result->num_rows > 0) {

while($row = $result->fetch_assoc()) {
//echo "idPedido: " . $row["idPedido"]. " - idComercio: " . $row["idComercio"]. "<br>";
$idP = $row["idPedido"];
$idC = $row["idComercio"];

echo json_encode($idP); 

foreach($carrito as $item) {
$idComercio = $item['idComercio'];
$nombreTienda = $item['nombreTienda'];
$cantPCompra = $item['Cantidad'];
$cantPStock = $item['cantidadProducto']; 
$precioUnidadProducto = $item['precioUnidadProducto'];
$idComercioProducto = $item['idComercioProducto'];


//echo json_encode($idComercio);
//echo json_encode($idComercio); 
if($idC == $idComercio)

$sqlInsertarItemPedido = "Insert into itemPedidos (idPedido,idComercioProducto,cantidadCompra,precioUnidad) values ('$idP','$idComercioProducto','$cantPCompra','$precioUnidadProducto')"; 

//echo json_encode($sqlInsertarItemPedido);

 }

} 

} else {
   echo "0 results";
}

die(); 
$con->close();

?>


checkoutInfo = () => {
    var a = this.valorTotalDescuento();
    var b = this.valorSubTotalOrden() - a;
    var domi = this.state.domicilio;
    var stateCartItems = this.state.cartItems.cartItems;

    stateCartItems.sort((a, b) => (a.idComercio > b.idComercio ? 1 : -1));
    console.log(stateCartItems);

    const idComercio = [
      ...new Set(stateCartItems.map((data) => data.idComercio)),
    ];
    const url = `http://andresteccorp.club/TesisAndres/sessionUserCheckout.php`;

    // console.log(
    //   "Desde el metodo  checkoutInfo El idUsuario----" +
    //     this.state.idUsuario +
    //     "El nombreUsuario----" +
    //     this.state.nombreUsuario +
    //     "El logueoToken----" +
    //     this.state.tokenSession +
    //     "El TokenSessionStorage----" +
    //     this.state.TokenSessionStorage,
    //   "El date1----" + this.state.date1,
    //   "El date2----" + this.state.date2,
    //   "El carrito1----" + stateCartItems,
    //   "El carrito2----" + this.state.CartItems,
    //   "El radioButtonChoose----" + this.state.radioButtonChoose,
    //   "El granTotal ----" + b,
    //   "El idComercio ----" + idComercio,
    //   "El tokenSession ----" + this.state.tokenSession,
    //   "El domicilio ----" + domi
    // );

    //const url = `http://andresteccorp.club/TesisAndres/sessionUserCheckout.php`;
    // var stateCartItems = this.state.cartItems.cartItems;
    // const uniqueArr = [
    //   ...new Set(stateCartItems.map((data) => data.item.idComercio)),
    // ];

    // https://www.youtube.com/watch?v=qsejysrhJiU Post man

    /** Validacion de logueo para hacer compras  12:01 */

    // if (
    //   this.state.idUsuario === undefined &&
    //   this.state.nombreUsuario === undefined &&
    //   this.state.tokenSession === undefined
    // ) {
    //   alert(
    //     "No te Encuentras Logueado \n" +
    //       "Porfavor Loguearse para Continuar Procedimiento de Pago "
    //   );
    // } else {
    //   fetch(url, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },

    //     // Convert your array as JSON Array
    //     body: JSON.stringify({
    //       userId: this.state.idUsuario,
    //       granTotal: b,
    //       date1: this.state.date1,
    //       date2: this.state.date2,
    //       carrito: stateCartItems,
    //       idComercio: idComercio,
    //       radioButtonChoose: this.state.radioButtonChoose,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       console.log("RespuestaServerCloud **----------**", responseJson);
    //       this.props.navigation.navigate("Home");
    //       alert("Pedido En Proceso \n" + "Espera Notificación de Compra");
    //       this.clearCar();
    //     })

    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  };