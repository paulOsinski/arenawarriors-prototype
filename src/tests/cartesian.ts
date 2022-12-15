// credit due to StackOverflow
// https://stackoverflow.com/questions/15298912/javascript-generating-combinations-from-n-arrays-with-m-elements
// For testing purposes, this creates all possible combinations of any element in an array

export const cartesian = (...args: any) => {
  var r: any = [],
    max = args.length - 1;
  function helper(arr: any, i: any) {
    for (var j = 0, l = args[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
};
