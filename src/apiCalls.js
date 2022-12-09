// Your fetch requests will live here!

function fetchData(dataset) {
    return fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataset}`).then(response => response.json()).catch(error => console.log(`${dataset}`, error))
}

export default function returnDataPromises(){
    const fetchUsers = fetchData("users")
    const fetchSleep = fetchData("sleep")
    const fetchHydration = fetchData("hydration")

    return Promise.all([fetchUsers, fetchSleep, fetchHydration])
}
