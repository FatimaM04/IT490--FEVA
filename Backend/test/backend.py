import pika 
import time 
import json

#Connect to the broker
connection = pika.BlockingConnection(pika.ConnectionParameters('10.214.117.73', 5672, '/', pika.PlainCredentials('fnm', '2004'))) 
channel = connection.channel()

print("Backend is listening on auth.queue...")

while True:
    method, properties, body = channel.basic_get(queue='auth.queue', auto_ack=True)

    if body:
        data = json.loads(body)
        print("Backend recieved login request:", data)

        db_reply= None
        while not db_reply:
            m, p, b = channel.basic_get(queue='db.response', auto_ack=True) 
            if b:
                db_reply = b
            time.sleep(0.5)
        channel.basic_publish(exchanges='', routing_key='auth.response', body=db_reply)
    time.sleep(1)