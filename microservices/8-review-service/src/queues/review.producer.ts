import { Channel } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@review/queues/connection';
import { config } from '@review/config';
import { winstonLogger } from '@uzochukwueddie/jobber-shared';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reviewServiceProducer', 'debug');

export const publishFanoutMessage = async (
  channel: Channel,
  exchangeName: string,
  message: string,
  logMessage: string
): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    await channel.assertExchange(exchangeName, 'fanout');
    channel.publish(exchangeName, '', Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'ReviewService publishFanoutMessage() method:', error);
  }
};
