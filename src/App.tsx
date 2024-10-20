import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Panel1 } from "./components/Panel1";
import { Panel2 } from "./components/Panel2";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { FatalErrorScreen } from "./components/FatalErrorScreen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<FatalErrorScreen />}>
        <Container>
          <Panel1 />
          <Panel2 />
        </Container>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
