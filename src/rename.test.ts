import { rename } from './rename';

describe('rename', () => {
    test('flat', () => {
        expect(rename('SOME_WORD', 'flat')).toBe('some_word');
    });
});
