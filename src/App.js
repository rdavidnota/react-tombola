import styled from "styled-components";
import "./App.css";
import MyCarousel from "./componetes/MyCarousel/MyCarousel.js";

function App() {
  return (
    <Contenedor className="App">
      <MyCarousel></MyCarousel>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  padding-top: 20%;
  padding-left: 25%;
  padding-right: 25%;
  justify-content: "center";
  align-items: "center";
`;

export default App;
