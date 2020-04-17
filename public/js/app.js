console.log('client side javascript file is loaded!')

// select the first 'form' elemnt from index.hbs element
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// event listener for 'form' with two parameters (event name, callback)
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //avoid the page from refreshing after the submit event
    
    const location = search.value


    // fetch() is an Asynchronous IO operation
    // in this case the callback function is passed via the then() method
    fetch('http://0.0.0.0:3000/weather?address=' + location).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = 'Error: ' + data.error
                messageTwo.textContent = ''
            } else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            
        })
    })

})

