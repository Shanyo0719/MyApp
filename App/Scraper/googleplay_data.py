from google_play_scraper import collections
import pandas as pd

# 獲取 Google Play 遊戲排行榜（前200名免費遊戲）
games = collections.top_free_games()

# 提取遊戲的資料
game_list = []
count = 0
for i, game in enumerate(games):
    if count >= 200:
        break  # 停止抓取，已經達到200筆
    title = game['title']
    price = game['price'] if 'price' in game else "Free"
    rank = game['rank'] if 'rank' in game else "N/A"
    
    game_list.append({
        "Title": title,
        "Price": price,
        "Rank": rank
    })
    
    count += 1
    
    # 每爬取25筆給出提示
    if (i + 1) % 25 == 0:
        print(f"已成功抓取 {i + 1} 筆資料...")

# 設定保存路徑
file_path = r"D:\資料庫app遊戲開發\MyApp\App\Scraper\data\google_play_top_200_games.csv"

# 使用 pandas 將結果保存為 CSV 文件
df = pd.DataFrame(game_list)
df.to_csv(file_path, index=False)

# 顯示最後結果的前幾條資料
print(f"\n抓取完成！共抓取 {count} 筆資料。")
print(df.head())
