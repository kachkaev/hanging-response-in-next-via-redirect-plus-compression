export default (req, res) => {
  // ⚠️ Redirecting to an externally provided URL is not safe, do not do this in real projects!
  res.redirect(String(req.query.to));

  if (req.query.doubleEndCall === "true") {
    res.end();
  }
};
