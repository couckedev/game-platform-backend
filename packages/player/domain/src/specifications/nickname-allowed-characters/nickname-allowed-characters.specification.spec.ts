import { describe } from "vitest";
import { NicknameAllowedCharacters } from "./nickname-allowed-characters.specification";

describe('Nickname allowed characters specification', () => {
    describe('isSatisfiedBy', () => {
        it('should return false if given nickname contains forbidden characters', () => {
            const nicknameValue = 'nickname$*ù';
            
            const containsOnlyAllowedCharacters = NicknameAllowedCharacters.isSatisfiedBy(nicknameValue);

            expect(containsOnlyAllowedCharacters).toBeFalsy()
        });
        
        it('should return true if given nickname contains only allowed characters', () => {
            const nicknameValue = '_nick-name_1234';
            
            const containsOnlyAllowedCharacters = NicknameAllowedCharacters.isSatisfiedBy(nicknameValue);

            expect(containsOnlyAllowedCharacters).toBeTruthy()
        });
    })
});