const errorResponse = (
  res,
  { statusCode = 500, message = "internal Server error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "success", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};

module.exports = {
  errorResponse,
  successResponse,
};
