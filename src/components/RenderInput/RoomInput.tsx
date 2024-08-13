import {View, TextInput, Button} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';

interface props {
  roomId: string;
  joinRoom: () => void;
  onChangeRoomId: (value: string) => void;
}

const RoomInput: FC<props> = ({roomId, joinRoom, onChangeRoomId}) => {
  return (
    <View style={styles.roomContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter Room ID"
        value={roomId}
        onChangeText={onChangeRoomId}
      />
      <Button title="Join Room" onPress={joinRoom} />
    </View>
  );
};

export default RoomInput;
