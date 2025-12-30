console.log("auth.js aktif");

// ================= SUPABASE CONFIG =================
const SUPABASE_URL = "https://igtrnhjexdxymgoufnoy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndHJuaGpleGR4eW1nb3Vmbm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNjY3NTMsImV4cCI6MjA4MjY0Mjc1M30.r1c85loIq2uqsbqaUQ-Jc7t3R8Lhi3iEiHArXGgw3gc";

// ✅ GANTI NAMA, JANGAN "supabase"
const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ================= ELEMENT =================
const btnLogin = document.getElementById("btnLogin");
const errorMsg = document.getElementById("errorMsg");

// ================= LOGIN =================
btnLogin.addEventListener("click", async () => {
  const hp = document.getElementById("hp").value.trim();
  const pin = document.getElementById("pin").value.trim();

  errorMsg.textContent = "";

  if (!hp || !pin) {
    errorMsg.textContent = "Nomor HP dan PIN wajib diisi";
    return;
  }

  btnLogin.classList.add("loading");
  btnLogin.disabled = true;

  try {
    const { data, error } = await sb
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

    // SIMPAN SESSION
    localStorage.setItem("login", "true");
    localStorage.setItem("member_id", data.id);
    localStorage.setItem("member_nama", data.nama);
    localStorage.setItem("member_role", data.role);

    // REDIRECT
    window.location.href = "/user/index.html";

  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Terjadi kesalahan sistem";
    btnLogin.classList.remove("loading");
    btnLogin.disabled = false;
  }
});
