export function saveStats(kills, time): void {
  fetch("https://shielded-plateau-92130.herokuapp.com/posts", {
    method: 'PATCH',
    headers: {
        "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      login: '333',
      levels: {
        easy:{
          kills: `${kills}`,
          time: `${time}`
        }
      }
    })
})
}