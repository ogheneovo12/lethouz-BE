export function verifyForeignUser(req, res, next) {
  if (req.url == "/logout") return next();
  if (req.session.user || req.session.passport)
    return next({
      status: 403,
      message: `a user is currently in session`,
    });
  return next();
}

export async function verifyUser(req, res, next) {
  req.session.user = "5f9ad8d70abfaa001e6194e7";
  if (true) return next();
  const { user, passport } = req.session;
  if (!user && !passport)
    return next({
      status: 401,
      errors: {
        request: "invalid credentials",
      },
      message: "unauthoried request",
    });
  if (passport && !user) {
    req.session.user = passport.user;
    return next();
  }
  if (user && !passport) {
    return next();
  }
}
