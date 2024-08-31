import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';
import {PIECES} from '../Piece';

interface capturedPieces {
  w: {color: string; type: string}[];
  b: {color: string; type: string}[];
}

interface props {
  capturedPieces: capturedPieces;
  type: 'w' | 'b';
}
const CapturedPiecesComp = ({capturedPieces, type}: props) => {
  return (
    <View style={styles.capturedPiecesContainer}>
      <ScrollView style={styles.capturedPiecesContainer} horizontal={true}>
        {capturedPieces[type].map((piece, index) => {
          const id2 = `${
            type === 'w' ? 'b' : 'w'
          }${piece}` as keyof typeof PIECES;
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
      </ScrollView>
    </View>
  );
};

export default CapturedPiecesComp;
