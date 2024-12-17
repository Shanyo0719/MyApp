import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './App/Pages/Login';
import Sign from './App/Pages/Sign';
import Home from './App/Pages/Home';
import Game_table from './App/Pages/Game_table';
import Game_library from './App/Pages/Game_library';
import Ranks from './App/Pages/Ranks';
import Game_live from './App/Pages/Game_live';
import Game_news from './App/Pages/Game_news';
// 目錄的導入
import GooglePlayTable from './App/Pages/Table/GooglePlayTable';
import AppStoreTable from './App/Pages/Table/AppStoreTable';
import SteamTable from './App/Pages/Table/SteamTable'; 
// 排行榜的導入
import GooglePlayRanks from './App/Pages/Ranks/GooglePlayRanks';
import AppStoreRanks from './App/Pages/Ranks/AppStoreRanks';
import SteamRanks from './App/Pages/Ranks/SteamRanks'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game_table" component={Game_table} />
        <Stack.Screen name="Game_library" component={Game_library} />
        <Stack.Screen name="Ranks" component={Ranks} />
        <Stack.Screen name="Game_live" component={Game_live} />
        <Stack.Screen name="Game_news" component={Game_news} />
        {/* 新增 Table 頁面 */}
        <Stack.Screen name="GooglePlayTable" component={GooglePlayTable} />
        <Stack.Screen name="AppStoreTable" component={AppStoreTable} />
        <Stack.Screen name="SteamTable" component={SteamTable} />
        {/* 新增 Ranks 頁面 */}
        <Stack.Screen name="GooglePlayRanks" component={GooglePlayRanks} />
        <Stack.Screen name="AppStoreRanks" component={AppStoreRanks} />
        <Stack.Screen name="SteamRanks" component={SteamRanks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};