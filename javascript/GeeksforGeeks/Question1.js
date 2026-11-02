// Basic JavaScript Questions (1–20)
// 1. How do you reverse a string in JavaScript?
// You can reverse a string in JavaScript by converting it into an array, reversing the array, and then joining it back into a string. Here's an example:

// First by using built-in methods:

const reverseString = (str) => {
    return str.split('').reverse().join('');
}