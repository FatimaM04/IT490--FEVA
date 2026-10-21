import pika 
import time 
import json

#Connect to the broker
connection = pika.BlockingConnection(pika.ConnectionParameters('10.214.117.73', 5672, '/', pika.PlainCredentials('fnm', '2004'))) 
channel = connection.channel()

print("---FRONTEND LOGIN---")
username = input("Enter Username: ")

message = json.dumps({"username:" username, "password:" "123"})

#send to backend
channel.basic_publish(exchange='', routing_key='auth.queue', body=message)
print("sent login request for", username)

#wait for final answer from backend

answer = None
while not answer:
    method, properties, body = channel.basic_get(queue='auth.response', auto_ack=True)
    if body:
        answer = body
    time.sleep(0.5)
print("\n>>> FINAL RESULT FROM SERVER:", answer.decode())
connection.close()