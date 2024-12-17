import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Game_news() {
  const navigation = useNavigation();
  const [news, setNews] = useState([]); // 用來存放遊戲新聞
  const [loading, setLoading] = useState(false); // 用來顯示載入中的狀態
  const [page, setPage] = useState(1); // 記錄當前頁數

  // 使用 useEffect 在組件加載時發送請求
  useEffect(() => {
    fetchGameNews(); // 初次加載時獲取新聞
  }, []); // 當組件首次渲染時發送請求

  // 重新獲取新聞，會根據 page 參數獲取不同頁數的新聞
  const fetchGameNews = async () => {
    setLoading(true); // 開始載入
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'game OR "video game" OR eSports', // 查詢與遊戲相關的關鍵字
          apiKey: '59fa1a9d4ca642b59da11e84646c860f', // 使用您的 NewsAPI 密鑰
          pageSize: 5, // 顯示每頁 5 條新聞
          page: page, // 根據當前頁數獲取新聞
          language: 'zh', // 獲取中文新聞
          timestamp: new Date().getTime(), // 每次刷新加上當前的時間戳來強制刷新
        },
      });

      // 更新狀態以顯示新聞，並增加頁數
      setNews(response.data.articles); 
      setPage(prevPage => prevPage + 1); // 點擊刷新時，將頁數加 1
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false); // 載入完成
    }
  };

  // 處理閱讀更多，開啟外部網頁
  const handleReadMore = (url) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.logoSection}>
          {/* 標題和Logo */}
          <Image
            source={require('./../Images/logo-search-grid-1x.png')}
            style={styles.logo}
          />
          <Text style={styles.pageName}>遊戲新聞</Text>
        </View>

        <View style={styles.rightSection}>
          {/* 刷新按鈕 */}
          <TouchableOpacity onPress={fetchGameNews} style={styles.refreshButton}>
            <Image
              source={require('./../Images/refresh-icon.png')}
              style={styles.refreshIcon}
            />
          </TouchableOpacity>

          {/* 返回首頁按鈕 */}
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('./../Images/home-icon.png')}
              style={styles.homeIcon}
            />
            <Text style={styles.homeText}>返回首頁</Text>
          </TouchableOpacity>
        </View>
      </View>

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

      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <Text style={styles.contentText}>正在載入新聞...</Text> // 顯示載入中的文字
        ) : news.length > 0 ? (
          news.map((item, index) => (
            <View key={index} style={styles.newsItem}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
              <TouchableOpacity onPress={() => handleReadMore(item.url)}>
                <Text style={styles.readMore}>閱讀更多</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.contentText}>沒有找到新聞資料</Text> // 顯示沒有找到新聞的情況
        )}
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
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshButton: {
    marginRight: 10, // 設置刷新符號和返回首頁之間的間距
  },
  refreshIcon: {
    width: 20,
    height: 20,
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
    marginVertical: 5,
  },
  newsItem: {
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  readMore: {
    fontSize: 16,
    color: '#007BFF',
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
});
