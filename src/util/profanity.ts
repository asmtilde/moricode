import words from 'profane-words';

export const censorText = (text) => {
    let censoredText = text;
    words.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        censoredText = censoredText.replace(regex, '****');
    });
    return censoredText;
};

export const isProfane = (text) => {
    for (let word of words) {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(text)) {
            return true;
        }
    }
    return false;
};