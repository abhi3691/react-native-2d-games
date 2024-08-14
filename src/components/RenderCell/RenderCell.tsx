import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styles from './styles';

const circleSvg = (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={styles.icon}>
    <Path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const crossSvg = (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={styles.icon}>
    <Path
      d="M19 5L5 19M5.00001 5L19 19"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Square = ({
  gameState,
  setGameState,
  socket,
  playingAs,
  currentElement,
  finishedArrayState,
  setFinishedState,
  finishedState,
  id,
  currentPlayer,
  setCurrentPlayer,
}) => {
  const [icon, setIcon] = useState<React.ReactNode | null>(null);

  const clickOnSquare = () => {
    if (playingAs !== currentPlayer || finishedState) {
      return;
    }

    if (!icon) {
      const newIcon = currentPlayer === 'circle' ? circleSvg : crossSvg;
      setIcon(newIcon);

      const myCurrentPlayer = currentPlayer;
      socket.emit('playerMoveFromClient', {
        state: {
          id,
          sign: myCurrentPlayer,
        },
      });

      setCurrentPlayer(currentPlayer === 'circle' ? 'cross' : 'circle');

      setGameState(prevState => {
        const newState = [...prevState];
        const rowIndex = Math.floor(id / 3);
        const colIndex = id % 3;
        newState[rowIndex][colIndex] = myCurrentPlayer;
        return newState;
      });
    }
  };

  const isDisabled = finishedState || currentPlayer !== playingAs;
  const isWinningSquare = finishedArrayState.includes(id);
  const backgroundColor =
    finishedState && finishedState !== playingAs
      ? styles.greyBackground.backgroundColor
      : isWinningSquare
      ? styles.winningSquare.backgroundColor
      : styles.defaultSquare.backgroundColor;

  return (
    <TouchableOpacity
      onPress={clickOnSquare}
      disabled={isDisabled}
      style={[styles.square, {backgroundColor}]}>
      {currentElement === 'circle'
        ? circleSvg
        : currentElement === 'cross'
        ? crossSvg
        : icon}
    </TouchableOpacity>
  );
};

export default Square;
