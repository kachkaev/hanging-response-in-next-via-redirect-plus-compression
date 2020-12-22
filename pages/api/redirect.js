export default (req, res) => {
  // ⚠️ Redirecting to an externally provided URL is not safe, do not do this in real projects!
  res.redirect(String(req.query.to));
  // res.writeHead(302, {
  //   Location: String(req.query.to),
  // });
  // res.write("hello");
  // res.end();
};
