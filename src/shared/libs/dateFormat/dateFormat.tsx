import { getLocal } from '@/shared/libs/getLocal/getLocal.tsx'

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}
const timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}

const allOptions = {...dateOptions, ...timeOptions}
type Format = 'date' | 'time' | 'all'


export const dateFormat = (
  date: Date,
  format: Format = 'date'
) => {
  const local = getLocal()

  const options: Record<Format, any> = {
    date: dateOptions,
    time: timeOptions,
    all: allOptions
  }

  return new Intl.DateTimeFormat(local, options[format]).format(date)
}