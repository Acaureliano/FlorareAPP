import React, {useState, useEffect, useCallback} from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, } from 'react-native';
import Modal from 'react-native-modal';
import DropShadow from "react-native-drop-shadow";

const itemsImg = {
  logo: require('./assents/logo.png'),
  clipboard: require('./assents/clipboard.png'),
  delete: require('./assents/delete.png'),
  checkeon: require('./assents/checkon.png'),
  checkeoff: require('./assents/checkoff.png'),
  circulo: require('./assents/icon-circulo.png'),
};

type TarefaType = {
  id: string;
  nome: string;
  feito: boolean;
};

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [listaDeTarefas, setListaDeTarefas] = useState<TarefaType[]>([]);
  const [isModalVisible, setModalVisible] = useState(true);

  function handleSubmit() {
    if (!tarefa) {
      return Alert.alert('Por favor digite uma tarefa!');
    }

    const tarefaExiste = listaDeTarefas.some(t => t.nome === tarefa);

    if (tarefaExiste) {
      return Alert.alert(
        'Esta tarefa já existe em sua agenda',
        'Por favor digite outra tarefa!',
      );
    }

    const novaTarefa: TarefaType = {
      feito: false,
      id: Math.random().toString().split('.')[1],
      nome: tarefa,
    };

    setListaDeTarefas(m => [novaTarefa, ...m]);
    setTarefa('');
  }

  function handleDelete(id: string) {
    Alert.alert(
      'REMOVER',
      'Tem certeza que deseja excluir a tarefa?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setListaDeTarefas(props => {
              return props.filter(t => t.id !== id);
            });
          },
        },
      ],
      {cancelable: false},
    );
  }

  function handleToggle(id: string) {
    setListaDeTarefas((props) => {
      return props.map((t) => (t.id === id ? {...t, feito: !t.feito} : t));
    });
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
                {listaDeTarefas.length}
              </Text>
            </View>
          </View>
          <DropShadow style={styled.shadowProp}>
            <TouchableOpacity style={styled.btNewProject} onPress={toggleModal}>
              <Text style={{fontSize: 50, color: '#ffffff', lineHeight: 60,}}>
                +
              </Text>
            </TouchableOpacity>
          </DropShadow>
        </View>
        <ScrollView style={styled.contentlist}>
          {listaDeTarefas.length === 0 ? (
            <View style={{height: 250, alignItems: 'center'}}>
              <Image style={styled.clipboard} source={itemsImg.clipboard} />
              <Text style={styled.title3}>
                Você ainda não tem projetos cadastrados.{'\n'}
                Crie seu novo projeto!
              </Text>
            </View>
          ) : (
            listaDeTarefas.map(tarefa => {
              return (
                <View key={tarefa.id} style={[styled.containerlist, {
                  borderWidth: tarefa.feito ? 0 : 1,
                }]}>
                  <TouchableOpacity
                    style={styled.botaoFeito}
                    onPress={() => handleToggle(tarefa.id)}>
                    <Image source={tarefa.feito ? itemsImg.checkeon : itemsImg.circulo}/>
                  </TouchableOpacity>
                  <View style={styled.list}>
                    <Text style={[styled.list, {
                      textDecorationLine: tarefa.feito ? 'line-through' : 'none',
                      color: tarefa.feito ? '#808080' : '#FDFCFE',
                    },]}>
                      {tarefa.nome}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styled.buttondelet}
                    onPress={() => handleDelete(tarefa.id)}>
                    <Image style={styled.delete} source={itemsImg.delete} />
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styled.formproject}>
          <View style={{flex: 1, padding: 0, alignItems: 'flex-end', marginTop: -10}}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{fontSize: 20, color: '#00453F', fontWeight: 'bold',}}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styled.labelform}>
            Imóvel
          </Text>
          <TextInput style={styled.inputform} /*value={webHostValue} onChangeText={handleWebHostChange}*//>
          <Text style={styled.labelform}>
            Nome do Proprietário
          </Text>
          <TextInput style={styled.inputform} /*value={webHostValue} onChangeText={handleWebHostChange}*//>
          <Text style={styled.labelform}>
            Empresa Responsável
          </Text>
          <TextInput style={styled.inputform} /*value={webHostValue} onChangeText={handleWebHostChange}*//>
          <Text style={styled.labelform}>
            Estado (UF)
          </Text>
          <TextInput style={[styled.inputform, {width: 60}]} /*value={webHostValue} onChangeText={handleWebHostChange}*//>
          <Text style={styled.labelform}>
            Município
          </Text>
          <TextInput style={styled.inputform} /*value={webHostValue} onChangeText={handleWebHostChange}*//>
          <Text style={styled.labelform}>
            Nº de Unidades Amostrais (UA's)
          </Text>
          <TextInput style={[styled.inputform, {width: 110}]} /*value={webHostValue} onChangeText={handleWebHostChange}*//>
          <Text style={styled.labelform}>
            Tipo de Floresta
          </Text>
          <View style={[styled.inputform, {backgroundColor:'#ffffff', borderBottomWidth: 0, paddingHorizontal: 0, }]} /*value={webHostValue} onChangeText={handleWebHostChange}*/>
            <TouchableOpacity style={{height: 20, width: 20, marginRight: 3}} /*onPress={toggleModal}*/>
              <Image style={{height: 20, width: 20}} source={itemsImg.checkeon}/>
            </TouchableOpacity>
            <Text style={[styled.labelform, {fontWeight: 'bold', marginTop: 0}]}>
              Normal
            </Text>
            <TouchableOpacity style={{height: 20, width: 20, marginRight: 3}} /*onPress={toggleModal}*/>
              <Image style={{height: 20, width: 20}} source={itemsImg.checkeoff}/>
            </TouchableOpacity>
            <Text style={[styled.labelform, {fontWeight: 'bold', marginTop: 0}]}>
              Exótico
            </Text>
          </View>
          <View style={{flex: 2, padding: 0, alignItems: 'center', justifyContent: 'flex-end', marginTop:30, }}>
            <TouchableOpacity style={{backgroundColor: '#2CCC00', height: 39, width: 160, borderRadius: 10, alignItems: 'center', justifyContent: 'center',}} /*onPress={toggleModal}*/>
              <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: 'bold',}}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2, padding: 0, alignItems: 'flex-end', justifyContent: 'flex-end',}}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={{fontSize: 20, color: '#2CCC00', fontWeight: 'bold',}}>
                Voltar
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
  delete: {
    height: 22,
    width: 22,
  },
  botaoFeito: {
    marginHorizontal: 16,
    width: 20,
    height: 20,
  },
  clipboard: {
    height: 56,
    width: 56,
    top: 48,
  },
  content: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 24,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    marginTop: -25,
    borderRadius: 15,
  },
  title: {
    color: '#FDFCFE',
    fontSize: 24,
    lineHeight: 28.13,
    fontWeight: '700',
  },
  criadas: {
    color: '#00453F',
    top: 3,
    fontSize: 14,
    lineHeight: 16.94,
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
  title3: {
    flex: 1,
    color: '#1A1A1A',
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'center',
    fontWeight: '400',
    top: 64,
  },
  subtitle: {
    color: '#6B6B6B',
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: '400',
  },
  input: {
    flex: 1,
    height: 54,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0D0D0D',
    backgroundColor: '#262626',
    color: '#F2F2F2',
    alignItems: 'center',
    paddingHorizontal: 16,
    fontSize: 16,
    alignContent: 'center'
  },
  inputFocused: {
    borderColor: '#5E60CE',
  },
  list: {
    flex: 1,
    height: 64,
    textAlignVertical: 'center',
    color: '#FDFCFE',
    fontSize: 12,
    fontWeight: '400',
  },
  containerinput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -27,
    gap: 4,
  },
  containerlist: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#333333',
    marginTop: 16,
    backgroundColor: '#262626',
  },
  buttonadd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 54,
    borderRadius: 6,
    backgroundColor: '#1E6F9F',
  },
  buttondelet: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginHorizontal: 7,
  },
  labelButton: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '400',
  },
  formproject: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  labelform: {
    fontSize: 16,
    color: '#0B4200',
    marginTop: 15,
    marginRight: 25,
  },
  inputform: {
    marginTop: 5,
    paddingHorizontal: 16,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#E0FFCB',
    fontSize: 16,
    color: '#444444',
    borderBottomWidth: 2,
    borderColor: '#0B4200',
    flexDirection: 'row',
    alignItems: 'center',
  },
});