const form = document.getElementById('train-status-form');
const trainNumberInput = document.getElementById('train-number');
const dateInput = document.getElementById('train-date');
const stationInput = document.getElementById('station-code');
const stationEventInput = document.getElementById('station-event');
const trainStatus = document.getElementById('train-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const trainNumber = trainNumberInput.value;
  const date = dateInput.value;
  const stationCode = stationInput.value;
  const stationEvent = stationEventInput.value;

  const requestBody = {
    tkn: "os1a0bf692-b293-4e83-a5ff-44c91e599e18/2",
    trkr: "UW-nP20210518091722",
    lang: "en",
    usrid: "2010205769",
    mode: "web",
    pltfrm: "windows",
    did: null,
    srvid: "1988",
    deptid: "384",
    subsid: "0",
    subsid2: "0",
    formtrkr: "0",
    trainNumber,
    journeyDate: date,
    journeyStation: stationCode,
    journeyStationEvent: stationEvent
  };

  fetch('https://apigw.umangapp.in/CRISApi/ws1/ntes/s1/getTrainSchedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      const status = data.trainRoute.map(route => {
        return `<p>${route.stationName}: ${route.schArrTime} - ${route.schDepTime} (${route.distance} km)</p>`;
      }).join('');

      trainStatus.innerHTML = `<h2>${data.trainName} (${data.trainNumber})</h2>${status}`;
    })
    .catch(error => {
      trainStatus.innerHTML = `<p>There was an error: ${error.message}</p>`;
    });
});
