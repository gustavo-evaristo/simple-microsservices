import { PubSub } from '@google-cloud/pubsub';

export class PubSubService {
  private client: PubSub;

  constructor() {
    this.client = new PubSub({
      projectId: process.env.GCLOUD_PROJECT_ID
    })
  }

  async publish(topicName: string, dataToSend: any) {
    const topic = this.client.topic(topicName);
  
    const data = Buffer.from(JSON.stringify(dataToSend));
    
    await topic.publishMessage({ data });

    console.log(`message ${dataToSend} successfully published to topic ${topic.name}`)
  }

  async subscribe(subscriptionName, callback) {
    const subscribe = this.client.subscription(subscriptionName);

    subscribe.on('message', message => {
      callback(message);
      message.ack();
    })

  }
}