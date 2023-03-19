/*
 * Connects a redis client to the redis server
 */
import { createClient } from 'redis';
import { promisify } from 'util';
const redis = require('redis');
const client = createClient();

client.on("error", (err) => console.log("Redis client not connected to the server: " + err));

/*
 * Sets the schoolName value in Redis
 */
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
};

/*
 * Displays the schoolName value to the console
 */
const displaySchoolValue = async (schoolName) => {
  console.log(await promisify(client.get).bind(client)(schoolName));
};

/*
 * Main function
 */
async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

client.on('connect', async () => {
  console.log('Redis client connected to the server');
  await main();
});
