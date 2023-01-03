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
    }).map(day => day.numSteps) * currentStride) / 5280).toFixed(1)
  }
}

export default Activity;