
self.addEventListener("push", (event) => {
    let data = event.data.json()
    console.log("Push receive ..",JSON.stringify(data))
    self.registration.showNotification(data.title,data.option)
  })