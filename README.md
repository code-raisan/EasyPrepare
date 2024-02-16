# Easy Prepare

プロジェクトの設定(envファイル等の生成)を効率的に行えるようにするためのツールです。

## Use

`.easy-prepare.js` をプロジェクトのルートに作成して以下のフォーマットで記述してください

```js
module.exports = {
  version: 1,
  workflows: {
    select_environment: {
      name: "Select environment",
      type: "select",
      options: [
        { name: "Develop", returnval: "development", do: (utils) => utils.copy(".env.sample", ".env.development") },
        { name: "Production", returnval: "production", do: (utils) => utils.copy(".env.sample", ".env.production") }
      ]
    },
    prepare_smtp_testing: {
      name: "Ues SMTP testing?",
      type: "select",
      filter: (workflows) => workflows.select_environment.options === "development",
      options: [
        { name: "Yes", do: (utils, workflows) => utils.envedit("SMTP_SERVER_HOST", "smtp.com",`.env.${workflows.select_environment.options}`) },
        { name: "No" },
      ]
    },
    set_default_developing_value: {
      name: "Set default developing value.",
      type: "task",
      filter: (workflows) => workflows.select_environment.options === "development",
      do: () =>{ console.log("DEFAULT RUN") }
    }
  }
};

```
