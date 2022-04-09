import { Worker as snowflakey } from 'snowflakey';
import { config } from 'dotenv';
config();

class Snowflake {
	constructor(name) {
		this.snowflakey = new snowflakey({
			name: name,
			epoch: process.env.SNOWFLAKE_EPOCH,
			workerId: process.env.CLUSTER_ID || 31,
			processId: process.pid || undefined,
			workerBits: 8,
			processBits: 0,
			incrementBits: 14
		});
	}

	generate() {
		return this.snowflakey.generate();
	}
}

export default Snowflake;