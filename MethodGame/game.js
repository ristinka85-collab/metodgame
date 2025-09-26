// Находим все элементы на странице
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const coordinatesDisplay = document.getElementById('coordinates');
const characterList = document.getElementById('characterList'); 
const mugshotImage = document.getElementById('mugshot-image');
const characterNameDisplay = document.getElementById('character-name'); // НОВОЕ: Элемент <h2> для имени под фото

// Переменные для экранов и финальной сцены
const rulesScreen = document.getElementById('rulesScreen');
const gameContainer = document.getElementById('gameContainer'); 
const finalScreen = document.getElementById('finalScreen');
const finalArt = document.getElementById('finalArt');         // НОВОЕ: Ссылка на изображение финала
const kinopoiskLink = document.getElementById('kinopoiskLink'); // НОВОЕ: Ссылка на невидимую кнопку Кинопоиска

const img = new Image();

// Координаты персонажей на фотографии
const characters = {
    'character-1': { name: 'Володя Праздничный убийца', found: false, coords: [1578, 785, 1610, 879], id: 'character-1', order: 1, mugshot: 'MethodGame/Images/mugshots/1.png' },
    'character-2': { name: 'Григорий Белых Липецкий душитель', found: false, coords: [493, 623, 518, 668], id: 'character-2', order: 2, mugshot: 'MethodGame/images/mugshots/2.png' },
    'character-3': { name: 'Славик Дачник', found: false, coords: [1129, 276, 1144, 331], id: 'character-3', order: 3, mugshot: 'MethodGame/images/mugshots/3.png' },
    'character-4': { name: 'Анатолий Головко Турист', found: false, coords: [109, 1217, 135, 1311], id: 'character-4', order: 4, mugshot: 'MethodGame/images/mugshots/4.png' },
    'character-5': { name: 'Владимир Стриженов Паркурщик', found: false, coords: [1462, 345, 1489, 452], id: 'character-5', order: 5, mugshot: 'MethodGame/images/mugshots/5.png' },
    'character-6': { name: 'Сергей Цветков Вешатель', found: false, coords: [804, 1246, 840, 1359], id: 'character-6', order: 6, mugshot: 'MethodGame/images/mugshots/6.png' },
    'character-7': { name: 'Наташа Эксгибиционистка', found: false, coords: [1480, 999, 1510, 1129], id: 'character-7', order: 7, mugshot: 'MethodGame/images/mugshots/7.png' },
    'character-8': { name: 'Фёдор Яшин Субботник', found: false, coords: [1347, 1278, 1386, 1359], id: 'character-8', order: 8, mugshot: 'MethodGame/images/mugshots/8.png' },
    'character-9': { name: 'Жорик Таксист', found: false, coords: [1448, 770, 1471, 836], id: 'character-9', order: 9, mugshot: 'MethodGame/images/mugshots/9.png' },
    'character-10': { name: 'Василий Грач Доктор Смерть', found: false, coords: [263, 458, 288, 510], id: 'character-10', order: 10, mugshot: 'MethodGame/images/mugshots/10.png' },
    'character-11': { name: 'Рубель Солдат', found: false, coords: [739, 364, 760, 425], id: 'character-11', order: 11, mugshot: 'MethodGame/images/mugshots/11.png' },
    'character-12': { name: 'Павлик Толмачёв Вязальщик', found: false, coords: [963, 348, 981, 387], id: 'character-12', order: 12, mugshot: 'MethodGame/images/mugshots/12.png' },
    'character-13': { name: 'Аня Свиридова Мизогинистка', found: false, coords: [607, 631, 630, 683], id: 'character-13', order: 13, mugshot: 'MethodGame/images/mugshots/13.png' },
    'character-14': { name: 'Михаэль Птаха Тенор', found: false, coords: [701, 866, 720, 913], id: 'character-14', order: 14, mugshot: 'MethodGame/images/mugshots/14.png' },
    'character-15': { name: 'Никита Школьник', found: false, coords: [51, 830, 67, 875], id: 'character-15', order: 15, mugshot: 'MethodGame/images/mugshots/15.png' },
    'character-16': { name: 'Алексей Ануфриев Стрелок', found: false, coords: [914, 726, 943, 783], id: 'character-16', order: 16, mugshot: 'MethodGame/images/mugshots/16.png' },
    'character-17': { name: 'Катя Суворова Свадебный стрелок', found: false, coords: [1497, 150, 1504, 204], id: 'character-17', order: 17, mugshot: 'MethodGame/images/mugshots/17.png' },
    'character-18': { name: 'Сергей Верещагин Алфавитный убийца', found: false, coords: [1041, 225, 1065, 263], id: 'character-18', order: 18, mugshot: 'MethodGame/images/mugshots/18.png' },
    'character-19': { name: 'Андрей Пасюк Леший', found: false, coords: [528, 1241, 568, 1368], id: 'character-19', order: 19, mugshot: 'MethodGame/images/mugshots/19.png' },
    'character-20': { name: 'Вячеслав Малявин Кукольник', found: false, coords: [1821, 1263, 1904, 1387], id: 'character-20', order: 20, mugshot: 'MethodGame/images/mugshots/20.png' },
    'character-21': { name: 'Вадим Чистяков Бойцовской Маньяк', found: false, coords: [278, 723, 298, 762], id: 'character-21', order: 21, mugshot: 'MethodGame/images/mugshots/21.png' },
    'character-22': { name: 'Надя Ксенофоб', found: false, coords: [1407, 612, 1420, 637], id: 'character-22', order: 22, mugshot: 'MethodGame/images/mugshots/22.png' },
    'character-23': { name: 'Вячеслав Онлайн убийца', found: false, coords: [1235, 434, 1249, 518], id: 'character-23', order: 23, mugshot: 'MethodGame/images/mugshots/23.png' },
    'character-24': { name: 'Алексей Морозов Онлайн убийца', found: false, coords: [1298, 435, 1323, 486], id: 'character-24', order: 24, mugshot: 'MethodGame/images/mugshots/24.png' },
    'character-25': { name: 'Макс Соколов Чистильщик', found: false, coords: [1078, 1117, 1093, 1167], id: 'character-25', order: 25, mugshot: 'MethodGame/images/mugshots/25.png' },
    'character-26': { name: 'Михаил Артёмович Чингачгук', found: false, coords: [245, 803, 272, 875], id: 'character-26', order: 26, mugshot: 'MethodGame/images/mugshots/26.png' },
    'character-27': { name: 'Софья Зиновьевна Училка', found: false, coords: [1840, 1042, 1901, 1184], id: 'character-27', order: 27, mugshot: 'MethodGame/images/mugshots/27.png' },
    'character-28': { name: 'Николай Пиночет', found: false, coords: [911, 940, 950, 993], id: 'character-28', order: 28, mugshot: 'MethodGame/images/mugshots/28.png' },
    'character-29': { name: 'Женя Осмысловский', found: false, coords: [406, 922, 421, 981], id: 'character-29', order: 29, mugshot: 'MethodGame/images/mugshots/29.png' },
    'character-30': { name: 'Есеня Стеклова', found: false, coords: [480, 956, 498, 1016], id: 'character-30', order: 30, mugshot: 'MethodGame/images/mugshots/30.png' },
    'character-31': { name: 'Игорь Самарин ТМНП', found: false, coords: [1174, 880, 1214, 975], id: 'character-31', order: 31, mugshot: 'MethodGame/images/mugshots/31.png' },
    'character-32': { name: 'Родион Викторович Меглин', found: false, coords: [1371, 1054, 1401, 1096], id: 'character-32', order: 32, mugshot: 'MethodGame/images/mugshots/32.png' }
};

