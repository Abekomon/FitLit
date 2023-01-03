class Activity {
  constructor(currentUser, data) {
    this.userActivityInfo = data.activityData.filter(
      (day) => day.userID === currentUser.id
    );
    this.currentUser = currentUser;
  }
  
  givenDayMilesWalked(givenDate) {
    const currentStride = this.currentUser.strideLength;
    return ((this.userActivityInfo.find(day => {
      return day.date === givenDate
    }).reduce((acc, curr) => {
      return acc += curr.numSteps
    }, 0) * currentStride) / 5280).toFixed(1)
  }
  
  givenDayMinutesActive(givenDate) {
    return this.userActivityInfo.find(day => {
      return day.date === givenDate
    }).reduce((acc, curr) => {
      return acc += curr.minutesActive
    }, 0)
  }


}


export default Activity;