import React, { useState, useEffect, } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TouchableOpacity, Image, TextInput, FlatList, Modal, } from 'react-native';

const itemsImg = {
    backbar: require('../assets/backbar.png'),
}

export default function Camera({ route, navigation }) {

    return (
        <View style={{flex: 1, backgroundColor: '#000'}}>
            <View style={styled.barranav}>
                <TouchableOpacity style={styled.botaonav} onPress={() => navigation.navigate('NovoIndividuo')}>
                    <Image style={styled.imgbotaonav} source={itemsImg.backbar}/>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styled.textonav}>
                        Câmera
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styled = StyleSheet.create({
    barranav: {
      flexDirection: 'row',
      height: 57,
      backgroundColor: '#00453F',
      alignItems: 'center',
      justifyContent: 'center',
    },
    botaonav:{
      marginLeft: 10,
    },
    imgbotaonav: {
      height: 25,
      width: 25,
    },
    textonav: {
      color: '#fff',
      fontSize: 20,
      marginLeft: -30
    },
  });