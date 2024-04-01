const express = require('express')
const path = require('path')
const app = express()
const puppeteer = require('puppeteer')
const fs = require('fs')
const screenshot = require('desktop-screenshot')
const {Screenshots} = require('node-screenshots')
const child = require('child_process')

child.spawn(  __dirname + '\\a.ahk' )

app.use('/', express.static(path.join(__dirname, '/client/dist')))

app.get('/ss', (req, res) => {
    let capturer = Screenshots.fromPoint(100, 100)
    capturer.capture().then((data) => {
        fs.writeFileSync(`screenshots/${getImageName()}.png`, data);
    });
    let all = Screenshots.all() ?? []
    console.log(all)
    res.send("Screenshoted succesfully")
})
function getImageName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}.png`;
}
async function run(url) {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    const page = await browser.newPage();
    const screenWidth = await page.evaluate(() => window.screen.width);
    const screenHeight = await page.evaluate(() => window.screen.height);
    await page.setViewport({ width: parseInt(screenWidth), height: parseInt(screenHeight * 0.92) })
    await page.goto(url, { waitUntil: 'networkidle0' });
    // await browser.close();

}

app.listen(3000, () => {
    console.log("App running in port: 3000")
    run('http://localhost:3000')
})