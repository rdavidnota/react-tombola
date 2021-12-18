import React from "react";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import styled from "styled-components";

var icons = [
  { icon: "🐳", name: "spouting whale", unicode: "U+1F433" },
  { icon: "🐋", name: "whale", unicode: "U+1F40B" },
  { icon: "🐬", name: "dolphin", unicode: "U+1F42C" },
  { icon: "🐟", name: "fish", unicode: "U+1F41F" },
  { icon: "🐠", name: "tropical fish", unicode: "U+1F420" },
  { icon: "🐡", name: "blowfish", unicode: "U+1F421" },
  { icon: "🦈", name: "shark", unicode: "U+1F988" },
  { icon: "🐙", name: "octopus", unicode: "U+1F419" },
  { icon: "🐚", name: "spiral shell", unicode: "U+1F41A" },
];
const Item = (props) => {
  var randomIcon = () => {
    var posicion = Math.floor(Math.random() * icons.length);
    return icons[posicion].icon;
  };

  var { name, area } = props;
  return (
    <Contenedor>
      <Card
        style={{
          height: "112px",
          maxHeight: "112px",
          minHeight: "112px",
          width: "330px",
          maxWidth: "330px",
          minWidth: "330px",
          overflowY: "hidden",
        }}
      >
        <Card.Body>
          <Card.Title>
            {randomIcon()} - {name}
          </Card.Title>
          <Card.Text> {area}</Card.Text>
        </Card.Body>
      </Card>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  height: 138px;
  max-height: 138px;
  min-height: 138px;
  width: 332px;
  max-width: 332px;
  min-width: 332px;
`;

export default Item;
