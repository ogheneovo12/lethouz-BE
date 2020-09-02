export function verifyForeignUser(req, res, next) {
  if (req.url == "/logout") return next();
  if (req.session.email)
    return next({
      status: 401,
      message: `a user is currently in session`,
    });
  return next();
}
