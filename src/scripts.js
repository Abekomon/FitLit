import "./css/styles.css";
import User from "./User";
import UserRepository from "./UserRepository";
import returnDataPromises from "./apiCalls";
import Hydration from "./Hydration";
import Sleep from "./Sleep";
import Chart from 'chart.js/auto';
import { hydrationChartInfo, sleepChartInfo } from './chartInfo'
import Activity from "./Activity";

//// query selectors
const userInfoCard = document.querySelector(".user-info");
const stepsWidgetCard = document.querySelector(".steps-widget");
const welcomeTitle = document.querySelector(".welcome-user-title");
const todayConsumedWaterCard = document.querySelector(".hydration1-widget");
const weekHydrationCard = document.querySelector(".hydration2-widget");
const weekSleepCard = document.querySelector(".sleep3-widget");
const todaySleepCard = document.querySelector(".sleep2-widget");
const allTimeSleepCard = document.querySelector(".sleep1-widget");
const mostRecentDaysActivityCard = document.querySelector(".activity1-widget")
const mostRecentDaysMilesWalkedCard = document.querySelector(".activity2-widget")
const sleepSection = document.querySelector(".sleep-widgets-container")
const activitySection = document.querySelector(".activity-widgets-container")
const hydrationSection = document.querySelector(".hydration-widgets-container")
const weeklyActivityCard = document.querySelector(".activity4-widget")
const activityButton = document.querySelector(".activity-button");
const sleepButton = document.querySelector(".sleep-button");
const hydrationButton = document.querySelector(".hydration-button");
const sleepForm = document.querySelector("#formSleep")
const hydrationForm = document.querySelector("#formHydration")
const activityForm = document.querySelector("#formActivity")
const activityDateForm = document.querySelector("#activityDate")
const activityStepsForm = document.querySelector("#activitySteps")
const activityMinutesForm = document.querySelector("#activityMinutes")
const activityStairsForm = document.querySelector("#activityStairs")
const activitySubmitForm = document.querySelector("#activitySubmit")
const sleepDateForm = document.querySelector("#sleepDate")
const sleepHoursForm = document.querySelector("#sleepHours")
const sleepQualityForm = document.querySelector("#sleepQuality")
const sleepSubmitForm = document.querySelector("#sleepSubmit")
const hydrationDateForm = document.querySelector("#hydrationDate")
const hydrationHoursForm = document.querySelector("#hydrationOunces")
const hydrationSubmitForm = document.querySelector("#hydrationSubmit")
const rankingsCard = document.querySelector(".activity3-widget")

////Global Variables
let userData;
let sleepData;
let hydrationData;
let activityData;
let userRepository;
let currentUser;
let currentView = ".activity-widgets-container"


