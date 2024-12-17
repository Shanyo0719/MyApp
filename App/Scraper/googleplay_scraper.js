const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true }); // 開啟無頭模式
  const page = await browser.newPage();

  // 設定 Google Play 排行榜的 URL
  const url = 'https://play.google.com/store/apps/collection/topselling_free';
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // 等待網頁內容載入完成
  await page.waitForSelector('.Vpfmgd');

  // 抓取遊戲資料，最多抓取 200 名
  const gamesData = await page.evaluate(() => {
    const games = [];
    const gameElements = document.querySelectorAll('.Vpfmgd');

    // 限制抓取前 200 名遊戲
    gameElements.forEach((game, index) => {
      if (index < 200) {
        const title = game.querySelector('.WsMG1c') ? game.querySelector('.WsMG1c').innerText : null;
        const logo = game.querySelector('img') ? game.querySelector('img').src : null;
        const url = game.querySelector('a') ? 'https://play.google.com' + game.querySelector('a').href : null;
        const price = game.querySelector('.VfPpfd') ? game.querySelector('.VfPpfd').innerText : 'Free';
        const rank = game.querySelector('.BVG0Nb') ? game.querySelector('.BVG0Nb').innerText : null;
        const category = game.querySelector('.HrD2sd') ? game.querySelector('.HrD2sd').innerText : null;
        const rating = game.querySelector('.pf5lIe span') ? game.querySelector('.pf5lIe span').getAttribute('aria-label') : 'No rating';
        const releaseDate = game.querySelector('.Lbe1xf') ? game.querySelector('.Lbe1xf').innerText : 'Unknown';

        if (title) {
          games.push({
            title,
            logo,
            url,
            price,
            rank,
            category,
            rating,
            releaseDate
          });
        }
      }
    });

    return games;
  });

  // 儲存資料
  const outputFile = 'D:/資料庫app遊戲開發/MyApp/App/Scraper/data/googleplay_top_games.js';
  const fileContent = `const topGames = ${JSON.stringify(gamesData, null, 4)};`;

  fs.writeFileSync(outputFile, fileContent, 'utf8');
  console.log('爬蟲資料已儲存至 ' + outputFile);

  // 關閉瀏覽器
  await browser.close();
})();
