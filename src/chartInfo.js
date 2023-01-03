import Chart from 'chart.js/auto';


function hydrationChartInfo (userHydration) {
    return {
        type: 'bar',
        data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
          datasets: [{
            label: `Ounces of water consumed daily after ${userHydration.weekHydration()[0].date}` ,
            data: userHydration.weekHydration().map(item => item.numOunces),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    }
  } ;

  function sleepChartInfo (userSleep) {
    let chartInfo = {};
    chartInfo.hoursSleptData = {
        label: `Hours Slept week starting ${userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date}`,
        data: userSleep.getWeeklyHoursSlept(userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date).map(item => item.hoursSlept),
        lineTension: 0,
        fill: false,
        borderColor: 'blue'
      };
      chartInfo.sleepQualityData = {
        label: `Sleep Quality Week Starting ${userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date}`,
        data: userSleep.getWeeklySleepQuality(userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date).map(item => item.sleepQuality),
        lineTension: 0,
        fill: false,
        borderColor: 'green'
      };
      chartInfo.sleepData = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [chartInfo.hoursSleptData, chartInfo.sleepQualityData]
      };
      chartInfo.chartOptions = {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      };
    
      return chartInfo 
  }

  export { hydrationChartInfo, sleepChartInfo }