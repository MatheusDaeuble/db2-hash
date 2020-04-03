export const generatePrimeNumber = (number) => {
  let currentNumber=number;
  while (true) {
    if(this.isPrime(currentNumber)) return currentNumber;
    currentNumber++;
  }
}

isPrime = number => {
  for(let i = 2; i < number; i++)
    if (number % i === 0) return false;
  return number > 1;
}