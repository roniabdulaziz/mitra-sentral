console.log("produk.js aktif");

// ================= SUPABASE =================
const SUPABASE_URL = "https://igtrnhjexdxymgoufnoy.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_ANON_KEY_KAMU_YANG_SUDAH_ADA";

const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ================= ELEMENT =================
const form = document.getElementById("formProduk");
const produkList = document.getElementById("produkList");
const kategoriSelect = document.getElementById("kategori");

// ================= LOAD KATEGORI =================
async function loadKategori() {
  const { data, error } = await sb
    .from("categories")
    .select("*")
    .order("nama");

  if (error) {
    console.error(error);
    return;
  }

  kategoriSelect.innerHTML = "";
  data.forEach(k => {
    const opt = document.createElement("option");
    opt.value = k.id;
    opt.textContent = k.nama;
    kategoriSelect.appendChild(opt);
  });
}

// ================= SIMPAN PRODUK =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    kategori_id: kategoriSelect.value,
    nama: form.nama.value,
    deskripsi: form.deskripsi.value,
    harga: parseInt(form.harga.value),
    sku: form.sku.value
  };

  const { error } = await sb.from("produk").insert([payload]);

  if (error) {
    alert("Gagal simpan produk");
    console.error(error);
    return;
  }

  form.reset();
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
    div.className = "product-item";
    div.innerHTML = `
      <strong>${p.nama}</strong><br>
      <small>Rp ${p.harga.toLocaleString("id-ID")}</small><br>
      <small>${p.deskripsi || "-"}</small><br>
      <small>SKU: ${p.sku}</small>
    `;
    produkList.appendChild(div);
  });
}

// ================= INIT =================
loadKategori();
loadProduk();
