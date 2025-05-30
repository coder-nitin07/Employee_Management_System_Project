
function isAuthenticated(req, res, next) {
  
  if (req.session && req.session.user) {
        return next();
  } else {
        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
  }
}

module.exports = { isAuthenticated };
