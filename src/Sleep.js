class Sleep {
  constructor(currentUser, data) {
    this.userSleepInfo = data.sleepData.filter(
      (day) => day.userID === currentUser.id
    );
    this.currentUser = currentUser;
    this.sleepData = data.sleepData;
  }

  averageSleepQuality() {
    return (
      this.userSleepInfo
        .map((day) => day.sleepQuality)
        .reduce((a, b) => a + b) / this.userSleepInfo.length
    ).toFixed(1);
  }

  getWeeklyHoursSlept(date) {
    let index = this.userSleepInfo.findIndex((day) => day.date === date);
    return this.userSleepInfo
      .slice(index - 6, index + 1)
      .map((day) => (day = { date: day.date, hoursSlept: day.hoursSlept }));
  }

  getWeeklySleepQuality(date) {
    let index = this.userSleepInfo.findIndex((day) => day.date === date);
    return this.userSleepInfo
      .slice(index - 6, index + 1)
      .map((day) => (day = { date: day.date, sleepQuality: day.sleepQuality }));
  }
}

export default Sleep;
