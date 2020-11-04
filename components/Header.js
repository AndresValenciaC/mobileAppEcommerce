import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Platform
} from 'react-native';

import homeData from '../data/home'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import Search from './Search'

//const data = homeData.grid_fashion.items;
const data = CarouselImg;

const CarouselImg = [
    {
        id: 1,
        name: "carousel",
        img1: "https://c1.staticflickr.com/6/5062/5649039693_4ae12562b5_b.jpg",
        img2: "https://c1.staticflickr.com/8/7014/6712827125_4e1e474737_b.jpg"
    },
    {
        id: 2,
        name: "otr",
        img3: "https://c1.staticflickr.com/9/8671/16221299657_146ed4c550_h.jpg",
        img4: "https://images-na.ssl-images-amazon.com/images/I/71C%2BW%2B-W9nL._SY450_.jpg"
    },
    {
        id: 3,
        name: "andres",
        img5: "http://www.cocinayvino.com/wp-content/uploads/2017/03/66049923_l-e1490965710522.jpg",
        img6: "https://c1.staticflickr.com/3/2750/4508140656_bd9e666d23_b.jpg"
    }
]




export default class Header extends Component {

    // Para que desaparesca el Header
   
   
    render() {
        return (
            <View>
                

            </View>
         
        )
    }
}


// https://react-native-training.github.io/react-native-elements/docs/searchbar.html#docsNav



/**  componente directo de react 
 * 
 *   <SearchBar
                    round
                    lightTheme
                    searchIcon={{ size: 24 }}
                    onChange={this.setSearchText.bind(this)}
                    //    onClear={someMethod}
                    placeholder='Search...' />
 * 
 */