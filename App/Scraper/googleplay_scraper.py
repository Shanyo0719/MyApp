import requests
from bs4 import BeautifulSoup
import pandas as pd

# 設定 Google Play 遊戲排行榜的 URL
url = "https://play.google.com/store/apps/category/GAME/collection/topselling_free"

# 發送 GET 請求到該頁面
response = requests.get(url)
response.raise_for_status()  # 檢查是否請求成功

# 解析 HTML 內容
soup = BeautifulSoup(response.text, "html.parser")

# 找到所有遊戲的卡片
games = soup.find_all("div", class_="Vpfmgd")

# 提取每個遊戲的信息
game_list = []
count = 0
for game in games:
    if count >= 200:
        break  # 停止抓取，已經達到200筆
    title = game.find("div", class_="WsMG1c").text if game.find("div", class_="WsMG1c") else "N/A"
    price = game.find("span", class_="VfPpfd").text if game.find("span", class_="VfPpfd") else "Free"
    rank = game.find("span", class_="HzXbKc").text if game.find("span", class_="HzXbKc") else "N/A"
    
    game_list.append({
        "Title": title,
        "Price": price,
        "Rank": rank
    })
    count += 1

# 使用 pandas 將結果保存為 CSV 文件到指定路徑
file_path = r"D:\資料庫app遊戲開發\MyApp\App\Scraper\data\google_play_top_200_games.csv"
df = pd.DataFrame(game_list)
df.to_csv(file_path, index=False)

# 打印出前幾條結果
print(df.head())
