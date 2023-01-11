import { clearDelimiters, upperCase } from '../rename';

const EXAMPLES = {
    twoWords: {
        flat: 'twowords',
        upper: 'TWOWORDS',
        camel: 'twoWords',
        pascal: 'TwoWords',
        snake: 'two_words',
        upper_snake: 'TWO_WORDS',
        camel_snake: 'two_Words',
        pascal_snake: 'Two_Words',
        kebab: 'two-words',
        train: 'TWO-WORDS',
        upper_train: 'Two-Words',
    },
};

describe('rename', () => {
    test('clearDelimiters', () => {
        expect(clearDelimiters('two_words')).toBe('twowords');
        expect(clearDelimiters('TWO_WORDS')).toBe('TWOWORDS');
        expect(clearDelimiters('two_Words')).toBe('twoWords');
        expect(clearDelimiters('Two_Words')).toBe('TwoWords');
        expect(clearDelimiters('two-words')).toBe('twowords');
        expect(clearDelimiters('TWO-WORDS')).toBe('TWOWORDS');
        expect(clearDelimiters('Two-Words')).toBe('TwoWords');
    });

    describe('upperCase', () => {
        for (const str of Object.values(EXAMPLES.twoWords)) {
            it(str, () => {
                expect(upperCase(clearDelimiters(str))).toBe(EXAMPLES.twoWords.upper);
            });
        }
    });

    // TODO: finish tests
});
