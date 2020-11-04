import React, { Component } from 'react'

var url = `http://192.168.0.19/TesisWeb/infoComerciosProductos.php`;

export default class negociosData1 extends Component {
     constructor(props) {
        super(props);
        this.state = { DataNegocios: [] };
        
  }
  
  
   componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ DataNegocios }));
  }

    
}
