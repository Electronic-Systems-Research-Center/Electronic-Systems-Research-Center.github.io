// DOM elements
const container = document.getElementById('container');
const chatContainer = document.getElementById('chat-container');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const quickOptionsContainer = document.getElementById('quick-options');

let shapetech = null;

// Initialize robot GIF
function initRobotGif() {
  // Create an image element for the robot GIF
  const robotImage = document.createElement('img');
  robotImage.src = 'robot.gif';
  robotImage.alt = 'ESRC Robot Assistant';
  robotImage.style.width = '100%';
  robotImage.style.height = '100%';
  robotImage.style.objectFit = 'cover';
  
  // Clear the container and append the image
  container.innerHTML = '';
  container.appendChild(robotImage);
  
  console.log('Robot GIF initialized');
}

// Load shapetech data and initialize immediately
(async function() {
  try {
    const response = await fetch('faq.json');
    shapetech = await response.json();
    console.log('Data loaded successfully:', shapetech);
  } catch (error) {
    console.error('Error loading shapetech data:', error);
    // Create a default shapetech object if loading fails
    shapetech = {
      "about": {
        "vision": "To be the leading provider of innovative and sustainable technology solutions.",
        "mission": "To deliver high-quality, reliable, and user-friendly digital products that empower businesses and individuals."
      },
      "services": [
        "Electronic Prototyping",
        "PCB Fabrication",
        "3D Modeling and Printing",
        "Data Logging Schematic",
        "Research Consultation"
      ],
      "contact": {
        "phone": "(043) 980 0385 loc.2405",
        "email": "esrc@g.batstate-u.edu.ph"
      }
    };
  }
})();

// Get AI response based on user message
function getAIResponse(message) {
  console.log('Getting response for:', message);
  
  if (!shapetech) {
    console.warn('No shapetech data available');
    return "😊 Thank you for your inquiry! We'll get back to you as soon as possible.";
  }

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("vision")) return shapetech.about.vision;
  if (lowerMessage.includes("mission")) return shapetech.about.mission;
  if (lowerMessage.includes("services")) return shapetech.services.join(', ');
  if (lowerMessage.includes("contact")) {
    return `📞 Contact us at: ${shapetech.contact.phone} or ${shapetech.contact.email}`;
  }
  if (lowerMessage.includes("appointment") || lowerMessage.includes("schedule")) {
    return "To have an appointment, please visit: **https://forms.gle/giQ5iWjGrmsEf3359** and log your appointment.";
  }
  if (lowerMessage.includes("3d printing") || lowerMessage.includes("requirements") || lowerMessage.includes("3d printer")) {
    return "Requirements for 3D printing service:\n\nStep 1: Create a letter indicating the purpose and when you will use the 3D printer.\nStep 2: When approved, bring your own 3D printer filament (Brand: Polymaker, Diameter: 2.85mm).";
  }

  return "I don't have specific information about that. Please ask about our services, contact information, vision, mission, appointment scheduling, or 3D printing requirements.";
}

// Add message to the chat window
function displayMessage(message, isUser = false) {
  const msg = document.createElement('div');
  msg.innerHTML = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  msg.classList.add('message', isUser ? 'user' : 'bot');
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle message sending
function handleSend() {
  const message = userInput.value.trim();
  if (message === '') return;

  // Display user message
  displayMessage(message, true);
  
  // Get and display AI response
  const aiResponse = getAIResponse(message);
  setTimeout(() => {
    displayMessage(aiResponse);
  }, 400);

  // Clear input field
  userInput.value = '';
}

// Create quick option buttons
function createQuickOptions() {
  const options = [
    { text: "Services", handler: () => handleQuickOption("What services do you offer?") },
    { text: "Contact", handler: () => handleQuickOption("How can I contact you?") },
    { text: "Appointment", handler: () => handleQuickOption("How can I have an appointment?") },
    { text: "3D Printing", handler: () => handleQuickOption("What are the requirements for 3D printing service?") }
  ];
  
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.classList.add('quick-option-btn');
    button.addEventListener('click', option.handler);
    quickOptionsContainer.appendChild(button);
  });
}

// Handle quick option selection
function handleQuickOption(question) {
  displayMessage(question, true);
  
  const aiResponse = getAIResponse(question);
  setTimeout(() => {
    displayMessage(aiResponse);
  }, 400);
}

// Make the robot GIF container clickable to toggle the chat
container.addEventListener('click', () => {
  const wasHidden = chatContainer.classList.contains('hidden');
  chatContainer.classList.toggle('hidden');
  
  if (wasHidden) {
    userInput.focus();
    
    // Show welcome message if chat was previously hidden and no messages exist
    if (chatMessages.children.length === 0) {
      displayMessage("Hello!👋 Welcome to Electronic Systems Research Center. How can I assist you today? 😊");
    }
  }
});

// Send message on button click
sendButton.addEventListener('click', handleSend);

// Send message on Enter key
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSend();
  }
});

// Initialize everything when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize robot GIF
  initRobotGif();
  
  // Create quick option buttons
  createQuickOptions();
  
  console.log('Document loaded, initialization complete');
});