let nextCharacterOrder = 1;
const highlightCache = {};

// Функция, которая запускает всю игру
function startGame() {
    // Скрываем экран правил
    if (rulesScreen) {
        rulesScreen.style.display = 'none';
    }

    // Запускаем загрузку основного изображения
    img.src = 'MethodGame/Images/Street2.png';

    // Когда изображение загрузится, нарисуем его на холсте
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        redrawCanvas();
        displayNextCharacter();
    };

    // Добавляем обработчик клика по холсту
    canvas.addEventListener('click', handleCanvasClick);
}

// Заполняем список персонажей в HTML (текстовые имена, обычный шрифт)
function renderCharacterList() {
    if (characterList) {
        characterList.innerHTML = '';
        for (const id in characters) {
            const char = characters[id];
            const li = document.createElement('li');
            li.innerHTML = char.name; // <--- Вставляем текстовое имя
            li.id = char.id;
            characterList.appendChild(li);
        }
    }
}

// Отображаем следующего персонажа, которого нужно найти
function displayNextCharacter() {
    const characterToDisplay = Object.values(characters).find(
        char => char.order === nextCharacterOrder
    );
    
    if (mugshotImage) { 
        if (characterToDisplay) {
            mugshotImage.src = characterToDisplay.mugshot;
            
            // Отображаем имя персонажа под его фотографией
            if (characterNameDisplay) {
                characterNameDisplay.textContent = characterToDisplay.name;
                characterNameDisplay.style.opacity = 1; // Убедимся, что имя видно
            }
        } else {
            // Если все персонажи найдены, очищаем изображение и имя
            mugshotImage.src = ''; 
            if (characterNameDisplay) {
                characterNameDisplay.textContent = '';
                characterNameDisplay.style.opacity = 0; // Скрываем имя
            }
        }
    }
}

