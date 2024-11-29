// JavaScript to handle section transitions
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));

        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
    }

    // Initially show the home section
    showSection('home');

    // Show the register section when user wants to register
    document.querySelector('#register-button').addEventListener('click', () => {
        showSection('register');
    });

    // Handle registration form submission
    document.getElementById('registration-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value.trim();

        if (username === '' || password === '') {
            alert('Please fill out all fields.');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.some(user => user.username === username);
        
        if (userExists) {
            alert('Username already exists. Please choose a different one.');
        } else {
            existingUsers.push({ username, password });
            localStorage.setItem('users', JSON.stringify(existingUsers));
            alert('Registration successful! You can now log in.');
            showSection('login'); // Show the login section after registration
        }
    });

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (username === '' || password === '') {
            alert('Please fill out all fields.');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = existingUsers.find(user => user.username === username && user.password === password);
        
        if (validUser) {
            alert(`Welcome, ${username}! Login successful.`);
            showSection('consultation'); // Show the consultation section after login
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    // Add similar functionality for other sections like profile, medical diary, etc.
});

// Handle Registration
document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (username === '' || password === '') {
        alert('Please fill out all fields.');
        return;
    }

    // Retrieve existing users or initialize an empty array if none exists
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Existing Users:', existingUsers); // Debugging

    // Check if the username already exists
    const userExists = existingUsers.some(user => user.username === username);
    if (userExists) {
        alert('Username already exists. Please choose a different one.');
    } else {
        // Save new user to localStorage
        existingUsers.push({ username, password });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        console.log('Updated Users:', existingUsers); // Debugging
        alert('Registration successful! You can now log in.');
        document.getElementById('registration-form').reset(); // Clear form
    }
});

