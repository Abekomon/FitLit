class Sleep {
  constructor(currentUser, data) {
    this.userSleepInfo = data.sleepData.filter(
      (day) => day.userID === currentUser.id
    );
    this.currentUser = currentUser;
    this.sleepData = data.sleepData;
  }

  averageHoursSlept() {
    const total = this.userSleepInfo
      .map((hrs) => {
        return hrs.hoursSlept;
      })
      .reduce((totalSleepHrs, sleepHrs) => {
        return (totalSleepHrs += sleepHrs);
      });
    const average = total / this.userSleepInfo.length;
    return average.toFixed(1);
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

  averageSleepQuality() {
    return (
      this.userSleepInfo
        .map((day) => day.sleepQuality)
        .reduce((a, b) => a + b) / this.userSleepInfo.length
    ).toFixed(1);
  }

  getHoursSlept(date) {
    return this.userSleepInfo.find((item) => item.date === date).hoursSlept;
  }

  getSleepQuality(date) {
    return this.userSleepInfo.find((item) => item.date === date).sleepQuality;
  }

  averageAllSleepQuality() {
    const allUsersSleepQuality = this.sleepData.map(sleepQualityData => {
      return sleepQualityData.sleepQuality
    }).reduce((totalQuality, quality) => {
        let total = totalQuality += quality
         return total
       })

    const average = allUsersSleepQuality / this.sleepData.length
    return average.toFixed(1)
  }
}

export default Sleep;
