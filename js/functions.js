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


const checkTime = function(dayStart, dayEnd, meetingStart, meetingDuration){

  let dayStartInMin = 0;
  let dayEndInMin = 0;
  let meetingStartInMin = 0;

  dayStart = dayStart.split(':');
  dayStartInMin += Number(dayStart[0]) * 60 + Number(dayStart[1]);

  dayEnd = dayEnd.split(':');
  dayEndInMin += Number(dayEnd[0]) * 60 + Number(dayEnd[1]);

  meetingStart = meetingStart.split(':');
  meetingStartInMin += Number(meetingStart[0]) * 60 + Number(meetingStart[1]);

  if (dayStartInMin <= meetingStartInMin && meetingStartInMin <= dayEndInMin && ((dayEndInMin - meetingStartInMin) >= meetingDuration)){
    return true;
  }
  return false;
};

checkTime('8:0', '10:0', '8:0', 120);