// Функция для полной перерисовки холста
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Рисуем все найденные маски
    for (const id in characters) {
        const char = characters[id];
        if (char.found && highlightCache[char.id]) {
            ctx.drawImage(highlightCache[char.id], 0, 0, canvas.width, canvas.height);
        }
    }
}

// Обработчик клика по холсту
function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    if (coordinatesDisplay) { 
        coordinatesDisplay.textContent = `Клик по координатам: ${Math.round(clickX)}, ${Math.round(clickY)}`;
    }

    let clickedCharacter = null;
    for (const id in characters) {
        const char = characters[id];
        const [x1, y1, x2, y2] = char.coords;

        if (clickX >= x1 && clickX <= x2 && clickY >= y1 && clickY <= y2) {
            clickedCharacter = char;
            break;
        }
    }

    if (clickedCharacter) {
        // Проверяем, что найден именно тот персонаж, который ожидается
        if (clickedCharacter.order !== nextCharacterOrder) {
            const nextChar = Object.values(characters).find(char => char.order === nextCharacterOrder);
            if (nextChar) {
                console.log(`Пожалуйста, найдите ${nextChar.name} сначала.`);
            }
            return; // Прекращаем выполнение, если найден не тот персонаж
        }
            
        // Если персонаж еще не найден
        if (!clickedCharacter.found) {
            clickedCharacter.found = true;
            nextCharacterOrder++;

            const listItem = document.getElementById(clickedCharacter.id);
            if (listItem) {
                listItem.classList.add('found');
            }
                
            console.log(`Найден персонаж: ${clickedCharacter.name}`);

            // Загружаем и кэшируем маску, затем перерисовываем
            if (highlightCache[clickedCharacter.id]) {
                redrawCanvas();
            } else {
                const highlightImg = new Image();
                highlightImg.src = `MethodGame/images/masks/${clickedCharacter.id}-mask.png`;

                highlightImg.onload = function() {
                    highlightCache[clickedCharacter.id] = highlightImg;
                    redrawCanvas();
                };
            }
                
            // ------------------------------------------------------------------
            // ЛОГИКА: ПРОВЕРКА ЗАВЕРШЕНИЯ ИГРЫ
            // ------------------------------------------------------------------
            const totalCharactersCount = Object.keys(characters).length;
            const foundCharactersCount = Object.values(characters).filter(char => char.found).length;

            if (foundCharactersCount === totalCharactersCount) {
                // Если все найдены, показываем финальный экран
                showFinalScreen();
            } else {
                // Если еще не все найдены, показываем следующего персонажа
                displayNextCharacter();
            }
            // ------------------------------------------------------------------
        } else {
            console.log(`Персонаж ${clickedCharacter.name} уже найден.`);
        }
    }
}

