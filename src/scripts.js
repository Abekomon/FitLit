import "./css/styles.css";
import User from "./User";
import UserRepository from "./UserRepository";
import returnDataPromises from "./apiCalls";
import Hydration from "./Hydration";
import Sleep from "./Sleep";
import Chart from 'chart.js/auto';

//// query selectors
const userInfoCard = document.querySelector(".user-info");
const stepsWidgetCard = document.querySelector(".steps-widget");
const welcomeTitle = document.querySelector(".welcome-user-title");
const todayConsumedWaterCard = document.querySelector(".hydration1-widget");
const weekHydrationCard = document.querySelector(".hydration2-widget");
const weekSleepCard = document.querySelector(".sleep3-widget");
const todaySleepCard = document.querySelector(".sleep2-widget");
const allTimeSleepCard = document.querySelector(".sleep1-widget");

////Global Variables
let userData;
let sleepData;
let hydrationData;
let userRepository;
let currentUser;


////functions
function fetchApiCalls() {
  returnDataPromises().then((data) => {
    userData = data[0].userData.map((user) => new User(user));
    sleepData = data[1];
    hydrationData = data[2];
    loadhandler();
  });
}

function loadhandler() {
  userRepository = new UserRepository(userData);
  randomizeCurrentUser();
  displayCurrentUserInfo();
  compareAndDisplayStepsGoal();
  updateWelcomeText();
  displayHydrationWidgets();
  displaySleepWidgets();
}

function generateRandomIndex() {
  return Math.floor(Math.random() * userData.length);
}

function randomizeCurrentUser() {
  currentUser = userRepository.users[generateRandomIndex()];
}

function displayCurrentUserInfo() {
  userInfoCard.innerHTML = `
  <p><span>Name:</span> ${currentUser.name} </p>
  <p><span>Address:</span> ${currentUser.address}</p>
  <p><span>Email:</span> ${currentUser.email}</p>
  <p><span>Stride Length:</span> ${currentUser.strideLength} feet</p>
  <p><span>Daily Step Goal:</span> ${currentUser.dailyStepGoal} steps</p>`;
}

function compareAndDisplayStepsGoal() {
  let sortedUserRepository = userRepository.users;
  sortedUserRepository.sort((a, b) => {
    return b.dailyStepGoal - a.dailyStepGoal;
  });
  let numberRanked = sortedUserRepository.indexOf(currentUser) + 1;
  displayStepsGoalComparison(numberRanked);
}

function displayStepsGoalComparison(numberRanked) {
  stepsWidgetCard.innerHTML = `
  <h1 class="step-goal-widget-title">Step Goal</h1>
  <p class="steps-widget-info">
    Your step goal is: ${currentUser.dailyStepGoal}.<br>
    The average step goal of all users is ${userRepository.returnAverageDailyStepGoal()}. <br>
    You step goal ranks ${numberRanked} highest out of ${
    userRepository.users.length
  }. <br>
  </p>
  `;
}

function displayHydrationWidgets() {
  let userHydration = new Hydration(currentUser, hydrationData);
  displayTodaysHydration(userHydration);
  displayWeekHydration(userHydration);
}

function displayTodaysHydration(userHydration) {
  todayConsumedWaterCard.innerHTML = `<p class="todays-hydration">
  Hydration Today
  <h2> ${userHydration.givenDayHydration(
    userHydration.userHydrationInfo[userHydration.userHydrationInfo.length - 1]
      .date
  )}oz. </h2>
  </p>`;
}

function displayWeekHydration(userHydration) {
  // userHydration.weekHydration().forEach((item) => {
  //   weekHydrationCard.innerHTML += `<p class="weekly-hydration-item">
  // ${item.date} : ${item.numOunces}oz of water consumed
  // </p>`;
  // });
  weekHydrationCard.innerHTML = `<canvas id="weeklyHydrationChart"></canvas>`
  const ctx = document.getElementById('weeklyHydrationChart').getContext('2d');
const weeklyHydrationChart = new Chart(ctx, {
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
});
  
}

function displaySleepWidgets() {
  let userSleep = new Sleep(currentUser, sleepData);
  displayTodaySleep(userSleep);
  displayWeekSleep(userSleep);
  displayAllTimeSleep(userSleep);
}

function displayTodaySleep(userSleep) {
  todaySleepCard.innerHTML = `<p class="todays-sleep">
    Sleep Today
    <div> ${userSleep.getHoursSlept(
    userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date
  )} hours</div> <div> ${userSleep.getSleepQuality(
    userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date
  )} out of 5</div>
  </p>`;
}

function displayWeekSleep(userSleep){
  // userSleep.getWeeklyHoursSlept(userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date).forEach((item, index) => {
  //   const userSleepQuality = userSleep.getWeeklySleepQuality(userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date)[index]
  //   weekSleepCard.innerHTML += `<p class="weekly-sleep-item">
  // ${item.date} : ${item.hoursSlept} hours ${userSleepQuality.sleepQuality} quality
  // </p>`;
  // });
  weekSleepCard.innerHTML = `<canvas id="weeklySleepChart"></canvas>`
  let sleepChartCanvas = document.getElementById('weeklySleepChart').getContext('2d');

  let hoursSleptData = {
    label: `Hours Slept week starting ${userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date}`,
    data: userSleep.getWeeklyHoursSlept(userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date).map(item => item.hoursSlept),
    lineTension: 0,
    fill: false,
    borderColor: 'blue'
  };
  let sleepQualityData = {
    label: `Sleep Quality Week Starting ${userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date}`,
    data: userSleep.getWeeklySleepQuality(userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date).map(item => item.sleepQuality),
    lineTension: 0,
    fill: false,
    borderColor: 'green'
  };
  let sleepData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [hoursSleptData, sleepQualityData]
  };
  let chartOptions = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black'
      }
    }
  };

  new Chart(sleepChartCanvas, {
    type: 'line',
    data: sleepData,
    options: chartOptions
  });
}

function displayAllTimeSleep(userSleep) {
  allTimeSleepCard.innerHTML = `<p class="all-time-sleep">
  Sleep All-Time
    <div> ${userSleep.averageHoursSlept()} hours </div> <div> ${userSleep.averageSleepQuality()} out of 5 </div>
  </p>`;
}

function updateWelcomeText() {
  welcomeTitle.innerText = `Welcome ${currentUser.getFirstName()}`;
}

///// event listeners
window.addEventListener("load", () => {
  fetchApiCalls();
});
