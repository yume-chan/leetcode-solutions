const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 3) {
    console.log('USAGE: npm run new PROBLEM_NUMBER PROBLEM_TITLE SOLUTION_NAME SOLUTION_RESULT [...SOLUTION_PARAMS]');
    process.exit();
}

let template = fs.readFileSync(path.resolve(__dirname, 'template.ts'), 'utf8');
template = template.replace(/PROBLEM_NAME/g, `${args[0]}. ${args[1]}`);
template = template.replace('SOLUTION_NAME', args[2]);
template = template.replace(/SOLUTION_RESULT/g, args[3])

const parameters = args.slice(4);
template = template.replace(/SOLUTION_PARAMS/g, parameters.join(', '));
template = template.replace('SOLUTION_PARAM_NAMES', parameters.map(x => x.split(':')[0]).map(x => `'${x}'`).join(','));

const outputPath = path.resolve(__dirname, '..', 'src', `${args[0]}.ts`);
if (fs.existsSync(outputPath)) {
    console.log('solution file already existed');
} else {
    fs.writeFileSync(outputPath, template, 'utf8');
}
