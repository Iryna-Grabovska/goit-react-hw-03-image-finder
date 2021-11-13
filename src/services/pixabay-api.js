const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23459982-aeff0c389b47d03a141af0a17';
function fetchImages(query, page) {
  const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`;

  return Promise.reject(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`We can't find images ${query}`));
  });
}

const api = { fetchImages };

export default api;
