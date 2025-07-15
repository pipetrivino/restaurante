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


document.addEventListener("DOMContentLoaded", function () {
  fetch("../api/menu.php")
    .then(res => res.json())
    .then(productos => {
      const tbody = document.querySelector("#tabla-productos tbody");
      productos.forEach(prod => {
        const fila = document.createElement("tr");

        const nombre = document.createElement("td");
        nombre.textContent = prod.nombre;

        const precio = document.createElement("td");
        precio.textContent = `$${prod.precio.toLocaleString("es-CO")}`;

        const estado = document.createElement("td");
        estado.textContent = prod.disponible ? "Disponible" : "Agotado";
        estado.className = prod.disponible ? "disponible" : "no-disponible";

        fila.appendChild(nombre);
        fila.appendChild(precio);
        fila.appendChild(estado);
        tbody.appendChild(fila);
      });
    })
    .catch(error => {
      console.error("Error al cargar el menú:", error);
    });
});
