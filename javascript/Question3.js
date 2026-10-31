// 2704. To Be Or Not To Be Leetcode Problem: https://leetcode.com/problems/to-be-or-not-to-be/
// Write a function expect that helps developers test their code. It should take in any value val and return an object with the following two functions.

//  toBe(val) accepts another value and returns true if the two values === each other. If they are not equal, it should throw an error "Not Equal".
// notToBe(val) accepts another value and returns true if the two values !== each other. If they are equal, it should throw an error "Equal".


// Approach for this Question is to create a function expect that takes a value val as an argument. Inside the expect function, we return an object with two methods: toBe and notToBe.

// Var expect = function(val) {
// return {
// toBe: function(otherVal) { if else case to check if val is equal to otherVal, if yes return true else throw an error "Not Equal" },
// notToBe: function(otherVal) { if else case to check if val is not equal to otherVal, if yes return true else throw an error "Equal" }
// };
// };

function expect(val) {
    return {
        toBe: function (otherVal) {
            if (val === otherVal) {
                return true;
            }   
        throw new Error("Not Equal");
        },
        notToBe: function (otherVal) {
            if (val !== otherVal) {
                return true;
            }
        throw new Error("Equal");
        }
    };
}

let button3 = document.getElementById("question3");
button3.addEventListener("click", function () {
    const input1 = document.getElementById("input1").value;
    const input2 = document.getElementById("input2").value;

    try {
        const result1 = expect(Number(input1)).toBe(Number(input2));
        button3.textContent = result1; // Display the result of toBe
    }       catch (error) {
        console.error("toBe Error:", error.message);
    }   
}
)


// That is my Intial Code to Understand the logic Building the function expect. I have written the code in a different way to understand the logic of the problem.

//  function expect(val){
//     return(
//         function toBe(otherVal){
//             if(val === otherVal){
//                 return true;
//             }
//             throw new Error("Not Equal");
//         },
//         function notToBe(otherVal){
//             if(val !== otherVal){
//                 return true;
//             }
//             throw new Error("Equal");
//         }
//     )
//  }
