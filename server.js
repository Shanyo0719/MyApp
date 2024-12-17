const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // 用於解析請求體
const app = express();
const port = 3000;

// 設定 CORS 允許來自不同設備的請求
app.use(cors());
app.use(bodyParser.json()); // 支援 JSON 格式
app.use(bodyParser.urlencoded({ extended: true })); // 支援 URL 編碼格式

// 設定 MySQL 連接
const db = mysql.createConnection({
  host: 'localhost',  // 若資料庫在本機
  user: 'root',  // 替換為你的資料庫使用者名稱
  password: 'yoyo920719',  // 替換為你的資料庫密碼
  database: 'game_mysql',  // 你的資料庫名稱
});

// 連接到資料庫
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// ** API 路由定義 **
// 查詢各表的通用函數
const fetchTableData = (tableName) => (req, res) => {
  const query = `SELECT * FROM ${tableName}`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(`Error fetching data from ${tableName}:`, err);
      res.status(500).send(`Error fetching data from ${tableName}`);
    } else {
      console.log(`Data fetched from ${tableName}:`, results); // 加入日誌來追蹤
      res.json(results);
    }
  });
};

// 各表的 API 路由
app.get('/api/twitch_ranks', fetchTableData('twitch_ranks'));
app.get('/api/ps_game', fetchTableData('ps_game'));
app.get('/api/steam_game', fetchTableData('steam_game'));
app.get('/api/switch_game', fetchTableData('switch_game'));
app.get('/api/user', fetchTableData('user'));
app.get('/api/video_game', fetchTableData('video_game'));

// ** 註冊 API 路由 **
app.post('/api/register', (req, res) => {
  const { address, username, password } = req.body;

  // 檢查資料是否完整
  if (!address || !username || !password) {
    return res.status(400).json({ message: 'Please provide address, username, and password.' });
  }

  // 插入新用戶資料
  const query = 'INSERT INTO user (address, username, password) VALUES (?, ?, ?)';
  db.query(query, [address, username, password], (err, results) => {
    if (err) {
      console.error('Error inserting data into user table:', err);
      return res.status(500).json({ message: 'Registration failed' });
    }

    res.status(200).json({ message: 'Registration successful' });
  });
});

// ** 登入 API 路由 **
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // 檢查資料是否完整
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password.' });
  }

  // 查詢用戶資料
  const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying user table:', err);
      return res.status(500).json({ message: 'Login failed' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

// ** 啟動服務器，綁定至所有網絡接口 **
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://172.20.10.2:${port}/`);
});
