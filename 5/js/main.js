// Список имён для комментаторов (взят из типичных русских имён)
const NAMES = [
  'Артём', 'Анна', 'Иван', 'Мария', 'Дмитрий', 'Екатерина',
  'Алексей', 'Ольга', 'Сергей', 'Наталья', 'Максим', 'Юлия',
  'Павел', 'Алёна', 'Роман', 'Татьяна', 'Никита', 'Светлана',
  'Владимир', 'Дарья'
];

// Возможные сообщения для комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Функция для генерации случайного целого числа в диапазоне [min, max]
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

// Функция для получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция для генерации случайного описания фото
const generatePhotoDescription = () => {
  const descriptions = [
    'Потрясающий закат на берегу моря',
    'Утренняя прогулка по лесу',
    'Мой любимый кот спит на подоконнике',
    'Городские огни ночью',
    'Цветущая сакура весной',
    'Пикник с друзьями в парке',
    'Первый снег этого года',
    'Старинная архитектура в центре города',
    'Радуга после дождя',
    'Мой домашний обед'
  ];
  return getRandomArrayElement(descriptions);
};

// Генерация уникальных ID для комментариев
let commentId = 1;

// Функция для генерации одного комментария
const generateComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

// Основная функция генерации данных
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
      description: generatePhotoDescription(),
      likes: getRandomInteger(15, 200),
      comments
    });
  }

  return photos;
};
generatePhotos();
