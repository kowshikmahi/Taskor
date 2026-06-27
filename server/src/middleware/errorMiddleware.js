export function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    message: isProduction && statusCode === 500 ? "Server Error" : err.message || "Server Error",
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
