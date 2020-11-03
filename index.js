const core = require("@actions/core");
const github = require("@actions/github");

const jiraPrefix = core.getInput("jira-prefix");

async function run() {
  try {
    const prTitle = github.context.payload.pull_request.title;
    const prBody = github.context.payload.pull_request.body;

    let regex = new RegExp(`${jiraPrefix}-[0-9]+`);
    let regexBody = new RegExp(`https:\/\/togather\.atlassian\.net+`);
    if (!regex.test(prTitle) || !regexBody.test(prBody)) {
      core.setFailed("Jira Issue Key missing in PR title or description. " + prTitle + " prefix : " + jiraPrefix);
      return;
    }
  } catch (error) {
    core.info(error);
  }
}

run();
