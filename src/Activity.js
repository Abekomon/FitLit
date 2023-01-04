class Activity {
  constructor(currentUser, data) {
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
  
  givenDayMinutesActive(givenDate) {
    return this.userActivityInfo
      .find(day => day.date === givenDate)
      .minutesActive
  }

  getWeeklyMinutesActive() {
    return Number((this.userActivityInfo
      .slice(-7)
      .reduce((acc, curr) => {
        return acc += curr.minutesActive
      }, 0) / 7).toFixed(1))
  }

  dailyStepGoalHit(date){
    return this.currentUser.dailyStepGoal <= this.userActivityInfo.find(day => day.date === date).numSteps
  }

  stairClimbRecord() {
    let sorted = this.userActivityInfo.sort((a,b) => {return b.flightsOfStairs - a.flightsOfStairs})
    return sorted[0].flightsOfStairs
  }

};

export default Activity;
