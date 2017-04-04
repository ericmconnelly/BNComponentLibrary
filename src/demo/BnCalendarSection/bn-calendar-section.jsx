import React from 'react'

import BnDatePickerExample from './bn-date-picker-example'
import BnDatePickerText from './bn-date-picker-text'
import BnDateRangePickerExample from './bn-date-range-picker-example'
import BnDateRangePickerText from './bn-date-range-picker-text'

export default function BnCalendarSection() {
  return (
    <section className="docs-section docs-section-calendar">
      <h2 id="calendar" className="docs">Calendar</h2>

      <section className="docs-block docs-section-date-picker">
        <BnDatePickerText />
        <BnDatePickerExample />
      </section>

      <section className="docs-block docs-section-date-range-picker">
        <BnDateRangePickerText />
        <BnDateRangePickerExample />
      </section>
    </section>
  )
}
