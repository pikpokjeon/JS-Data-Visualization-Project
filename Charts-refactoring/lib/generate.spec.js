
import { genCoord } from './generate'

describe('genCoord 입출력 테스트', () =>
{
    const [width, dataArry, idx , v] = [1500, [2, 3, 4, 5, 6, 3, 1,], 5, -1]
    const expectation = { x1: 1071, x2: 1071 }
    const genCoordTest = genCoord(width, dataArry).group.x(idx).couple

    test('Store 초기 정보 설정 검사', () =>
        expect(genCoordTest).toEqual(expectation)
    )
})
