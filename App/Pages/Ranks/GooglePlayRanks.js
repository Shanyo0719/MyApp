import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function GooglePlayRanks() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Google Play 遊戲排行榜</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.contentText}>這裡是 Google Play 排行榜內容。</Text>
        {/* 你可以在這裡添加更多遊戲項目 */}
        <Text style={styles.contentText}>遊戲項目 1</Text>
        <Text style={styles.contentText}>遊戲項目 2</Text>
        <Text style={styles.contentText}>遊戲項目 3</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
