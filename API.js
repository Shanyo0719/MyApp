import axios from 'axios';

// 設定伺服器的基礎 URL
const BASE_URL = 'http://172.20.10.2:3000/api'; // 請使用正確的伺服器 IP 地址

// 從指定表格獲取資料
export const getDataFromTable = async (tableName) => {
  try {
    console.log(`Requesting data from table: ${tableName}`);
    const response = await axios.get(`${BASE_URL}/${tableName}`);
    return response.data; // 返回伺服器回應的資料
  } catch (error) {
    console.error('Error fetching data from table:', error.message);
    throw error; // 如果出錯，重新拋出錯誤
  }
};

// 提交註冊表單
export const registerUser = async (userData) => {
  try {
    console.log('Registering user with data:', userData);
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data; // 返回伺服器回應
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error; // 如果出錯，重新拋出錯誤
  }
};

// 提交登入表單
export const loginUser = async (userData) => {
  try {
    console.log('Logging in user with data:', userData);
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data; // 返回伺服器回應
  } catch (error) {
    console.error('Error logging in user:', error.message);
    throw error; // 如果出錯，重新拋出錯誤
  }
};
