import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Modal, } from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';

const itemsImg = {
  backbar: require('../assents/backbar.png'),
};

export default function Projeto({ route, navigation }) {
  const { projeto } = route.params;

  const navigateToUa = () => {
    navigation.navigate('Ua', { projeto: projeto });
  };

  const navigateToHome = () => {
    navigation.goBack();
    navigation.navigate('Home', { updatedProjeto: { ...projeto, ua: projeto.ua } });
  };
  
  return (
    <View style={styled.container}>
      <View style={styled.barranav}>
        <TouchableOpacity style={styled.botaonav} onPress={navigateToHome}>
          <Image style={styled.imgbotaonav} source={itemsImg.backbar}/>
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styled.textonav}>
            Dados do Projeto
          </Text>
        </View>
      </View>
      <View style={styled.containerButton}>
        <TouchableOpacity style={styled.buttonAbrir} onPress={navigateToUa}>
          <Text style={{ fontSize: 20, color: '#FFFFFF', }}>
            ABRIR
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styled.labelProjeto}>Nome do Imóvel</Text>
      <Text style={styled.labelTitulo}>{projeto.imovel}</Text>
      <Text style={styled.labelProjeto}>Proprietário</Text>
      <Text style={styled.labelTitulo}>{projeto.proprietario}</Text>
      <Text style={styled.labelProjeto}>Nome da Empresa</Text>
      <Text style={styled.labelTitulo}>{projeto.empresa}</Text>
      <Text style={styled.labelProjeto}>Município</Text>
      <Text style={styled.labelTitulo}>{projeto.municipio}-{projeto.estado}</Text>
      <Text style={styled.labelProjeto}>Quantidade de UA's</Text>
      <Text style={styled.labelTitulo}>{projeto.ua}</Text>
    </View>    
  );
}

const styled = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 30,
      backgroundColor: '#FFFFFF',
    },
    barranav: {
      flexDirection: 'row',
      height: 57,
      backgroundColor: '#00453F',
      marginHorizontal: -30,
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
    containerButton: {
      alignItems: 'flex-end',
      marginTop: 30,
    },
    buttonAbrir: {
      backgroundColor: '#95C700',
      height: 39,
      width: 100,
      borderRadius: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
    labelProjeto: {
      fontSize: 14,
      color: '#00453F',
      marginTop: 20,
    },
    labelTitulo: {
      fontSize: 20,
      color: '#00453F',
      textTransform: 'uppercase',
      borderBottomWidth: 1.5,
      borderColor: '#95C700',
    },
})