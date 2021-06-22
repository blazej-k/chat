import { renderHook } from '@testing-library/react-hooks'
import { useColor } from '../hooks/ContextHooks'

describe('UseColor', () => {
    test('should set default main and second color', () => {
        const { result: { current: { mainColor, secondColor } } } = renderHook(useColor)
        expect(mainColor).toEqual('blue')
        expect(secondColor).toEqual('red')
    })
})