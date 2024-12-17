import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFromTable } from '../../API';  // 引入 getDataFromTable 方法
import DropDownPicker from 'react-native-dropdown-picker';  // 引入下拉選單

export default function Game_live() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false); // 控制下拉選單開關
  const [value, setValue] = useState('1'); // 當前選中的頁碼
  const [items, setItems] = useState([]); // 頁碼項目
  const [liveData, setLiveData] = useState([]); // 用來存放直播資料
  const [filteredData, setFilteredData] = useState([]); // 用來存放當前頁顯示的資料
  const [loading, setLoading] = useState(true); // 控制是否正在加載

  const itemsPerPage = 100; // 每頁顯示100筆資料

  // 加載直播資料
  const fetchLiveData = async () => {
    try {
      const data = await getDataFromTable('twitch_ranks');  // 從 API 獲取 twitch_ranks 資料
      console.log('Fetched live data:', data);  // 輸出資料，確認獲取成功
      setLiveData(data);  // 設定直播資料
      setLoading(false);  // 完成加載

      // 設置頁碼選項
      const pageCount = Math.ceil(data.length / itemsPerPage);
      const pageItems = [];
      for (let i = 1; i <= pageCount; i++) {
        pageItems.push({ label: `第 ${i} 頁`, value: i.toString() });
      }
      setItems(pageItems); // 更新頁碼選項
      setFilteredData(data.slice(0, itemsPerPage)); // 預設顯示第一頁資料
    } catch (error) {
      console.error('Error fetching live data:', error.message);  // 顯示詳細錯誤訊息
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();  // 在組件加載時獲取直播資料
  }, []);

  // 當頁碼變更時，更新顯示的資料
  const handlePageChange = (pageNumber) => {
    const startIdx = (pageNumber - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setFilteredData(liveData.slice(startIdx, endIdx)); // 更新顯示的資料
  };

  // 點擊直播跳轉瀏覽器
  const handleLiveClick = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  // 渲染直播卡片
  const renderLiveCard = ({ item }) => {
    if (!item.name || !item.rank) {
      return null; // 如果資料不完整，則不渲染該項目
    }

    return (
      <TouchableOpacity
        style={styles.liveCard}
        onPress={() => handleLiveClick(`https://www.twitch.tv/${item.name}`)}  // 點擊圖片跳轉到 Twitch 頻道
      >
        <View style={styles.cardContent}>
          <TouchableOpacity onPress={() => handleLiveClick(`https://www.twitch.tv/${item.name}`)}>
            <Image source={require('./../Images/twitch.png')} style={styles.thumbnail} />
          </TouchableOpacity>
          <View style={styles.liveInfoContainer}>
            <View style={styles.liveInfoColumn}>
              <Text style={styles.liveDetails}>排名: {item.rank}</Text>
              <Text style={styles.liveDetails}>名字: {item.name}</Text>
              <Text style={styles.liveDetails}>語言: {item.language}</Text>
              <Text style={styles.liveDetails}>類型: {item.type}</Text>
              <Text style={styles.liveDetails}>最常播放遊戲: {item.most_streamed_game}</Text>
              <Text style={styles.liveDetails}>總追隨者: {item.total_followers}</Text>
            </View>
            <View style={styles.liveInfoColumn}>
              <Text style={styles.liveDetails}>總觀看數: {item.total_views}</Text>
              <Text style={styles.liveDetails}>平均觀看: {item.avg_viewers_per_stream}</Text>
              <Text style={styles.liveDetails}>平均遊戲數: {item.avg_games_per_stream}</Text>
              <Text style={styles.liveDetails}>每週活躍天數: {item.active_days_per_week}</Text>
              <Text style={styles.liveDetails}>每週最常直播日: {item.most_active_day}</Text>
              <Text style={styles.liveDetails}>最多追蹤者增長的日子: {item.day_with_most_followers_gained}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 頂部導航 */}
      <View style={styles.navBar}>
        <View style={styles.logoSection}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.twitch.tv/')}>
            <Image
              source={require('./../Images/logo-search-grid-1x.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
          <Text style={styles.pageName}>遊戲直播</Text>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="選擇頁碼"
              containerStyle={styles.dropdown}
              style={styles.dropdownStyle}
              dropDownStyle={styles.dropdownList}
              zIndex={3000}
              zIndexInverse={1000}
              onChangeValue={(newValue) => {
                handlePageChange(parseInt(newValue, 10)); // 根據選擇的頁碼來更新資料
                setValue(newValue); // 更新選中的頁碼
              }}
            />
          </View>
          <View style={styles.homeButtonContainer}>
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
              <Image
                source={require('./../Images/home-icon.png')}
                style={styles.homeIcon}
              />
              <Text style={styles.homeText}>返回首頁</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 菜單項目 */}
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

      {/* 直播清單 */}
      {loading ? (
        <Text>正在加載直播資料...</Text>
      ) : (
        <FlatList
          data={filteredData} // 顯示當前頁的資料
          renderItem={renderLiveCard}
          keyExtractor={(item) => item.rank.toString()}  // 使用 rank 作為唯一鍵
          numColumns={1}  // 每行一列
          bounces={true}  // 支持滾動彈性
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
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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
  liveCard: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  liveInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  liveInfoColumn: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  liveDetails: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
});
