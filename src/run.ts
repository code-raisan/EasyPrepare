import { require as reqlib } from "app-root-path";
import clear from "clear";
import confirm from "@inquirer/confirm";
import select from "@inquirer/select";
import { log, checkConfigRoot, formatErrorMsg, workflowUtilitys } from "./utils";
import chalk from "chalk";

const run = async () =>{
  const ProjectConfig = reqlib("/.easy-prepare.js") as ProjectConfig;

  const check_config_root = checkConfigRoot(ProjectConfig)
  if(check_config_root){
    log.error(1001, formatErrorMsg(1001, [check_config_root]));
    process.exit(1);
  }

  const Workflows = ProjectConfig.workflows;
  const workflow_keys = Object.keys(Workflows);

  if(workflow_keys.length < 1){
    log.info("0 workflow found.");
    process.exit(0);
  }

  log.info(`${workflow_keys.length} workflows found.`);
  const isRun = await confirm({ message: "Do you want to run a workflow?", default: false });
  if(!isRun){
    log.success("Stopped.");
    process.exit(0);
  }

  clear();

  const workflow_returns: any = {};
  for(const key of workflow_keys){
    const wf = Workflows[key];

    if(wf.filter?wf.filter(workflow_returns):true){
      switch(wf.type){
        case "select":
          const select_result_index = await select({
            message: wf.name,
            choices: wf.options.map((v, k) => ({ name: v.name, value: k }))
          });

          workflow_returns[key] = {
            options: wf.options[select_result_index].returnval ?? select_result_index
          };

          if(typeof wf.options[select_result_index].do === "function"){
            // @ts-ignore
            wf.options[select_result_index].do(workflowUtilitys, workflow_returns);
          }
          break;
        case "task":
          log.nomal(`${chalk.green("Run")} ${wf.name}`);
          break;
      }
      if(wf.do) wf.do(workflowUtilitys, workflow_returns);
    }else{
      log.nomal(`${chalk.yellow("Skip")} ${wf.name}`);
    }
    log.nomal("\n");
  };
}

export { run };
