// guard.js — proteksi halaman user + expired session

const isLogin = localStorage.getItem("login");
const expired = localStorage.getItem("login_expired");

const now = Date.now();

if (
  isLogin !== "true" ||
  !expired ||
  now > parseInt(expired)
) {
  // bersihkan session
  localStorage.clear();

  // kembali ke login
  window.location.href = "/";
}
