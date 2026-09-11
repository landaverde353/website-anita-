const form = document.getElementById("rsvpForm");
const sendButton = document.getElementById("sendRsvp");
const toast = document.getElementById("toast");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

menuToggle?.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

siteNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);

  const rsvpData = {
    name: (formData.get("name") || "").trim(),

    guests: Number(formData.get("guests")),

    attending: formData.get("attendance") === "yes",

    message: (formData.get("message") || "").trim()
  };

  console.log("Sending RSVP:", rsvpData);

  try {
    const response = await fetch(
      "https://mucclsre80.execute-api.us-east-1.amazonaws.com/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(rsvpData)
      }
    );

    const result = await response.json();

    console.log("Response:", result);

    if (response.ok) {
      alert("RSVP submitted! ♡");
      rsvpForm.reset();
    } else {
      console.error("API error:", result);
    }

  } catch (error) {
    console.error("RSVP request failed:", error);
  }
});

