// eslint-disable-next-line no-unused-vars
import { openBigPicture } from './big-picture';

// Временные данные
const picturesData = [
  {
    url: 'https://picsum.photos/182/182?random=1',
    description: 'Первое изображение',
    likes: 150,
    comments: 20
  },
  {
    url: 'https://picsum.photos/182/182?random=2',
    description: 'Второе изображение',
    likes: 89,
    comments: 5
  },
  {
    url: 'https://picsum.photos/182/182?random=3',
    description: 'Третье изображение',
    likes: 230,
    comments: 42
  }
];

// Функция отрисовки миниатюр
const renderThumbnails = (pictures) => {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const fragment = new DocumentFragment();

  pictures.forEach(({ url, description, likes, comments }) => {
    const pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments;

    fragment.appendChild(pictureElement);
  });

  container.appendChild(fragment);
};

// Экспортируем функцию для использования в основном модуле
export { renderThumbnails, picturesData };
