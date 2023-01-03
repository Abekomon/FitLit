// Your fetch requests will live here!

function fetchData(dataset) {
    return fetch(`http://localhost:3001/api/v1/${dataset}`).then(response => response.json()).catch(error => console.log(`${dataset}`, error))
}

export default function returnDataPromises(){
    const fetchUsers = fetchData("users")
    const fetchSleep = fetchData("sleep")
    const fetchHydration = fetchData("hydration")
    const fetchActivity = fetchData("activity")

    return Promise.all([fetchUsers, fetchSleep, fetchHydration, fetchActivity])
}
