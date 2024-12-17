import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFromTable } from '../../API'; // 從 API.js 引入方法

export default function Game_library() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); // 信箱輸入框的狀態
  const [userData, setUserData] = useState(null); // 符合的用戶資料
  const [loading, setLoading] = useState(false); // 加載狀態
  const [showPassword, setShowPassword] = useState(false); // 密碼顯示控制

  // 查詢用戶資料
  const handleSearch = async () => {
    if (!email) {
      Alert.alert('提示', '請輸入信箱'); // 警告用戶未輸入信箱
      return;
    }

    setLoading(true); // 開啟加載狀態
    try {
      const data = await getDataFromTable('user'); // 從 API 獲取 user 表所有資料
      const user = data.find((item) => item.address === email); // 查詢符合信箱的資料

      if (user) {
        setUserData(user); // 保存查詢到的用戶資料
      } else {
        setUserData(null); // 查無資料
        Alert.alert('提示', '查無符合的用戶資料');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      Alert.alert('錯誤', '伺服器發生錯誤，請稍後再試');
    } finally {
      setLoading(false); // 關閉加載狀態
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* 頂部導航列 */}
        <View style={styles.navBar}>
          <View style={styles.logoSection}>
            <Image
              source={require('./../Images/logo-search-grid-1x.png')}
              style={styles.logo}
            />
            <Text style={styles.pageName}>我的資料</Text>
          </View>
          <View style={styles.rightSection}>
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
              <Image
                source={require('./../Images/home-icon.png')}
                style={styles.homeIcon}
              />
              <Text style={styles.homeText}>返回首頁</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 水平選單 */}
        <View style={styles.horizontalMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game_table')}>
            <Text style={styles.menuText}>遊戲推薦</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game_library')}>
            <Text style={styles.menuText}>我的資料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Ranks')}>
            <Text style={styles.menuText}>遊戲排行榜</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game_live')}>
            <Text style={styles.menuText}>遊戲直播</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game_news')}>
            <Text style={styles.menuText}>遊戲新聞</Text>
          </TouchableOpacity>
        </View>

        {/* 信箱輸入區域 */}
        <View style={styles.searchSection}>
          <Text style={styles.label}>請輸入信箱</Text>
          <TextInput
            style={styles.input}
            placeholder="example@mail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>查詢</Text>
          </TouchableOpacity>
        </View>

        {/* 加載中顯示 */}
        {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />}

        {/* 顯示用戶資料 */}
        {userData && (
          <View style={styles.userCard}>
            <Text style={styles.userInfo}>ID: {userData.id}</Text>
            <Text style={styles.userInfo}>地址: {userData.address}</Text>
            <Text style={styles.userInfo}>用戶名: {userData.username}</Text>
            <Text style={styles.userInfo}>
              密碼: {showPassword ? userData.password : '****'}
            </Text>
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? '隱藏' : '顯示'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.userInfo}>
              註冊日期: {new Date(userData.date).toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#007BFF',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  pageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  homeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  horizontalMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#007BFF',
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchSection: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 10,
  },
  userCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    elevation: 3,
  },
  userInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  showPasswordButton: {
    marginTop: 5,
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  showPasswordText: {
    color: '#fff',
    fontSize: 14,
  },
});
