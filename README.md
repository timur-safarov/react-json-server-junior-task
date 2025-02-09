<p align="center">
    <a href="https://reactjs.org" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/6412038?s=200&v=4" height="100px">
    </a>
    <h1 align="center">React - CRUD-API JSON-SERVER DataGrid table</h1>
    <br>
</p>

Directions
----------
   db/                     contains json file for json server
	src/                    contains project files
   src/assets/             contains assets definition
   src/components/         contains project components

Prerequisites
-------------

* Linux
* Npm
* Nodejs
* Json-server
* REACT


Тестовое задание для Junior React Developer
-------------------------------------------

## Задание

### Необходимо развернуть локально `json-server` и загрузить в него данные **seminars**. Используйте любые удобные технологии, но обязательно с использованием React для реализации следующих функций:

1. **Запрос данных**

   - Запросите данные с семинарами из `json-server`.

2. **Отрисовка списка семинаров**

   - Отобразите список семинаров на странице.

3. **Удаление семинара**

   - Реализуйте кнопку удаления семинара, которая при клике открывает окно подтверждения.
   - При подтверждении удаления отправьте `DELETE` запрос на сервер.

4. **Редактирование семинара**

   - Реализуйте кнопку редактирования семинара.
   - Редактирование должно происходить в модальном окне.

5. **Размещение на GitHub**
   - Залейте проект на GitHub и пришлите ссылку.
   - **Важно:** `json-server` должен находиться в том же репозитории, что и приложение.

## Дополнительные рекомендации

- Используйте современные подходы (например, React Hooks, функциональные компоненты).
- Обратите внимание на обработку ошибок и состояния загрузки.
- Добавьте комментарии в код для пояснения ключевых моментов реализации.


Instalation for Distribution Linux - Ubuntu
-------------------------------------------

## 0). Перейдите в директорию проекта
* ``` cd /path-react-app/ ```

## 1). Установить nodejs.
* ``` sudo apt-get install nodejs ```

## 2). Установить менеджер пакетов npm
* ``` sudo apt-get install npm ```

- Убедитесь что установили правильно
* ``` node -v ```
* ``` npm -v ```

## 3). Установить пакеты из файла package.json
* ``` sudo npm install ```

## 4). Запустите JSON-сервер, введя эту команду в свой терминал
* ``` npm run server ```

- Убедитесь что JSON-SERVER работает перейдя по ссылки в терминале

## 5). Запустите проект введя в консоли команду
* ``` npm run dev ```

- Если вы перезалили файл ./db/seminars.json
- То нужно перезагрузить json-server чтобы он обновил данные из файла

