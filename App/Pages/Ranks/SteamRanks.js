import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import steamTopGames from './../../Scraper/ranks/steam_top_games'; // 引用遊戲數據

export default function SteamRanks() {
  const navigation = useNavigation();

  const handleOpenURL = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => {
        console.error("無法打開該網址: ", err);
      });
    } else {
      console.warn("該遊戲沒有可用的 URL");
    }
  };

  return (
    <View style={styles.container}>
      {/* 頂部導航欄 */}
      <View style={styles.navBar}>
        <View style={styles.logoSection}>
          <Image
            source={require('./../../Images/logo-search-grid-1x.png')}
            style={styles.logo}
          />
          <Text style={styles.pageName}>Steam 遊戲排行榜</Text>
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

      {/* 水平菜單 */}
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

      {/* 額外按鈕區域 */}
      <View style={styles.additionalButtonsRow}>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => navigation.navigate('GooglePlayRanks')}
        >
          <Text style={styles.additionalButtonText}>Google Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => navigation.navigate('AppStoreRanks')}
        >
          <Text style={styles.additionalButtonText}>App Store</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.additionalButton}
          onPress={() => navigation.navigate('SteamRanks')}
        >
          <Text style={[styles.additionalButtonText, styles.selectedButtonText]}>Steam</Text>
        </TouchableOpacity>
      </View>

      {/* 遊戲小卡區域，支持滾動 */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.gameCardsContainer}>
          {steamTopGames.map((game) => (
            <View style={styles.gameCard} key={game.id}>
              {/* 點擊圖片或名稱時，跳轉到遊戲的 URL */}
              <TouchableOpacity onPress={() => handleOpenURL(game.url)} style={styles.cardContent}>
                <Image source={{ uri: game.logo }} style={styles.gameLogo} />
                <View style={styles.gameDetails}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gamePlatform}>平台: {game.platforms.join(', ')}</Text>
                  <Text style={styles.gameReleaseDate}>發行日期: {game.releaseDate}</Text>
                  <Text style={styles.gameReviews}>用戶評論: {game.reviewsTooltip}</Text>
                </View>
              </TouchableOpacity>

              {/* 顯示排名和價格在最右邊 */}
              <View style={styles.rightSectionDetails}>
                <Text style={styles.gameRank}>排名: {game.rank}</Text>
                <Text style={styles.gamePrice}>價格: {game.price}</Text>

                {/* 加號圖片 */}
                <TouchableOpacity style={styles.plusIconContainer}>
                  <Image
                    source={require('./../../Images/plus-icon.png')} // 加號圖片的路徑
                    style={styles.plusIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  gameCardsContainer: {
    flexDirection: 'column',  // 每個小卡換行顯示
    marginTop: 20,
  },
  gameCard: {
    width: '100%',  // 保證每個小卡佔滿一行
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    flexDirection: 'row',  // 橫向排列
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    width: '80%', // 留出空間給右邊的排名和價格
  },
  gameLogo: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  gameDetails: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 5,
  },
  gamePlatform: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  gameReleaseDate: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  gameReviews: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  rightSectionDetails: {
    width: '20%', // 右邊部分占 20% 宽度
    alignItems: 'flex-end',  // 排名和價格顯示在右側
  },
  gameRank: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
    textAlign: 'right',
  },
  gamePrice: {
    fontSize: 14,
    color: '#777',
    textAlign: 'right',
  },
  plusIconContainer: {
    marginTop: 5,  // 確保加號圖片與價格間有間距
    alignItems: 'center',
  },
  plusIcon: {
    width: 20,
    height: 20,
  },
  additionalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  additionalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  additionalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    textDecorationLine: 'underline',
  },
});
