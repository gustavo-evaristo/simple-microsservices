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

    console.log(`message ${data.toString()} successfully published to topic ${topic.name}`)
  }
}