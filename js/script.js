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

  fetch("../api/menu.php")
    .then(res => res.json())
    .then(productos => {
      console.log(productos)
      
     
    })
    .catch(error => {
      console.error("Error al cargar el menú:", error);
    });

    alert("termiando")
};
componentesHTML();

function toggleMenu() {
    const menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
};

function datos() {

  fetch("https://dollartgallery.shop/api/api.php")
  .then(response => response.json())
  .then(data => {
    console.log("Datos recibidos:", data);
    // Aquí puedes construir la tabla o lo que necesites
  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });

  alert("datos");
  
  

};
