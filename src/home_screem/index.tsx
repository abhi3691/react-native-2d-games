import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Button, Alert, ActivityIndicator} from 'react-native';
import io from 'socket.io-client';

import styles from './styles';
import {checkWinner} from '../functions/checkWinner';
import Animated, {ZoomIn} from 'react-native-reanimated';
import RoomInput from '../components/RenderInput/RoomInput';
import RenderCell from '../components/RenderCell/RenderCell';

const socket = io('http://192.168.1.14:3000'); // Replace with your server IP

const HomeScreen = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [player, setPlayer] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [roomId, setRoomId] = useState<string>('');
  const [inRoom, setInRoom] = useState<boolean>(false);
  const [resetRequested, setResetRequested] = useState<boolean>(false);

  useEffect(() => {
    socket.on('gameState', state => {
      setLoading(false);
      setBoard(state.board);
      setCurrentPlayer(state.currentPlayer);
      if (state.currentPlayer !== socket.id) {
        setPlayer(state?.playerSymbol);
      }
      const currentWinner = checkWinner(state.board);
      setWinner(currentWinner);
    });

    socket.on('resetRequest', () => {
      setResetRequested(true);
      Alert.alert(
        'Reset Request',
        'Opponent wants to reset the game. Do you accept?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              socket.emit('resetDeny', roomId);
              setResetRequested(false);
            },
          },
          {
            text: 'Accept',
            onPress: () => {
              socket.emit('resetConfirm', roomId);
              setResetRequested(false);
            },
          },
        ],
      );
    });

    socket.on('playerDisconnected', playerId => {
      if (playerId !== socket.id) {
        handleDisconnect();
      }
    });
    socket.on('playerJoined', ({id, symbol}) => {
      if (id !== socket.id) {
        setPlayer(symbol === 'X' ? 'O' : 'X');
      }
    });

    socket.on('isConfirmed', () => {
      setLoading(true);
    });

    return () => {
      socket.off('gameState');
      socket.off('resetRequest');
      socket.off('isConfirmed');
      socket.off('playerDisconnected');
    };
  }, [roomId]);

  const joinRoom = () => {
    if (roomId.trim()) {
      socket.emit('joinRoom', roomId);
      setInRoom(true);
    } else {
      Alert.alert('Error', 'Please enter a valid room ID');
    }
  };

  const leaveRoom = () => {
    if (roomId.trim()) {
      socket.emit('leaveRoom', roomId);
      setInRoom(false);
    } else {
      Alert.alert('Error', 'Please enter a valid room ID');
    }
  };

  const handleReset = () => {
    socket.emit('resetRequest', roomId);
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Opponent Disconnected',
      'The opponent has disconnected. Join a new room or continue in the current room?',
      [
        {text: 'Continue', style: 'destructive', onPress: () => {}},
        {
          text: 'Join New',
          onPress: () => {
            setInRoom(false);
            setBoard(Array(9).fill(''));
            setCurrentPlayer(null);
            setPlayer(null);
            setWinner(null);
          },
        },
      ],
    );
  };

  const onChangeRoomId = useCallback((value: string) => {
    setRoomId(value);
  }, []);

  return (
    <View style={styles.container}>
      {!inRoom ? (
        <RoomInput
          roomId={roomId}
          onChangeRoomId={onChangeRoomId}
          joinRoom={joinRoom}
        />
      ) : (
        <>
          {winner ? (
            <Animated.View
              entering={ZoomIn.duration(500)}
              style={styles.container}>
              <Text style={styles.winnText}>{winner}</Text>
              <Text style={styles.winnerText}>
                {winner === 'X' || winner === 'O' ? 'WINNER!' : 'DRAW!'}
              </Text>
            </Animated.View>
          ) : (
            <>
              <Text style={styles.turnText}>
                {player && `You are ${player}`}
              </Text>
              <Text style={styles.turnText}>
                {currentPlayer === socket.id
                  ? 'Your turn'
                  : `Waiting for opponent (${player === 'X' ? 'O' : 'X'})`}
              </Text>
              <View style={styles.board}>
                {loading ? (
                  <View style={styles.container}>
                    <ActivityIndicator color={'black'} size={'large'} />
                  </View>
                ) : (
                  board.map((_, index) => (
                    <RenderCell
                      key={index}
                      index={index}
                      board={board}
                      winner={winner}
                      socket={socket}
                      roomId={roomId} // Pass roomId to RenderCell
                      disabled={currentPlayer !== socket.id || winner !== null}
                    />
                  ))
                )}
              </View>
            </>
          )}

          <View style={styles.resetButton}>
            <Button
              title="Reset"
              onPress={handleReset}
              disabled={resetRequested}
            />
            <Button title="Leave Room" onPress={leaveRoom} />
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
