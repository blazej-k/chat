import useShowChatView from "./ChatHooks";
import { renderHook } from "@testing-library/react-hooks";
import { ChatView } from "../../enums/chatView";
import { act } from "@testing-library/react";

describe('useShowChatView', () => {
    test('should return array', () => {
        const { result: { current } } = renderHook(useShowChatView)
        expect(Array.isArray(current)).toBeTruthy()
    })
    test('should return default values(show only home)', () => {
        const { result: { current } } = renderHook(useShowChatView)
        const { showFriend, showGroup, showHome, friendName, groupId } = current[0]
        expect(showHome).toBeTruthy()
        expect(showFriend).toBeFalsy()
        expect(showGroup).toBeFalsy()
        expect(friendName).toBe('')
        expect(groupId).toBe('')
    })
    test('should show friends chat', () => {
        const { result } = renderHook(useShowChatView)
        const changeChatView = result.current[1]
        act(() => changeChatView(ChatView.friends, 'friend'))
        expect(result.current[0].showFriend).toBeTruthy()
        expect(result.current[0].showHome).toBeFalsy()
        expect(result.current[0].showGroup).toBeFalsy()
        expect(result.current[0].friendName).toBe('friend')
    })
    test('should show groups chat', () => {
        const { result } = renderHook(useShowChatView)
        const changeChatView = result.current[1]
        act(() => changeChatView(ChatView.groups, '1'))
        expect(result.current[0].showFriend).toBeFalsy()
        expect(result.current[0].showHome).toBeFalsy()
        expect(result.current[0].showGroup).toBeTruthy()
        expect(result.current[0].groupId).toBe('1')
    })
})