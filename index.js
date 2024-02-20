const amqp = require('amqplib');

async function publishMessage() {
    try {
        const connection = await amqp.connect('amqp://test:test@10.0.2.155:5672');
        const channel = await connection.createChannel();
        const queue = 'authentication_service_queue';

        await channel.assertQueue(queue, { durable: false });
    
        const data = JSON.stringify({
            // "id": "AB1211",
            "pattern": "startResetPassword",
            "data": {
                "phone": "+905070793461"
            }
        });

        channel.addListener("authentication_service_queue", (mssg) => {
            console.log("aha:", mssg);
        })
        
        channel.sendToQueue(queue, Buffer.from(data), {
            // replyTo: "sendSMS",
            // correlationId: "AB1211"
        });

        console.log(`Sent: ${data}`);
    } catch (error) {
      console.error('Error publishing message:', error);
    }
}
publishMessage();