/**
 * Позиционирует невидимую ссылку KinopoiskLink поверх иконки Кинопоиска на изображении finalArt.
 */
function setupKinopoiskLinkPosition() {
    if (!finalArt || !kinopoiskLink || !finalScreen) {
        console.warn("Не найдены элементы finalArt, kinopoiskLink или finalScreen.");
        return;
    }

    // Ждем небольшое время, чтобы убедиться, что изображение finalArt полностью отрендерилось и отмасштабировалось
    setTimeout(() => {
        const imgRect = finalArt.getBoundingClientRect(); 
        const finalScreenRect = finalScreen.getBoundingClientRect(); 

        // ----------------------------------------------------------------------
        // !!! ВАЖНО: ЭТИ КООРДИНАТЫ НУЖНО НАСТРОИТЬ ВРУЧНУЮ !!!
        // ----------------------------------------------------------------------
        // Настройте эти проценты так, чтобы прозрачная ссылка точно покрывала логотип Кинопоиска
        const kinopoiskIconLeftPercent = 35;  
        const kinopoiskIconTopPercent = 85;   
        const kinopoiskIconWidthPercent = 45; 
        const kinopoiskIconHeightPercent = 7; 
        // ----------------------------------------------------------------------


        // Вычисление абсолютных пиксельных координат и размеров ссылки на экране
        const linkX = imgRect.left + (imgRect.width * kinopoiskIconLeftPercent / 100);
        const linkY = imgRect.top + (imgRect.height * kinopoiskIconTopPercent / 100);
        const linkWidth = imgRect.width * kinopoiskIconWidthPercent / 100;
        const linkHeight = imgRect.height * kinopoiskIconHeightPercent / 100;

        // Устанавливаем стили для ссылки, позиционируя ее относительно finalScreen
        kinopoiskLink.style.left = `${linkX - finalScreenRect.left}px`;
        kinopoiskLink.style.top = `${linkY - finalScreenRect.top}px`;
        kinopoiskLink.style.width = `${linkWidth}px`;
        kinopoiskLink.style.height = `${linkHeight}px`;
        kinopoiskLink.style.opacity = 0; // Ссылка остается невидимой
        // kinopoiskLink.style.border = '1px solid blue'; // ДЛЯ ОТЛАДКИ: раскомментируйте, чтобы увидеть область
    }, 100); 
}

/**
 * Отображает финальный экран игры.
 * Скрывает игровые элементы и показывает изображение окончания.
 */
function showFinalScreen() {
    console.log("Все персонажи найдены! Игра завершена.");

    // Отключаем обработчик клика по холсту, чтобы игра остановилась
    canvas.removeEventListener('click', handleCanvasClick);
    
    // Скрываем основной контейнер игры (всю игровую область и UI)
    if (gameContainer) {
        gameContainer.style.display = 'none';
    }

    // Показываем финальный экран
    if (finalScreen) {
        finalScreen.classList.add('active');
        // Позиционируем ссылку Кинопоиска
        setupKinopoiskLinkPosition(); 
    }
}


// Добавляем обработчик клика на экран правил, чтобы начать игру
if (rulesScreen) {
    rulesScreen.addEventListener('click', startGame);
}


// Рендерим список персонажей при загрузке страницы

renderCharacterList();


