function calculateResults(textTyped, originalText, typedTime) {
    const totalCharactersTyped = textTyped.length;
    const wordsTyped = totalCharactersTyped / 5;

    // Calculate WPM
    const wpm = Math.round(wordsTyped / typedTime);

    // Calculate accuracy
    let correctCharacters = 0;
    for (let i = 0; i < textTyped.length; i++) {
        if (textTyped[i] === originalText[i]) {
            correctCharacters++;
        }
    }
    const accuracy = Math.round((correctCharacters / totalCharactersTyped) * 100);

    return { wpm, accuracy };
};
