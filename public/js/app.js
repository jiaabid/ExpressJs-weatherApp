const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const place = document.querySelector('input').value
    console.log(place)
    fetch('/weather?address=' + place).then(res => {
        res.json().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                document.querySelector('p').innerHTML = `You Search for <strong>'${data.location}'</strong>`
                const output = document.querySelector('#output')
                const leftDiv = document.querySelector('#left')
                const extra = document.getElementById('extra')
                leftDiv.innerHTML = `<h5><i class="material-icons prefix" alt="cloud img">cloud</i> ${data.temperature}&#8451<span class="sum">  <i>${data.summary}</i></span></h5>
`
                output.innerHTML = `<h5>${data.place}</h5><hr>`

                extra.innerHTML = `<div class="col l4 m4 s12 cc"><h4>Humidity</h4> <i class="material-icons center">whatshot</i><h5 class="center">${data.humidity}%</5>
</div><div class="col l4 m4 s12 cc"><h4>Pressure</h4> <i class="material-icons center">gesture</i><h5 class="center">${data.pressure} atm</5></div>
<div class="col l4 m4 s12 cc"><h4>DewPoint</h4> <i class="material-icons center">opacity</i><h5 class="center">${data.dew}&#8451</5></div>`
                output.appendChild(leftDiv)
                output.appendChild(extra)


            }
        })
    })
    form.reset()
})
