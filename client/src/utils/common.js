// utils/common.js

/**
 * Converts a string to lower case if it is not null.
 * @param {string} str - The string to convert.
 * @returns {string|null} The converted string or null if the input is null.
 */
function convertToLower(str) {
  if (str === null || str === undefined) {
    return null;
  }
  return str.toLowerCase();
}

/**
 * Converts a string to camel case if it is not null.
 * @param {string} str - The string to convert.
 * @returns {string|null} The converted string or null if the input is null.
 */
function convertToCamelCase(str) {
  if (str === null) {
    return null;
  }
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

/**
 * Compares two strings after converting them to lowercase.
 * @param {string} str1 - The first string to compare.
 * @param {string} str2 - The second string to compare.
 * @returns {boolean} True if the two strings are equal after converting to lowercase, false otherwise.
 */
function compareStrings(str1, str2) {
  const lowerStr1 = convertToLower(str1);
  const lowerStr2 = convertToLower(str2);
  return lowerStr1 === lowerStr2;
}

module.exports = {
  convertToLower,
  convertToCamelCase,
  compareStrings,
};