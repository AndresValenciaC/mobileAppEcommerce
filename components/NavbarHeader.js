/**
 * This is the navbar component
 * example of usage:
 *   var left = (<Left><Button transparent><Icon name='menu' /></Button></Left>);
 *   var right = (<Right><Button transparent><Icon name='menu' /></Button></Right>);
 *   <Navbar left={left} right={right} title="My Navbar" />
 **/

// React native and others libraries imports
import React, { Component } from "react";
import { Header, Body, Title, Left, Right } from "native-base";

export default class Navbar extends Component {
  render() {
    return (

    
      <Header
        style={{ backgroundColor: "#2c3e50" }}
        backgroundColor={"#2c3e50"}
        androidStatusBarColor={"#233240"}
        noShadow={true}
      >
        {this.props.left ? this.props.left : <Left style={{ flex: 1 }} />}
        <Body style={styles.body}>
          <Title>{this.props.title}</Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{ flex: 1 }} />}
      </Header>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  
};
