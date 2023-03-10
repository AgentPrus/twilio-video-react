import "./App.css";
import VideoChat from "./components/VideoChat";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Video Chat with Hooks</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      <footer>
        <p>
          Made with{" "}
          <span role="img" aria-label="React">
            ⚛
          </span>{" "}
          by <a href="https://www.mykytaprus.com/">Mykyta Prus</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
