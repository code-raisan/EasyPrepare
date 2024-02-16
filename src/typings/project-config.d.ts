interface ProjectConfig {
  version: 1,
  workflows: {
    [key: string]: WorkflowConfig
  }
};

interface WorkflowResults {
  [key: string]: {
    options: string | number | boolean
  }
}

type WorkflowDo = (utils: WorkflowUtilitys, workflows: WorkflowResults) => void;

interface WorkflowUtilitys {
  copy: (source: string, target: string) => void,
  envedit: (key: string, value: string, path: string) => void
};

type WorkflowFilter = (workflows: WorkflowResults) => boolean;

interface WorkflowConfig {
  name: string,
  type: "select" | "task",
  filter?: WorkflowFilter,
  options: WorkflowOption[],
  do?: WorkflowDo
};

interface WorkflowOption {
  name: string,
  returnval?: string | number | boolean,
  do?: WorkflowDo
};


