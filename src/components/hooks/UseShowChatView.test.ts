import { useShowChatView } from "./ContextHooks";
import { renderHook } from "@testing-library/react-hooks";

describe('useShowChatView', () => {
    test('should return object', () => {
        const { result: { current } } = renderHook(useShowChatView)
        expect(typeof current === 'object').toBeTruthy()
    })
    test('should return default values(show only home)', () => {
        const { result: { current } } = renderHook(useShowChatView)
        const { showFriend, showGroup, showHome, friendName, groupId } = current.chatView
        expect(showHome).toBeTruthy()
        expect(showFriend).toBeFalsy()
        expect(showGroup).toBeFalsy()
        expect(friendName).toBe('')
        expect(groupId).toBe('')
    })
})