import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFromTable } from '../../API'; // 引入 getDataFromTable 方法
import DropDownPicker from 'react-native-dropdown-picker'; // 引入下拉選單

export default function Ranks() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false); // 控制下拉選單開關
  const [value, setValue] = useState('1'); // 當前選中的頁碼
  const [items, setItems] = useState([]); // 頁碼項目
  const [liveData, setLiveData] = useState([]); // 用來存放資料
  const [filteredData, setFilteredData] = useState([]); // 用來存放當前頁顯示的資料
  const [loading, setLoading] = useState(true); // 控制是否正在加載
  const [currentTable, setCurrentTable] = useState('steam_game'); // 當前選擇的表格

  const itemsPerPage = 100; // 每頁顯示100筆資料

  // 加載不同資料表的資料
  const fetchLiveData = async (table) => {
    try {
      const data = await getDataFromTable(table); // 根據選擇的表格獲取資料
      console.log('Fetched data:', data); // 輸出資料，確認獲取成功
      setLiveData(data.slice(1)); // 設定資料
      setLoading(false); // 完成加載

      // 設置頁碼選項
      const pageCount = Math.ceil(data.length / itemsPerPage);
      const pageItems = [];
      for (let i = 1; i <= pageCount; i++) {
        pageItems.push({ label: `第 ${i} 頁`, value: i.toString() });
      }
      setItems(pageItems); // 更新頁碼選項
      setFilteredData(data.slice(1, itemsPerPage)); // 預設顯示第一頁資料
    } catch (error) {
      console.error('Error fetching live data:', error.message); // 顯示詳細錯誤訊息
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData(currentTable); // 在組件加載時根據當前選擇的表格獲取資料
  }, [currentTable]);

  // 當頁碼變更時，更新顯示的資料
  const handlePageChange = (pageNumber) => {
    const startIdx = (pageNumber - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setFilteredData(liveData.slice(startIdx, endIdx)); // 更新顯示的資料
  };

  // 點擊連結到相關頁面
  const handleLiveClick = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  // 渲染不同資料表的資料卡片
  const renderCard = ({ item }) => {
    if (!item) return null; // 如果資料不完整，則不渲染該項目

    // 根據選擇的資料表顯示對應的資料
    return (
      <View style={styles.liveCard}>
      {/* 右上角的加號圖片 */}
      <View style={styles.plusIconContainer}>
        <Image source={require('./../Images/plus-icon.png')} style={styles.plusIcon} />
      </View>

      {/* 根據選擇的資料表顯示不同的資料 */}
      {currentTable === 'steam_game' && (
        <View style={styles.cardContent}>
          <Image source={{ uri: item.header_image }} style={styles.gameImage} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>遊戲ID: {item.app_id}</Text>
            <Text style={styles.cardText}>名稱: {item.name}</Text>
            <Text style={styles.cardText}>價格: {item.price}</Text>
            <Text style={styles.cardText}>支持語言: {item.supported_languages}</Text>
            <Text style={styles.cardText}>支援郵箱: {item.support_email}</Text>
            <Text style={styles.cardText}>遊戲類型: {item.categories}</Text>
            <Text style={styles.cardText}>類型: {item.genres}</Text>
            <Text style={styles.cardText}>影片: <Text onPress={() => handleLiveClick(item.movies)} style={styles.linkText}>觀看</Text></Text>
          </View>
        </View>
      )}

      {currentTable === 'ps_game' && (
        <View style={styles.cardContent}>
          <TouchableOpacity onPress={() => handleLiveClick(item.url)}>
            <Image source={require('./../Images/steam.png')} style={styles.platformImage} />
          </TouchableOpacity>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>遊戲名稱: {item.title}</Text>
            <Text style={styles.cardText}>平台: {item.platforms}</Text>
            <Text style={styles.cardText}>評分: {item.rating}</Text>
            <Text style={styles.cardText}>票數: {item.votes}</Text>
            <Text style={styles.cardText}>開發者: {item.developer}</Text>
            <Text style={styles.cardText}>發售日期: {item.release_date}</Text>
            <Text style={styles.cardText}>價格: {item.price}</Text>
            <Text style={styles.cardText}>類型: {item.genres}</Text>
          </View>
        </View>
      )}

      {currentTable === 'switch_game' && (
        <View style={styles.cardContent}>
          <Image source={require('./../Images/switch.png')} style={styles.platformImage} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>遊戲名稱: {item.title}</Text>
            <Text style={styles.cardText}>類型: {item.genre}</Text>
            <Text style={styles.cardText}>Metascore: {item.metascore}</Text>
            <Text style={styles.cardText}>評論人數: {item.num_critics}</Text>
            <Text style={styles.cardText}>用戶分數: {item.user_score}</Text>
            <Text style={styles.cardText}>用戶人數: {item.num_users}</Text>
            <Text style={styles.cardText}>開發者: {item.developer}</Text>
            <Text style={styles.cardText}>發行商: {item.publisher}</Text>
          </View>
        </View>
      )}

      {currentTable === 'video_game' && (
        <View style={styles.cardContent}>
          <Image source={require('./../Images/video.png')} style={styles.platformImage} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>遊戲名稱: {item.game_title}</Text>
            <Text style={styles.cardText}>用戶評分: {item.user_rating}</Text>
            <Text style={styles.cardText}>目標年齡: {item.age_group_targeted}</Text>
            <Text style={styles.cardText}>價格: {item.price}</Text>
            <Text style={styles.cardText}>平台: {item.platform}</Text>
            <Text style={styles.cardText}>是否需要特殊設備: {item.requires_special_device}</Text>
            <Text style={styles.cardText}>開發者: {item.developer}</Text>
            <Text style={styles.cardText}>發行商: {item.publisher}</Text>
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>發行年份: {item.release_year}</Text>
            <Text style={styles.cardText}>類型: {item.genre}</Text>
            <Text style={styles.cardText}>多人遊戲: {item.multiplayer}</Text>
            <Text style={styles.cardText}>遊戲時長: {item.game_length_hours} 小時</Text>
            <Text style={styles.cardText}>圖像品質: {item.graphics_quality}</Text>
            <Text style={styles.cardText}>音樂品質: {item.soundtrack_quality}</Text>
            <Text style={styles.cardText}>劇情品質: {item.story_quality}</Text>
            <Text style={styles.cardText}>用戶評論: {item.user_review_text}</Text>
            <Text style={styles.cardText}>遊戲模式: {item.game_mode}</Text>
            <Text style={styles.cardText}>最少玩家數: {item.min_number_of_players}</Text>
          </View>
        </View>
      )}
    </View>
    );
  };

  // 根據不同的平台切換資料表
  const handlePlatformButtonPress = (table) => {
    setCurrentTable(table); // 設定當前資料表
    setValue('1'); // 重設頁碼為第一頁
  };

  return (
    <View style={styles.container}>
      {/* 頂部導航欄 */}
      <View style={styles.navBar}>
        <View style={styles.logoSection}>
          <Image
            source={require('./../Images/logo-search-grid-1x.png')}
            style={styles.logo}
          />
          <Text style={styles.pageName}>遊戲排行榜</Text>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.dropdownContainer}></View>
        {/* 分頁 */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={styles.dropdownContainer}
          onChangeValue={handlePageChange}
        />


          <View style={styles.homeButtonContainer}></View>
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('./../Images/home-icon.png')}
              style={styles.homeIcon}
            />
            <Text style={styles.homeText}>返回首頁</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 保留原有的功能菜單 */}
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

      {/* 切換表格的按鈕 */}
      <View style={styles.tableSelector}>
        <TouchableOpacity style={styles.additionalButton} onPress={() => handlePlatformButtonPress('steam_game')}>
          <Text style={styles.buttonText}>Steam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.additionalButton} onPress={() => handlePlatformButtonPress('ps_game')}>
          <Text style={styles.buttonText}>PS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.additionalButton} onPress={() => handlePlatformButtonPress('switch_game')}>
          <Text style={styles.buttonText}>Switch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.additionalButton} onPress={() => handlePlatformButtonPress('video_game')}>
          <Text style={styles.buttonText}>Other</Text>
        </TouchableOpacity>
      </View>

      {/* 渲染遊戲資料 */}
      {loading ? (
        <Text>加載中...</Text>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
        />
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
  homeButtonContainer: {
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
  tableSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 8,
  },
  liveCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    position: 'relative',
  },
  linkText: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    height: 40,
    width: 120,
    marginTop: 16,
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
  plusIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  plusIcon: {
    width: 20,
    height: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  gameImage: {
    width: 120,
    height: 120,
    marginRight: 16,
  },
  platformImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  cardTextContainer: {
    flex: 1,
  },
});
