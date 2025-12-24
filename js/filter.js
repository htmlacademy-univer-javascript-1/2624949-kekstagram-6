import { renderThumbnails } from './render-pictures.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

let currentFilter = 'filter-default';
let photos = [];

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case 'filter-random':
      return [...photos].sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT);
    case 'filter-discussed':
      return [...photos].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return [...photos];
  }
};

const updatePhotos = debounce(() => {
  const filteredPhotos = getFilteredPhotos();
  renderThumbnails(filteredPhotos);
}, RERENDER_DELAY);

const onFilterClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    updatePhotos();
  }
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};

export { initFilters };
