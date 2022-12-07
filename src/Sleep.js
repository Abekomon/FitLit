class Sleep {
  constructor(currentUser, data){
    this.userSleepInfo = data.sleepData.filter(
      (day) => day.userID === currentUser.id
    );
    this.currentUser = currentUser;
    this.sleepData = data.sleepData;
  }

  averageSleepQuality(){
    return (this.userSleepInfo.map(day => day.sleepQuality).reduce((a, b) => a + b) / this.userSleepInfo.length).toFixed(1)
  }

  getHoursSlept(date) {
    return this.userSleepInfo.find(item => item.date === date).hoursSlept
  }

  getSleepQuality(date) {
    return this.userSleepInfo.find(item => item.date === date).sleepQuality

  }
}

export default Sleep;