module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);

// const catchAsyncErrors = (req, res, next) => {
//   Promise.resolve(catchAsyncErrors(req, res, next)).catch(next)
// };

// module.exports = {catchAsyncErrors}