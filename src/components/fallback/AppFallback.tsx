const styles = Object.freeze({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  message: {
    fontSize: "clamp(1vw, 4em, 5vw)",
  },
});

function AppFallback(): JSX.Element {
  return (
    <main style={styles.container}>
      <section style={styles.message}>
        <header>Oops! Something went wrong</header>
        <figure>🔥🖥️🔥😅</figure>
        <div>Please refresh the page</div>
      </section>
    </main>
  );
}

export default AppFallback;
