import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';

import * as GroupActions from '../../store/actions/Grupos';
import {Container} from '../../components/Container';
import { 
  Header,
  Participantes,
  Participante,
  Acoes,
  Status,
  BotaoEditar,
  BotaoGrande,
  Footer,
  Input,
  ModalContainer,
  Formulario,
  BotaoConcluirEdicao,
  Botao
} from './styles';

import status from '../../utils/status'



reenviarEmails = ()=>{
  console.warn("reenviando e-mails");
}



export default function GroupDetails({navigation}) {
  const id = navigation.getParam('id');
  const grupos = useSelector(state=>state.Grupos);
  const dispatch = useDispatch();
  const [grupo, setGrupo] = useState({});
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [nomeParticipante, setNomeParticipante] = useState('');
  const [emailParticipante, setEmailParticipante] = useState('');
  const [idParticipante, setIdParticipante] = useState('');

  let inputs = [];

  useEffect(()=>{
    grupos.map(g=>{
      if(g.id===id){
        setGrupo(g);
      }
    })
  },[grupos])


  async function  Sortear(){
    let grupoSorteado = {...grupo};
    let ids = [];
    grupo.participantes.map(p=>{
      ids.push(p.id);
    })

    grupoSorteado.participantes.map(p=>{
      let sorteado = false;
      while(!sorteado){
        let idSorteado = Math.floor(Math.random() * ids.length);
        if(ids[idSorteado] !== p.id){
          sorteado=true;
          p.amigo = ids[idSorteado];
          ids.splice(idSorteado, 1);
        } 
      }
    })
    grupoSorteado.status = status.SORTEADO;
    dispatch(GroupActions.atualizarGrupo(grupoSorteado));
    //ENVIAR E-MAILS PARA OS PARTICIPANTES ( LOADING NA TELA ANTES DE VOLTAR PARA OS GRUPOS)
    try{
      await AsyncStorage.setItem('Grupos', JSON.stringify(grupos));
    }catch(e){}
  }

  async function adicionarParticipante(){
    let participante = {
      id: String(Math.floor(Math.random() * 1000)),
      nome: nomeParticipante,
      email: emailParticipante
    }
    dispatch(GroupActions.adicionarParticipante(grupo.id, participante));
    try{
      await AsyncStorage.setItem('Grupos', JSON.stringify(grupos));
      ResetaModal();
      Toast.show(`Participante adicionado com sucesso`);
    }catch(e){
      Toast.show(`Erro ao adicionar participante`);
    }
    
  }

  function AbrirFormAddParticipante(){
    setModalIsVisible(true);
    // grupo.participantes.map(p=>{
    //   console.warn(p.id);
    // })
  }

  async function ExcluirParticipante(idParticipante){
    if(grupo.participantes.length<=2){
      Toast.show(`O grupo não pode ter menos de 2 participantes`);
      return;
    }
    dispatch(GroupActions.excluirParticipante(grupo.id, idParticipante));
    try{
      await AsyncStorage.setItem('Grupos', JSON.stringify(grupos));
      Toast.show(`Participante excluido com sucesso`);
    }catch(e){
      Toast.show(`Erro ao excluir participante`);
    }
  }

  
  async function EditarParticipante (){
    let participanteAtualizado = {
      id: idParticipante,
      nome: nomeParticipante,
      email: emailParticipante
    }

    dispatch(GroupActions.atualizarParticipante(grupo.id, participanteAtualizado));
    try{
      await AsyncStorage.setItem('Grupos', JSON.stringify(grupos));
      setModalIsVisible(false);
      Toast.show(`${nomeParticipante} foi editado`);
      setNomeParticipante('');
      setEmailParticipante('');
      setIdParticipante('');
    }catch(e){}
  }
  
  function AbrirFormEditar(participante){
    setNomeParticipante(participante.nome);
    setEmailParticipante(participante.email);
    setIdParticipante(participante.id);
    setModalIsVisible(true);
  }

  function abrirDialogExclusao(titulo, mensagem, callback){
    Alert.alert(
      titulo,
      mensagem,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log("exclusão cancelada"),
          style: 'cancel',
        },
        {text: 'Excluir', onPress: () => {
            callback();
        }},
      ],
      {cancelable: false},
    );
  }

  async function DeletarGrupo(){
    dispatch(GroupActions.excluirGrupo(grupo.id));
    try{
      await AsyncStorage.setItem('Grupos', JSON.stringify(grupos));
      Toast.show(`Grupo excluído com sucesso`);
      navigation.goBack();
    }catch(e){}
  }

  function ResetaModal(){
    setModalIsVisible(false);
    setIdParticipante('');
    setNomeParticipante('');
    setEmailParticipante('');
  }

  function focusField(index){
    inputs[index].focus();
  }

  function FormularioEditarParticipante(){
    return(
        <Modal  animationType="slide"
                transparent={false}
                visible={modalIsVisible}
                onRequestClose={()=>{
                    ResetaModal()
                }}>
            <ModalContainer>
                <Formulario>
                    <View style={styles.close}> 
                        <TouchableOpacity onPress={()=>ResetaModal()}>
                            <FAIcon name="close" size={25} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Nome:</Text>
                    <Input  value={nomeParticipante} 
                            onChangeText={nome=>setNomeParticipante(nome)}
                            returnKeyType="next" 
                            onSubmitEditing={() => {focusField('email') }}
                            blurOnSubmit={false} 
                            
                    />
                    <Text style={styles.label}>E-mail:</Text>
                    <Input  value={emailParticipante} 
                            onChangeText={email=>setEmailParticipante(email)}
                            keyboardType="email-address" 
                            autoCapitalize="none" 
                            ref={input => {inputs['email'] = input }}
                            returnKeyType="send" 
                            onSubmitEditing={idParticipante==='' ?adicionarParticipante:EditarParticipante} 
                    />
                    {idParticipante==='' ? (
                      <BotaoConcluirEdicao onPress={()=>adicionarParticipante()}>
                        <Text style={styles.txt}>Adicionar</Text>
                    </BotaoConcluirEdicao>
                    ):(
                      <BotaoConcluirEdicao onPress={()=>EditarParticipante()}>
                          <Text style={styles.txt}>Editar</Text>
                      </BotaoConcluirEdicao>
                    )}
                </Formulario>
            </ModalContainer>
        </Modal>
    )
  }
  

  return (
    <Container>
        <Header>
          <FAIcon name="tree" color="#fff" size={40}/>
          <Text numberOfLines={1} style={styles.titulo}>{grupo.nome}</Text>
        </Header>
        
        <Acoes marginTop={0}>
          <Botao color="#ff4700"  onPress={()=>abrirDialogExclusao('Excluir grupo', 'Tem certeza que deseja excluir o grupo ?', DeletarGrupo)}> 
            <View style={styles.acoes}>
              <MCIcon name="delete-forever" size={22} color="#fff" />
              <Text numberOfLines={1} style={styles.txtAcao}>Grupo</Text>
            </View>
          </Botao>
          <Botao color="#0000ff"  onPress={()=>AbrirFormAddParticipante()}> 
            <View style={styles.acoes}>
              <FAIcon name="plus" size={22} color="#fff" />
              <Text numberOfLines={1} style={styles.txtAcao}>Novo participante</Text>
            </View>
          </Botao>
        </Acoes>

        <Participantes 
            data={ grupo.participantes } keyExtractor={ item => item.id }  
            renderItem={({item}) => 
              <Participante>
                <View>
                  <Text numberOfLines={1} style={styles.txt} numberOfLines={1}>{item.nome}</Text>
                  <Text style={styles.txt} numberOfLines={1}>{item.email}</Text>
                </View>
                <View style={styles.acoes}>
                  <BotaoEditar onPress={()=>AbrirFormEditar(item)}>
                    <MIcon name="mode-edit" color="#fff" size={25} />
                  </BotaoEditar>
                  <BotaoEditar onPress={()=>abrirDialogExclusao('Excluir participante', 'Tem certeza que deseja excluir o participante ?', ()=>ExcluirParticipante(item.id))}>
                    <ADIcon name="deleteuser" color="#fff" size={25} />
                  </BotaoEditar>
                </View>
              </Participante>
            }
        />

        <Footer>
            <Status>
              <Text style={styles.txtbranco}>Status:</Text>
              <Text style={styles.status}>{grupo.status}</Text>
            </Status>
            {grupo.status === status.A_SORTEAR ? (
              <Botao onPress={()=>Sortear()}>
                <Text style={styles.txtbranco} >Sortear</Text>
              </Botao>
            ):(
              <Acoes>
                <Botao color="#008000" onPress={()=>Sortear()}>
                  <Text style={styles.txtbranco} >Resortear</Text>
                </Botao>
                <Botao color="#7715c1" onPress={()=>reenviarEmails()()}>
                  <Text numberOfLines={1} style={styles.txtbranco} >Reenviar e-mails</Text>
                </Botao>
              </Acoes>
            )}
        </Footer>
        {FormularioEditarParticipante()}
    </Container>
  );
}

const styles = StyleSheet.create({
  titulo:{
    color: '#fff',
    fontSize: 20,
    marginLeft: 30,
  },
  txt:{
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 3,
  },
  label:{
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  txtbranco:{
    color: '#fff',
  },
  status:{
    color: '#fff',
    fontSize: 14,
    marginLeft: 20,
  },
  close:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  acoes:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtAcao:{
    color: '#fff',
    marginLeft: 10,
  }
})