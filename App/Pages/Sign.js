import {View,Text,TextInput,StyleSheet,ScrollView,RefreshControl,TouchableOpacity,Alert,} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../../API';

export default function Sign() {
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await registerUser({ address, username, password });
      if (response.success) {
        Alert.alert('成功', '註冊成功！', [
          { text: '確定', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('成功', response.message || '註冊失敗，請重試');
      }
    } catch (error) {
      Alert.alert('錯誤', '無法連線到伺服器，請稍後再試');
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
      <View style={styles.navBar}></View>

      <View style={styles.container}>
        <Text style={styles.title}>註冊帳號</Text>

        <Text style={styles.words}>信箱</Text>
        <TextInput
          style={styles.input}
          placeholder="輸入信箱"
          value={address}
          onChangeText={setAddress}
        />

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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>註冊</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>返回登入</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { 
    flexGrow: 1, 
    backgroundColor: '#fff' 
  },
  navBar: { 
    width: '100%', 
    height: 60, 
    backgroundColor: '#007BFF' 
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: -10, 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  words: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginVertical: 5 
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
  buttonText: { color: '#007BFF', fontSize: 18, fontWeight: 'bold' },
});
