import "./css/styles.css";
import User from "./User";
import UserRepository from "./UserRepository";
import returnDataPromises from "./apiCalls";
import Hydration from "./Hydration";
import Sleep from "./Sleep";

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
  userInfoCard.innerText = `Name: ${currentUser.name}
  Address: ${currentUser.address}
  Email: ${currentUser.email}
  Stride Length: ${currentUser.strideLength} feet
  Daily Step Goal: ${currentUser.dailyStepGoal} steps`;
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
  <h1 class="step-goal-widget-title">Your step goal</h1>
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
  Today you have consumed ${userHydration.givenDayHydration(
    userHydration.userHydrationInfo[userHydration.userHydrationInfo.length - 1]
      .date
  )} ounces of water.
  </p>`;
}

function displayWeekHydration(userHydration) {
  console.log("week hydration", userHydration.weekHydration());
  userHydration.weekHydration().forEach((item) => {
    weekHydrationCard.innerHTML += `<p class="weekly-hydration-item">
  ${item.date} : ${item.numOunces}oz of water consumed
  </p>`;
  });
  weekHydrationCard;
}

function displaySleepWidgets() {
  let userSleep = new Sleep(currentUser, sleepData);
  displayTodaySleep(userSleep);
  displayWeekSleep(userSleep);
  displayAllTimeSleep(userSleep);
}

function displayTodaySleep(userSleep) {
  todaySleepCard.innerHTML = `<p class="todays-sleep">
    Today you slept ${userSleep.getHoursSlept(
    userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date
  )} hours and had a sleep quality of ${userSleep.getSleepQuality(
    userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date
  )}
  </p>`;
}

function displayWeekSleep(userSleep){
  userSleep.getWeeklyHoursSlept(userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date).forEach((item, index) => {
    const userSleepQuality = userSleep.getWeeklySleepQuality(userSleep.userSleepInfo[userSleep.userSleepInfo.length - 1].date)[index]
    weekSleepCard.innerHTML += `<p class="weekly-sleep-item">
  ${item.date} : ${item.hoursSlept} hours ${userSleepQuality.sleepQuality} quality
  </p>`;
  });
}

function displayAllTimeSleep(userSleep) {
  allTimeSleepCard.innerHTML = `<p class="all-time-sleep">
    You sleep an average of ${userSleep.averageHoursSlept()} hours and have an average sleep quality of ${userSleep.averageSleepQuality()}
  </p>`;
}

function updateWelcomeText() {
  welcomeTitle.innerText = `Welcome ${currentUser.getFirstName()}`;
}

///// event listeners
window.addEventListener("load", () => {
  fetchApiCalls();
});
