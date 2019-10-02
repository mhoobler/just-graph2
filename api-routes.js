let https = require('https');

module.exports = (function(app) {
  app.get('/_api-test', (req, res) => {
    // console.log(req)
    res.json('test');
  }),

  app.get('/_api/alpha/:term', (req, res) => {
    let data = '';
    let key = process.env.stocksKey;
    
    https.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + req.params.term + '&apikey=' + key,
    (result) => {
        result.on('data', (stockData) => { 
            data += stockData;
        });
        result.on('end', () => {
            res.type('json');
            res.end(data);
        })
    })

  })
})