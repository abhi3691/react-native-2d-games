import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Chess} from 'chess.js';

import Background from './orgnization/Background';
import Piece, {PIECES} from './orgnization/Piece';
import styles from './styles';
import {useConst} from './functions/useConst';

const Board = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: 'w',
    board: chess.board(),
    capturedPieces: {
      w: [] as Array<{color: string; type: string}>,
      b: [] as Array<{color: string; type: string}>,
    },
  });

  const onTurn = useCallback(() => {
    const moves = chess.history({verbose: true});
    const lastMove = moves[moves.length - 1];
    const captured = lastMove?.captured;

    if (captured) {
      const capturedPieces = {
        w:
          chess.turn() === 'b'
            ? [...state.capturedPieces.w, captured]
            : state.capturedPieces.w,
        b:
          chess.turn() === 'w'
            ? [...state.capturedPieces.b, captured]
            : state.capturedPieces.b,
      };

      setState({
        player: state.player === 'w' ? 'b' : 'w',
        board: chess.board(),
        capturedPieces: capturedPieces,
      });
    } else {
      setState({
        player: state.player === 'w' ? 'b' : 'w',
        board: chess.board(),
        capturedPieces: state.capturedPieces,
      });
    }
  }, [chess, state.player, state.capturedPieces]);

  return (
    <View style={styles.container}>
      <Text style={styles.playerInfo}>
        It is now {state.player === 'w' ? 'White’s' : 'Black’s'} turn to move.
      </Text>
      <View style={styles.capturedPiecesContainer}>
        <Text style={styles.capturedPiecesText}>
          {state.capturedPieces.b.map((piece, index) => {
            const id2 = `w${piece}` as keyof typeof PIECES;
            if (PIECES[id2]) {
              return (
                <Image
                  key={`w-${index}`}
                  source={PIECES[id2]}
                  style={styles.pieces}
                  resizeMode="contain"
                />
              );
            }
            return null;
          })}
        </Text>
      </View>

      <View style={styles.box}>
        <Background />
        <View style={styles.absolute}>
          {state.board.map((row, y) =>
            row.map((piece, x) => {
              if (piece !== null) {
                return (
                  <Piece
                    key={`${x}-${y}`}
                    id={`${piece.color}${piece.type}` as const}
                    startPosition={{x, y}}
                    chess={chess}
                    onTurn={onTurn}
                    enabled={state.player === piece.color}
                  />
                );
              }
              return null;
            }),
          )}
        </View>
      </View>
      <View>
        <Text style={styles.capturedPiecesText}>
          {state.capturedPieces.w.map((piece, index) => {
            const id = `b${piece}` as keyof typeof PIECES;
            if (PIECES[id]) {
              return (
                <Image
                  key={`b-${index}`}
                  source={PIECES[id]}
                  style={styles.pieces}
                  resizeMode="contain"
                />
              );
            }
            return null;
          })}
        </Text>
      </View>
    </View>
  );
};

export default Board;
