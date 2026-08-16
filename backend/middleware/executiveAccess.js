export const executiveAccess = (req, res, next) => {

  if (
    req.user.role !== "executive" &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      message: "Executive access only"
    });
  }

  // assign hostelType automatically
  req.hostelType =
    req.user.role === "admin"
      ? req.query.hostelType
      : req.user.hostelType;

  next();
};