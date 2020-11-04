"use strict";
/** Info para Lista de productos de pantallas como HomeScreen
 * DetallesNegocioP
 */
const promoDataInfo = {
  // ***************** Promociones Comida #1 *********************  //

  Comida: {
    title: "PROMOCIONES DEL DIA COMIDA",
    description: "Comida a los mejores precios del dia ",
    items: [
      {
        id: 1,
        nombreLocal: "Antinos",
        name: "Perro Caliente",
        imageUri:
          "https://img.chilango.com/2018/07/los-10-mejores-hot-dogs-de-la-cdmx-1.jpg",
        detail:
          "Perro Caliente preparada con salchicha,cebolla,tomate,lechuga y salsa especial",
        prize: 8000,
        regularPrize: 10000,
        discountPercent: 20
      },
      {
        id: 2,
        nombreLocal: "Antinos",
        name: "Empanadas",
        imageUri:
          "https://www.divinacocina.es/wp-content/uploads/empanadillas-de-pollo-al-curry.jpg",
        detail: "Empanadas  con el especial sazon de la casa ",
        prize: 6000,
        regularPrize: 7200,
        discountPercent: 20
      },
      {
        id: 3,
        nombreLocal: "Antinos",
        name: "Papas Fritas",
        imageUri:
          "https://img.vixdata.io/pd/jpg-large/es/sites/default/files/batata-frita-07.17-1400x800.jpg",
        detail:
          "Sanduiches Panini de jamon,tomate,espinaca y doble queso chedar",
        prize: 20000,
        regularPrize: 24000,
        discountPercent: 20
      }
    ]
  },
  // *****************   Promociones Vestuario #2 *********************  //

  Ropa: {
    title: "PROMOCIONES DEL DIA VESTUARIO",
    description: "Las mejores promociones del dia en ropa de moda",
    items: [
      {
        id: 1,
        nombreLocal: "Romero",
        name: "Camisa Hombre",
        imageUri:
          "https://images-na.ssl-images-amazon.com/images/I/81BqCGG4ISL._SX679._SX._UX._SY._UY_.jpg",
        detail: "Camisa de color negro manufacturada en algodon 100%",
        prize: 30000,
        regularPrize: 60000,
        discountPercent: 20
      },
      {
        id: 2,
        nombreLocal: "Romero",
        name: "Camisa para mujer",
        imageUri:
          "https://martgifts.com/6954/camisa-sarga-manga-corta-mujer.jpg",
        detail: "Camisa de color azul manufacturada en algodon 100%",
        prize: 60000,
        regularPrize: 120000,
        discountPercent: 20
      },
      {
        id: 3,
        nombreLocal: "Romero",
        name: "Pantalones Mujer",
        imageUri:
          "https://images-na.ssl-images-amazon.com/images/I/71%2Bpj9GoWOL._UY606_.jpg",
        detail: "Pantalon de color azul manufacturado en jean 100%",
        prize: 90000,
        regularPrize: 180000,
        discountPercent: 20
      }
    ]
  }
};
export default promoDataInfo;
