import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import {useDispatch} from 'react-redux';
import { Container } from '../../components/Container';
import {
    FormularioNovoGrupo, 
    ListaParticipantes, 
    Participantes, 
    Participante, 
    Footer, 
    Input, 
    FormularioNovoParticipante,
    BotaoAdicionar,
    Botao,
    ModalContainer
} from './styles';

import status from '../../utils/status';
import * as GruposActions from '../../store/actions/Grupos';

const EMOTES = [
    {
        id: 1,
        nome: 'tree',
        selected: false
    },
    {
        id: 2,
        nome: 'gift',
        selected: false
    },
    {
        id: 3,
        nome: 'star',
        selected: false
    },
    {
        id: 4,
        nome: 'soccer-ball-o',
        selected: false
    },
    {
        id: 5,
        nome: 'sticky-note',
        selected: false
    },
]

export default function NewGroup({navigation}) {
    const [nomeDoGrupo, setNomeDoGrupo] = useState('');
    const [emoji, setEmoji] = useState('');
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [participantes, setParticipantes] = useState([]);
    const [nomeNovoParticipante, setNomeNovoParticipante] = useState('');
    const [emailNovoParticipante, setEmailNovoParticipante] = useState('');
    const dispacth = useDispatch();
    const [emojis, setEmojis] = useState(EMOTES);

    const inputs = [];

    function selecionaEmoji(id){
        let novoState = [...emojis];
        novoState.map(emoji=>{
            if(emoji.id===id){
                emoji.selected = true;
                setEmoji(emoji.nome);
            }else{
                if(emoji.selected) emoji.selected = false;
            }
        })
        setEmojis(novoState);

    }

    function CriaGrupo(){
        if(nomeDoGrupo ===''){
            Toast.show('O nome do grupo é obrigatório');
            return;
        }
        if(emoji ===''){
            Toast.show('Selecione um emoji');
            return;
        }
        if(participantes.length < 2 ){
            Toast.show('O grupo precisa de pelo menos 2 participantes');
            return;
        }

        const grupo = {
            id: String(Math.floor(Math.random() * 1000)),
            nome: nomeDoGrupo,
            emoji,
            status: status.A_SORTEAR,
            participantes
        }
        
        dispacth(GruposActions.criarNovoGrupo(grupo));
        navigation.replace('TelaDetalhesDoGrupo', {grupo:grupo});
    
    }

    function AdicionarParticipante(){
        if(nomeNovoParticipante==='' || emailNovoParticipante===''){
            Toast.show('Todos os campos são obrigat´roios');
        }else{
            Toast.show(`O ${nomeNovoParticipante} foi adicionado`);
            setParticipantes([...participantes, {
                id: String(Math.floor(Math.random() * 1000)),
                nome: nomeNovoParticipante,
                email: emailNovoParticipante
            }])
            setModalIsVisible(false);
            setNomeNovoParticipante('');
            setEmailNovoParticipante('');
        }
    }

    function DeletaParticipante(id){
        const novaLista =  participantes.filter(Participante=>Participante.id!==id);
        setParticipantes(novaLista);
        Toast.show('deletando...');
    }

    function focusField(index){
        inputs[index].focus();
    }

    function FormularioAddParticipante(){
        return(
            <Modal  animationType="slide"
                    transparent={false}
                    visible={modalIsVisible}
                    onRequestClose={()=>{
                        setModalIsVisible(false);
                    }}>
                <ModalContainer>
                    <FormularioNovoParticipante>
                        <View style={styles.close}> 
                            <TouchableOpacity onPress={()=>setModalIsVisible(false)}>
                                <Icon name="close" size={25} color="#fff"/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Nome do novo participante:</Text>
                        <Input  value={nomeNovoParticipante} 
                                onChangeText={nome=>setNomeNovoParticipante(nome)}
                                returnKeyType="next" 
                                onSubmitEditing={() => {focusField('email') }}
                                blurOnSubmit={false} 
                                
                        />
                        <Text style={styles.label}>E-mail do novo participante:</Text>
                        <Input  value={emailNovoParticipante} 
                                onChangeText={emoji=>setEmailNovoParticipante(emoji)}
                                keyboardType="email-address" 
                                autoCapitalize="none" 
                                ref={input => {inputs['email'] = input }}
                                returnKeyType="send" 
                                onSubmitEditing={AdicionarParticipante} 
                        />
                        <BotaoAdicionar onPress={()=>AdicionarParticipante()}>
                            <Text style={styles.txt}>Adicionar</Text>
                        </BotaoAdicionar>
                    </FormularioNovoParticipante>
                </ModalContainer>
            </Modal>
        )
    }

    return (
        <Container>
            <FormularioNovoGrupo>
                <Text style={styles.label}>Nome do grupo:</Text>
                <Input value={nomeDoGrupo} onChangeText={nome=>setNomeDoGrupo(nome)}/>
                <Text style={styles.label}>Escolha um emoji:</Text>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    {emojis.map(emoji=>(
                        <TouchableOpacity key={emoji.id} 
                                onPress={()=>selecionaEmoji(emoji.id)}
                                style={emoji.selected?styles.viewEmojiSelecionado:styles.viewEmoji}>
                            <Icon name={emoji.nome} color="#fff" size={25} />
                        </TouchableOpacity>
                    ))}
                </View>
            </FormularioNovoGrupo>

            <ListaParticipantes>
                <Text style={styles.titulo}>Participantes</Text>
                <Participantes 
                    data={ participantes } keyExtractor={ item => item.id }  
                    renderItem={({item}) => 
                        <Participante>
                            <View>
                                <Text style={styles.txt}>{item.nome}</Text>
                                <Text style={styles.txt}>{item.email}</Text>
                            </View>
                            <TouchableOpacity style={styles.trash} onPress={()=>DeletaParticipante(item.id)}>
                                <Icon name="trash-o" color="#fff" size={30} />
                            </TouchableOpacity>
                        </Participante>
                    }
                />
            </ListaParticipantes>


            <Footer>
                <Botao marginTop="5px" onPress={()=>setModalIsVisible(true)}>
                    <Text style={styles.txt}>Adicionar Participante</Text>
                </Botao>
                <Botao  marginTop="20px" onPress={()=>CriaGrupo()}>
                    <Text style={styles.txt}>Concluir criação do grupo</Text>
                </Botao>
            </Footer>

            {FormularioAddParticipante()}
        </Container>
    );
}

const styles = StyleSheet.create({
    label:{
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
    },
    txt:{
        color: '#fff',
        fontSize: 12,
    },
    trash:{
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    close:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 20,
    },
    titulo:{
        color: '#fff',
        marginLeft: 25,
    },
    viewEmoji:{
        borderRadius: 4,
        padding: 10,
    },
    viewEmojiSelecionado:{
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,.4)'
    }
})