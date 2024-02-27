import React, { useState, useEffect, } from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Image } from 'react-native';

const itemsImg = {
  backbar: require('../assents/backbar.png'),
};

export default function Ua({ route, navigation }) {
  const { projeto } = route.params;
  const [uaCount, setUaCount] = useState(projeto.ua);
  const { width: windowWidth } = useWindowDimensions();

  const increaseUas = () => {
    const newUaCount = uaCount + 1;
    setUaCount(newUaCount);
  };  

  const navigateToIndividuos = (uaNumber: number) => {
    navigation.navigate('Individuos', { projeto: { ...projeto, ua: uaNumber } });
  };

  const renderUaButtons = () => {
    const buttons = [];
    for (let i = 1; i <= uaCount; i++) {
      buttons.push(
        <TouchableOpacity key={i} style={[styled.uaContainer, { width: uaContainerWidth }]} onPress={() => navigateToIndividuos(i)}>
          <Text style={styled.uaText1}>
            {i}
          </Text>
          <Text style={styled.uaText2}>
            0
          </Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  const uaContainerWidth = (windowWidth - 60 - 20) / 3;

  const navigateToProjeto = () => {
    navigation.navigate('Projeto', { projeto: { ...projeto, ua: uaCount } });
  };

  return (
    <View>
      <View style={styled.barranav}>
        <TouchableOpacity style={styled.botaonav} onPress={navigateToProjeto}>
          <Image style={styled.imgbotaonav} source={itemsImg.backbar}/>
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styled.textonav}>
            Editar UA
          </Text>
        </View>
      </View>
      <View style={styled.containerButton}>
        <TouchableOpacity style={styled.buttonAbrir} onPress={increaseUas}>
          <Text style={{ fontSize: 25, color: '#FFFFFF', fontWeight: 'bold' }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styled.uaMainContainer}>
          {renderUaButtons()}
        </View>
      </ScrollView>
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  uaMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 30,
    gap: 10,
  },
  uaContainer: {
    alignItems: 'center',
    marginBottom: 9,
    backgroundColor: '#00453F',
    padding: 5,
  },
  uaText1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  uaText2: {
    fontSize: 16,
    color: '#fff',
  },
  containerButton: {
    alignItems: 'flex-end',
    marginTop: 30,
    paddingHorizontal: 30,
  },
  buttonAbrir: {
    backgroundColor: '#95C700',
    height: 39,
    width: 100,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
