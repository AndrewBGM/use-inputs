const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
const numbers = '0123456789'
const lettersAndNumbers = letters + numbers

export const takeFrom = (count: number, str: string): string[] =>
  [...Array(count)].map(() => str[Math.floor(Math.random() * str.length)])

export const generateId = (len = 8): string =>
  [...takeFrom(1, letters), ...takeFrom(len - 1, lettersAndNumbers)].join('')
