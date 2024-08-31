import React, {useCallback, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Chess} from 'chess.js';

import Background from './organization/Background';
import Piece from './organization/Piece';
import styles from './styles';
import {useConst} from './functions/useConst';
import CapturedPiecesComp from './organization/capturedPieces';

const Board = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: 'w',
    board: chess.board(),
    capturedPieces: {
      w: [] as Array<{color: string; type: string}>,
      b: [] as Array<{color: string; type: string}>,
    },
    selectedPiece: null as {x: number; y: number} | null,
    possibleMoves: [] as Array<{x: number; y: number}>,
  });

  const onPiecePress = useCallback(
    (x: number, y: number) => {
      const piece = state.board[y][x];
      if (piece && piece.color === state.player) {
        const possibleMoves = chess
          .moves({
            square: `${'abcdefgh'[x]}${8 - y}`,
            verbose: true,
          })
          .map(move => ({
            x: 'abcdefgh'.indexOf(move.to[0]),
            y: 8 - parseInt(move.to[1], 10),
          }));
        setState(prev => ({
          ...prev,
          selectedPiece: {x, y},
          possibleMoves,
        }));
      } else {
        setState(prev => ({
          ...prev,
          selectedPiece: null,
          possibleMoves: [],
        }));
      }
    },
    [chess, state.board, state.player],
  );

  const onTurn = useCallback(() => {
    const moves = chess.history({verbose: true});
    const lastMove = moves[moves.length - 1];
    const captured = lastMove?.captured;

    const capturedPieces = {
      w:
        chess.turn() === 'b'
          ? [
              ...state.capturedPieces.w,
              ...(captured ? [{color: 'b', type: captured}] : []),
            ]
          : state.capturedPieces.w,
      b:
        chess.turn() === 'w'
          ? [
              ...state.capturedPieces.b,
              ...(captured ? [{color: 'w', type: captured}] : []),
            ]
          : state.capturedPieces.b,
    };

    const updatedBoard = chess.board();

    setState(prev => ({
      player: prev.player === 'w' ? 'b' : 'w',
      board: updatedBoard,
      capturedPieces,
      selectedPiece: null,
      possibleMoves: [],
    }));

    if (chess.in_check()) {
      Alert.alert(
        'Check!',
        `${chess.turn() === 'w' ? 'White' : 'Black'} is in check.`,
      );
    }
  }, [chess, state.capturedPieces]);

  return (
    <View style={styles.container}>
      <Text style={styles.playerInfo}>
        It is now {state.player === 'w' ? 'White’s' : 'Black’s'} turn to move.
      </Text>
      <CapturedPiecesComp capturedPieces={state.capturedPieces} type="b" />

      <View style={styles.box}>
        <Background />
        <View style={styles.absolute}>
          {state.board.map((row, y) =>
            row.map((piece, x) => {
              const isHighlighted = state.possibleMoves.some(
                move => move.x === x && move.y === y,
              );
              return (
                <Piece
                  key={`${x}-${y}`}
                  id={`${piece?.color}${piece?.type}` as Piece}
                  startPosition={{x, y}}
                  chess={chess}
                  onTurn={onTurn}
                  onPress={() => onPiecePress(x, y)}
                  enabled={state.player === piece?.color}
                  isHighlighted={isHighlighted}
                  possibleMoves={state.possibleMoves}
                />
              );
            }),
          )}
        </View>
      </View>
      <CapturedPiecesComp capturedPieces={state.capturedPieces} type="w" />
    </View>
  );
};

export default Board;
