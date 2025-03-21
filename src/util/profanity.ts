import words from 'profane-words';

/**
 * @module Profanity
 * @description This module provides functions for censoring and detecting profanity in text.
 */

/**
 * Options for customizing the censoring behavior.
 */
export interface CensorOptions {
    censorCharacter?: string;
    censorLength?: boolean;
    ignoreCase?: boolean;
    wholeWordsOnly?: boolean;
    customReplacements?: Record<string, string>;
}

/**
 * Censors profanity in a given text with customizable options.
 * @param {string} text - The text to censor.
 * @param {CensorOptions} options - Options for customizing the censoring behavior.
 * @returns {string} The censored text.
 */
export const censorText = (text: string, options: CensorOptions = {}): string => {
    const {
        censorCharacter = '*',
        censorLength = true,
        ignoreCase = true,
        wholeWordsOnly = true,
        customReplacements = {},
    } = options;

    let censoredText = text;
    const flags = ignoreCase ? 'gi' : 'g';

    Object.entries(customReplacements).forEach(([word, replacement]) => {
        const regex = wholeWordsOnly ? new RegExp(`\\b${word}\\b`, flags) : new RegExp(word, flags);
        censoredText = censoredText.replace(regex, replacement);
    });

    words.forEach((word: string) => {
        const regex = wholeWordsOnly ? new RegExp(`\\b${word}\\b`, flags) : new RegExp(word, flags);
        censoredText = censoredText.replace(regex, (match) => {
            if (censorLength) {
                return censorCharacter.repeat(match.length);
            } else {
                return censorCharacter;
            }
        });
    });

    return censoredText;
};

/**
 * Checks if a given text contains profanity with customizable options.
 * @param {string} text - The text to check.
 * @param {CensorOptions} options - Options for customizing the checking behavior.
 * @returns {boolean} True if the text contains profanity, false otherwise.
 */
export const isProfane = (text: string, options: CensorOptions = {}): boolean => {
    const { ignoreCase = true, wholeWordsOnly = true, customReplacements = {} } = options;
    const flags = ignoreCase ? 'i' : '';

    for (let word of Object.keys(customReplacements)) {
        const regex = wholeWordsOnly ? new RegExp(`\\b${word}\\b`, flags) : new RegExp(word, flags);
        if (regex.test(text)) {
            return true;
        }
    }

    for (let word of words) {
        const regex = wholeWordsOnly ? new RegExp(`\\b${word}\\b`, flags) : new RegExp(word, flags);
        if (regex.test(text)) {
            return true;
        }
    }
    return false;
};

/**
 * Returns an array of profane words found in the given text.
 * @param {string} text - The text to search.
 * @param {CensorOptions} options - Options for customizing the search behavior.
 * @returns {string[]} An array of profane words found.
 */
export const getProfaneWords = (text: string, options: CensorOptions = {}): string[] => {
    const { ignoreCase = true, wholeWordsOnly = true, customReplacements = {} } = options;
    const flags = ignoreCase ? 'i' : '';
    const foundWords: string[] = [];

    Object.keys(customReplacements).forEach((word) => {
        const regex = wholeWordsOnly ? new RegExp(`\\b${word}\\b`, flags) : new RegExp(word, flags);
        const matches = text.match(regex);
        if (matches) {
            foundWords.push(...matches);
        }
    });

    words.forEach((word) => {
        const regex = wholeWordsOnly ? new RegExp(`\\b${word}\\b`, flags) : new RegExp(word, flags);
        const matches = text.match(regex);
        if (matches) {
            foundWords.push(...matches);
        }
    });

    return [...new Set(foundWords)];
};

/**
 * Adds custom profane words to the list.
 * @param {string[]} newWords - An array of new profane words to add.
 */
export const addProfaneWords = (newWords: string[]): void => {
    words.push(...newWords);
};

/**
 * Removes profane words from the list.
 * @param {string[]} wordsToRemove - An array of profane words to remove.
 */
export const removeProfaneWords = (wordsToRemove: string[]): void => {
    wordsToRemove.forEach((wordToRemove) => {
        const index = words.indexOf(wordToRemove);
        if (index !== -1) {
            words.splice(index, 1);
        }
    });
};

/**
 * Returns the current list of profane words.
 * @returns {string[]} The current list of profane words.
 */
export const getProfanityList = (): string[] => {
    return [...words];
};
