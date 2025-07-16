function componentesHTML() {
  const includeElements = document.querySelectorAll("[data-componente]");

  includeElements.forEach(el => {
    const file = el.getAttribute("data-componente");
    fetch(file)
      .then(res => {
        if (res.ok) return res.text();
        else throw new Error(`Error al cargar ${file}`);
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => {
        el.innerHTML = `<p>Error cargando el archivo: ${err.message}</p>`;
      });
  });

};
componentesHTML();

function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("active");
};

const API_URL = "https://dollartgallery.shop/api/productos.php";
let productos = [];

function cargarProductos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      productos = data;
      renderizarTabla();
    })
    .catch(err => console.error("Error cargando productos:", err));
}

function renderizarTabla() {
  const tbody = document.querySelector("#tabla-productos tbody");
  tbody.innerHTML = "";

  productos.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
          <td>${p.nombre}</td>
          <td>${p.precio}</td>
          <td>${p.cantidad}</td>
          <td>
            <button class="editar-btn" onclick="editarProducto('${p._id.$oid}')">Editar</button>
            <button class="eliminar-btn" onclick="eliminarProducto('${p._id.$oid}')">Eliminar</button>
          </td>
        `;
    tbody.appendChild(fila);
  });
}