import Result from '../Result';

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

    const startTime = new Date().getTime();
    typingInput.addEventListener('input', () => {
        if (typingInput.value.length === textToType.length) {
            const results = calculateResults(typingInput.value, textToType, startTime, new Date().getTime())
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('wpm').textContent = results.wpm + 'wpm';
            document.getElementById('accuracy').textContent = results.accuracy + '%';
        }
        const typedText = typingInput.value;
        updateTextToType(typedText);
    });

    function updateTextToType(typedText) {
        const textToTypeElement = document.querySelector('.text-to-type');
        let updatedHTML = '';
        for (let i = 0; i < textToType.length; i++) {
            if (i < typedText.length) {
                if (typedText[i] === textToType[i]) {
                    // updatedHTML += `<span class="correct-char">${textToType[i]}</span>`;
                } else {
                    updatedHTML += `<span class="incorrect-char">${textToType[i]}</span>`;
                }
            } else {
                updatedHTML += textToType[i];
            }
        }
        textToTypeElement.innerHTML = updatedHTML;
    }
    function calculateResults(textTyped, originalText, startTime, endTime) {
        const timeTakenMinutes = (endTime - startTime) / 60000; // Time in minutes
        const totalCharactersTyped = textTyped.length;
        const wordsTyped = totalCharactersTyped / 5;

        // Calculate WPM
        const wpm = Math.round(wordsTyped / timeTakenMinutes);

        // Calculate accuracy
        let correctCharacters = 0;
        for (let i = 0; i < textTyped.length; i++) {
            if (textTyped[i] === originalText[i]) {
                correctCharacters++;
            }
        }
        const accuracy = Math.round((correctCharacters / totalCharactersTyped) * 100);

        return { wpm, accuracy };
    }
    scrollDown()
};
