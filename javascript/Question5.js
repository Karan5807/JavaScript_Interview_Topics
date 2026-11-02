// 2635. Apply Transform Over Each Element in Array

// Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element.

// The returned array should be created such that returnedArray[i] = fn(arr[i], i).

// Please solve it without the built-in Array.map method.

var map = function(arr, fn) {
    var result = [];
    for(var i =0; i<arr.length; i++){
        result.push(fn(arr[i], i));
    } 
    return result;
};

// Solve it using Map

var mapUsingMap = function(arr, fn) {
    return arr.map((value, index) => fn(value, index));
}

// var without using Map and var using Map are two different implementations of the same functionality. The first one uses a for loop to iterate through the array and apply the mapping function, while the second one uses the built-in Array.map method to achieve the same result.

var newMap = function(arr, fn) {
    var arrLength = arr.length;
    var newResult = new Array(arrLength);
    for(var i = 0; i<arrLength; i++){
        newResult[i] = fn(arr[i], i);
    }
    return newResult;
}