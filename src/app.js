const path = require('path')
const express = require('express')
const hbs = require('hbs');

const app = express()
const PORT = process.env.PORT || 3000;

//utils
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs') //tell express to use hbs instead of just normal html
app.set('views', viewsPath) //point express to custom dir
hbs.registerPartials(partialsPath) // set partials path

//setup static dir to serve
app.use(express.static(publicPath))


//routes
app.get('', (req, res) => {
  res.render('index', {
    title: "weather app",
    name: "aaron lejeune"
  }) //no need fot the file extension
})

app.get('/weather', (req, res) => {
  //console.log(req.query); get ?address=Antwerp
  const address = req.query.address
  const temp = ""

  if(!address){
    return res.send({
      error: "please provide an address"
    })
  }

  geocode(address, (error, data) => {
    if(error){
      return res.send({ error })
    }

    forecast(data, (error, temp) => {
      if(error){
        return res.send({ error })
      }
      res.send({
        address: address,
        temperature: temp
      })
    });
  });
})

app.get('*', (req, res) => {
  res.render('error', {
    type: "404",
    message: "this page is not found"
  }) //no need fot the file extension
})  


//setup server
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
})
