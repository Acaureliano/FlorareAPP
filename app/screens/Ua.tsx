import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const itemsImg = {
  backbar: require('../assets/backbar.png'),
};

interface Item {
  id: string;
  imovel: string;
  proprietario: string;
  empresa: string;
  municipio: string;
  estado: string;
  ua: string;
}

export default function Ua() {
  const router = useRouter();
  const { ua, id } = useLocalSearchParams();
  const [uaCount, setUaCount] = useState<number>(() => {
    if (Array.isArray(ua)) {
      return parseInt(ua[0]) || 0;
    }
    return parseInt(ua) || 0;
  });
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    console.log('uaCount:', uaCount);
    console.log('Received id:', id); // Adicionando log para verificar o valor de id
  }, [uaCount, id]);

  const increaseUas = async () => {
    console.log('increaseUas called');
    const newUaCount = uaCount + 1;
    setUaCount(newUaCount);
    await updateUaCountInStorage(newUaCount);
  };

  const updateUaCountInStorage = async (newUaCount: number) => {
    try {
      console.log('updateUaCountInStorage called with newUaCount:', newUaCount);
      const storedItems = await AsyncStorage.getItem('projetos');
      if (storedItems) {
        console.log('storedItems:', storedItems);
        const projetos: Item[] = JSON.parse(storedItems);
        const updatedItems = projetos.map(item => {
          console.log(`Comparing item.id (${item.id}) with id (${id})`);
          if (item.id === id) {
            console.log(`Updating item with id ${id}`);
            return { ...item, ua: newUaCount.toString() };
          }
          console.log('Item not updated');
          return item;
        });
        console.log('updatedItems before saving:', updatedItems);
        await AsyncStorage.setItem('projetos', JSON.stringify(updatedItems));
        const savedItems = await AsyncStorage.getItem('projetos');
        console.log('savedItems after update:', savedItems);
      } else {
        console.log('Nenhum item encontrado no armazenamento.');
      }
    } catch (error) {
      console.error('Error updating UA count in storage:', error);
    }
  };

  const navigateToIndividuos = (uaNumber: number) => {
    router.push({ pathname: '/screens/Individuos', params: { uaNumber } });
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
    router.back();
  };

  return (
    <View style={styled.container}>
      <View style={styled.barranav}>
        <TouchableOpacity style={styled.botaonav} onPress={navigateToProjeto}>
          <Image style={styled.imgbotaonav} source={itemsImg.backbar} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
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
  botaonav: {
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