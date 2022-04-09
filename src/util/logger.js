import chalk from 'chalk';

class Logger {
	constructor(name) {
		this.name = name;
	}
	
	info(message) {
		console.log(chalk.bgBlue.bold.black(' INFO ') + chalk.bgWhite.black(` ${this.name} `), message + '\n');
	}

	debug(message) {
		console.log(chalk.bgGreen.bold.black(' DEBUG ') + chalk.bgWhite.black(` ${this.name} `), message + '\n');
	}

	warn(message) {
		console.log(chalk.bgYellow.bold.black(' WARN ') + chalk.bgWhite.black(` ${this.name} `), message + '\n');
	}

	error(message) {
		console.log(chalk.bgRed.bold.black(' ERROR ') + chalk.bgWhite.black(` ${this.name} `), message + '\n');
	}
}

export default Logger;