const SUPABASE_URL = "https://igtrnhjexdxymgoufnoy.supabase.co";
const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndHJuaGpleGR4eW1nb3Vmbm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNjY3NTMsImV4cCI6MjA4MjY0Mjc1M30.r1c85loIq2uqsbqaUQ-Jc7t3R8Lhi3iEiHArXGgw3gc";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadKategori() {
  const { data } = await sb
    .from("categories")
    .select("*")
    .order("id");

  const box = document.getElementById("listKategori");
  box.innerHTML = "";

  data.forEach(k => {
    const div = document.createElement("div");
    div.className = "kategori";
    div.innerHTML = `
      <span>${k.nama}</span>
      <button onclick="hapusKategori(${k.id})">Hapus</button>
    `;
    box.appendChild(div);
  });
}

async function tambahKategori() {
  const nama = document.getElementById("namaKategori").value.trim();
  if (!nama) return alert("Nama kategori kosong");

  await sb.from("categories").insert({ nama });
  document.getElementById("namaKategori").value = "";
  loadKategori();
}

async function hapusKategori(id) {
  if (!confirm("Hapus kategori?")) return;
  await sb.from("categories").delete().eq("id", id);
  loadKategori();
}

loadKategori();
