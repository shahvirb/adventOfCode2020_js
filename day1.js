const readfile = require('./readfile');
numbers = readfile.readLines('day1.txt', str => parseInt(str));

function findSum(numbers, sum) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if ((i != j) && (numbers[i] + numbers[j] == sum)) {
                return numbers[i] * numbers[j];
            }
        }
    }
}

console.log(findSum(numbers, 2020));