import chalk from "chalk";
import shelljs from "shelljs";
import appRootPath from "app-root-path";
import { readFileSync, writeFileSync } from "fs";
import editDotenv from "edit-dotenv";
import errors from "./errors";

const log = {
  nomal: (text: string) => console.log(text),
  info: (text: string) => console.log(`${chalk.bgCyan(" INFO ")} ${text}`),
  success: (text: string) => console.log(`${chalk.bgGreen(" SUCCESS ")} ${text}`),
  error: (code: number, text: string) => console.log(`${chalk.bgRed(" ERROR ")} ${text} ${chalk.dim(`(E${code})`)}`)
};

const formatErrorMsg = (error_code: number, values: Array<string>) =>{
  let error_msg = errors[error_code];
  values.map((v, k) =>{
    error_msg = error_msg.replace(`{${k+1}}`, v);
  });
  return error_msg;
}

const checkConfigRoot = (ProjectConfig: ProjectConfig) =>{
  if(ProjectConfig.version == null) return "version";
  if(!ProjectConfig.workflows) return "workflows";
  return false;
};

const checkConfigWorkflow = (ProjectConfigWorkflow :any) =>{
  if(!ProjectConfigWorkflow.name) return "name";
  return false;
}

const workflowUtilitys = {
  copy: (source: string, target: string) =>{
    const project_root = appRootPath.toString();
    shelljs.cp(`${project_root}/${source}`, `${project_root}/${target}`);
  },
  envedit: (key: string, value: string, path: string) =>{
    const project_root = appRootPath.toString();
    const envfile = readFileSync(`${project_root}/${path}`).toString();
    const change = { [key]: value };
    const result = editDotenv(envfile, change);
    writeFileSync(`${project_root}/${path}`, result);
  }
};

export {
  log,
  formatErrorMsg,
  checkConfigRoot,
  checkConfigWorkflow,
  workflowUtilitys
};
