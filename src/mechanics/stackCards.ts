// Accept an array[] of objects (Cards)
// Loop over the array[] of objects (Cards)
// Add the values of matching keys (moon, sun, etc...)
// Return a new object with the sum of the values of the matching keys

export const stackCards = (...objects: any[]) => {
  return objects.reduce((a, b) => {
    for (let key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = (a[key] || 0) + b[key];
      }
    }

    return a;
  }, {});
};
