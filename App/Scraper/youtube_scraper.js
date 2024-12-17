const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 前往 vidIQ 頻道排名頁面
  console.log('Navigating to vidIQ Top Channels page...');
  await page.goto('https://vidiq.com/youtube-stats/top/category/gaming/', { waitUntil: 'domcontentloaded' });

  // 等待頁面加載完成
  console.log('Waiting for data to load...');
  await page.waitForSelector('.flex.w-full.items-center.gap-4');  // 確保這是正確的選擇器

  let allChannels = [];
  let currentRank = 1; // 排名從1開始
  let prevHeight = await page.evaluate('document.body.scrollHeight');

  // 滾動並抓取資料，直到抓取到500個頻道
  while (allChannels.length < 500) {
    // 等待並抓取資料
    console.log(`Extracting channels, total fetched: ${allChannels.length}`);
    const channelsData = await page.evaluate((currentRank) => {
      const channels = [];
      const rows = document.querySelectorAll('.flex.w-full.items-center.gap-4');

      rows.forEach((row) => {
        const name = row.querySelectorAll('.text-xs.font-semibold')[0] ? row.querySelectorAll('.text-xs.font-semibold')[0].innerText.trim() : '';
        const videos = row.querySelectorAll('.text-xs.font-semibold')[1] ? row.querySelectorAll('.text-xs.font-semibold')[1].innerText.trim() : '';
        const subscribers = row.querySelectorAll('.text-xs.font-semibold')[2] ? row.querySelectorAll('.text-xs.font-semibold')[2].innerText.trim() : '';
        const views = row.querySelectorAll('.text-xs.font-semibold')[3] ? row.querySelectorAll('.text-xs.font-semibold')[3].innerText.trim() : '';
        const logo = row.querySelector('img') ? row.querySelector('img').src : ''; // 抓取圖片的 src 屬性

        // 處理空值的情況
        if (name && videos && subscribers && views && logo) {
          channels.push({
            rank: currentRank++,  // 排名從1開始，按順序增加
            name,
            videos,
            subscribers,
            views,
            logo, // 儲存 logo URL
            url: `https://www.youtube.com/${name}`  // 根據頻道名稱構造 URL
          });
        }
      });

      return channels;
    }, currentRank);

    // 儲存抓取的資料
    allChannels = allChannels.concat(channelsData);

    // 如果資料還不夠500，則滾動頁面
    if (allChannels.length < 500) {
      console.log("Scrolling down to load more data...");
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      // 等待頁面加載並比較高度，判斷是否達到頁面底部
      const newHeight = await page.evaluate('document.body.scrollHeight');
      if (newHeight === prevHeight) {
        break; // 如果頁面高度未變化，則停止滾動
      }
      prevHeight = newHeight;

      // 等待一些時間確保資料加載完畢
      await page.waitForTimeout(2000);  // 等待2秒鐘以確保資料加載
    }
  }

  console.log(`Extracted ${allChannels.length} channels.`);
  fs.writeFileSync('youtube_channels.js', JSON.stringify(allChannels, null, 2), 'utf-8');
  console.log('Data has been saved to youtube_channels.js');

  await browser.close();
})();
