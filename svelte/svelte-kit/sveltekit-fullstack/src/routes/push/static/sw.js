// https://web.dev/push-notifications-notification-behaviour/
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
self.addEventListener("push", (event) => {
    let data = event.data.json()
    console.log("Push receive ..",JSON.stringify(data))
    self.registration.showNotification(data.title,data.option)
  })

  self.addEventListener('notificationclick', (event) => {
    if (!event.action) {
      console.log('Notification Click.');
      return;
    }
    switch (event.action) {
      case 'yes':
        console.log("User choose yes");
        break;
      case 'no':
        console.log("User choose no");
        break;
      default:
        console.log(`Unknown action clicked: '${event.action}'`);
        break;
    }
  })
  