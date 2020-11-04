import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";


import Container from "../Container";
import ListPanel from "../ListPanel";

import CollectionThumbThree from "../productCollection/CollectionThumbThree";

import colors from "../colors";
import Header from "../Header";
import homeData from "../../data/home";
import Utils from "../Utilis";




class CollectionTH3 extends Component {


    constructor(props) {
        super(props)
    }

    render() {
        return <Container>
                <Header navigation={this.props.navigation} title="Collection3 Lista" />
                   <ScrollView>
                {this._renderCollectionList(homeData.three)}
               
                   </ScrollView>
               </Container>;
    }

    _renderCollectionList(data) {
        return (
            <ListPanel onPressSeeAll={() => this._pressSeeAllProducts({ navBarTitle: data.title })} title={data.title} description={data.description}>
                
                    {
                        data.items.map((item, idx) => {
                            return <CollectionThumbThree onPress={() => this._pressProduct(item.id)} key={idx} {...item} />
                        })
                    }
                
            </ListPanel>
        )
    }

    _pressProduct() {
        Utils.showMessage('You clicked on a product')
    }

    _pressSeeAllProducts() {
        Utils.showMessage('You clicked to see all products')
    }

}


const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bg_header
  },
  headerSub: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "center"
  },
  logo: {
    width: 64,
    height: 28,
    resizeMode: "center"
  },
  icoSearch: {
    color: colors.txt_description,
    marginRight: 5
  },
  btnSearchHolder: {
    padding: 15,
    paddingTop: 0
  },
  btnSearch: {
    borderColor: colors.bd_input,
    justifyContent: "center",
    flexDirection: "row",
    padding: 8,
    backgroundColor: colors.bg1,
    borderWidth: 1,
    borderRadius: 5
  },
  btnSearchTitle: {
    color: colors.txt_description,
    fontSize: 16
  },
  btnDeals: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 0.5
  },
  icoDeals: {
    color: colors.txt_description,
    marginRight: 10
  },
  section_title: {
    fontSize: 18,
    fontWeight: "600",
    padding: 20
  }
});

export default CollectionTH3;