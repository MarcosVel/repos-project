import styled, { css, keyframes } from "styled-components";

export const Container = styled.div``;

export const Owner = styled.header``;

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ${css`
    svg {
      animation: ${animate} 2s linear infinite;
    }
  `}
`;
