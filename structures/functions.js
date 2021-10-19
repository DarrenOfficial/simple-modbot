const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function find_nested(dir, pattern) {
    let results = [];
    fs.readdirSync(dir).forEach(inner_dir => {
        inner_dir = path.resolve(dir, inner_dir);
        const stat = fs.statSync(inner_dir);
        if (stat.isDirectory()) {
            results = results.concat(find_nested(inner_dir, pattern));
        }
        if (stat.isFile() && inner_dir.endsWith(pattern)) {
            results.push(inner_dir);
        }
    });
    return results;
}

const cmd_files = find_nested("./commands/", ".js"); // load the commands in the command folders

module.exports.setup = (client) => {

    fs.readdir("./events/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) return console.log(chalk.red("The folder that your trying to load is empty!"));
        console.log(chalk.blue(`${jsfiles.length} events were loaded.`)); // Notify that the events has finished loaded.
        jsfiles.forEach((f, i) => {
            require(`../events/${f}`);
        });
    }); // Check the events and validates it

    if (cmd_files.length <= 0) return console.log(chalk.red("The command that your trying to load is empty!"));
    cmd_files.forEach(file => {
        const props = require(file);
        client.commands.set(props.help.name, props);
    }); // Check if the commands work
    console.log(chalk.blue(`${cmd_files.length} commands were loaded.`)); // Notify that the commands were loaded

};