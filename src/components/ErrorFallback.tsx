import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export type ErrorFallbackProps = {
  onRetry: () => void;
};

export const ErrorFallback = ({ onRetry }: ErrorFallbackProps) => {
  return (
    <Container>
      <div>Something went wrong. Please try again later</div>
      <div style={{ marginTop: 16 }}>
        <button onClick={() => onRetry()}>Retry</button>
      </div>
    </Container>
  );
};
