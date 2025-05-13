import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const itemsImg = {
  backbar: require('../assets/backbar.png'),
};

interface Projeto {
  id: string;
  imovel: string;
  proprietario: string;
  empresa: string;
  municipio: string;
  estado: string;
  ua: number;
}

export default function Projeto() {
  const [projetoObj, setProjetoObj] = useState<Projeto | null>(null);
  const router = useRouter();
  const { projeto } = useLocalSearchParams();

  useEffect(() => {
    if (projeto) {
      setProjetoObj(JSON.parse(projeto));
    }
  }, [projeto]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const value = await AsyncStorage.getItem('projetos');
          if (value !== null) {
            const projetos = JSON.parse(value);
            const currentProjeto = projetos.find(p => p.id === projetoObj?.id);
            if (currentProjeto) {
              setProjetoObj(currentProjeto);
            }
          }
        } catch (e) {
          console.error('Failed to fetch data.', e);
        }
      };

      fetchData();
    }, [projetoObj?.id])
  );

  const navigateToUa = () => {
    if (projetoObj) {
      router.push({ pathname: '/screens/Ua', params: { id: projetoObj.id, ua: projetoObj.ua } });
    }
  };

  const navigateToHome = () => {
    router.back();
  };

  return (
    <View style={styled.container}>
      <View style={styled.barranav}>
        <TouchableOpacity style={styled.botaonav} onPress={navigateToHome}>
          <Image style={styled.imgbotaonav} source={itemsImg.backbar} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styled.textonav}>
            Dados do Projeto
          </Text>
        </View>
      </View>
      <View style={styled.containerButton}>
        <TouchableOpacity style={styled.buttonAbrir} onPress={navigateToUa}>
          <Text style={{ fontSize: 20, color: '#FFFFFF' }}>
            ABRIR
          </Text>
        </TouchableOpacity>
      </View>
      {projetoObj && (
        <>
          <Text style={styled.labelProjeto}>Nome do Imóvel</Text>
          <Text style={styled.labelTitulo}>{projetoObj.imovel}</Text>
          <Text style={styled.labelProjeto}>Proprietário</Text>
          <Text style={styled.labelTitulo}>{projetoObj.proprietario}</Text>
          <Text style={styled.labelProjeto}>Nome da Empresa</Text>
          <Text style={styled.labelTitulo}>{projetoObj.empresa}</Text>
          <Text style={styled.labelProjeto}>Município</Text>
          <Text style={styled.labelTitulo}>{projetoObj.municipio}-{projetoObj.estado}</Text>
          <Text style={styled.labelProjeto}>Quantidade de UA's</Text>
          <Text style={styled.labelTitulo}>{projetoObj.ua}</Text>
        </>
      )}
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
    marginLeft: -30,
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
});
