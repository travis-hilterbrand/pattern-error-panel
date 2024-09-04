import { useGetUser } from "../hooks/useGetUser";
import { ErrorFallback } from "./ErrorFallback";

const Contents = () => {
  const { data, error, isLoading, refetch } = useGetUser("unknown");
  if (error) {
    return <ErrorFallback onRetry={() => refetch()} />;
  } else if (isLoading) {
    return <div>Loading...</div>;
  }
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export const Panel1 = () => {
  return (
    <div style={{ background: "burlywood", color: "white", padding: 8 }}>
      Panel 1
      <hr />
      <Contents />
    </div>
  );
};
