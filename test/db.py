import pika 
import time 
import json

#Connect to the broker
connection = pika.BlockingConnection(pika.ConnectionParameters('10.214.117.73', 5672, '/', pika.PlainCredentials('fnm', '2004'))) 
channel = connection.channel()

print("Database is waiting for messages...")

while True: 
    # Check for a message from Backend method, properties, body = channel.basic_get(queue='db.queue', auto_ack=True)

    if body:
        data = json.loads(body)
        print("DB received query for:", data.get('username'))
    
    # Fake database check
    if data.get('username') == 'alice':
        reply = json.dumps({"status": "success", "message": "Welcome Alice!"})
    else:
        reply = json.dumps({"status": "failure", "message": "Invalid credentials"})
        
    # Send answer back to Backend
    channel.basic_publish(exchange='', routing_key='db.response', body=reply)
    print("DB replied:", reply)

time.sleep(1)