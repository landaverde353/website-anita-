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

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const entry = Object.fromEntries(new FormData(form).entries());
  const payload = {
    name: entry.name.trim(),
    contact: entry.contact.trim(),
    guests: Number(entry.guests),
    attendance: entry.attendance,
    message: entry.message.trim()
  };

  const apiBase = String(window.BABY_SHOWER_API || "").replace(/\/$/, "");

  if (!apiBase) {
    const saved = JSON.parse(localStorage.getItem("anitaXavierRsvps") || "[]");
    saved.push({ ...payload, savedAt: new Date().toISOString() });
    localStorage.setItem("anitaXavierRsvps", JSON.stringify(saved));
    notify("Preview mode: RSVP saved in this browser.");
    form.reset();
    return;
  }

  const originalLabel = sendButton.textContent;
  sendButton.disabled = true;
  sendButton.textContent = "Sending…";

  try {
    const response = await fetch(`${apiBase}/rsvp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`RSVP request failed with status ${response.status}`);
    }

    notify("Thank you! Your RSVP has been received.");
    form.reset();
  } catch (error) {
    console.error(error);
    notify("Your RSVP could not be sent. Please try again.");
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = originalLabel;
  }
});
