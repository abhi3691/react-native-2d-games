import {View, Text, TouchableHighlight} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

export interface SingleItemProps {
  item: {
    name: string;
    screen: string;
  };
  index: number;
}

const SingleItem: FC<SingleItemProps> = ({item, index}) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const goTOScreen = () => {
    navigation.navigate(item.screen);
  };
  return (
    <TouchableHighlight style={styles.container} onPress={() => goTOScreen()}>
      <Text>{item.name}</Text>
    </TouchableHighlight>
  );
};

export default SingleItem;
