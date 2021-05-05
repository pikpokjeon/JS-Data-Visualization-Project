const { Store, predefinedData } = require('../Charts-refactoring/lib/Store')

const { expect } = require('chai')

// Jest 써서 테스트 해봐야 함
// 콘솔로그 이제 그만...

describe('Store파일 테스트', () =>
{
    describe('Store 초기 정보 설정 검사', () =>
    {
        it('사전 정의 객체 대입', () =>
        {
            const obj = {
                userInputs: {
                    data: {
                        w: 1500,
                        d: [0, 230],
                        d_label: [0, 230].map((_, i) => 2010 + i),
                        d_memo: Array([0, 230].length).fill(1),
                        lineType: 'default'
                    },
                    subs: []
                },
                chartEvent: {
                    data:
                    {
                        lastIdx: -1,
                        selectedIdx: { start: -1, end: -1 }
                    },
                    subs: []

                }

            }
            
            expect(Store(predefinedData)).to.equal(obj)
        })
    })
})