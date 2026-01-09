const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/';

const getData = () =>
  fetch(`${BASE_URL}data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные');
      }
      return response.json();
    });

const sendData = (formData) =>
  fetch(BASE_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось отправить форму');
      }
      return response.json();
    });

export { getData, sendData };
