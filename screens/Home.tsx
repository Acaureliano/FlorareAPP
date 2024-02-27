import React, {useState, useEffect,} from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, } from 'react-native';
import Modal from 'react-native-modal';
import DropShadow from "react-native-drop-shadow";
import AsyncStorage from '@react-native-async-storage/async-storage';

const itemsImg = {
  logo: require('../assents/logo.png'),
  clipboard: require('../assents/clipboard.png'),
  delete: require('../assents/delete1.png'),
  checkeon: require('../assents/checkon.png'),
  checkeoff: require('../assents/checkoff.png'),
  circulo: require('../assents/icon-circulo.png'),
  abrir: require('../assents/abrir.png'),
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

export default function Home ({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const [isFocusedImovel, setIsFocusedImovel] = useState(false);
  const [isFocusedProprietario, setIsFocusedProprietario] = useState(false);
  const [isFocusedEmpresa, setIsFocusedEmpresa] = useState(false);
  const [isFocusedMunicipio, setIsFocusedMunicipio] = useState(false);
  const [isFocusedEstado, setIsFocusedEstado] = useState(false);
  const [isFocusedUa, setIsFocusedUa] = useState(false);

  const handleFocusImovel = () => setIsFocusedImovel(true);
  const handleBlurImovel = () => setIsFocusedImovel(false);
  const handleFocusProprietario = () => setIsFocusedProprietario(true);
  const handleBlurProprietario = () => setIsFocusedProprietario(false);
  const handleFocusEmpresa = () => setIsFocusedEmpresa(true);
  const handleBlurEmpresa = () => setIsFocusedEmpresa(false);
  const handleFocusMunicipio = () => setIsFocusedMunicipio(true);
  const handleBlurMunicipio = () => setIsFocusedMunicipio(false);
  const handleFocusEstado = () => setIsFocusedEstado(true);
  const handleBlurEstado = () => setIsFocusedEstado(false);
  const handleFocusUa = () => setIsFocusedUa(true);
  const handleBlurUa = () => setIsFocusedUa(false);
  
  const [id, setId] = useState('');
  const [imovel, setImovel] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [estado, setEstado] = useState('');
  const [ua, setUa] = useState('');
  const [tipofloresta, setTipofloresta] = useState('');

  useEffect(() => {
    if (route.params?.updatedProjeto) {
      const { updatedProjeto } = route.params;
      const updatedProjetos = projetos.map(projeto => {
        if (projeto.id === updatedProjeto.id) {
          return updatedProjeto;
        }
        return projeto;
      });
      setProjetos(updatedProjetos);
    }
  }, [route.params?.updatedProjeto]);

  useEffect(() => {
    const loadProjetos = async () => {
      try {
        const savedProjetos = await AsyncStorage.getItem('projetos');
        if (savedProjetos !== null) {
          setProjetos(JSON.parse(savedProjetos));
        }
      } catch (error) {
        console.error('Erro ao carregar os projetos:', error);
      }
    };

    loadProjetos();
  }, []);
  
  useEffect(() => {
    const saveProjetos = async () => {
      try {
        await AsyncStorage.setItem('projetos', JSON.stringify(projetos));
      } catch (error) {
        console.error('Erro ao salvar os projetos:', error);
      }
    };

    saveProjetos();
  }, [projetos]);

  const addProjeto = () => {
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

    const newProjeto: Projeto = {
      id: Math.random().toString().split('.')[1],
      imovel,
      proprietario,
      empresa,
      municipio,
      estado,
      ua: parseInt(ua),
    };
    setProjetos([...projetos, newProjeto]);
    setModalVisible(false);
  };

  const deleteProjeto = (id: string) => {
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
            const updatedProjetos = projetos.filter(projeto => projeto.id !== id);
            setProjetos(updatedProjetos);
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styled.container}>
      <View style={styled.header}>
        <Image style={styled.logo} source={itemsImg.logo}/>
      </View>
      <View style={styled.content}>
        <View style={{flexDirection: 'row', height: 71}}>
          <View style={{flex: 1, flexDirection: 'row', top: 32, height: 19}}>
            <Text style={styled.criadas}>Criadas</Text>
            <View style={{paddingLeft: 8, paddingRight: 8, height: 19, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: '#333333', left: 8,}}>
              <Text style={styled.numeroDeTarefas}>
                {projetos.length}
              </Text>
            </View>
          </View>
          <DropShadow style={styled.shadowProp}>
            <TouchableOpacity style={styled.btNewProject} onPress={() => setModalVisible(true)}>
              <Text style={{fontSize: 50, color: '#ffffff', lineHeight: 60,}}>
                +
              </Text>
            </TouchableOpacity>
          </DropShadow>
        </View>
        <ScrollView style={styled.contentlist}>
          {projetos.length === 0 ? (
            <View style={styled.containerlistavazia}>
              <Image style={styled.clipboard} source={itemsImg.clipboard} />
              <Text style={styled.textolistavazia}>
                Você ainda não tem projetos cadastrados.{'\n'}
                Crie seu novo projeto!
              </Text>
            </View>
          ) : (
            projetos.map(projeto => {
              return (
                <View style={{flex: 1,}}>
                  <View style={styled.titulolista}>
                    <Text style={styled.textotitulolista}>
                      PROJETOS
                    </Text>
                  </View>
                  <TouchableOpacity key={projeto.id} style={[styled.botaolista,]} onPress={() => navigation.navigate('Projeto', { projeto: projeto })}>
                    <View style={styled.list}>
                      <Text style={styled.textolist}>
                        {projeto.imovel}
                      </Text>
                      <Text style={[styled.textolist,{fontSize: 13}]}>
                        {projeto.proprietario}
                      </Text>
                    </View>
                    <TouchableOpacity style={styled.buttondelet} onPress={() => deleteProjeto(projeto.id)}>
                      <Image style={styled.imgbotaodelet} source={itemsImg.delete} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
      <Modal isVisible={modalVisible}>
        <View style={styled.formproject}>
          <View style={{padding: 0, alignItems: 'flex-end', marginTop: -10}}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{fontSize: 20, color: '#00453F', fontWeight: 'bold',}}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styled.labelform}>
            Imóvel
          </Text>
          <TextInput style={[styled.inputform, isFocusedImovel ? styled.inputFocused : null,]} onFocus={handleFocusImovel} onBlur={handleBlurImovel} value={imovel} onChangeText={setImovel}/>
          <Text style={styled.labelform}>
            Nome do Proprietário
          </Text>
          <TextInput style={[styled.inputform, isFocusedProprietario ? styled.inputFocused : null,]} onFocus={handleFocusProprietario} onBlur={handleBlurProprietario} value={proprietario} onChangeText={setProprietario}/>
          <Text style={styled.labelform}>
            Empresa Responsável
          </Text>
          <TextInput style={[styled.inputform, isFocusedEmpresa ? styled.inputFocused : null,]} onFocus={handleFocusEmpresa} onBlur={handleBlurEmpresa} value={empresa} onChangeText={setEmpresa}/>
          <Text style={styled.labelform}>
            Município
          </Text>
          <TextInput style={[styled.inputform, isFocusedMunicipio ? styled.inputFocused : null,]} onFocus={handleFocusMunicipio} onBlur={handleBlurMunicipio} value={municipio} onChangeText={setMunicipio}/>
          <Text style={styled.labelform}>
            Estado (UF)
          </Text>
          <TextInput style={[styled.inputform, isFocusedEstado ? styled.inputFocused : null,{width: 60}]} onFocus={handleFocusEstado} onBlur={handleBlurEstado} value={estado} onChangeText={setEstado}/>
          <Text style={styled.labelform}>
            Nº de Unidades Amostrais (UA's)
          </Text>
          <TextInput style={[styled.inputform, isFocusedUa ? styled.inputFocused : null,{width: 110}]} onFocus={handleFocusUa} onBlur={handleBlurUa} keyboardType='numeric' value={ua.toString()} onChangeText={(text) => setUa(text)}/>
          <Text style={styled.labelform}>
            Tipo de Floresta
          </Text>
          <View style={[styled.inputform, {backgroundColor:'#ffffff', borderBottomWidth: 0, paddingHorizontal: 0, }]}>
            <TouchableOpacity style={{height: 20, width: 20, marginRight: 3}}>
              <Image style={{height: 20, width: 20}} source={itemsImg.checkeon}/>
            </TouchableOpacity>
            <Text style={[styled.labelform, {fontWeight: 'bold', marginTop: 0}]}>
              Normal
            </Text>
            <TouchableOpacity style={{height: 20, width: 20, marginRight: 3}}>
              <Image style={{height: 20, width: 20}} source={itemsImg.checkeoff}/>
            </TouchableOpacity>
            <Text style={[styled.labelform, {fontWeight: 'bold', marginTop: 0}]}>
              Exótico
            </Text>
          </View>
          <View style={{flex: 2, padding: 0, alignItems: 'center', justifyContent: 'flex-end', marginTop:30, }}>
            <TouchableOpacity style={{backgroundColor: '#95C700', height: 39, width: 160, borderRadius: 10, alignItems: 'center', justifyContent: 'center',}} onPress={addProjeto}>
              <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: 'bold',}}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>
    </View>
  );
}

const styled = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    flex: 2,
  },
  header: {
    height: 143,
    alignItems: 'center',
    backgroundColor: '#00453F',
  },
  logo: {
    height: 48,
    width: 133,
    top: 40,
    marginEnd: 25,
  },
  content: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 24,
    marginHorizontal: 25,
    marginBottom: 25,
    marginTop: -25,
    borderRadius: 15,
  },
  criadas: {
    color: '#00453F',
    top: 3,
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: '700',
  },
  title: {
    color: '#FDFCFE',
    fontSize: 24,
    lineHeight: 28.13,
    fontWeight: '700',
  },
  numeroDeTarefas: {
    color: '#D9D9D9',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14.52,
    fontWeight: '700',
  },
  btNewProject: {
    color: '#ffffff',
    backgroundColor: '#95C700',
    width: 60,
    height: 60,
    right: 8,
    alignItems: 'center',
    marginTop: -25,
    borderRadius: 999,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 4, height: 4},
    shadowRadius: 5,
  },
  shadowProp:{
    shadowColor: 'black',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 7,
  },
  contentlist: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderColor: '#333333',
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
    paddingHorizontal: 16,
    backgroundColor: '#D9E4D2',
    borderRadius: 7,
  },
  list: {
    flex: 1,
    textAlignVertical: 'center',
    color: '#00453F',
    fontSize: 18,
    fontWeight: '400',
  },
  textolist: {
    color: '#00453F',
    fontSize: 18,
    fontWeight: '400',
  },
  buttondelet: {
    alignItems: 'center',
    marginRight: -16,
    width: 25,
    height: 70,
    backgroundColor: 'red',
    justifyContent: 'center',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  imgbotaodelet: {
    height: 22,
    width: 22,
  },
  formproject: {
    flex: 1,
    alignContent: 'flex-end',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  labelform: {
    fontSize: 16,
    color: '#00453F',
    marginTop: 15,
    marginRight: 25,
  },
  inputform: {
    marginTop: 5,
    paddingHorizontal: 14,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#E0F1D6',
    fontSize: 16,
    color: '#808080',
    borderBottomWidth: 1,
    borderColor: '#00453F',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  inputFocused: {
    borderColor: '#95C700',
    borderBottomWidth: 2,
  },
});