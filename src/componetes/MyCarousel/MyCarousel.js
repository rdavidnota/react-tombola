import React, { useEffect, useState } from "react";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Item from "../Item/Item";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import jugadores from "../../data/jugadores.json";
import confetti from "canvas-confetti";

const MyCarousel = () => {
  const [value, setValue] = useState(0);

  const [ganador, setGanador] = useState(false);
  const [agua, setAgua] = useState(false);
  const [mezclar, setMezclar] = useState(true);

  const [excluidos, setExcluidos] = useState([]);
  const [alAgua, setAlAgua] = useState([]);

  const onChange = (value) => {
    setValue(value);
  };

  var ganadorPosicion = () => {
    return Math.floor(Math.random() * jugadores.length);
  };

  var randomPosicion = () => {
    var max = jugadores.length;
    var min = 1;
    return Math.floor(Math.random() * (max - min) + min);
  };

  var randomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  var salioJugador = (posicion) => {
    var esExcluido =
      excluidos.filter((item) => item.id == posicion).length >= 1;
    var esAlAgua = alAgua.filter((item) => item.id == posicion).length >= 1;

    return esExcluido || esAlAgua;
  };

  const ObtenerGanador = () => {
    setMezclar(false);
    setAgua(false);
    var nuevaPosicion = ganadorPosicion();
    if (!salioJugador(nuevaPosicion)) {
      setGanador(true);
      setValue(nuevaPosicion);
      console.log("Ganador: " + nuevaPosicion);
      setExcluidos([...excluidos, jugadores[nuevaPosicion]]);
    } else {
      if (existenParticipantes()) {
        ObtenerGanador();
      } else {
        console.log("No hay mas jugadores");
      }
    }
  };

  const fireworks = (timeLeft, duration, animationEnd, defaults) => {
    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  };

  const randomConfetti = () => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(0, 360),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  };
  useEffect(() => {
    var interval = {};
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    if (ganador) {
      interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        fireworks(timeLeft, duration, animationEnd, defaults);
        randomConfetti();
      }, 250);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    var interval = {};
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);
    if (agua) {
      interval = setInterval(function () {
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
        nieve(skew, ticks, timeLeft);
      }, 250);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (mezclar == true) {
        var newPosicion = randomPosicion();
        console.log(newPosicion);
        if (excluidos.filter((item) => item === newPosicion).length < 1) {
          setValue(newPosicion);
        }
      }
    }, 600);
    return () => clearInterval(interval);
  });

  const ObtenerParticipante = () => {
    setGanador(false);
    setAgua(false);
    setMezclar(true);
  };
  var existenParticipantes = () => {
    var cantidadGanadores = excluidos.length;
    var cantidadAlAgua = alAgua.length;
    var totalYaJugados = cantidadGanadores + cantidadAlAgua;

    return totalYaJugados < jugadores.length;
  };

  const ObtenerAlAgua = () => {
    setMezclar(false);
    var nuevaPosicion = ganadorPosicion();
    if (!salioJugador(nuevaPosicion)) {
      setAgua(true);
      setValue(nuevaPosicion);
      console.log("Al agua: " + nuevaPosicion);
      setAlAgua([...alAgua, jugadores[nuevaPosicion]]);
    } else {
      if (existenParticipantes()) {
        ObtenerAlAgua();
      } else {
        console.log("No hay mas jugadores");
      }
    }
  };

  const nieve = (skew, ticks, timeLeft) => {
    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        y: Math.random() * skew - 0.2,
      },
      colors: ["#ffffff"],
      shapes: ["circle"],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(nieve);
    }
  };

  const limpiarAlAgua = () => {
    setGanador(false);
    setAgua(false);
    setMezclar(true);
    setAlAgua([]);
  };

  const listItems = jugadores.map((jugador) => {
    return <Item name={jugador.nombre} area={jugador.area}></Item>;
  });

  return (
    <Contenedor>
      <Row className="mx-0" style={{ margin: "10px 0px" }}>
        <Button
          className="mx-2"
          as={Col}
          variant="warning"
          onClick={limpiarAlAgua}
        >
          Nuevo Juego
        </Button>
      </Row>
      <Carousel
        plugins={[
          "centered",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 2,
            },
          },
        ]}
        value={value}
        onChange={onChange}
        animationSpeed={400}
        offset={10}
      >
        {listItems}
      </Carousel>

      <Row className="mx-0">
        <Button as={Col} variant="primary" onClick={ObtenerParticipante}>
          Mezclar Participantes
        </Button>
        <Button
          as={Col}
          className="mx-2"
          variant="success"
          onClick={ObtenerGanador}
        >
          Escoger Ganador
        </Button>
        <Button as={Col} variant="danger" onClick={ObtenerAlAgua}>
          Al agua
        </Button>
      </Row>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 15px;
`;

export default MyCarousel;
