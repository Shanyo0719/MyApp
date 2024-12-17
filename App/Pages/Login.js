import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../API'; // 匯入 API 方法

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  // 處理登入按鈕邏輯
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('提示', '請輸入帳號和密碼');
      return;
    }

    try {
      const response = await loginUser({ username, password }); // 呼叫登入 API
      console.log('登入成功:', response);

      if (response.message === 'Login successful') {
        Alert.alert('登入成功', `歡迎回來, ${response.user.username}!`);
        // 假設登入成功後跳轉到 Home 頁面
        navigation.navigate('Home');
      } else {
        Alert.alert('登入失敗', response.message);
      }
    } catch (error) {
      console.error('登入錯誤:', error.message);
      Alert.alert('登入失敗', '伺服器錯誤，請稍後再試');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* 藍色背景區塊 */}
      <View style={styles.navBar}></View>

      {/* 主要內容區 */}
      <View style={styles.container}>
        <Text style={styles.title}>歡迎來到遊戲評分APP</Text>

        <Text style={styles.words}>帳號</Text>
        <TextInput
          style={styles.input}
          placeholder="輸入帳號"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.words}>密碼</Text>
        <TextInput
          style={styles.input}
          placeholder="輸入密碼"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>登入</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sign')}
        >
          <Text style={styles.buttonText}>前往註冊</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff', // 保持白色背景
  },
  navBar: {
    width: '100%', // 寬度為整個螢幕
    height: 60, // 固定高度
    backgroundColor: '#007BFF', // 藍色背景
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -10, // 緊貼藍色背景
    marginBottom: 20,
    textAlign: 'center',
  },
  words: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
  },
  input: {
    textAlign: 'center',
    width: 400,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#007BFF',
    borderWidth: 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
