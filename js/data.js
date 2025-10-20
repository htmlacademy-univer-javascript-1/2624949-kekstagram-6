import { getRandomInteger, getRandomArrayElement } from './util.js';

const NAMES = [
  'Артём', 'Анна', 'Иван', 'Мария', 'Дмитрий', 'Екатерина',
  'Алексей', 'Ольга', 'Сергей', 'Наталья', 'Максим', 'Юлия',
  'Павел', 'Алёна', 'Роман', 'Татьяна', 'Никита', 'Светлана',
  'Владимир', 'Дарья'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let commentId = 1;

const generateComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generatePhotos = () => {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const commentsCount = getRandomInteger(0, 30);
    const comments = [];

    for (let j = 0; j < commentsCount; j++) {
      comments.push(generateComment());
    }

    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Описание фотографии',
      likes: getRandomInteger(15, 200),
      comments
    });
  }

  return photos;
};

export { generatePhotos };
