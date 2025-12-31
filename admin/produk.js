console.log("produk.js aktif");

// ================= SUPABASE =================
const SUPABASE_URL = "https://igtrnhjexdxymgoufnoy.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_ANON_KEY_KAMU";

const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ================= LOAD KATEGORI =================
async function loadKategori() {
  const { data, error } = await sb
    .from("kategori")
    .select("*")
    .order("nama", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  const select = document.getElementById("kategoriSelect");
  select.innerHTML = `<option value="">Pilih Kategori</option>`;

  data.forEach(k => {
    const opt = document.createElement("option");
    opt.value = k.id;
    opt.textContent = k.nama;
    select.appendChild(opt);
  });
}

// ================= TAMBAH PRODUK =================
async function tambahProduk() {
  const kategori = document.getElementById("kategoriSelect").value;
  const nama = document.getElementById("namaProduk").value.trim();
  const deskripsi = document.getElementById("deskripsiProduk").value.trim();
  const harga = parseInt(document.getElementById("hargaProduk").value);
  const sku = document.getElementById("skuProduk").value.trim();

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
    alert("Gagal menyimpan produk");
    return;
  }

  alert("Produk berhasil ditambahkan");

  // reset form
  document.getElementById("namaProduk").value = "";
  document.getElementById("deskripsiProduk").value = "";
  document.getElementById("hargaProduk").value = "";
  document.getElementById("skuProduk").value = "";

  loadProduk();
}

// ================= LOAD PRODUK =================
async function loadProduk() {
  const { data, error } = await sb
    .from("produk")
    .select("id, nama, deskripsi, harga")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const list = document.getElementById("produkList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<small>Belum ada produk</small>";
    return;
  }

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = `
      <strong>${p.nama}</strong>
      <small>${p.deskripsi || "-"}</small>
      <small>Rp ${p.harga.toLocaleString("id-ID")}</small>
    `;
    list.appendChild(div);
  });
}

// ================= INIT =================
loadKategori();
loadProduk();
