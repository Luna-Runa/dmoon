export const isLogIn = (req, res, next) => {
  console.log("isLogIn " + req.user);
  console.log("isLogIn " + req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("로그인이 필요합니다.");
  }
};
