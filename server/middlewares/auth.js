export const isNotLogIn = (req, res, next) => {
  console.log("isNotLogIn");
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.send("로그인이 필요합니다.");
  }
};
