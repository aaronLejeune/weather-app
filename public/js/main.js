console.log('clinet side file is loaded')

//excersise url: http://puzzle.mead.io/puzzle


const weatherForm = document.querySelector('form')
const search = document.getElementById('location')
const message1 = document.getElementById('message1')
const message2 = document.getElementById('message2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  message1.textContent = "loading"
  message2.textContent = ""

  const location = search.value
  getWeather(location)

})


const getWeather = (query) => {
  fetch('/weather?address=' + query).then((response) => {
    response.json().then((data) => {
      if(data.error){
        message1.textContent = data.error
      } else {
        message1.textContent = data.address
        message2.textContent = data.temperature
      }
    })
  })
}