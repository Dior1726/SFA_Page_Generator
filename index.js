#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

// Преобразование строки в Kebab Case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

// Капитализация строки
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

program
  .name("sfa-page-generator")
  .description("Generate Vue page with predefined structure")
  .version("1.0.0")
  .argument("<name>", "page name")
  .option("-p, --path <path>", "custom path for page", "src/views")
  .action(async (name, options) => {
    try {
      const kebabCaseName = toKebabCase(name);
      const pageName = `${kebabCaseName}_view`;
      const pagePath = path.join(process.cwd(), options.path, pageName);

      // Проверка на существование директории
      if (await fs.pathExists(pagePath)) {
        console.log(
          chalk.yellow(`⚠️  Directory "${pageName}" already exists. Aborting.`)
        );
        process.exit(1);
      }

      // Создание структуры директорий
      await fs.mkdir(pagePath, { recursive: true });
      await fs.mkdir(path.join(pagePath, "api"), { recursive: true });
      await fs.mkdir(path.join(pagePath, "components"), { recursive: true });

      // Создание Vue компонента
      const componentContent = `<script setup lang="ts"></script>

<template>
  <div class="${kebabCaseName}-page">
    <h1>${name} Page</h1>
  </div>
</template>

<style lang="scss">
  @import url('./_style.scss');
</style>`;

      await fs.writeFile(
        path.join(pagePath, `${capitalize(name)}Page.vue`),
        componentContent
      );

      // Создание SCSS файла
      const styleContent = `.${kebabCaseName}-page {}`;
      await fs.writeFile(path.join(pagePath, "_style.scss"), styleContent);

      // Создание api/index.ts
      const apiContent = `// API methods for ${name} page`;
      await fs.writeFile(path.join(pagePath, "api/index.ts"), apiContent);

      // Создание components/index.ts
      const componentsContent = `// Export all components for ${name} page`;
      await fs.writeFile(
        path.join(pagePath, "components/index.ts"),
        componentsContent
      );

      // Лог успешного создания
      console.log(
        chalk.green(`✓ Successfully created ${name} page with structure:`)
      );
      console.log(chalk.blue(`  ${pageName}/`));
      console.log(chalk.blue(`    ├── ${capitalize(name)}Page.vue`));
      console.log(chalk.blue(`    ├── _style.scss`));
      console.log(chalk.blue(`    ├── api/`));
      console.log(chalk.blue(`    │   └── index.ts`));
      console.log(chalk.blue(`    └── components/`));
      console.log(chalk.blue(`        └── index.ts`));
    } catch (error) {
      console.error(chalk.red("Error creating page:"), error);
      process.exit(1);
    }
  });

program.parse();
