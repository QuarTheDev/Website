document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameInput = document.querySelector("#name");
    const subjectInput = document.querySelector("#subject");
    const messageInput = document.querySelector("#body");

    const name = nameInput.value;
    const subject = subjectInput.value;
    const message = messageInput.value;

    const webhookURL =
      "";
      // removed url due to v2 becoming legacy

    const payload = {
      content: `## Name:\n**${name}**\n## Subject:\n${subject}\n## Message:\n${message}`,
    };

    // Reset form values
    nameInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  });
});