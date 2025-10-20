function checkStringLenght(string, length) {
  return string.length <= length;
}

// Cтрока короче 20 символов
checkStringLenght('проверяемая строка', 100); // true
// Длина строки ровно 18 символов
checkStringLenght('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLenght('проверяемая строка', 10); // false


function findPalindrom(deafultString) {
  const result = deafultString.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < result.length / 2; i++) {
    if (result.at(i) === result.at(-i-1)) {
      return true;
    }
  }
  return false;
}

// Строка является палиндромом
findPalindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
findPalindrom('ДовОд'); // true
// Это не палиндром
findPalindrom('Кекс');  // false
// Это палиндром
findPalindrom('Лёша на полке клопа нашёл '); // true
