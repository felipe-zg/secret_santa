import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
    colors: [ '#ff0000', '#7a1b0c']
})`
  flex: 1;
`;
