import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Converter = (props) => {
  const [cards, setCards] = useState(["", "", "", "", "", "", "", ""]);
  const [toggle, setToggle] = useState(0);
  const [newGame, setNewGame] = useState(false);

  function toggleBit(i, evt) {
    const copy = cards.slice();
    copy[i] = copy[i] === "" ? "🤢" : "";
    setCards(copy);
    setToggle(toggle + 1);
    setNewGame(false);
  }

  const click = () => {
    setToggle(0);
    setCards(["", "", "", "", "", "", "", ""]);
    setNewGame(true);
  };

  function checkTurn() {
    if (toggle === 2) {
      return <NextButton handleClick={click}></NextButton>;
    }
  }

  const cardComponents = cards.map((val, i) => {
    return (
      <ToggleEmoji toggle={toggle} toggleBit={(evt) => toggleBit(i, evt)} val={val} key={i} />
    );
  });

  return (
    <>
      <h1>Game Thing</h1>
      {cardComponents}
      {checkTurn()}
    </>
  );
};

const NextButton = (props) => {
  const handleClick = () => {
    props.handleClick();
  };

  return (
    <div>
      <h1>Next</h1>
      <button onClick={handleClick}>Next Turn</button>
    </div>
  );
};

const ToggleEmoji = (props) => {
  const [click, setClick] = useState("not-clicked");

  const handleClick = () => {
    if (click === "not-clicked") {
      setClick("clicked");
    } else {
      setClick("not-clicked");
    }

    props.toggleBit();
  };

  return (
    <div onClick={handleClick} className={click}>
      {props.val}
    </div>
  );
};

ReactDOM.render(<Converter />, document.getElementById("root"));
