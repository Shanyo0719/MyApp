import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'; // 引入下拉選單

export default function SteamTable() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false); // 控制下拉選單開關
  const [value, setValue] = useState('熱門'); // 當前選中的類別
  const [items, setItems] = useState([
    { label: '熱門', value: '熱門' },
    { label: '更新日期新到舊', value: '更新日期新到舊' },
    { label: '更新日期舊到新', value: '更新日期舊到新' },
    { label: '價格高到低', value: '價格高到低' },
    { label: '價格低到高', value: '價格低到高' },
  ]);

  // 按鈕的分類名稱
  const categories = [
    '休閒', '冒險', '動作', '大型多人', '模擬',
    '獨立', '競速', '策略', '角色扮演', '運動'
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.logoSection}>
          <Image
            source={require('./../../Images/logo-search-grid-1x.png')}
            style={styles.logo}
          />
          <Text style={styles.pageName}>Steam遊戲目錄</Text>
        </View>
        <View style={styles.rightSection}>
          {/* 新增下拉式選單 */}
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="選擇排序方式"
              containerStyle={styles.dropdown}
              style={styles.dropdownStyle}
              dropDownStyle={styles.dropdownList}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('./../../Images/home-icon.png')}
              style={styles.homeIcon}
            />
            <Text style={styles.homeText}>返回首頁</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 原本的導航區域 */}
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

      {/* 新增分類按鈕區域 */}
      <View style={styles.buttonRowTop}>
        {categories.slice(0, 5).map((category, index) => (
          <TouchableOpacity key={index} style={styles.storeButton}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonRow}>
        {categories.slice(5, 10).map((category, index) => (
          <TouchableOpacity key={index} style={styles.storeButton}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 使用 ScrollView 包裹內容，讓內容可以滾動 */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.contentText}>這裡是遊戲目錄內容。</Text>
        {/* 這裡可以加入更多遊戲項目 */}
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
  // 水平排列按鈕區域
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
  // 水平排列新分類按鈕區域
  buttonRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1, // 控制「休閒」行和「遊戲目錄」間的間距
    marginTop: 10, // 控制整體區域下移
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // 控制「休閒」和「獨立」之間的間距
    marginTop: 10, // 控制整體區域下移
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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
  // 新增下拉選單樣式
  dropdownContainer: {
    marginRight: 10, // 增加右邊距離，使圖標和下拉選單有空間
  },
  dropdown: {
    width: 150,
    marginTop: 5,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
    borderColor: '#ccc',
  },
  dropdownList: {
    backgroundColor: '#fafafa',
    zIndex: 3000,
  },
});
