/*
 * DOMINION EMPIRE — SITE SETTINGS
 * Add your WhatsApp number below before publishing.
 * Use international format with country code, numbers only.
 * Example format for Nigeria: 2348012345678 (no +, spaces or dashes).
 */
const WHATSAPP_NUMBER = "2348137252033";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
const hint = document.getElementById("form-hint");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      if (hint) {
        hint.textContent = "Before enquiries can be sent, add your WhatsApp number in script.js (WHATSAPP_NUMBER).";
        hint.classList.add("notice");
      }
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const brand = String(data.get("brand") || "").trim();
    const service = String(data.get("service") || "").trim();
    const details = String(data.get("details") || "").trim();
    const message = [
      "Hello Dominion Empire! I'd like to discuss a creative project.",
      "",
      "Name: " + name,
      "Brand: " + (brand || "Not provided"),
      "Service: " + service,
      "Project details: " + (details || "I'd like to discuss this.")
    ].join("\n");

    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener,noreferrer");
    if (hint) hint.textContent = "Your WhatsApp enquiry is ready. Send the message to start the conversation.";
  });
}