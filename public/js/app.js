const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msg1 = document.querySelector('#msg1');
const msg3 = document.querySelector('#msg3');
const msg4 = document.querySelector('#msg4');
const msg5 = document.querySelector('#msg5');
const msg6 = document.querySelector('#msg6');

const msg2 = document.querySelector('#msg2');
const abc = document.querySelector('#abc');
const xyz = document.querySelector('#xyz');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    msg3.style = "";
    msg2.style = "";
    msg5.style = "";
    msg6.style = "";
    abc.style = "";
    xyz.style = "";

    msg1.textContent = 'Loading...';
    // msg2.textContent = '';
    msg3.textContent = '';
    // msg4.textContent = '';
    msg5.textContent = '';
    msg6.textContent = '';
    abc.textContent = '';
    xyz.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // msg1.textContent = '';
                msg1.textContent = data.error;
                // console.log(data.error);
            }
            else {
                const x = '<img src="http://openweathermap.org/img/wn/' + data.forecast.icon + '@2x.png" >';
                msg1.style.textAlign = 'center';
                msg1.textContent = data.location;
                msg1.style.fontWeight = "600";

                xyz.innerHTML = `Forecast`
                xyz.style.backgroundColor = "lightblue";

                abc.innerHTML = `${x} <span style="margin-bottom: auto; margin-top: auto; " >${data.forecast.weather[0].toUpperCase() +
                    data.forecast.weather.slice(1)}</span>`
                abc.style.backgroundColor = "lightblue";
                msg2.style.boxShadow = "8px 9px 10px 3px #898888";

                msg3.innerHTML = `<b>Min temp</b><br/>${data.forecast.minTemp}&#8451<br/><br/>
                <b>Max temp</b><br/>${data.forecast.maxTemp}&#8451`
                msg3.style.backgroundColor = "lightblue";
                msg3.style.border = "0.5px solid rgb(82, 185, 219)";
                msg3.style.boxShadow = "8px 9px 10px 3px #898888";

                // msg4.innerHTML = `Max temp: ${data.forecast.maxTemp}`
                // msg4.style.backgroundColor = "lightblue";
                // msg4.style.border = "2px solid black";

                msg5.innerHTML = `<b>Current temp</b> <br/><br/> ${data.forecast.currTemp}&#8451`
                msg5.style.backgroundColor = "lightblue";
                msg5.style.border = "0.5px solid rgb(82, 185, 219)";
                msg5.style.boxShadow = "8px 9px 10px 3px #898888";

                msg6.innerHTML = `<b>Wind Speed</b> <br/><br/> ${data.forecast.windSpeed} km/hr`
                msg6.style.backgroundColor = "lightblue";
                msg6.style.border = "0.5px solid rgb(82, 185, 219)";
                msg6.style.boxShadow = "8px 9px 10px 3px #898888";

            }
        })
    })
})