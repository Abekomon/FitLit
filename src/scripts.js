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
const sleepSection = document.querySelector(".sleep-widgets-container")
const activitySection = document.querySelector(".activity-widgets-container")
const hydrationSection = document.querySelector(".hydration-widgets-container")
const activityButton = document.querySelector(".activity-button");
const sleepButton = document.querySelector(".sleep-button");
const hydrationButton = document.querySelector(".hydration-button");
const form = document.querySelector(".form")

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
    form.innerHTML = `<p class="form-title">Enter your activity data here</p>
    <label for="input1">Date:</label>
    <input type="text" id="input1" name="input1">
    <label for="input2">Steps Walked:</label>
    <input type="text" id="input2" name="input2">
    <label for="input3">Minutes Active:</label>
    <input type="text" id="input3" name="input3">
    <label for="input4">Flights of Stairs Climbed</label>
    <input type="text" id="input4" name="input4">
    <input type="submit" value="Submit">`
  }
  if(data === "sleep") {
    form.innerHTML = `<p class="form-title">Enter your sleep data here</p>
    <label for="input1">Date:</label>
    <input type="text" id="input1" name="input1">
    <label for="input2">Hours Slept:</label>
    <input type="text" id="input2" name="input2">
    <label for="input3">Sleep Quality:</label>
    <input type="text" id="input3" name="input3">
    <input type="submit" value="Submit">`
  }
  if(data === "hydration"){
    form.innerHTML = `<p class="form-title">Enter your hydration data here</p>
    <label for="input1">Date:</label>
    <input type="text" id="input1" name="input1">
    <label for="input2">Ounces Drank:</label>
    <input type="text" id="input2" name="input2">
    <input type="submit" value="Submit">`
  }
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
