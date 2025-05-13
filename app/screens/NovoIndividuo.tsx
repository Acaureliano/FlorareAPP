import React, { useState, useEffect, } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TouchableOpacity, Image, TextInput, FlatList, Modal, } from 'react-native';

import Arvores from './Arvores';

Arvores.forEach(arvore => {
  console.log(arvore.name);
});

const itemsImg = {
  backbar: require('../assets/backbar.png'),
  pesquisar: require('../assets/pesquisar.png'),
  camera: require('../assets/camera.png'),
  save: require('../assets/save.png'),
};

interface Individuo {
  id: string;
  nome: string;
  cap: number;
  hc: number;
  ht: number;
}

export default function NovoIndividuo({ route, navigation }) {
  const { projeto } = route.params;
  const [uaCount, setUaCount] = useState(projeto.ua);
  const [selectedName, setSelectedName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [individuos, setIndividuos] = useState<Individuo[]>([]);

  useEffect(() => {
    if (route.params?.updatedIndividuo) {
      const { updatedIndividuo } = route.params;
      const updatedIndividuos = individuos.map(individuo => {
        if (individuo.id === updatedIndividuo.id) {
          return updatedIndividuo;
        }
        return individuo;
      });
      setIndividuos(updatedIndividuos);
    }
  }, [route.params?.updatedIndividuo]);

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cap, setCap] = useState('');
  const [hc, setHc] = useState('');
  const [ht, setHt] = useState('');

  const addIndividuo = () => {
    /*if (!projeto) {
      return Alert.alert('Por favor digite uma tarefa!');
    }*/

    /*const tarefaExiste = listaDeProjetos.some(t => t.nomeProjeto === projeto);

    if (tarefaExiste) {
      return Alert.alert(
        'Esta tarefa já existe em sua agenda',
        'Por favor digite outra tarefa!',
      );
    }*/

    const newIndividuo: Individuo = {
      id: Math.random().toString().split('.')[1],
      nome,
      cap: parseInt(cap),
      hc: parseInt(hc),
      ht: parseInt(ht),
    };
    setIndividuos([...individuos, newIndividuo]);
    navigateToIndividuos;
  };

  const navigateToIndividuos = () => {
    navigation.navigate('Individuos', { projeto: { ...projeto, ua: uaCount } });
  };

  const handlePesquisarPress = () => {
    setIsModalVisible(true);
  };

  const handleNameSelect = (name: string) => {
    setSelectedName(name);
    setIsModalVisible(false);
  };

  return (
    <View style={{flex: 1,}}>
      <View style={styled.barranav}>
        <TouchableOpacity style={styled.botaonav} onPress={navigateToIndividuos}>
          <Image style={styled.imgbotaonav} source={itemsImg.backbar}/>
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center',}}>
          <Text style={styled.textonav}>
            Novo Indivíduo
          </Text>
        </View>
        <TouchableOpacity style={styled.botaosave} >
          <Image style={styled.imgbotaosave} source={itemsImg.save}/>
        </TouchableOpacity>
      </View>
      <View style={styled.containerIndividuo}>
        <Text style={styled.texto}>
            Nome:
        </Text>
        <View style={styled.containerCHH}>
          <TextInput style={[styled.inputCHH, {flex: 1,}]} editable={false} value={selectedName} onChangeText={setNome}/>
          <TouchableOpacity style={styled.btpesquisar} onPress={handlePesquisarPress}>
            <Image style={styled.imgbotoes} source={itemsImg.pesquisar}/>
          </TouchableOpacity>
        </View>
        <View style={styled.containerCHH}>
          <View style={styled.conatinerInputCHH}>
            <Text style={styled.texto}>
              CAP:
            </Text>
            <TextInput style={styled.inputCHH} keyboardType='numeric' value={cap.toString()} onChangeText={setCap}/>
          </View>
          <View style={styled.conatinerInputCHH}>
            <Text style={styled.texto}>
              HC:
            </Text>
            <TextInput style={styled.inputCHH} keyboardType='numeric' value={hc.toString()} onChangeText={setHc}/>
          </View>
          <View style={styled.conatinerInputCHH}>
            <Text style={styled.texto}>
              HT:
            </Text>
            <TextInput style={styled.inputCHH} keyboardType='numeric' value={ht.toString()} onChangeText={setHt}/>
          </View>
        </View>
        <TouchableOpacity style={{height: 39, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: '#95C700'}} onPress={() => navigation.navigate('Camera')}>
          <Image style={[styled.imgbotoes, {height: 29, width: 30}]} source={itemsImg.camera}/>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styled.modalContainer}>
          <View style={styled.modalContent}>
            <FlatList data={Arvores} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
              <TouchableOpacity style={styled.item} onPress={() => handleNameSelect(item.name)}>
                <Text style={styled.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}/>
            <TouchableOpacity style={styled.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styled.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styled = StyleSheet.create({
  containerIndividuo: {
    flex: 1,
    padding: 30,
  },
  texto: {
    fontSize: 20,
    color: '#00453F',
  },
  containerCHH: {
    flexDirection: 'row',
    gap: 7,
    margin: 0,
    paddingBottom: 20,
  },
  btpesquisar: {
    width: 40,
    height: 40,
  },
  conatinerInputCHH: {
    flex: 1,
  },
  inputCHH: {
    height: 35,
    borderRadius: 10,
    backgroundColor: '#E0F1D6',
    fontSize: 20,
    color: '#808080',
    borderBottomWidth: 1,
    borderColor: '#00453F',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  buttonSalvar: {
    backgroundColor: '#95C700',
    height: 39,
    width: 100,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
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
  botaosave:{
    marginRight: 10,
  },
  imgbotaosave: {
    height: 30,
    width: 30,
  },
  imgbotoes: {
    height: 40,
    width: 40,
  },
  textonav: {
    color: '#fff',
    fontSize: 20,
  },  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});