////functions
function fetchApiCalls() {
  returnDataPromises().then((data) => {
    userData = data[0].userData.map((user) => new User(user));
    sleepData = data[1];
    hydrationData = data[2];
    activityData = data[3];
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
  displayActivityWidgets()
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
  <h2 class="step-goal-widget-title">Step Goal</h2>
  <p class="steps-widget-info">
    Your step goal is: ${currentUser.dailyStepGoal}.<br>
    The average step goal of all users is ${userRepository.returnAverageDailyStepGoal()}. <br>
    You step goal ranks ${numberRanked} highest out of ${
    userRepository.users.length
  }. <br>
  </p>
  `;
}

function displayActivityWidgets() {
  let userActivity = new Activity(currentUser, activityData)
  displayTodaysActivityRanking(userActivity)
  displayWeeklyActivity(userActivity);
  displayMostRecentDaysActivity(userActivity)
  displayMostRecentDaysMilesWalked(userActivity)
}

function displayMostRecentDaysActivity(userActivity) {
  console.log("accessing data", )
  mostRecentDaysActivityCard.innerHTML = `
  <h2 class ="most-recent-activity-card-title">Most Recent Day Stats</h2>
  <p class="most-recent-day-stats-results"> 
  Number of Steps: ${userActivity.userActivityInfo.reverse()[0].numSteps}
  <br>
  Number of Minutes Active: ${userActivity.userActivityInfo.reverse()[0].minutesActive}
  </p>
  `
}

function displayMostRecentDaysMilesWalked(userActivity) {
  mostRecentDaysMilesWalkedCard.innerHTML = `
  <h2 class ="most-recent-miles-walked-card-title">Most Recent Day Miles Walked</h2>
  <p class="most-recent-days-miles-walked-results"> ${Number((((userActivity.userActivityInfo.reverse()[0].numSteps) * (currentUser.strideLength))/5280).toFixed(1))} miles</p>
  `
}

function displayHydrationWidgets() {
  let userHydration = new Hydration(currentUser, hydrationData);
  displayTodaysHydration(userHydration);
  displayWeekHydration(userHydration);
}

function displayTodaysHydration(userHydration) {
  todayConsumedWaterCard.innerHTML = `<h2 class="todays-hydration">
  Hydration Today<h2>
  <p> ${userHydration.givenDayHydration(
    userHydration.userHydrationInfo[userHydration.userHydrationInfo.length - 1]
      .date)}oz. </p>`;
}

function displayWeekHydration(userHydration) {
  weekHydrationCard.innerHTML = `<canvas id="weeklyHydrationChart"></canvas>`
  const ctx = document.getElementById('weeklyHydrationChart').getContext('2d');
  new Chart(ctx, hydrationChartInfo(userHydration));
  
}

function displaySleepWidgets() {
  let userSleep = new Sleep(currentUser, sleepData);
  displayTodaySleep(userSleep);
  displayWeekSleep(userSleep);
  displayAllTimeSleep(userSleep);
}

function displayTodaySleep(userSleep) {
  todaySleepCard.innerHTML = `<h2 class="todays-sleep">
    Sleep Today</h2>
    <p> ${userSleep.getHoursSlept(
    userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date
  )} hours</p> <p> ${userSleep.getSleepQuality(
    userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date
  )} out of 5</p>`;
}

function displayWeekSleep(userSleep){
  weekSleepCard.innerHTML = `<canvas id="weeklySleepChart"></canvas>`
  let sleepChartCanvas = document.getElementById('weeklySleepChart').getContext('2d');
  let chartInfo = sleepChartInfo(userSleep);
  new Chart(sleepChartCanvas, {
    type: 'line',
    data: chartInfo.sleepData,
    options: chartInfo.chartOptions
  });
}

function displayAllTimeSleep(userSleep) {
  allTimeSleepCard.innerHTML = `<h2 class="all-time-sleep">
  Sleep All-Time</h2>
    <p> ${userSleep.averageHoursSlept()} hours </p> <p> ${userSleep.averageSleepQuality()} out of 5 </p>`;
}

function displayWeeklyActivity(data){
  const weeklySteps = data.getWeeklyStats("numSteps");
  const weeklyMinutes = data.getWeeklyStats("minutesActive");
  const weeklyStairs = data.getWeeklyStats("flightsOfStairs");
  weeklyActivityCard.innerHTML = `<h2>Weekly View</h2>
    <p>Total Steps: ${weeklySteps}  (Average per day: ${(weeklySteps / 7).toFixed(1)})</p>
    <p>Total Minutes Active: ${weeklyMinutes}  (Average per day: ${(weeklyMinutes / 7).toFixed(1)})</p>
    <p>Total Stairs: ${weeklyStairs}  (Average per day: ${(weeklyStairs / 7).toFixed(1)})</p>`
}

function updateWelcomeText() {
  welcomeTitle.innerText = `Welcome ${currentUser.getFirstName()}`;
}

function changeView(newView){
  document.querySelector(currentView).classList.toggle("hide")
  document.querySelector(newView).classList.toggle("hide")
  currentView = newView
}

function changeForm(data){
  if(data === "activity"){
    sleepForm.classList.add('hide')
    hydrationForm.classList.add('hide')
    activityForm.classList.remove('hide')
  }
  if(data === "sleep") {
    hydrationForm.classList.add('hide')
    activityForm.classList.add('hide')
    sleepForm.classList.remove('hide')
  }
  if(data === "hydration"){
    sleepForm.classList.add('hide')
    activityForm.classList.add('hide')
    hydrationForm.classList.remove('hide')
  }
}

function displayTodaysActivityRanking(userActivity){
  let mostRecentActivity = userActivity.userActivityInfo[userActivity.userActivityInfo.length-1]
  let todaysActivityData = activityData.activityData.filter(day => day.date === mostRecentActivity.date)
  rankingsCard.innerHTML = `
  <h2 class="activity-ranking-title">Today's Rankings</h2>
  <p class="activity-ranking">
  Steps: ${todaysActivityData
    .sort((a,b) => b.numSteps - a.numSteps)
    .indexOf(mostRecentActivity)} out of ${userRepository.users.length}
  </p>
  <p class="activity-ranking">
  Minutes Active: ${todaysActivityData
    .sort((a,b) => b.minutesActive - a.minutesActive)
    .indexOf(mostRecentActivity)} out of ${userRepository.users.length}
  </p>
  <p class="activity-ranking">
  Flights of Stairs Climbed: ${todaysActivityData
    .sort((a,b) => b.flightsOfStairs - a.flightsOfStairs)
    .indexOf(mostRecentActivity)} out of ${userRepository.users.length}
  </p>
  `
}

///// event listeners
window.addEventListener("load", () => {
  fetchApiCalls();
});

activityButton.addEventListener("click",()=>{
  changeView(".activity-widgets-container")
  changeForm("activity")
})

sleepButton.addEventListener("click",()=>{
  changeView(".sleep-widgets-container")
  changeForm("sleep")
})

hydrationButton.addEventListener("click",()=>{
  changeView(".hydration-widgets-container")
  changeForm("hydration")
})
