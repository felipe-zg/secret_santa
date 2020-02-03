import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import FBFunctions from '@react-native-firebase/functions';
import Toast from 'react-native-root-toast';

import {Container} from '../../components/Container';
import {Formulario, Input, InputMensagem, Botao} from './styles';

export default function Contact({navigation}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [caracteres, setCaracteres] = useState(200);

  let inputs = [];

  function focusField(index) {
    inputs[index].focus();
  }

  async function EnviaEmail() {
    await FBFunctions()
      .httpsCallable('contato')({
        nome,
        email,
        assunto,
        mensagem,
      })
      .then(() => {
        Toast.show('Contato enviado com sucesso');
        navigation.goBack();
      })
      .catch(e =>
        Toast.show('Ocorreu um erro ao enviar os e-mails, Tente novamente'),
      );
  }
  return (
    <Container>
      <ScrollView>
        <Formulario resetScrollToCoords={{x: 0, y: 0}} scrollEnabled={false}>
          <Text style={styles.txtBranco}>Nome:</Text>
          <Input
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={nome => setNome(nome)}
            returnKeyType="next"
            onSubmitEditing={() => {
              focusField('email');
            }}
            blurOnSubmit={false}
          />
          <Text style={styles.txtBranco}>E-mail:</Text>
          <Input
            placeholder="Informe um e-mail para contato"
            value={email}
            onChangeText={email => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
            ref={input => {
              inputs.email = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              focusField('assunto');
            }}
            blurOnSubmit={false}
          />
          <Text style={styles.txtBranco}>Assunto:</Text>
          <Input
            placeholder="Qual é o assunto ?"
            value={assunto}
            onChangeText={assunto => setAssunto(assunto)}
            ref={input => {
              inputs.assunto = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => {
              focusField('mensagem');
            }}
            blurOnSubmit={false}
          />
          <Text style={styles.txtBranco}>Mensagem:</Text>
          <InputMensagem
            placeholder="Digite sua mensagem"
            multiline={true}
            numberOfLines={5}
            maxLength={200}
            value={mensagem}
            onChangeText={mensagem => {
              setMensagem(mensagem);
              setCaracteres(200 - mensagem.length);
            }}
            ref={input => {
              inputs.mensagem = input;
            }}
          />
          <Text style={styles.caracteres}>{caracteres} caracteres</Text>
          <Botao onPress={() => EnviaEmail()}>
            <Text style={styles.txtBranco}>Enviar</Text>
          </Botao>
        </Formulario>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  txtBranco: {
    color: '#fff',
  },
  caracteres: {
    color: '#fff',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
});
