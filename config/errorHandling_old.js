
module.exports = (app) => {
  // error handlers - no stacktrace leaked to user
  app.use(function(err, req, res, next) {
    console.dir(err);
    res.status(err.status || 500);
    if (err.status === 500) {
      console.error(err.stack);
      res.json({
        error: 'Internal Server Error'
      });
    } else if (err.status === 404) {
      res.json({
        error: 'Render Error Page'
      });
    } else {
      res.json({
        error: err.message
      })
    }
  });
}