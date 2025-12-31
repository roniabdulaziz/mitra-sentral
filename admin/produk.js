console.log("produk.js aktif");

// ================= SUPABASE =================
const SUPABASE_URL = "https://igtrnhjexdxymgoufnoy.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_ANON_KEY_KAMU";

const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ================= ELEMENT =================
const btnSimpan = document.getElementById("btnSimpanProduk");
const produkList = document.getElementById("produkList");

if (!btnSimpan || !produkList) {
  console.error("❌ ID HTML tidak ditemukan");
  return;
}

// ================= SIMPAN PRODUK =================
btnSimpan.addEventListener("click", async () => {
  const kategori = document.getElementById("kategori").value;
  const nama = document.getElementById("namaProduk").value.trim();
  const deskripsi = document.getElementById("deskripsi").value.trim();
  const harga = parseInt(document.getElementById("harga").value);
  const sku = document.getElementById("sku").value.trim();

  if (!kategori || !nama || !harga || !sku) {
    alert("Lengkapi semua field");
    return;
  }

  const { error } = await sb.from("produk").insert({
    kategori_id: kategori,
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
  loadProduk();
});

// ================= LOAD PRODUK =================
async function loadProduk() {
  const { data, error } = await sb
    .from("produk")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  produkList.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${p.nama}</strong><br>
      Rp ${p.harga.toLocaleString("id-ID")}<br>
      <small>${p.deskripsi || "-"}</small>
    `;
    produkList.appendChild(div);
  });
}

loadProduk();
