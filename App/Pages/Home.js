import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 頂部導航列 */}
      <View style={styles.navBar}>
        <View style={styles.logoSection}>
          <Image
            source={require('./../Images/logo-search-grid-1x.png')} // 替換為您的 LOGO 圖片
            style={styles.logo}
          />
          <Text style={styles.logoText}>遊戲評分APP</Text>

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

      <View style={styles.tableSelector}>
        <TouchableOpacity style={styles.additionalButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>登出</Text>
        </TouchableOpacity>
      </View>

      {/* 使用 ScrollView 包裹內容，讓內容可以滾動 */}
      <ScrollView contentContainerStyle={styles.content}>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderBottomWidth: 1, // 控制底部線的粗細
    borderBottomColor: '#ddd', // 控制底部線的顏色
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
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
    width: 150,
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  horizontalMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#007BFF',
  },
  menuItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 10,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5, // 每個項目之間有間距
  },
  tableSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  additionalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    marginTop: 10,  // 增加向下的間距
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
