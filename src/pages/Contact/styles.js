import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const Formulario = styled(KeyboardAwareScrollView)`
  flex: 1;
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 20px 10px;
  padding: 30px 10px;
`;
export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#D50000',
})`
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 10px 0;
  background: #fff;
  color: #000;
  opacity: 0.9;
`;

export const InputMensagem = styled.TextInput.attrs({
  placeholderTextColor: '#D50000',
  textAlignVertical: 'top',
})`
  border: 1px solid #fff;
  border-radius: 4px;
  height: 200px;
  margin: 10px 0;
  background: #fff;
  color: #000;
  opacity: 0.9;
`;

export const Botao = styled.TouchableOpacity.attrs({
  type: 'submit',
})`
  justify-content: center;
  align-items: center;
  background: #008000;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 20px;
`;
