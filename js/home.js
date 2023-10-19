function getDataUser() {
  const dataUser = localStorage.getItem("user");
  if (dataUser) {
    const conData = JSON.parse(dataUser);

    const imgElm = document.getElementById("img_user");
    imgElm.src = conData.imgUrl;

    const usernameElm = document.getElementById("username");
    usernameElm.innerHTML = conData.username;
  } else {
    window.location.href = "index.html";
  }
}
getDataUser();

function onLogout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function validateForm() {
  var nama = document.getElementById("nama").value;
  var deskripsi = document.getElementById("deskripsi").value;
  var harga = document.getElementById("harga").value;
  var stok = document.getElementById("stok").value;

  if (nama == "") {
    alert("Isi Form Nama Barang");
    return false;
  }
  if (deskripsi == "") {
    alert("Isi Form Deskripsi Barang");
    return false;
  }
  if (harga == "") {
    alert("Isi Form Harga Barang");
    return false;
  }
  if (stok == "") {
    alert("Isi Form Stok Barang");
    return false;
  }

  return true;
}

function showData() {
  var listBarang;
  if (localStorage.getItem("listBarang") == null) {
    listBarang = [];
  } else {
    listBarang = JSON.parse(localStorage.getItem("listBarang"));
  }

  var html = "";

  listBarang.forEach(function (element, index) {
    html += "<tr>";
    html += "<td class='border border-slate-300 p-3'>" + element.nama + "</td>";
    html +=
      "<td class='border border-slate-300 p-3'>" + element.deskripsi + "</td>";
    html +=
      "<td class='border border-slate-300 p-3'>" + element.harga + "</td>";
    html += "<td class='border border-slate-300 p-3'>" + element.stok + "</td>";

    html +=
      '<td class="border border-slate-300 p-3"><button onclick="deleteData(' +
      index +
      ')" class ="rounded-md bg-red-500 px-5 py-2 m-1">Hapus</button> <button onclick="updateData(' +
      index +
      ')" class = "rounded-md bg-yellow-500 px-5 py-2 m-1">Edit</button></td>';
    html += "</tr>";
  });

  document.querySelector("#crudTabel tbody").innerHTML = html;
}

document.onload = showData();

function addData() {
  if (validateForm() == true) {
    var nama = document.getElementById("nama").value;
    var deskripsi = document.getElementById("deskripsi").value;
    var harga = document.getElementById("harga").value;
    var stok = document.getElementById("stok").value;

    var listBarang;
    if (localStorage.getItem("listBarang") == null) {
      listBarang = [];
    } else {
      listBarang = JSON.parse(localStorage.getItem("listBarang"));
    }

    listBarang.push({
      nama: nama,
      deskripsi: deskripsi,
      harga: harga,
      stok: stok,
    });

    localStorage.setItem("listBarang", JSON.stringify(listBarang));
    showData();
    document.getElementById("nama").value = "";
    document.getElementById("deskripsi").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("stok").value = "";
  }
}

function deleteData(index) {
  var listBarang;
  if (localStorage.getItem("listBarang") == null) {
    listBarang = [];
  } else {
    listBarang = JSON.parse(localStorage.getItem("listBarang"));
  }

  listBarang.splice(index, 1);
  localStorage.setItem("listBarang", JSON.stringify(listBarang));
  showData();
}

function updateData(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  var listBarang;
  if (localStorage.getItem("listBarang") == null) {
    listBarang = [];
  } else {
    listBarang = JSON.parse(localStorage.getItem("listBarang"));
  }
  document.getElementById("nama").value = listBarang[index].nama;
  document.getElementById("deskripsi").value = listBarang[index].deskripsi;
  document.getElementById("harga").value = listBarang[index].harga;
  document.getElementById("stok").value = listBarang[index].stok;

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true)
      listBarang[index].nama = document.getElementById("nama").value;
    listBarang[index].deskripsi = document.getElementById("deskripsi").value;
    listBarang[index].harga = document.getElementById("harga").value;
    listBarang[index].stok = document.getElementById("stok").value;

    localStorage.setItem("listBarang", JSON.stringify(listBarang));

    showData();

    document.getElementById("nama").value = "";
    document.getElementById("deskripsi").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("stok").value = "";

    document.getElementById("submit").style.display = "block";
    document.getElementById("update").style.display = "none";
  };
}
