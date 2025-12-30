const isLogin = localStorage.getItem("login");
const expired = localStorage.getItem("login_expired");
const role = localStorage.getItem("member_role");

if (
  isLogin !== "true" ||
  role !== "admin" ||
  !expired ||
  Date.now() > parseInt(expired)
) {
  localStorage.clear();
  window.location.href = "/";
}
