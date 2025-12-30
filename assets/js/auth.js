console.log("auth.js aktif");

// konfigurasi supabase (sementara di sini dulu)
const SUPABASE_URL = "https://igtrnhjexdxymgoufnoy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndHJuaGpleGR4eW1nb3Vmbm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNjY3NTMsImV4cCI6MjA4MjY0Mjc1M30.r1c85loIq2uqsbqaUQ-Jc7t3R8Lhi3iEiHArXGgw3gc";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("btnLogin").addEventListener("click", async function () {
  const hp = document.getElementById("hp").value.trim();
  const pin = document.getElementById("pin").value.trim();

  if (!hp || !pin) {
    alert("Nomor HP dan PIN wajib diisi");
    return;
  }

  console.log("Login dicoba:", hp);

  const { data, error } = await sb
    .from("members")
    .select("*")
    .eq("hp", hp)
    .eq("pin", pin)
    .maybeSingle();

  if (error) {
    alert("Error Supabase: " + error.message);
    return;
  }

  if (!data) {
    alert("Nomor HP atau PIN salah");
    return;
  }

  // simpan session sederhana
  localStorage.setItem("login", "true");
  localStorage.setItem("nama", data.nama);
  localStorage.setItem("hp", data.hp);

  alert("Login berhasil");
  window.location.href = "/user/index.html";
});
