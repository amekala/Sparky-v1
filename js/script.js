document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap components
  initBootstrapComponents();
  
  // Add event handlers to interactive elements
  addEventHandlers();
  
  // Simulate chat messages for demo purposes
  if (document.querySelector('.chat-container')) {
    simulateChatTyping();
  }
});

function initBootstrapComponents() {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Initialize popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}

function addEventHandlers() {
  // Chat input functionality
  const chatInput = document.querySelector('.input-box');
  const sendButton = document.querySelector('.send-button');
  
  if (chatInput && sendButton) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    sendButton.addEventListener('click', sendMessage);
  }
  
  // Sponsored prompt click handlers
  const sponsoredPrompts = document.querySelectorAll('.sponsored-prompt');
  sponsoredPrompts.forEach(prompt => {
    prompt.addEventListener('click', function() {
      const promptText = this.querySelector('span:first-child').textContent;
      chatInput.value = promptText;
      chatInput.focus();
    });
  });
  
  // Product item click handlers
  const productItems = document.querySelectorAll('.product-item');
  productItems.forEach(item => {
    item.addEventListener('click', function() {
      const productName = this.querySelector('.product-name').textContent;
      // Simulate a product selection action
      showToast(`Added ${productName} to your cart!`);
    });
  });
  
  // Trending item click handlers
  const trendingItems = document.querySelectorAll('.trending-item');
  trendingItems.forEach(item => {
    item.addEventListener('click', function() {
      const trendText = this.querySelector('.trending-text').textContent;
      chatInput.value = `Tell me about ${trendText}`;
      chatInput.focus();
    });
  });
}

function sendMessage() {
  const chatInput = document.querySelector('.input-box');
  const chatContainer = document.querySelector('.chat-container');
  
  if (!chatInput.value.trim()) return;
  
  // Create user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.textContent = chatInput.value;
  
  // Add timestamp
  const timestamp = document.createElement('div');
  timestamp.className = 'message-time';
  timestamp.textContent = getCurrentTime();
  userMessage.appendChild(timestamp);
  
  // Add to chat
  chatContainer.appendChild(userMessage);
  
  // Clear input
  const userText = chatInput.value;
  chatInput.value = '';
  
  // Add clearfix
  const clearfix = document.createElement('div');
  clearfix.className = 'clearfix';
  chatContainer.appendChild(clearfix);
  
  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
  
  // Simulate bot response after delay
  setTimeout(() => {
    simulateBotResponse(userText);
  }, 1000);
}

function simulateBotResponse(userText) {
  const chatContainer = document.querySelector('.chat-container');
  
  // Create bot message
  const botMessage = document.createElement('div');
  botMessage.className = 'message bot-message';
  
  // Add bot avatar
  const botAvatar = document.createElement('div');
  botAvatar.className = 'bot-avatar';
  botAvatar.textContent = 'S';
  botMessage.appendChild(botAvatar);
  
  // Create text node (response text)
  const textNode = document.createTextNode(
    `I see you're interested in "${userText}". Let me help you with that!`
  );
  botMessage.appendChild(textNode);
  
  // Add timestamp
  const timestamp = document.createElement('div');
  timestamp.className = 'message-time';
  timestamp.textContent = getCurrentTime();
  botMessage.appendChild(timestamp);
  
  // Add to chat
  chatContainer.appendChild(botMessage);
  
  // Add clearfix
  const clearfix = document.createElement('div');
  clearfix.className = 'clearfix';
  chatContainer.appendChild(clearfix);
  
  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function simulateChatTyping() {
  const messages = [
    "I'm looking for summer clothing ideas",
    "What are the top outdoor furniture pieces this season?",
    "Can you recommend some kitchen gadgets?"
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const chatInput = document.querySelector('.input-box');
  
  if (chatInput) {
    chatInput.setAttribute('placeholder', randomMessage + '...');
  }
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12
  
  return `${hours}:${minutes} ${ampm}`;
}

function showToast(message) {
  // Create toast container if it doesn't exist
  if (!document.querySelector('.toast-container')) {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  const toastContainer = document.querySelector('.toast-container');
  
  // Create toast
  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  
  toastEl.innerHTML = `
    <div class="toast-header">
      <strong class="me-auto">Sparky</strong>
      <small>Just now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;
  
  toastContainer.appendChild(toastEl);
  
  // Initialize and show toast
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
  
  // Remove toast after it's hidden
  toastEl.addEventListener('hidden.bs.toast', function() {
    toastEl.remove();
  });
} 