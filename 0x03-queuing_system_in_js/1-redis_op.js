/*
 * Connects a redis client to the redis server
 */
import { createClient } from 'redis';
const redis = require('redis');
const client = createClient();

client.on("error", (err) => console.log("Redis client not connected to the server: " + err));

client.on("connect", () => console.log("Redis client connected to the server"));

/*
 * Sets the schoolName value in Redis
 */
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, redis.print);
};

/*
 * Displays the schoolName value to the console
 */
const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, reply) => {
    console.log(reply);
  });
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
