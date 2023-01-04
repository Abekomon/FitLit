class Activity {
  constructor(currentUser, data) {
    this.masterData = data
    this.userActivityInfo = data.activityData.filter(
      (day) => day.userID === currentUser.id
    );
    this.currentUser = currentUser;
  }
  
  milesWalked(givenDate) {
    const currentStride = this.currentUser.strideLength;
    return Number(((this.userActivityInfo
      .find(day => {
        return day.date === givenDate
      }).numSteps * currentStride) / 5280).toFixed(1))
  }
  
  givenDayStats(givenDate, activity) {
    return this.userActivityInfo
      .find(day => day.date === givenDate)[activity]
  }

  getWeeklyStats(activity) {
    return this.userActivityInfo
      .slice(-7)
      .reduce((acc, curr) => {
        return acc += curr[activity]
      }, 0)
  }

  dailyStepGoalHit(date){
    return this.currentUser.dailyStepGoal <= this.userActivityInfo.find(day => day.date === date).numSteps
  }

  daysStepGoalReached() {
    const goalReached = this.userActivityInfo.filter(steps => {
      return steps.numSteps >= this.currentUser.dailyStepGoal
    })
    return goalReached
  }

  stairClimbRecord() {
    let sorted = this.userActivityInfo.sort((a,b) => {return b.flightsOfStairs - a.flightsOfStairs})
    return sorted[0].flightsOfStairs
  }
  
  allUsersAverageStairsClimbed (date) {
    let specificDateData = this.masterData.activityData.filter((day) => day.date === date)

    let totalFlightsOfStairsForTheDay = specificDateData.reduce((acc, item) => {
      acc+=item.flightsOfStairs
      return acc
    },0)

    return Number((totalFlightsOfStairsForTheDay/specificDateData.length).toFixed(1))
  }

  allUsersAverageStepsTaken(date) {
    let specificDateData = this.masterData.activityData.filter((day) => day.date === date)

    let totalStepsTakenForTheDay = specificDateData.reduce((acc, item) => {
      acc+=item.numSteps
      return acc
    },0)

    return Number((totalStepsTakenForTheDay/specificDateData.length).toFixed(1))
  }

  allUsersAverageMinutesActive(date) {
    let specificDateData = this.masterData.activityData.filter((day) => day.date === date)

    let totalMinutesActiveForTheDay = specificDateData.reduce((acc, item) => {
      acc+=item.minutesActive
      return acc
    },0)

    return Number((totalMinutesActiveForTheDay/specificDateData.length).toFixed(1))
  }

};

export default Activity;

