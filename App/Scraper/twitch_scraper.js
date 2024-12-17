const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 爬取 YouTube 遊戲相關 YouTuber 頻道排行榜
async function fetchYouTubeChannels() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to YouTube gaming channels...');
    const url = 'https://www.youtube.com/results?search_query=gaming&sp=CAMSAhAC'; // 遊戲相關頻道
    await page.goto(url, { waitUntil: 'networkidle2' });

    console.log('Scrolling through the page to load more channels...');
    for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await page.waitForTimeout(1000); // 等待 1 秒以加載更多內容
    }

    console.log('Extracting channel data...');
    const channels = await page.evaluate(() => {
        const channelElements = document.querySelectorAll('ytd-channel-renderer');
        const channels = [];

        channelElements.forEach((channelElement) => {
            try {
                const name = channelElement.querySelector('#channel-title')?.innerText || 'Unknown Channel';
                const subscribers = channelElement.querySelector('#subscriber-count')?.innerText || '0 subscribers';
                const avatar = channelElement.querySelector('#avatar img')?.src || '';
                const url = channelElement.querySelector('a')?.href || '';
                const recentVideos = Array.from(channelElement.querySelectorAll('ytd-thumbnail')).map(video => video.innerText) || [];

                channels.push({ name, subscribers, avatar, url, recentVideos });
            } catch (error) {
                console.error('Error processing a channel element:', error);
            }
        });

        return channels;
    });

    console.log(`Extracted ${channels.length} channels.`);
    await browser.close();
    return channels.slice(0, 100); // 確保最多返回 100 筆頻道
}

// 儲存資料為 JS 檔案
async function saveChannelsToJs(channels, filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const fileContent = `module.exports = ${JSON.stringify(channels, null, 4)};`;

    fs.writeFileSync(filePath, fileContent, 'utf-8');
    console.log(`Data has been saved to ${filePath}`);
}

// 主函數
(async () => {
    const outputPath = 'D:\\資料庫app遊戲開發\\MyApp\\App\\Scraper\\youtube\\youtube_channels.js';

    console.log('Fetching YouTube gaming channels...');
    const channels = await fetchYouTubeChannels();

    if (channels.length > 0) {
        console.log(`Fetched ${channels.length} channels.`);
        await saveChannelsToJs(channels, outputPath);
    } else {
        console.log('No channels found.');
    }
})();
