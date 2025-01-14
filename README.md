# sfa-page-generator

**sfa-page-generator** — это CLI-инструмент для быстрого создания Vue-страниц с предопределенной структурой. Он автоматически генерирует файлы и директории, необходимые для организации вашей Vue-приложения.

## Установка

### Глобальная установка:

```bash
npm install -g sfa-page-generator
```

### Использование локально (через `npx`):

```bash
npx sfa-page-generator <page-name> [options]
```

## Использование

После установки вы можете запустить команду:

```bash
sfa-page-generator <page-name> [options]
```

### Примеры:

1. Создать страницу `Home` в стандартной директории (`src/views`):

   ```bash
   sfa-page-generator Home
   ```

2. Создать страницу `Profile` в кастомной директории:
   ```bash
   sfa-page-generator Profile --path src/pages
   ```

### Опции:

- `-p, --path <path>` — указывает кастомный путь для страницы. По умолчанию: `src/views`.

## Структура, создаваемая CLI

После выполнения команды, создается следующая структура:

```
<path>/<page-name>_view/
├── <PageName>Page.vue   # Главный Vue-компонент
├── _style.scss          # SCSS-файл для стилей
├── api/
│   └── index.ts         # Шаблонный файл для API-методов
└── components/
    └── index.ts         # Индексный файл для компонентов
```

### Пример для `sfa-page-generator Home`:

```
src/views/home_view/
├── HomePage.vue
├── _style.scss
├── api/
│   └── index.ts
└── components/
    └── index.ts
```

## Зависимости

Этот CLI-инструмент использует следующие библиотеки:

- [commander](https://www.npmjs.com/package/commander) — для обработки аргументов командной строки.
- [fs-extra](https://www.npmjs.com/package/fs-extra) — для работы с файловой системой.
- [chalk](https://www.npmjs.com/package/chalk) — для форматирования вывода в консоли.

## Лицензия

Этот проект лицензирован под лицензией [MIT](LICENSE).
