import styled from 'styled-components/native';

export const FormularioNovoGrupo = styled.View`
  padding: 10px 20px;
  padding: 0 70px;
  border-style: solid;
  border-bottom-color: #7a1b0c;
  border-bottom-width: 3px;
  padding-bottom: 5px;
`;

export const ListaParticipantes = styled.View`
  flex: 3;
  padding: 10px 0;
`;

export const Participantes = styled.FlatList`
  background: #7a1b0c;
  border-radius: 10px;
  margin: 5px 20px;
  overflow: hidden;
  opacity: 0.8;
  height: 0px;
`;

export const Participante = styled.View`
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  padding: 15px 5px 5px;
  margin: 0 5px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Footer = styled.ScrollView`
  flex: 1;
`;
export const FormularioNovoParticipante = styled.View`
  background: #008000;
  border-radius: 10px;
  padding: 0 60px;
  margin: 0 10px;
`;

export const BotaoAdicionar = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #7a1b0c;
  border-radius: 4px;
  padding: 4px 12px;
  margin: 40px 0 20px 0;
  width: 180px;
  align-self: center;
`;

export const Botao = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #008000;
  border-radius: 4px;
  padding: 4px 12px;
  margin: 5px 60px 5px;
  margin-top: ${props => props.marginTop};
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

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #d50000;
`;
