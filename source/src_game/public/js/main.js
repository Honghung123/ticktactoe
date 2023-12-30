// Text typing animation
const element = $(".text-typing-animation")[0];
const text = element.innerText;
let startIdx = 1;
let reverseTyping = false; 
function typingText() { 
  if (startIdx < text.length && !reverseTyping) {
    element.innerText = text.slice(0, startIdx + 1);
    startIdx++;
  } else if (startIdx >= 1 && reverseTyping) {
    element.innerText = text.slice(0, startIdx);
    startIdx--;
  } else {
    reverseTyping = !reverseTyping;
  }
  const speedVal = 40;
  const typingSpeed = reverseTyping ? speedVal : speedVal * 4; // Adjust typing and reversing speed here
  setTimeout(typingText, typingSpeed);
}
typingText();
