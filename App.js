// App.js
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TimelineProvider, useTimelineActions } from './TimelineEnvironment';
import { AppNavigation } from './AppNavigation';

const AppContent = () => {
  const { setWitts, setIsLoading } = useTimelineActions();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockWitts = [
        { id: '1', author: 'User1', content: 'Hello, Wittier!', likes: 5 },
        { id: '2', author: 'User2', content: 'React Native is awesome!', likes: 10 },
        { id: '3', author: 'User3', content: 'Enjoying the sunshine!', likes: 7 },
      ];
      setWitts(mockWitts);
      setIsLoading(false);
    };

    fetchData();
  }, [setWitts, setIsLoading]);

  return <AppNavigation />;
};

const App = () => (
  <SafeAreaView style={styles.container}>
    <TimelineProvider>
      <AppContent />
    </TimelineProvider>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;