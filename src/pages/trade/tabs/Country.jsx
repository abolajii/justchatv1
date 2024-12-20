import React from "react";

import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";

const FormGroup = styled.div``;

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textPrimary};
`;

const Country = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <FormGroup>
      <Label theme={theme}>Select Your Country</Label>
    </FormGroup>
  );
};

export default Country;
