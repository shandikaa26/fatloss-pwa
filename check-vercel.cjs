const https = require('https');
https.get('https://fatloss-hub.vercel.app/', {headers: {'User-Agent': 'Mozilla/5.0'}}, (res) => {
  let data = '';
  res.on('data', c => { data += c; });
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('FULL HTML:', data);
  });
}).on('error', e => console.error('Error:', e.message));
