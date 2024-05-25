async function createJob() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const jobType = document.getElementById("jobType").value;
  const jobSource = document.getElementById("jobSource").value;
  const jobDescription = document.getElementById("jobDescription").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zipCode = document.getElementById("zipCode").value;
  const startDate = document.getElementById("startDate").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const technician = document.getElementById("technician").value;

  const userData = {
    firstName,
    lastName,
    phone,
    email,
    jobType,
    jobSource,
    jobDescription,
    address,
    city,
    state,
    zipCode,
    startDate,
    startTime,
    endTime,
    technician,
  };

  try {
    const response = await fetch("http://localhost:3000/saveUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.text();
    console.log(result);
    const createJobBtn = document.getElementById("createJobBtn");
    createJobBtn.textContent = "Request is sent";
    createJobBtn.style.backgroundColor = "red";

    setTimeout(() => {
      createJobBtn.textContent = "Create job";
      createJobBtn.style.backgroundColor = "#f1c40f";
    }, 2000);
  } catch (error) {
    console.error("Error creating job:", error);
    alert("Failed to create job.");
  }
}

function closeForm() {
  document.querySelector(".form-container").style.display = "none";
}
