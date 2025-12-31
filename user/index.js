console.log("user produk aktif");

// ================= SUPABASE =================
const SUPABASE_URL = "https://igtrnhjexdxymgoufnoy.supabase.co";
const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndHJuaGpleGR4eW1nb3Vmbm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNjY3NTMsImV4cCI6MjA4MjY0Mjc1M30.r1c85loIq2uqsbqaUQ-Jc7t3R8Lhi3iEiHArXGgw3gc";

const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ================= ELEMENT =================
const kategoriSelect = document.getElementById("kategoriSelect");
const produkList = document.getElementById("produkList");

// ================= LOAD KATEGORI =================
async function loadKategori() {
  const { data, error } = await sb
    .from("categories")
    .select("id, nama")
    .eq("aktif", true)
    .order("nama");

  if (error) {
    console.error(error);
    return;
  }

  kategoriSelect.innerHTML = `<option value="">Pilih Kategori</option>`;

  data.forEach(k => {
    const opt = document.createElement("option");
    opt.value = k.id;
    opt.textContent = k.nama;
    kategoriSelect.appendChild(opt);
  });
}

// ================= LOAD PRODUK BY KATEGORI =================
async function loadProdukByKategori(kategoriId) {

  if (!kategoriId) {
    produkList.innerHTML = "<p>Pilih kategori terlebih dahulu</p>";
    return;
  }

  const { data, error } = await sb
    .from("produk")
    .select("id, nama, deskripsi, harga")
    .eq("kategori_id", kategoriId)
    .order("harga");

  if (error) {
    console.error(error);
    return;
  }

  produkList.innerHTML = "";

  if (data.length === 0) {
    produkList.innerHTML = "<p>Produk belum tersedia</p>";
    return;
  }

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div>
        <strong>${p.nama}</strong><br>
        <small>${p.deskripsi || ""}</small>
      </div>
      <strong>Rp ${Number(p.harga).toLocaleString("id-ID")}</strong>
    `;
    produkList.appendChild(div);
  });
}

// ================= EVENT =================
kategoriSelect.addEventListener("change", e => {
  loadProdukByKategori(e.target.value);
});

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  loadKategori();
});
