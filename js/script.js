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

function cargarProductos() {

  fetch("https://dollartgallery.shop/api/productos.php")
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector("#tabla-inventario tbody");

        data.forEach(item => {
          const fila = document.createElement("tr");

          fila.innerHTML = `
            <td>${item.nombre || ''}</td>
            <td>${item.cantidad || ''}</td>
            <td>${item.costo || ''}</td>
          `;

          tbody.appendChild(fila);
        });
      })
      .catch(error => {
        console.error("Error cargando inventario:", error);
      });
};

cargarProductos();

function agregarProducto(e) {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById('nombre').value,
    costo: document.getElementById('costo').value,
    cantidad: document.getElementById('cantidad').value
  };

  console.log(producto);

  fetch('https://dollartgallery.shop/api/insertarproducto.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('mensaje').innerText = data.mensaje || 'Error';
    document.getElementById('formProducto').reset();
  })
  .catch(err => {
    console.error('Error:', err);
    document.getElementById('mensaje').innerText = 'Error al conectar con el servidor';
  });
};
