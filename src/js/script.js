let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tournai?unitGroup=metric&key=WW7B2TH3LCEK94S5L9HVB7PJN&contentType=json"
let temps;
let labels = [];
let labelshours = [];
let datas = [];
let datahours = [];
const data = document.getElementById('data');
const ctx = data.getContext('2d');
const data2 = document.getElementById('data2');
const ctx2 = data2.getContext('2d');

const t_bod = document.getElementById('t-bod');
let humidity= [];
let condition = [];


function fetchdata() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            temps = data;
            console.log(temps)
            for (let i = 0; i < 15; i++) {
                labels.push(temps.days[i].datetime);
                datas.push(temps.days[i].temp);
            }
            for (let j = 0; j < 24; j++) {
                labelshours.push(j);
                datahours.push(temps.days[0].hours[j].temp);
                humidity.push(temps.days[0].hours[j].humidity);
                condition.push(temps.days[0].hours[j].conditions);

                let newrow = document.createElement('tr');
                let cell1 = document.createElement('td');
                let cell2 = document.createElement('td');
                let cell3 = document.createElement('td');
                let cell4 = document.createElement('td');

                cell1.innerHTML = labelshours[j];
                cell2.innerHTML = condition[j];
                cell3.innerHTML = humidity[j];
                cell4.innerHTML = datahours[j];

                newrow.appendChild(cell1);
                newrow.appendChild(cell2);
                newrow.appendChild(cell3);
                newrow.appendChild(cell4);

                t_bod.appendChild(newrow)

            }
            console.log(datahours);
            console.log(labelshours);
            createChart1();
            createChart2();
        })
        .catch(error => console.error("Error fetching data: " + error));
};

function createChart1() {
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'average temp',
                data: datas,
                borderWidth: 3,
            }]
        },
    });
}

function createChart2() {
    const myChart1 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: labelshours,
            datasets: [{
                label: 'day temp by hours',
                data: datahours,
                borderWidth: 3,
            }]
        },
    });
}

fetchdata()