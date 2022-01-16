var request = require('request');

var params = {
    'battleId': 4,
    'avatarAttack': 50,
    'avatarHp': 150
}
  
request.post({url:'http://localhost:80/battle', params}, function(err,httpResponse,body){
    var resBody = JSON.parse(body)
    console.log(resBody)
    console.log(err)
})



// const https = require('https');

// var postData = JSON.stringify({
//     'battleId': 4,
//     'avatarAttack': 50,
//     'avatarHp': 150
// });

// var options = {
//   hostname: 'lo',
//   port: 443,
//   path: '/post.php',
//   method: 'POST',
//   headers: {
//        'Content-Type': 'application/x-www-form-urlencoded',
//        'Content-Length': postData.length
//      }
// };

// var req = https.request(options, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', (e) => {
//   console.error(e);
// });