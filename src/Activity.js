class Activity {
  constructor(currentUser, data) {
    this.userActivityInfo = data.activityData.filter(
      (day) => day.userID === currentUser.id
    );
  }
}

export default Activity;