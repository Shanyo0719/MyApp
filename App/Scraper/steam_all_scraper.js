const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 爬取 Steam 熱門遊戲排行榜
async function fetchSteamTopGames() {
    const browser = await puppeteer.launch({ headless: true }); // 設為 false 可進行手動調試
    const page = await browser.newPage();

    console.log('Navigating to Steam Top Sellers page...');
    const url = 'https://store.steampowered.com/search/?filter=topsellers';
    let allGames = [];
    let pageNumber = 1;
    let currentRank = 1; // 排名從 1 開始

    while (allGames.length < 20000) {
        console.log(`Fetching page ${pageNumber}...`);
        await page.goto(`${url}&page=${pageNumber}`, { waitUntil: 'networkidle2' });

        console.log('Extracting game data...');
        const games = await page.evaluate((currentRank) => {
            const gameElements = document.querySelectorAll('.search_result_row'); // 遊戲卡片
            const games = [];

            gameElements.forEach((game) => {
                try {
                    const title = game.querySelector('.title')?.innerText || 'Unknown Title'; // 遊戲名稱
                    const url = game.href || ''; // 遊戲詳情頁面 URL
                    const logo = game.querySelector('img')?.src || ''; // 遊戲圖片
                    const price = game.querySelector('.search_price')?.innerText.trim() || 'Free'; // 價格
                    const rating = game.querySelector('.search_review_summary')?.getAttribute('data-tooltip') || 'No Rating'; // 評分
                    const genres = Array.from(game.querySelectorAll('.search_tags a')).map(tag => tag.innerText); // 遊戲類別
                    const releaseDate = game.querySelector('.search_released')?.innerText || 'Unknown Release Date'; // 上市時間

                    games.push({
                        title,
                        url,
                        logo,
                        price,
                        rank: currentRank++, 
                        rating,
                        genres, // 新增遊戲類別
                        releaseDate
                    });
                } catch (error) {
                    console.error('Error processing a game element:', error);
                }
            });

            return games;
        }, currentRank);

        // 更新排名
        currentRank += games.length;

        // 累積抓取到的遊戲
        allGames = allGames.concat(games);
        console.log(`Fetched ${games.length} games from page ${pageNumber}. Total: ${allGames.length} games.`);

        pageNumber++;
        if (games.length === 0) break; // 如果某頁沒有遊戲，停止抓取
    }

    console.log(`Extracted ${allGames.length} games.`);
    await browser.close();
    return allGames.slice(0, 20000); // 確保返回的遊戲數量最多 200 筆
}

// 儲存資料為 JS 檔案
async function saveGamesToJs(games, filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const fileContent = `module.exports = ${JSON.stringify(games, null, 4)};`;

    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`Data has been saved to ${filePath}`);
}

// 主函數
(async () => {
    const outputPath = 'D:\\資料庫app遊戲開發\\MyApp\\App\\Scraper\\data\\steam_all_games.js';

    console.log('Fetching Steam top games...');
    const games = await fetchSteamTopGames();

    if (games.length > 0) {
        console.log(`Fetched ${games.length} games.`);
        await saveGamesToJs(games, outputPath);
    } else {
        console.log('No games found.');
    }
})();
