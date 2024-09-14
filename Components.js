// Components.js
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTimeline, useTimelineActions } from './TimelineEnvironment';

const Witt = React.memo(({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.wittContainer}>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.likes}>Likes: {item.likes || 0}</Text>
    </View>
  </TouchableOpacity>
));

export const Timeline = () => {
  const { witts, isLoading } = useTimeline();
  const navigation = useNavigation();

  const renderItem = useCallback(({ item }) => (
    <Witt 
      item={item} 
      onPress={() => navigation.navigate('WittDetail', { wittId: item.id })}
    />
  ), [navigation]);

  return (
    <FlatList
      data={witts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListFooterComponent={isLoading ? <Text>Loading...</Text> : null}
    />
  );
};

export const WittDetail = ({ route }) => {
  const { wittId } = route.params;
  const { witts, likeWitt } = useTimeline();
  const witt = witts.find(w => w.id === wittId);

  if (!witt) return <Text>Witt not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.author}>{witt.author}</Text>
      <Text style={styles.content}>{witt.content}</Text>
      <Text style={styles.likes}>Likes: {witt.likes || 0}</Text>
      <TouchableOpacity style={styles.likeButton} onPress={() => likeWitt(witt.id)}>
        <Text style={styles.likeButtonText}>Like</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wittContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  container: {
    padding: 20,
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
  likes: {
    marginTop: 10,
    color: '#888',
  },
  likeButton: {
    marginTop: 20,
    backgroundColor: '#1DA1F2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  likeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});