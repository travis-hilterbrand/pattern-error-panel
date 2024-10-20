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
  code: string;
  onRetry: () => void;
};

export const ErrorFallback = ({ code, onRetry }: ErrorFallbackProps) => {
  return (
    <Container>
      <div>Something went wrong. Please try again later</div>
      {code && <div>{`[${code}]`}</div>}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => onRetry()}>Retry</button>
      </div>
    </Container>
  );
};
