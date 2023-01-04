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

}


export default Activity;
