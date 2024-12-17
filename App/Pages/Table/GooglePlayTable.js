import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GooglePlayTable() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.logoSection}>
          <Image
            source={require('./../../Images/logo-search-grid-1x.png')}
            style={styles.logo}
          />
          <Text style={styles.pageName}>Google Play遊戲目錄</Text>
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('./../../Images/home-icon.png')}
              style={styles.homeIcon}
            />
            <Text style={styles.homeText}>返回首頁</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.horizontalMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game_table')}>
          <Text style={styles.menuText}>遊戲目錄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Game_library')}>
          <Text style={styles.menuText}>我的遊戲庫</Text>
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

      {/* 新增按鈕區域 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.storeButton}
          onPress={() => navigation.navigate('GooglePlayTable')}  // 導向 GooglePlayTable.js
        >
          <Text style={styles.buttonText}>Google Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.storeButton}
          onPress={() => navigation.navigate('AppStoreTable')}  // 導向 AppStoreTable.js
        >
          <Text style={styles.buttonText}>App Store</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.storeButton}
          onPress={() => navigation.navigate('SteamTable')}  // 導向 SteamTable.js
        >
          <Text style={styles.buttonText}>Steam</Text>
        </TouchableOpacity>
      </View>

      {/* 使用 ScrollView 包裹內容，讓內容可以滾動 */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.contentText}>這裡是遊戲目錄內容。</Text>
        {/* 你可以在這裡添加更多遊戲目錄項目 */}
        <Text style={styles.contentText}>遊戲項目 1</Text>
        <Text style={styles.contentText}>遊戲項目 2</Text>
        <Text style={styles.contentText}>遊戲項目 3</Text>
        <Text style={styles.contentText}>遊戲項目 4</Text>
        <Text style={styles.contentText}>遊戲項目 5</Text>
        {/* 根據需要添加更多內容 */}
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
    paddingVertical: 15,
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
  pageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
  content: {
    padding: 10,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5, // 每個項目之間有間距
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
  // 新增按鈕區域樣式
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,  // 按鈕區域間距
  },
  storeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
