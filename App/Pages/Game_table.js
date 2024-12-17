import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import steamTopGames from './../Scraper/ranks/steam_top_games'; // 引用 steam_top_games 資料

export default function Game_table() {
  const navigation = useNavigation(); // 用來導航的hook
  const [selectedGame, setSelectedGame] = useState(null);

  // 隨機抽取遊戲
  const handleExtract = () => {
    const randomIndex = Math.floor(Math.random() * steamTopGames.length); // 隨機選擇 0 到 steamTopGames.length-1 的數字
    setSelectedGame(steamTopGames[randomIndex]);
  };

  // 再來一次 - 隨機抽取新的遊戲
  const handleTryAgain = () => {
    handleExtract();
  };

  // 打開遊戲的詳細頁面
  const handleOpenURL = (url) => {
    if (url) {
      Linking.openURL(url).catch(() =>
        Alert.alert('無法打開連結', '請檢查該遊戲的連結是否有效。')
      );
    } else {
      Alert.alert('無效的連結', '該遊戲沒有對應的連結。');
    }
  };

  return (
    <View style={styles.container}>
      {/* 頁面導航 */}
      <View style={styles.navBar}>
        <View style={styles.logoSection}>
          <Image
            source={require('./../Images/logo-search-grid-1x.png')}
            style={styles.logo}
          />
          <Text style={styles.pageName}>遊戲推薦</Text>
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

      {/* 顯示底部菜單 */}
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

      {/* 兩個按鈕：抽取 & 再來一次 */}
      <View style={styles.buttonColumn}>
        <TouchableOpacity
          style={styles.storeButton}
          onPress={handleExtract} // 按下「抽取」按鈕
        >
          <Text style={styles.buttonText}>抽取</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.storeButton}
          onPress={handleTryAgain} // 按下「再來一次」按鈕
        >
          <Text style={styles.buttonText}>再來一次</Text>
        </TouchableOpacity>
      </View>

      {/* 顯示隨機選中的遊戲資料 */}
      {selectedGame && (
        <View style={styles.gameCard}>
          <TouchableOpacity onPress={() => handleOpenURL(selectedGame.url)}>
            <Image source={{ uri: selectedGame.logo }} style={styles.gameLogo} />
          </TouchableOpacity>
          <Text style={styles.gameTitle}>{selectedGame.title}</Text>
          <Text style={styles.gamePrice}>價格: {selectedGame.price}</Text>
          <Text style={styles.gameReleaseDate}>發布日期: {selectedGame.releaseDate}</Text>
          <Text style={styles.gameRank}>排名: {selectedGame.rank}</Text>
          <Text style={styles.gamePlatforms}>平台: {selectedGame.platforms.join(', ')}</Text>
          <Text style={styles.gameReviews}>{selectedGame.reviewsTooltip}</Text>
          <TouchableOpacity onPress={() => handleOpenURL(selectedGame.url)}>
            <Text style={styles.gameLink}>查看遊戲</Text>
          </TouchableOpacity>
        </View>
      )}
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
  buttonColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 20, // 按鈕區域間距
  },
  storeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5, // 上下排列按鈕之間有間距
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameCard: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  gameLogo: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gamePrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  gameReleaseDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  gameRank: {
    fontSize: 16,
    marginBottom: 10,
  },
  gamePlatforms: {
    fontSize: 16,
    marginBottom: 10,
  },
  gameReviews: {
    fontSize: 14,
    marginBottom: 10,
  },
  gameLink: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
