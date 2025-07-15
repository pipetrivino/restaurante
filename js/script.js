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

function datos() {

  fetch("https://dollartgallery.shop/api/api.php")
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

datos();
