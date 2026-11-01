// Write a function createCounter. It should accept an initial integer init. It should return an object with three functions.

// write a function createCounter. It should accept an initial integer init. It should return an object with three functions. Leetcode Question number 2620.

// The three functions are:

// increment() increases the current value by 1 and then returns it.
// decrement() reduces the current value by 1 and then returns it.
// reset() sets the current value to init and then returns it.

let createCounter = function(init){
    var currentValue = init;
    return {
        increment: function() {
            currentValue++;
            return currentValue;
        },
        decrement: function() {
            currentValue--;
            return currentValue;
        },
        reset: function() {
            currentValue = init;
            return currentValue;
        }
    };
}

// Code Execution
let counter = createCounter(5);
console.log(counter.increment()); // 6
console.log(counter.decrement()); // 5
console.log(counter.reset()); // 5


// Explanation of the code:
// 1. The createCounter function takes an initial integer 'init' as an argument and initializes a variable 'currentValue' with this value.
// 2. It returns an object containing three methods: increment, decrement, and reset.
// 3. The increment method increases the current value by 1 and returns the updated value.
// 4. The decrement method decreases the current value by 1 and returns the updated value.
// 5. The reset method sets the current value back to the initial value 'init' and returns it.
// 6. The example code demonstrates how to use the createCounter function and its methods.