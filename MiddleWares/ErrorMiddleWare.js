const ErrorMiddleWare = (err, req, res, next) => {
  res.status(500).json({ message: 'Error here', errors: err, success: false })
}

export default ErrorMiddleWare
