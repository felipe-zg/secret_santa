import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, ViewGrupos, Grupos, Grupo, Botao, Texto, ViewAcoes, Acoes } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import * as GrupoActions from '../../store/actions/Grupos';

export default function Home({navigation}) {
    const grupos = useSelector(state=>state.Grupos);
    const dispatch = useDispatch();

    useEffect(()=>{
        async function buscaGrupos(){
          const gruposSalvos = await AsyncStorage.getItem('Grupos');
          return gruposSalvos!==null?JSON.parse(gruposSalvos):[];
        }
        buscaGrupos().then(gruposExistentes=>dispatch(GrupoActions.iniciarListaDeGrupos(gruposExistentes)));
    },[]); 

    useEffect(()=>{
      async function salvaGrupos(){
        await AsyncStorage.setItem('Grupos', JSON.stringify(grupos));
      }
      salvaGrupos();
    },[grupos])

    function criaNovoGrupoPremium(){
      console.warn('Criando novo grupo premium...')
    }

    function logout(){
      navigation.goBack();
    }

    return (
      <Container>
          <ViewGrupos>
            <Text style={styles.tituloGrupos} >Meus grupos</Text>
            {grupos.length>0 ? (
              <Grupos 
                  data={ grupos } keyExtractor={ item => item.id }  
                  renderItem={({item}) => 
                    <Grupo onPress={()=>navigation.navigate('TelaDetalhesDoGrupo', {id:item.id})}> 
                        <FAIcon name={item.emoji} size={30} color="#fff" />
                        <Texto>{item.nome}</Texto> 
                    </Grupo> 
                  }
              />
            ):(
              <View style={styles.naoHaGrupos}> 
                <Text style={styles.txt0Grupo}>Você ainda não tem grupos</Text>
              </View>
            )}
            
          </ViewGrupos>
          <ViewAcoes>
            <Acoes>
                <Botao onPress={()=>navigation.navigate('TelaNovoGrupo')}>
                  <Texto>Criar novo grupo</Texto>
                </Botao>
                <TouchableOpacity style={styles.politica} onPress={()=>navigation.navigate('TelaPoliticaDePrivacidade')}>
                  <Text style={styles.txtPolitica}>Política de privacidade</Text>
                </TouchableOpacity>
            </Acoes>
          </ViewAcoes>
      </Container>
    );
}

const styles = StyleSheet.create({
  tituloGrupos:{
    color: '#fff',
    alignSelf: 'center',
    fontSize: 15,
    marginVertical: 10,
  },
  txt0Grupo:{
    color: '#fff',
    alignSelf: 'center',
  },
  naoHaGrupos:{
    flex: 1,
    backgroundColor: '#a51b0b',
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal:  10,
    paddingBottom: 10,
  },
  politica:{
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtPolitica:{
    fontSize: 10,
    color: '#fff',
  }
})
