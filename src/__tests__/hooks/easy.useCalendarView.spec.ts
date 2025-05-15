import { act, renderHook } from '@testing-library/react';

import { useCalendarView } from '../../hooks/useCalendarView.ts';
import { assertDate } from '../utils.ts';

/** @description 초기 상태 -> 첫 화면 초기 상태 */
describe('첫 화면 초기 상태', () => {
  /** @description view는 "month"이어야 한다 -> 기본 캘린더 뷰는 월간 캘린더이다. */
  it('기본 캘린더 뷰는 월간 캘린더이다.', () => {
    const { result } = renderHook(() => useCalendarView());
    expect(result.current.view).toBe('month');
  });

  describe('오늘 날짜가 2025년 10월 1일이라고 가정한 날짜 테스트', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.clearAllTimers();
    });

    afterEach(() => {
      vi.clearAllTimers();
      vi.useRealTimers();
    });

    it(`currentDate는 오늘 날짜인 '2025-10-01'이어야 한다`, () => {
      const currentDate = new Date('2025-10-01');
      vi.setSystemTime(currentDate);
      const { result } = renderHook(() => useCalendarView());
      assertDate(result.current.currentDate, currentDate);
    });

    it('holidays는 2025년 10월 휴일인 개천절, 한글날, 추석이 지정되어 있어야 한다', () => {
      const currentDate = new Date('2025-10-01');
      vi.setSystemTime(currentDate);

      const { result } = renderHook(() => useCalendarView());
      console.log(result.current.holidays);

      expect(result.current.holidays).toEqual({
        '2025-10-03': '개천절',
        '2025-10-09': '한글날',
        '2025-10-05': '추석',
        '2025-10-06': '추석',
        '2025-10-07': '추석',
      });
    });
  });

  it("view를 'week'으로 변경 시 적절하게 반영된다", () => {});

  it("주간 뷰에서 다음으로 navigate시 7일 후 '2025-10-08' 날짜로 지정이 된다", () => {});

  it("주간 뷰에서 이전으로 navigate시 7일 후 '2025-09-24' 날짜로 지정이 된다", () => {});

  it("월간 뷰에서 다음으로 navigate시 한 달 전 '2025-11-01' 날짜여야 한다", () => {});

  it("월간 뷰에서 이전으로 navigate시 한 달 전 '2025-09-01' 날짜여야 한다", () => {});

  it("currentDate가 '2025-01-01' 변경되면 1월 휴일 '신정'으로 업데이트되어야 한다", async () => {});
});
