const https = require('https');

const options = {
  hostname: 'www.patek.com',
  port: 443,
  path: '/en/home',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (d) => {
    data += d;
  });
  res.on('end', () => {
    const mp4s = data.match(/[^"\'=><]+(?:\.mp4|\.webm)/g) || [];
    const unique = [...new Set(mp4s)];
    unique.forEach(m => console.log(m));
    if(unique.length === 0) console.log("No videos found. Length of HTML: " + data.length);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
