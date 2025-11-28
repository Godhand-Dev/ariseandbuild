// UPDATE THESE BEFORE GOING LIVE
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"; // Your Web App URL
const LINKEDIN_URL = "https://script.google.com/macros/s/AKfycbyE_zAAO3khfjuxG62AZdHrPHBY4YlpA6OTidlLUJy9IvYeori5Wtnj46IwI0FrBFui/exec";  // Your LinkedIn

// Update LinkedIn link dynamically
document.querySelector(".linkedin-section a").href = LINKEDIN_URL;

// Form and modal elements
const form = document.getElementById("registrationForm");
const submitBtn = document.querySelector(".submit-btn");
const successModal = document.getElementById("successModal");
const successMessage = document.getElementById("successMessage");
const closeBtn = document.querySelector(".close-btn");

// Close modal when clicking X or outside
closeBtn.onclick = () => successModal.classList.add("hidden");
successModal.onclick = (e) => {
  if (e.target === successModal) successModal.classList.add("hidden");
};

// Main form submission
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form values
  const formData = {
    fullName: document.getElementById("fullName").value.trim(),
    inTech: document.getElementById("inTech").value,
    whatsapp: document.getElementById("whatsapp").value.trim(),
    gender: document.getElementById("gender").value,
    email: document.getElementById("email").value.trim(),
    timestamp: new Date().toLocaleString("en-NG"), // Nigerian time format
  };

  // Validation (extra safety)
  if (!formData.fullName || !formData.whatsapp || !formData.email || !formData.inTech || !formData.gender) {
    alert("Please fill in all required fields.");
    return;
  }

  // UI: Show loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Submitting...`;

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      redirect: "follow",
    })
      .then((res) => res.json())  // Now we can read JSON response!
      .then((data) => {
        if (data.result === "success") {
          showSuccessModal(formData.fullName);
          form.reset();
        } else {
          throw new Error(data.error || "Unknown error from server");
        }
      });

    await response; // Wait for success

  } catch (error) {
    console.error("Submission error:", error);
    alert(
      "Unable to register at the moment. Please try again later or send a WhatsApp message directly to +234 808 289 6892"
    );
  } finally {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});

// Show success modal with personalized message
function showSuccessModal(name) {
  successMessage.innerHTML = `
    <strong>Thank you ${name} for registering!</strong><br><br>
    We have received your details and will get back to you via email shortly.<br><br>
    God bless you as you <strong>Arise and Build</strong>!
  `;
  successModal.classList.remove("hidden");
}
