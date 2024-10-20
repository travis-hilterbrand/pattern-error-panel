export const FatalErrorScreen = () => {
  return (
    <div style={{ padding: 16 }}>
      <h3>Fatal error</h3>
      <hr />
      <button onClick={() => location.reload()}>Reload</button>
    </div>
  );
};
