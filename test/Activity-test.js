import { expect } from "chai";
import Activity from "../src/Activity";
import { allActivityInfo } from './testData'

describe("User Activity", () => {
  let userActivity;

  beforeEach(() => {
    let currentUser = {
      id: 1,
      name: "Luisa Hane",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Diana.Hayes1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    };

    userActivity = new Activity(currentUser, allActivityInfo);
  });

  it("should be a function", function () {
    expect(Activity).to.be.a("function");
  });

  it("should be a Activity Class", function () {
    expect(userActivity).to.be.an.instanceOf(Activity);
  });

  it("should store all of a users activity events in a single array property", function () {
    expect(userActivity.userActivityInfo).to.deep.equal([{
        userID: 1,
        date: "2019/06/15",
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
      {
        userID: 1,
        date: "2019/06/16",
        numSteps: 6637,
        minutesActive: 175,
        flightsOfStairs: 36
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
      ]);
  });

  it("should have a method that returns the miles a user has walked for a specific day", function () {
    expect(userActivity.milesWalked("2019/06/16")).to.equal(5.4);
  });

  it("should have a method that returns how many minutes they were active for a given day", function () {
    expect(userActivity.givenDayMinutesActive("2019/06/17")).to.equal(168);
  });

  it("should have a method that returns how many minutes active they averaged over a week", function () {
    expect(userActivity.getWeeklyMinutesActive()).to.equal(168.1);
  });

  it("should have a method that returns boolean for if they reached their step goal for a given day", function () {
    expect(userActivity.dailyStepGoalHit("2019/06/17")).to.equal(true);
    expect(userActivity.dailyStepGoalHit("2019/06/18")).to.equal(false);
  });

  it("should have a method that returns an array with all of the days they exceeded their step goal", function () {
    expect(userActivity.daysStepGoalReached()).to.deep.equal([
      {
        userID: 1,
        date: "2019/06/17",
        numSteps: 14329,
        minutesActive: 168,
        flightsOfStairs: 18
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
        date: "2019/06/22",
        numSteps: 10289,
        minutesActive: 119,
        flightsOfStairs: 6
      }
      ]);
  });

  it("should have a method that returns users all time stair climbing record", function () {
    expect(userActivity.stairClimbRecord()).to.equal(36);
  });

  it("should have a method that returns avg number of stairs climbed for all users for given date", function () {
    expect(userActivity.allUsersAverageStairsClimbed("2019/06/15")).to.equal(19.7);
  });

  it("should have a method that returns avg number of steps taken for all users for given date", function () {
    expect(userActivity.allUsersAverageStepsTaken("2019/06/15")).to.equal(5091);
  });

  it("should have a method that returns avg number of minutes active for all users for given date", function () {
    expect(userActivity.allUsersAverageMinutesActive("2019/06/15")).to.equal(131.3);
  });
});