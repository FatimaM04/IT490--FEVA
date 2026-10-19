import pika 
import time 
import json

#Connect to the broker
connection = pika.BlockingConnection(pika.ConnectionParameters('10.214.117.73', 5672, '/', pika.PlainCredentials('fnm', '2004'))) 
channel = connection.channel()

print("---FRONTEND LOGIN---")