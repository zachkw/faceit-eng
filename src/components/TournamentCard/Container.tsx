import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  background-color: ${theme.palette.background.base};
  padding: 16px;
  margin: 12px;
  width: 272px;
  &:nth-child(3n + 1) {
    margin-left: 0;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
`;
