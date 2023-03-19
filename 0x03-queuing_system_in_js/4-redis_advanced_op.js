/*
 * Connects a redis client to the redis server
 */
import { createClient } from 'redis';
const redis = require('redis');
const client = createClient();

client.on("error", (err) => console.log("Redis client not connected to the server: " + err));

client.on("connect", () => console.log("Redis client connected to the server"));

/*
 * Creates a hash 
 */
const schools = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};
for (const [field, val] of Object.entries(schools)) {
  client.HSET('HolbertonSchools', field, val, redis.print);
}

/*
 * Prints a hash
 */
client.HGETALL('HolbertonSchools', (err, reply) => console.log(reply));
