console.log("auth.js aktif");

const SUPABASE_URL = "https://igtrnhjexdxymgoufnoy.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_ANON_KEY_KAMU_DISINI";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const btnLogin = document.getElementById("btnLogin");
const errorMsg = document.getElementById("errorMsg");

btnLogin.addEventListener("click", async () => {
  const hp = document.getElementById("hp").value.trim();
  const pin = document.getElementById("pin").value.trim();

  errorMsg.textContent = "";

  if (!hp || !pin) {
    errorMsg.textContent = "Nomor HP dan PIN wajib diisi";
    return;
  }

  // aktifkan loading
  btnLogin.classList.add("loading");
  btnLogin.disabled = true;

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("hp", hp)
    .eq("pin", pin)
    .limit(1)
    .single();

  if (error || !data) {
    errorMsg.textContent = "Nomor HP atau PIN salah";
    btnLogin.classList.remove("loading");
    btnLogin.disabled = false;
    return;
  }

  // LOGIN BERHASIL → REDIRECT
  window.location.href = "/user/index.html";
});
