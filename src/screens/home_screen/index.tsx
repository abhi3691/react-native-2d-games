import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import styles from './styles';
import SingleItem, {SingleItemProps} from './molecules/singleItem';

const HomeScreen = () => {
  const data: SingleItemProps['item'][] = [
    {
      name: 'TicTac',
      screen: 'TicTic',
    },
    {
      name: 'Sudoku',
      screen: 'Sudoku',
    },
    {
      name: 'Carams',
      screen: 'Carams',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>List of Games</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <SingleItem item={item} index={index} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
