/*
* jQuery Mobile Framework : plugin to provide a date and time picker.
* Copyright (c) JTSage
* CC 3.0 Attribution.  May be relicensed without permission/notifcation.
* https://github.com/jtsage/jquery-mobile-datebox
*
* Translation by: J.T.Sage <jtsage@gmail.com>
*
*/

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
    'ko': {
        setDateButtonLabel: "날짜설정",
        setTimeButtonLabel: "시간설정",
        setDurationButtonLabel: "기간설정",
        calTodayButtonLabel: "오늘로",
        titleDateDialogLabel: "날짜선택",
        titleTimeDialogLabel: "시간선택",
        daysOfWeek: ["주일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        daysOfWeekShort: ["일","월", "화", "수", "목", "금", "토"],
        monthsOfYear: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        monthsOfYearShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        durationLabel: ["일", "시간", "분", "초"],
        durationDays: ["일", "일"],
        tooltip: "날짜선택 열기",
        nextMonth: "다음달",
        prevMonth: "이전달",
        timeFormat: 24,
        headerFormat: '%Y %B %-d, %A',
        dateFieldOrder: ['y', 'm', 'd'],
        timeFieldOrder: ['h', 'i', 'a'],
        slideFieldOrder: ['y', 'm', 'd'],
        dateFormat: "%Y-%-m-%-d",
        useArabicIndic: false,
        isRTL: false,
        calStartDay: 0,
        clearButton: "Clear",
        durationOrder: ['d', 'h', 'i', 's'],
        meridiem: ["오전", "오후"],
        timeOutput: "%l:%M %p",
        durationFormat: "%Dd %DA, %Dl:%DM:%DS"
    }
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
    useLang: 'ko'
});


