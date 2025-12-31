console.log("produk.js aktif");

// ================= SUPABASE CONFIG =================
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
    .order("nama");

  if (error) {
    console.error("Error load kategori:", error);
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

// ================= TAMBAH PRODUK =================
async function tambahProduk() {
  const kategori_id = kategoriSelect.value;
  const nama = document.getElementById("namaProduk").value.trim();
  const deskripsi = document.getElementById("deskripsiProduk").value.trim();
  const harga = parseInt(document.getElementById("hargaProduk").value);
  const sku = document.getElementById("skuProduk").value.trim();

  if (!kategori_id || !nama || !harga || !sku) {
    alert("Lengkapi semua field wajib");
    return;
  }

  const { error } = await sb.from("produk").insert({
    kategori_id,
    nama,
    deskripsi,
    harga,
    sku
  });

  if (error) {
    console.error(error);
    alert("Gagal simpan produk");
    return;
  }

  alert("Produk berhasil disimpan");

  document.getElementById("namaProduk").value = "";
  document.getElementById("deskripsiProduk").value = "";
  document.getElementById("hargaProduk").value = "";
  document.getElementById("skuProduk").value = "";

  loadProduk();
}

// ================= LOAD PRODUK =================
async function loadProduk() {

  // ambil kategori
  const { data: kategori } = await sb
    .from("categories")
    .select("id, nama");

  const kategoriMap = {};
  kategori.forEach(k => {
    kategoriMap[k.id] = k.nama;
  });

  // ambil produk
  const { data, error } = await sb
    .from("produk")
    .select("id, nama, deskripsi, harga, kategori_id")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error load produk:", error);
    return;
  }

  produkList.innerHTML = "";

  if (!data || data.length === 0) {
    produkList.innerHTML = "<p>Belum ada produk</p>";
    return;
  }

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = `
      <strong>${p.nama}</strong>
      <small>Kategori: ${kategoriMap[p.kategori_id] || "-"}</small>
      <small>${p.deskripsi || ""}</small>
      <small>Rp ${Number(p.harga).toLocaleString("id-ID")}</small>
    `;
    produkList.appendChild(div);
  });
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  loadKategori();
  loadProduk();
});
