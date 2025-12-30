console.log("auth.js aktif");

document.getElementById("btnLogin").addEventListener("click", function () {
  console.log("Tombol login diklik");

  const hp = document.getElementById("hp").value;
  const pin = document.getElementById("pin").value;

  console.log("HP:", hp);
  console.log("PIN:", pin);
});
