import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
  colors: ['#ff0000', '#7a1b0c'],
})`
  flex: 1;
`;

export const Grupos = styled.FlatList`
  background: #a51b0b;
  border-radius: 8px;
  margin: 10px 20px;
  padding: 0 10px 10px;
`;

export const ViewGrupos = styled.View`
  flex: 2;
`;

export const Grupo = styled.TouchableOpacity`
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  padding: 5px 0;
  margin: 5px 0;
  flex-direction: row;
  align-items: center;
`;

export const Texto = styled.Text`
  color: #fff;
  margin-left: 10px;
`;

export const ViewAcoes = styled.View`
  flex: 1;
`;
export const Acoes = styled.View`
  margin-top: 20px;
`;

export const Botao = styled.TouchableOpacity.attrs({
  type: 'submit',
})`
  justify-content: center;
  align-items: center;
  background: #008000;
  border-radius: 8px;
  padding: 4px 12px;
  margin: 20px;
`;
