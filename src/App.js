import styled from "styled-components";
import "./App.css";
import MyCarousel from "./componetes/MyCarousel/MyCarousel.js";

function App() {
  return (
    <Contenedor className="App">
      <Titulo>¡Comencemos el juego!</Titulo>
      <MyCarousel></MyCarousel>
    </Contenedor>
  );
}
const Titulo = styled.h3`
  color: white;
  font-weight: bold;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
const Contenedor = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  padding-top: 15%;
  padding-left: 25%;
  padding-right: 25%;
  justify-content: "center";
  align-items: "center";
`;

export default App;
