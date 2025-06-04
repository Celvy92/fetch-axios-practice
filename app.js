const dataContainer = document.getElementById('data-container');
const fetchBtn = document.getElementById('fetch-btn');
const axiosBtn = document.getElementById('axios-btn');

const API_URL = 'https://rickandmortyapi.com/api/character';

function mostrarPersonajes(personajes) {
  dataContainer.innerHTML = ''; // limpia contenido

  personajes.forEach(personaje => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}" />
      <h3>${personaje.name}</h3>
    `;

    dataContainer.appendChild(card);
  });
}

// Usando fetch
function cargarConFetch() {
  dataContainer.innerHTML = 'Cargando...';
  fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error('Error en la petición Fetch');
      return response.json();
    })
    .then(data => {
      mostrarPersonajes(data.results);
    })
    .catch(error => {
      dataContainer.innerHTML = `<p style="color: #f88;">${error.message}</p>`;
    });
}

// Usando Axios
function cargarConAxios() {
  dataContainer.innerHTML = 'Cargando...';
  axios.get(API_URL)
    .then(response => {
      mostrarPersonajes(response.data.results);
    })
    .catch(error => {
      dataContainer.innerHTML = `<p style="color: #f88;">Error en la petición Axios</p>`;
    });
}

// Eventos
fetchBtn.addEventListener('click', cargarConFetch);
axiosBtn.addEventListener('click', cargarConAxios);
