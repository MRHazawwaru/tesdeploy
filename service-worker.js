self.addEventListener("push", function (event) {
  let notificationData = {};

  if (event.data) {
    notificationData = event.data.json();
  }

  const options = {
    body: notificationData.message || "Ada cerita baru menanti kamu!",
    icon: "/public/icons/icon-192x192.png",
    badge: "/public/icons/icon-72x72.png",
  };

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || "TalkStory",
      options
    )
  );
});
