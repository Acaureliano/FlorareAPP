import React, { useState, useEffect, } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, FlatList,} from 'react-native';
import Modal from 'react-native-modal';

import Arvores from './Arvores';

Arvores.forEach(arvore => {
  console.log(arvore.name);
});

const itemsImg = {
  backbar: require('../assets/backbar.png'),
  camera: require('../assets/camera.png'),
  delete: require('../assets/delete2.png'),
  pesquisar: require('../assets/pesquisar.png'),
  clipboard: require('../assets/clipboard.png'),
};

interface Individuo {
  id: string;
  nome: string;
  cap: number;
  hc: number;
  ht: number;
}

export default function Individuos({ route, navigation }) {
  const { projeto } = route.params;
  const [isModalNomeVisible, setIsModalNomeVisible] = useState(false);
  const [isModalIndividuoVisible, setIsModalIndividuoVisible] = useState(false);
  const [uaCount, setUaCount] = useState(projeto.ua);  
  const [selectedName, setSelectedName] = useState('');
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
    setIsModalIndividuoVisible(false);
  };

  const handlePesquisarPress = () => {
    setIsModalNomeVisible(true);
  };

  const handleNameSelect = (nome: string) => {
    setSelectedName(nome);
    setNome(nome);
    setIsModalNomeVisible(false);
  };

  const handleAddIndividuoPress = () => {
    setIsModalIndividuoVisible(true);
  };

  const deleteIndividuo = (id: string) => {
    Alert.alert(
      'REMOVER',
      'Tem certeza que deseja excluir o projeto?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const updatedIndividuos = individuos.filter(individuo => individuo.id !== id);
            setIndividuos(updatedIndividuos);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const navigateToUa = () => {
    navigation.navigate('Ua', { projeto: { ...projeto, ua: uaCount } });
  };

  return (
    <View style={{flex: 2, backgroundColor: '#1A1A1A',}}>
      <View style={styled.barranav}>
        <TouchableOpacity style={styled.botaonav} onPress={navigateToUa}>
          <Image style={styled.imgbotaonav} source={itemsImg.backbar}/>
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styled.textonav}>
            {`Indivíduos da UA ${projeto.ua}`}
          </Text>
        </View>
      </View>
      <View style={styled.container}>
        <View style={styled.containerButton}>
          <TouchableOpacity style={styled.buttonAbrir} onPress={handleAddIndividuoPress}>
            <Text style={{ fontSize: 25, color: '#FFFFFF', fontWeight: 'bold' }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styled.contentlist}>
          <View style={styled.titulolista}>
            <Text style={styled.textotitulolista}>
              INDIVIDUOS
            </Text>
          </View>
          {individuos.length === 0 ? (
            <View style={styled.containerlistavazia}>
              <Image style={styled.clipboard} source={itemsImg.clipboard} />
              <Text style={styled.textolistavazia}>
                Você ainda não tem projetos cadastrados.{'\n'}
                Crie seu novo projeto!
              </Text>
            </View>
          ) : (
            individuos.map(individuo => {
              return (
                <View style={{flex: 1,}}>
                  <TouchableOpacity key={individuo.id} style={styled.botaolista} >
                    <View style={styled.list}>
                      <Text style={[styled.textolist, {fontSize: 20,}]}>
                        {`${projeto.ua.toString().padStart(4, '0')}: ${individuo.nome}`}
                      </Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styled.textolist}>
                          {`CAP: ${individuo.cap}`}
                        </Text>
                        <Text style={styled.textolist}>
                          {`HC: ${individuo.hc}`}
                        </Text>
                        <Text style={styled.textolist}>
                          {`HT: ${individuo.ht}`}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styled.buttondelet} onPress={() => deleteIndividuo(individuo.id)}>
                      <Image style={styled.imgbotaodelet} source={itemsImg.delete} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
        <Modal isVisible={isModalIndividuoVisible}>
          <View style={styled.formindividuo}>
            <View style={{padding: 0, alignItems: 'flex-end', marginTop: -10,}}>
              <TouchableOpacity onPress={() => setIsModalIndividuoVisible(false)}>
                <Text style={{fontSize: 20, color: '#00453F', fontWeight: 'bold',}}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styled.texto}>
                Nome:
            </Text>
            <View style={styled.containerCHH}>
              <TextInput style={[styled.inputCHH, {flex: 1,}]} editable={false} value={nome} onChangeText={setNome}/>
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
            <TouchableOpacity style={{height: 39, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: '#95C700'}} onPress={addIndividuo}>
              <Image style={[styled.imgbotoes, {height: 29, width: 30}]} source={itemsImg.camera}/>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={isModalNomeVisible} animationIn={'slideInDown'} >
          <View style={styled.modalContainer}>
            <View style={styled.modalContent}>
              <FlatList data={Arvores} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
                <TouchableOpacity style={styled.item} onPress={() => handleNameSelect(item.name)}>
                  <Text style={styled.itemText}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}/>
              <TouchableOpacity style={styled.closeButton} onPress={() => setIsModalNomeVisible(false)}>
                <Text style={styled.closeButtonText}>
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 2,    
    paddingHorizontal: 24,
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
  contentlist: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    gap: 16,
  },
  containerlistavazia: {
    height: 250,
    alignItems: 'center',
  },
  clipboard: {
    height: 56,
    width: 56,
    top: 48,
  },
  textolistavazia: {
    flex: 1,
    color: '#1A1A1A',
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'center',
    fontWeight: '400',
    top: 64,
  },
  titulolista: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textotitulolista: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00453F',
  },
  botaolista: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderBottomWidth: 1,
  },
  list: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  textolist: {
    color: '#00453F',
    fontSize: 15,
    fontWeight: '400',
  },
  buttondelet: {
    alignItems: 'center',
    width: 25,
    height: 70,
    justifyContent: 'flex-end',
    marginLeft: 50,
    paddingBottom: 10,
  },
  imgbotaodelet: {
    height: 28,
    width: 28,
  },
  formindividuo: {
    flex: 1,
    alignContent: 'flex-end',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
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
