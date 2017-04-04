import moment from 'moment'

export default function getPresets() {
  return {
    'Today': () => ({
      start_date: moment(),
      end_date: moment(),
    }),
    'Yesterday': () => ({
      start_date: moment().subtract(1, 'day'),
      end_date: moment().subtract(1, 'day'),
    }),
    'This week': () => ({
      start_date: moment().startOf('week'),
      end_date: moment().endOf('week'),
    }),
    'Last week': () => ({
      start_date: moment().subtract(1, 'week').startOf('week'),
      end_date: moment().subtract(1, 'week').endOf('week'),
    }),
    'Last 7 days': () => ({
      start_date: moment().subtract(7, 'days'),
      end_date: moment(),
    }),
    'Last 14 days': () => ({
      start_date: moment().subtract(14, 'days'),
      end_date: moment(),
    }),
    'Last 28 days': () => ({
      start_date: moment().subtract(28, 'days'),
      end_date: moment(),
    }),
    'Last 30 days': () => ({
      start_date: moment().subtract(30, 'days'),
      end_date: moment(),
    }),
    'Last 90 days': () => ({
      start_date: moment().subtract(90, 'days'),
      end_date: moment(),
    }),
    'This month': () => ({
      start_date: moment().startOf('month'),
      end_date: moment().endOf('month'),
    }),
    'Last month': () => ({
      start_date: moment().subtract(1, 'month').startOf('month'),
      end_date: moment().subtract(1, 'month').endOf('month'),
    }),
    'Last 3 months': () => ({
      start_date: moment().subtract(3, 'month').startOf('month'),
      end_date: moment().subtract(1, 'month').endOf('month'),
    }),
  }
}

