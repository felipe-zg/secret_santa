import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';


export const Container = styled(LinearGradient).attrs({
    colors: [ '#7a1b0c', '#ff0000']
})`
  flex: 1;
  justify-content: space-around;
`;

export const Banner = styled.View`
  flex: 1;
`;

export const Formulario = styled.KeyboardAvoidingView`
  flex: 2;
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 20px;
  padding: 20px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor:'#D50000'
})`
    border: 1px solid #fff;
    border-radius: 4px;
    margin: 10px 0;
    background: #fff;
    color: #000;
    opacity: .9;
`;

export const Botao = styled.TouchableOpacity.attrs({
    type: 'submit'
})`
  justify-content: center;
  align-items: center;
  background: #008000;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 20px;
`;

export const Link = styled.TouchableOpacity`
  padding: 8px;
  margin: 5px 0;
  align-self: center;
`;

export const Texto = styled.Text`
  color: #fff;
`;

export const Footer = styled.View`
  margin-top: 60px;
`;