/**
 * Create an object composed of the picked object properties
 * @param {Object} object - The source object to pick properties from
 * @param {string[]} keys - The keys to be picked from the object
 * @returns {Object} - A new object containing only the picked properties
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    // Check if the object contains the key
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // Add the key-value pair to the result object
      obj[key] = object[key];
    }
    return obj;
  }, {}); // Start with an empty object as the accumulator
};

const person = {
  name: 'John Doe',
  age: 30,
  location: 'New York',
};

// Pick the 'name' and 'age' properties from the person object
const pickedProps = pick(person, ['name']);
console.log(pickedProps); // Output: { name: 'John Doe', age: 30 }

export default pick;
