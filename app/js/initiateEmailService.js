module.exports = {
  initiateEmailService: function initiateEmailService() {
    let form = document.getElementById("contact-form");
    let submitButton = document.getElementById("submit_button");

    function toggleSubmitButtonDisable() {
      submitButton.disabled = !submitButton.disabled;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      toggleSubmitButtonDisable();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      const content = {
        name: name.value,
        email: email.value,
        message: message.value,
      };

      function resetInputFields() {
        name.value = "";
        message.value = "";
        email.value = "";
      }

      fetch("https://www.enformed.io/9kibv8hh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(content),
      })
        .then((response) => response.json())
        .then((data) => handleResult(true))
        .catch((error) => handleResult(false));

      function handleResult(alert) {
        let result = {
          text: alert ? "Wysłano" : "Błąd połączenia",
          style: alert ? "successStyle" : "failureStyle",
        };

        setMessage();
        setTimeout(function () {
          removeMessage();
        }, 3000);

        function setMessage() {
          const el = document.createElement("div");
          el.id = "sentSuccess";
          el.innerText = result.text;
          el.classList.add(result.style);
          const parent = document.getElementById("status_message");
          parent.appendChild(el);
        }

        function removeMessage() {
          const parent = document.getElementById("status_message");
          const child = document.getElementById("sentSuccess");
          parent.removeChild(child);
          resetInputFields();
          toggleSubmitButtonDisable();
        }
      }
    });
  },
};
