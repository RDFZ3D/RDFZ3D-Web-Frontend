# `typesafe-i18n` 库使用说明

*请养成 查看 [官方文档](https://github.com/ivanhofer/typesafe-i18n) 的好习惯！！*

## 翻译键的编辑

对本 `i18n` 目录进行更改时， **必须** 在后台运行 `npm run typesafe-i18n` 
以实时更新 `i18n-*.ts` 和其他文件。

> 你一定只需要编辑各语言文件夹中的文件，且只有可能需要在 `zh-CN` 文件夹新建文件！

### 新增翻译键

请在 `src/i18n/zh-CN/` 中相应文件中添加新的翻译键。
保存后，`i18n-types.ts` 等文件会自动更新。
其他语言的对应文件 TypeScript 会报错，补充相应键即可。

### 新增 Namespace

请在 `src/i18n/zh-CN/` 中添加新的文件夹，内部新建 `index.ts`，内容为
```ts
import type { BaseTranslation } from "../../i18n-types";

const zh_CN_命名空间名称 = {
  // 翻译键值对
} satisfies BaseTranslation;

export default zh_CN_命名空间名称;
```
保存后，其他语言文件夹内会自动新建文件夹和相应文件。

此后，在 `zh-CN` 文件夹中的对应文件中添加翻译键，步骤同上。

## 翻译键的使用

请照猫画虎。

特别地，使用命名空间中的翻译键需要先于 `layout.ts` 载入。
