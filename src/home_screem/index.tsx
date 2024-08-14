import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {io, Socket} from 'socket.io-client';
import {checkWinner} from '../functions/checkWinner';
import styles from './styles';
import Square from '../components/RenderCell/RenderCell';

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const App = () => {
  const [gameState, setGameState] = useState([...renderFrom]);
  const [currentPlayer, setCurrentPlayer] = useState('circle');
  const [finishedState, setFinishedState] = useState<string | boolean>(false);
  const [finishedArrayState, setFinishedArrayState] = useState<number[]>([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [opponentName, setOpponentName] = useState<string | null>(null);
  const [playingAs, setPlayingAs] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const winner = checkWinner({gameState, setFinishedArrayState});
    if (winner) {
      setFinishedState(winner);
    }
  }, [gameState]);

  useEffect(() => {
    if (socket) {
      socket.on('opponentLeftMatch', () => {
        setFinishedState('opponentLeftMatch');
      });

      socket.on('playerMoveFromServer', data => {
        const id = data.state.id;
        setGameState(prevState => {
          let newState = [...prevState];
          const rowIndex = Math.floor(id / 3);
          const colIndex = id % 3;
          newState[rowIndex][colIndex] = data.state.sign;
          return newState;
        });
        setCurrentPlayer(data.state.sign === 'circle' ? 'cross' : 'circle');
      });

      socket.on('requestReset', () => {
        Alert.alert(
          'Reset Request',
          'Your opponent requested a game reset. Do you accept?',
          [
            {
              text: 'Accept',
              onPress: () => {
                socket.emit('resetGameAccepted');
              },
            },
            {
              text: 'Decline',
              onPress: () => {
                socket.emit('resetGameDeclined');
              },
              style: 'cancel',
            },
          ],
        );
      });

      socket.on('resetGame', () => {
        resetGame();
      });

      socket.on('resetGameDeclined', () => {
        Alert.alert(
          'Reset Request',
          'Reset request declined by your opponent.',
        );
      });

      socket.on('connect', () => {
        setPlayOnline(true);
      });

      socket.on('OpponentNotFound', () => {
        setOpponentName(null);
      });

      socket.on('OpponentFound', data => {
        setPlayingAs(data.playingAs);
        setOpponentName(data.opponentName);
      });
    }
  }, [socket]);

  const resetGame = () => {
    setLoading(true);
    setFinishedArrayState([]);
    setGameState([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    setFinishedState(false);
    setLoading(false);
  };
  const takePlayerName = () => {
    Alert.prompt(
      'Enter your name',
      '',
      [
        {
          text: 'OK',
          onPress: text => {
            if (text) {
              setPlayerName(text);
              const newSocket = io(
                'https://xox-multiplayer-backend.onrender.com',
                {
                  autoConnect: true,
                },
              );

              newSocket.emit('request_to_play', {
                playerName: text,
              });

              setSocket(newSocket);
            }
          },
        },
      ],
      'plain-text',
    );
  };

  const requestResetGame = () => {
    if (socket) {
      socket.emit('requestResetGame');
    }
  };

  if (!playOnline) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={takePlayerName} style={styles.playOnline}>
          <Text style={styles.playOnlineText}>Play Online</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (playOnline && !opponentName) {
    return (
      <View style={styles.container}>
        <Text style={styles.waitingText}>Waiting for opponent...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.playerName]}>
        {currentPlayer === playingAs ? 'Your Tourn' : 'Oppoent Turn'}
      </Text>
      <View style={styles.moveDetection}>
        <View style={playingAs ? styles.currentMove : {}}>
          <Text style={[styles.playerName]}>
            {playerName} ({playingAs === 'circle' ? 'O' : 'X'})
          </Text>
        </View>
      </View>
      <Text style={styles.gameHeading}>Tic Tac Toe</Text>
      {loading ? (
        <ActivityIndicator color={'white'} size={'large'} />
      ) : (
        <View style={styles.squareWrapper}>
          {gameState.map((arr, rowIndex) =>
            arr.map((e, colIndex) => (
              <Square
                socket={socket}
                playingAs={playingAs}
                gameState={gameState}
                finishedArrayState={finishedArrayState}
                finishedState={finishedState}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                setGameState={setGameState}
                id={rowIndex * 3 + colIndex}
                key={rowIndex * 3 + colIndex}
                currentElement={e}
                setFinishedState={setFinishedState}
              />
            )),
          )}
        </View>
      )}
      {finishedState && (
        <Text style={styles.finishedStateText}>
          {finishedState === playingAs
            ? 'You won the game'
            : finishedState === 'draw'
            ? "It's a Draw"
            : finishedState === 'opponentLeftMatch'
            ? 'You won the match, Opponent has left'
            : `${finishedState} won the game`}
        </Text>
      )}
      {finishedState && (
        <TouchableOpacity onPress={requestResetGame} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Request Game Reset</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;
