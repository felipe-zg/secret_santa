import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  background: #a51b0b;
  border-radius: 8px;
  margin: 10px 20px;
  padding: 10px;
  align-items: center;
`;

export const Participantes = styled.FlatList`
  flex: 2;
  background: #a51b0b;
  border-radius: 8px;
  margin: 10px 20px;
  padding: 0 10px 10px;
`;

export const Participante = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const Botao = styled.TouchableOpacity`
  background: ${props => props.color};
  align-items: center;
  justify-content: center;
  padding: 5px 20px;
  border-radius: 4px;
`;

export const Acoes = styled.View`
  flex-direction: row;
  margin: ${props => props.marginTop} 20px;
  align-items: center;
  justify-content: space-between;
`;

export const Footer = styled.ScrollView`
  flex: 1;
`;

export const Status = styled.View`
  flex-direction: row;
  background: #7a1b0c;
  border-radius: 8px;
  margin: 10px 20px;
  padding: 10px;
  align-items: center;
  align-self: flex-start;
  width: auto;
`;

export const BotaoEditar = styled.TouchableOpacity`
  border-radius: 4px;
  padding: 10px;
`;

export const BotaoGrande = styled.TouchableOpacity`
  border-radius: 4px;
  margin: 20px;
  padding: 5px;
  background: #008000;
  align-items: center;
`;

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #d50000;
`;

export const Formulario = styled.View`
  background: #008000;
  width: 90%;
  border-radius: 10px;
  padding: 0 60px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#D50000',
})`
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 5px 0;
  background: #fff;
  color: #000;
  opacity: 0.9;
  padding: 0px;
`;

export const BotaoConcluirEdicao = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #7a1b0c;
  border-radius: 4px;
  padding: 4px 12px;
  margin: 40px 0 20px 0;
  width: 180px;
  align-self: center;
`;