// Handle Login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (username === '' || password === '') {
        alert('Please fill out all fields.');
        return;
    }

    // Retrieve users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Users on Login:', existingUsers); // Debugging

    // Validate the user credentials
    const validUser = existingUsers.find(user => user.username === username && user.password === password);
    if (validUser) {
        alert(`Welcome, ${username}! Login successful.`);
        document.getElementById('login-form').reset(); // Clear form
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // List of doctors and their specializations
    const doctors = [
        { name: "Dr. Alice Smith", specialization: "Cardiologist" },
        { name: "Dr. John Doe", specialization: "Dermatologist" },
        { name: "Dr. Clara Zhou", specialization: "Neurologist" },
        { name: "Dr. David Brown", specialization: "Orthopedic Surgeon" }
    ];

    // Populate the doctor table
    const doctorTableBody = document.querySelector("#doctor-table tbody");
    doctors.forEach((doctor) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td><input type="date" id="appointment-date-${doctor.name.replace(/\s+/g, '-')}" required></td>
            <td><input type="time" id="appointment-time-${doctor.name.replace(/\s+/g, '-')}" required></td>
            <td><button onclick="bookAppointment('${doctor.name.replace(/\s+/g, '-')}')">Book</button></td>
        `;
        doctorTableBody.appendChild(row);
    });
});

// Book Appointment and Set Alarm
function bookAppointment(doctorName) {
    const dateInput = document.getElementById(`appointment-date-${doctorName}`);
    const timeInput = document.getElementById(`appointment-time-${doctorName}`);
    const appointmentDate = dateInput?.value; // Safely access the value
    const appointmentTime = timeInput?.value;

    if (!appointmentDate || !appointmentTime) {
        alert("Please select both a valid date and time.");
        return;
    }

    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const currentTime = new Date();

    if (appointmentDateTime <= currentTime) {
        alert("Appointment time must be in the future.");
        return;
    }

    alert(`Appointment booked with ${doctorName.replace(/-/g, ' ')} on ${appointmentDate} at ${appointmentTime}.`);

    // Set Alarm
    const timeDifference = appointmentDateTime.getTime() - currentTime.getTime();

    if (timeDifference > 0) {
        setTimeout(() => {
            alert(`Reminder: You have an appointment with ${doctorName.replace(/-/g, ' ')} now.`);
        }, timeDifference);
    } else {
        alert("Failed to set reminder. Appointment time is incorrect.");
    }
}
function toggleMenu() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('active'); // Toggle the active class for sliding menu
}
const prescriptions = [];

// Handle prescription submission
document.getElementById('prescription-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const patientName = document.getElementById('patient-name').value;
    const disease = document.getElementById('disease-select').value;
    const medication = document.getElementById('medication').value;

    // Save prescription
    prescriptions.push({ patientName, disease, medication });

    alert(`Prescription for ${patientName} has been saved.`);
    updatePrescriptionRecords();
    document.getElementById('prescription-form').reset();
});

// Update the prescription records
function updatePrescriptionRecords() {
    const recordsDiv = document.getElementById('prescription-records');
    recordsDiv.innerHTML = '<h3>Prescriptions:</h3>';

    if (prescriptions.length === 0) {
        recordsDiv.innerHTML += '<p>No prescriptions available yet.</p>';
    } else {
        prescriptions.forEach((prescription, index) => {
            const record = document.createElement('div');
            record.classList.add('prescription-record');
            record.innerHTML = `
                <p><strong>Patient:</strong> ${prescription.patientName}</p>
                <p><strong>Disease:</strong> ${prescription.disease}</p>
                <p><strong>Prescription:</strong> ${prescription.medication}</p>
                <hr>
            `;
            recordsDiv.appendChild(record);
        });
    }
}
// Function to send user message
function sendMessage() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();

    if (userMessage !== "") {
        addMessage(userMessage, "user");
        userInput.value = ""; // Clear input

        // Simple bot response logic
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, "bot");
        }, 1000); // Simulate delay for bot reply
    }
}

// Function to add message to the chat
function addMessage(message, sender) {
    const chatContent = document.getElementById("chat-content");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerHTML = message;
    chatContent.appendChild(messageDiv);
    chatContent.scrollTop = chatContent.scrollHeight; // Scroll to the latest message
}

// Function to handle user input via the keyboard (Enter key)
function checkInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Simple function to generate bot response based on user input
function getBotResponse(userMessage) {
    const userLower = userMessage.toLowerCase();

    if (userLower.includes("hello") || userLower.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (userLower.includes("how are you")) {
        return "I'm just a bot, but I'm doing well, thanks for asking!";
    } else if (userLower.includes("bye")) {
        return "Goodbye! Have a great day!";
    } else {
        return "Sorry, I didn't quite understand that. Could you rephrase?";
    }
}
// Basic chatbot for medical queries and website FAQs

const predefinedAnswers = {
    "headache": "For headaches, try staying hydrated and resting. If it persists, consult a doctor.",
    "fever": "For fever, stay hydrated and monitor your temperature. Seek medical advice if it gets high.",
    "contact": "You can contact us via the 'Contact Us' section on the website.",
    "login issue": "If you're facing login issues, try resetting your password or contact support.",
    "appointment": "To book an appointment, navigate to the 'Appointments' section on the website.",
    "default": "I'm here to help! Please clarify your query."
};

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();

    if (userMessage !== "") {
        addMessage(userMessage, "user");
        userInput.value = "";

        // Bot response logic
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, "bot");
        }, 1000); // Simulate delay for response
    }
}

function addMessage(message, sender) {
    const chatContent = document.getElementById("chat-content");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerHTML = message;
    chatContent.appendChild(messageDiv);
    chatContent.scrollTop = chatContent.scrollHeight; // Scroll to the latest message
}

function checkInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function getBotResponse(userMessage) {
    const query = userMessage.toLowerCase();

    // Search for a predefined response
    for (let key in predefinedAnswers) {
        if (query.includes(key)) {
            return predefinedAnswers[key];
        }
    }

    // Default response
    return predefinedAnswers["default"];
}
 // Function to show the active section and hide others
 function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    const activeSection = document.getElementById(sectionId);
    if (activeSection) activeSection.classList.add('active');
}

// Perform Search
function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    alert(`Searching for: ${query}`);
    // Implement search functionality here
}

// Hamburger Menu Toggle
document.getElementById('hamburger').addEventListener('click', function() {
    const nav = document.getElementById('navigation');
    nav.classList.toggle('active');
});