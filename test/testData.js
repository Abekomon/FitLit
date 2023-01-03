let nonClassUsers = [
  {
    id: 1,
    name: "Luisa Hane",
    address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    email: "Diana.Hayes1@hotmail.com",
    strideLength: 4.3,
    dailyStepGoal: 10000,
    friends: [16, 4, 8],
  },
  {
    id: 2,
    name: "Jarvis Considine",
    address: "30086 Kathryn Port, Ciceroland NE 07273",
    email: "Dimitri.Bechtelar11@gmail.com",
    strideLength: 4.5,
    dailyStepGoal: 5000,
    friends: [9, 18, 24, 19],
  },
  {
    id: 3,
    name: "Herminia Witting",
    address: "85823 Bosco Fork, East Oscarstad MI 85126-5660",
    email: "Elwin.Tromp@yahoo.com",
    strideLength: 4.4,
    dailyStepGoal: 5000,
    friends: [19, 11, 42, 33],
  },
];

let allSleepInfo = {
  sleepData: [
    {
      userID: 1,
      date: "2019/06/15",
      hoursSlept: 6.1,
      sleepQuality: 2.2,
    },
    {
      userID: 2,
      date: "2019/06/15",
      hoursSlept: 7,
      sleepQuality: 4.7,
    },
    {
      userID: 3,
      date: "2019/06/15",
      hoursSlept: 10.8,
      sleepQuality: 4.7,
    },
    {
      userID: 1,
      date: "2019/06/16",
      hoursSlept: 4.1,
      sleepQuality: 3.8,
    },
    {
      userID: 1,
      date: "2019/06/17",
      hoursSlept: 8,
      sleepQuality: 2.6,
    },
    {
      userID: 1,
      date: "2019/06/18",
      hoursSlept: 10.4,
      sleepQuality: 3.1,
    },
    {
      userID: 1,
      date: "2019/06/19",
      hoursSlept: 10.7,
      sleepQuality: 1.2,
    },
    {
      userID: 1,
      date: "2019/06/20",
      hoursSlept: 9.3,
      sleepQuality: 1.2,
    },
    {
      userID: 1,
      date: "2019/06/21",
      hoursSlept: 7.8,
      sleepQuality: 4.2,
    },
  ],
};

let allHydrationInfo = {
  hydrationData: [
    {
      userID: 1,
      date: "2019/06/15",
      numOunces: 37,
    },
    {
      userID: 1,
      date: "2019/06/16",
      numOunces: 69,
    },
    {
      userID: 1,
      date: "2019/06/17",
      numOunces: 96,
    },
    {
      userID: 1,
      date: "2019/06/18",
      numOunces: 61,
    },
    {
      userID: 2,
      date: "2019/06/18",
      numOunces: 70,
    },
    {
      userID: 1,
      date: "2019/06/19",
      numOunces: 91,
    },
    {
      userID: 1,
      date: "2019/06/20",
      numOunces: 50,
    },
    {
      userID: 1,
      date: "2019/06/21",
      numOunces: 50,
    },
    {
      userID: 1,
      date: "2019/06/22",
      numOunces: 43,
    },
  ],
};

let allActivityInfo = {activityData: [{
  userID: 1,
  date: "2019/06/15",
  numSteps: 3577,
  minutesActive: 140,
  flightsOfStairs: 16
},
{
  userID: 2,
  date: "2019/06/15",
  numSteps: 4294,
  minutesActive: 138,
  flightsOfStairs: 10
},
{
  userID: 3,
  date: "2019/06/15",
  numSteps: 7402,
  minutesActive: 116,
  flightsOfStairs: 33
},
{
  userID: 1,
  date: "2019/06/16",
  numSteps: 6637,
  minutesActive: 175,
  flightsOfStairs: 36
},
{
  userID: 2,
  date: "2019/06/16",
  numSteps: 4112,
  minutesActive: 220,
  flightsOfStairs: 37
},
{
  userID: 3,
  date: "2019/06/16",
  numSteps: 12304,
  minutesActive: 152,
  flightsOfStairs: 8
},
{
  userID: 1,
  date: "2019/06/17",
  numSteps: 14329,
  minutesActive: 168,
  flightsOfStairs: 18
},
{
  userID: 1,
  date: "2019/06/18",
  numSteps: 4419,
  minutesActive: 165,
  flightsOfStairs: 33
},
{
  userID: 1,
  date: "2019/06/19",
  numSteps: 8429,
  minutesActive: 275,
  flightsOfStairs: 2
},
{
  userID: 1,
  date: "2019/06/20",
  numSteps: 14478,
  minutesActive: 140,
  flightsOfStairs: 12
},
{
  userID: 1,
  date: "2019/06/21",
  numSteps: 6760,
  minutesActive: 135,
  flightsOfStairs: 6
},
{
  userID: 1,
  date: "2019/06/22",
  numSteps: 10289,
  minutesActive: 119,
  flightsOfStairs: 6
}
]}

export { nonClassUsers, allSleepInfo, allHydrationInfo, allActivityInfo }