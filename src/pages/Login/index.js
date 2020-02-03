import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Image, Keyboard} from 'react-native';
import imagem from '../../images/banner.jpg';
import {
  Container,
  Formulario,
  Botao,
  Input,
  Banner,
  Texto,
  Link,
  Footer,
} from './styles';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputs = [];
  function focusField(index) {
    inputs[index].focus();
  }
  function login() {
    Keyboard.dismiss();
    setEmail('');
    setPassword('');
    navigation.push('TelaHome');
  }

  return (
    <Container>
      <Banner>
        <Image source={imagem} resizeMode="stretch" />
      </Banner>
      <Formulario>
        <Input
          placeholder="Digite seu E-mail"
          value={email}
          returnKeyType="next"
          onSubmitEditing={() => {
            focusField('field2');
          }}
          blurOnSubmit={false}
          onChangeText={email => setEmail(email)}
        />
        <Input
          placeholder="Digite sus Senha"
          value={password}
          ref={input => {
            inputs.field2 = input;
          }}
          returnKeyType="send"
          onSubmitEditing={login}
          onChangeText={password => setPassword(password)}
        />
        <Botao onPress={login}>
          <Texto style={styles.txt}>Entrar</Texto>
        </Botao>
        <Footer>
          <Link>
            <Texto>Cadastre-se</Texto>
          </Link>
          <Link>
            <Texto>Esqueci minha senha</Texto>
          </Link>
        </Footer>
      </Formulario>
    </Container>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: '#fff',
  },
});
