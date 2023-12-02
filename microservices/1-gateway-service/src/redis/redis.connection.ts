import { config } from '@gateway/config';
import { winstonLogger } from '@uzochukwueddie/jobber-shared';
import { createClient } from 'redis';
import { Logger } from 'winston';

type RedisClient = ReturnType<typeof createClient>;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'gatewayRedisConnection', 'debug');

class RedisConnection {
  client: RedisClient;

  constructor() {
    this.client = createClient({ url: `${config.REDIS_HOST}`});
  }

  async redisConnect(): Promise<void> {
    try {
      await this.client.connect();
      log.info(`GatewayService Redis Connection: ${await this.client.ping()}`);
      this.cacheError();
    } catch (error) {
      log.log('error', 'GatewayService redisConnect() method error:', error);
    }
  };

  private cacheError(): void {
    this.client.on('error', (error: unknown) => {
      log.error(error);
    });
  };
}

export const redisConnection: RedisConnection = new RedisConnection();
