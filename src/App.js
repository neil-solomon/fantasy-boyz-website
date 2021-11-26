import logo from "./logo.svg";
import "./App.css";
import BumpChart from "./components/BumpChart";
import regularSeasonWins from "./dataHandlers/regularSeasonWins";
import finalStanding from "./dataHandlers/finalStanding";

function App() {
  const data = finalStanding();

  return (
    <div className="App">
      <div style={{ marginTop: 50 }}>FANTASY BOYZ</div>
      <div style={{ marginTop: 50 }}>Final Standings</div>
      <div style={{ height: "70vh", width: "90vw", paddingLeft: "5vw" }}>
        {BumpChart({ data })}
      </div>
    </div>
  );
}

export default App;
