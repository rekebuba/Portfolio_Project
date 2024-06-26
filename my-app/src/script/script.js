import Result from '../Result';

export function calculateResults(textTyped, originalText, startTime, endTime) {
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
};
