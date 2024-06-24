export function IsValidity() {
    const textToType = document.querySelector('.text-to-type').innerText;
    const typingInput = document.getElementById('typing-input');
    const scrollableContent = document.getElementById('scrollableContent');
    let scrollPosition = 0;
    const lineHeight = 8; // Adjust this value based on your line height

    function scrollDown() {
        scrollPosition += lineHeight;
        scrollableContent.style.transform = `translateY(-${scrollPosition}px)`;

        // Check if we have reached the bottom of the content
        if (scrollableContent.scrollHeight - scrollPosition <= scrollableContent.clientHeight) {
            scrollPosition = 0; // Reset to top
        }
    }

    typingInput.addEventListener('input', () => {
        const typedText = typingInput.value;
        updateTextToType(typedText);
    });
    
    function updateTextToType(typedText) {
        const textToTypeElement = document.querySelector('.text-to-type');
        let updatedHTML = '';
        for (let i = 0; i < textToType.length; i++) {
            if (i < typedText.length) {
                if (typedText[i] === textToType[i]) {
                    updatedHTML += `<span class="correct-char">${textToType[i]}</span>`;
                } else {
                    updatedHTML += `<span class="incorrect-char">${textToType[i]}</span>`;
                }
            } else {
                updatedHTML += textToType[i];
            }
        }
        textToTypeElement.innerHTML = updatedHTML;
    }
    scrollDown()
};
