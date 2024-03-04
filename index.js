const amqp = require('amqplib');

async function publishMessage() {
    try {
        const connection = await amqp.connect('amqp://test:test@10.0.2.155:5672');
        const channel = await connection.createChannel();
        // const queue = 'authentication_service_queue_develop_fab';
        const queue2 = 'static_data_service_queue_develop_fab';

        // await channel.assertQueue(queue, { durable: false });
        await channel.assertQueue(queue2, { durable: false });
    
        /*
        const data = JSON.stringify({
            // "id": "AB1211",
            "pattern": "validateToken",
            "data": {
                "phone": "+905070793461"
            }
        });
        */
        const data2 = JSON.stringify({
            // "id": "AB1211",
            "pattern": "getCities",
            "data": {
                "phone": "+905070793461"
            }
        });

        /*
        channel.addListener("authentication_service_queue_develop_fab", (mssg) => {
            console.log("aha:", mssg);
        })
        */
        channel.addListener("static_data_service_queue_develop_fab", (mssg) => {
            console.log("aha2:", mssg);
        })
        
        /*
        channel.sendToQueue(queue, Buffer.from(data), {
            // replyTo: "sendSMS",
            // correlationId: "AB1211"
        });
        */
        setTimeout(() => {
            channel.sendToQueue(queue2, Buffer.from(data2), {
                // replyTo: "sendSMS",
                // correlationId: "AB1211"
            });
        }, 300);

        // console.log(`Sent: ${data}`);
        console.log(`Sent2: ${data2}`);

        setTimeout(() => {
            channel.close();
            connection.close();
        }, 2000);
    } catch (error) {
      console.error('Error publishing message:', error);
    }
}
publishMessage();
