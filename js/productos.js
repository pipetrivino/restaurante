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

function abrirModal() {
  document.getElementById("modal").classList.add("active");
  document.getElementById("modal-titulo").innerText = "Agregar Producto";
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("producto-id").value = "";
}

function cerrarModal() {
  document.getElementById("modal").classList.remove("active");
}

function guardarProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const id = document.getElementById("producto-id").value;

  const datos = { nombre, precio, cantidad };

  const metodo = id ? "PUT" : "POST";
  if (id) datos._id = id;

  fetch(API_URL, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(res => res.json())
    .then(() => {
      cerrarModal();
      cargarProductos();
    })
    .catch(err => console.error("Error guardando producto:", err));
}

function editarProducto(id) {
  const producto = productos.find(p => p._id.$oid === id);
  if (!producto) return;

  document.getElementById("modal-titulo").innerText = "Editar Producto";
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("cantidad").value = producto.cantidad;
  document.getElementById("producto-id").value = id;
  document.getElementById("modal").classList.add("active");
}

function eliminarProducto(id) {
  if (!confirm("¿Eliminar este producto?")) return;

  fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: id })
  })
    .then(res => res.json())
    .then(() => cargarProductos())
    .catch(err => console.error("Error eliminando producto:", err));
}
