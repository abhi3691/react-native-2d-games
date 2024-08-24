import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import CaromBordImg from '../../assets/carrom.png';

const CaromGame = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bgBox}>
        <Image
          source={CaromBordImg}
          style={styles.carromStyle}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default CaromGame;
