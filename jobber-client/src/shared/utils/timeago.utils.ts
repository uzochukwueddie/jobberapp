import { differenceInCalendarDays, format, getISOWeek, isSameDay, subDays } from 'date-fns';

export class TimeAgo {
  static transform(value: string | number | Date): string {
    if (!value) {
      return '';
    }
    const date = typeof value === 'string' ? new Date(value) : value;
    return this.timeDifference(new Date(), new Date(date));
  }

  static chatMessageTransform(value: string | number | Date): string {
    if (!value) {
      return '';
    }
    const date = typeof value === 'string' ? new Date(value) : value;
    const yesterday = subDays(new Date(), 1);
    if (isSameDay(date, new Date())) {
      return 'Today';
    } else if (isSameDay(date, yesterday)) {
      return 'Yesterday';
    } else if (getISOWeek(new Date()) === getISOWeek(date) || getISOWeek(new Date()) - getISOWeek(date) === 1) {
      return format(date, 'EEEE');
    } else {
      return format(date, 'd MMMM, yyyy');
    }
  }

  static formatDateToMonthAndYear(value: string): string {
    if (!value) {
      return '';
    }
    const date: Date = new Date(value);
    return format(date, 'MMMM, yyyy');
  }

  static dayMonthYear(value: string): string {
    const date: Date = new Date(value);
    return format(date, 'd MMMM, yyyy');
  }

  static dayWithTime(value: string): string {
    const date: Date = new Date(value);
    return `${format(date, 'd MMM')} at ${format(date, 'HH:mm')}`;
  }

  static timeFormat(value: string): string {
    const date: Date = new Date(value);
    return format(date, 'HH:mm a');
  }

  static compareDates(date1: string, date2: string): number {
    const firstDate: string = format(new Date(date1), 'd/MM/yyyy');
    const secondDate: string = format(new Date(date2), 'd/MM/yyyy');
    if (firstDate > secondDate) {
      return -1;
    } else if (firstDate < secondDate) {
      return 1;
    } else {
      return 0;
    }
  }

  static dateInDays(date: string): string {
    let result = '';
    const difference: number = differenceInCalendarDays(new Date(), new Date(date));
    const months: number = Math.floor(difference / 30);
    if (months <= 0) {
      const weeks: number = Math.floor(difference / 7);
      result = weeks >= 1 ? `${weeks} week${weeks >= 2 ? 's' : ''}` : `${difference} day${difference >= 2 ? 's' : ''}`;
    } else if (months === 1) {
      result = `${months} month`;
    } else {
      result = `${months} months`;
    }
    return result;
  }

  static timeDifference(current: number | Date, date: number | Date): string {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const elapsed = current.valueOf() - date.valueOf();

    if (format(current, 'yyyy') === format(date, 'yyyy')) {
      if (elapsed < msPerMinute) {
        return this.secondsAgo(elapsed);
      } else if (elapsed < msPerHour) {
        return this.minutesAgo(elapsed, msPerMinute);
      } else if (elapsed < msPerDay) {
        return this.hoursAgo(elapsed, msPerHour);
      } else if (elapsed < msPerMonth) {
        return this.monthsAgo(date, elapsed, msPerDay);
      } else {
        return format(date, 'MMM d');
      }
    } else {
      return format(date, 'MMM d, yyyy');
    }
  }

  static secondsAgo(elapsed: number): string {
    if (Math.round(elapsed / 1000) <= 1) {
      return 'a second ago';
    } else {
      return `${Math.round(elapsed / 1000)} seconds ago`;
    }
  }

  static minutesAgo(elapsed: number, msPerMinute: number): string {
    if (Math.round(elapsed / msPerMinute) <= 1) {
      return 'a minute ago';
    } else {
      return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    }
  }

  static hoursAgo(elapsed: number, msPerHour: number): string {
    if (Math.round(elapsed / msPerHour) <= 1) {
      return 'an hour ago';
    } else {
      return `${Math.round(elapsed / msPerHour)} hours ago`;
    }
  }

  static monthsAgo(date: number | Date, elapsed: number, msPerDay: number): string {
    if (Math.round(elapsed / msPerDay) <= 7) {
      return format(date, 'eeee');
    } else {
      return format(date, 'MMM d');
    }
  }
}
