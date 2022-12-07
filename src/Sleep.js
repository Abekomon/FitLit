class Sleep {
  constructor(currentUser, data){
    this.userSleepInfo = data.sleepData.filter(
      (day) => day.userID === currentUser.id
    );
    this.currentUser = currentUser;
    this.sleepData = data.sleepData;
  }

  averageUserSleepAllTime() {
    const total = this.userSleepInfo.map(hrs => {
      return hrs.hoursSlept
    })
    return total
  }
}

export default Sleep;