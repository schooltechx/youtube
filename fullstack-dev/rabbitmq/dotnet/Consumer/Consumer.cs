using System;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
var queue = "ConcurrentConsumer";
var factory = new ConnectionFactory(){ 
    HostName = "localhost",UserName = "frappet",Password = "Password" 
};
using var connection = factory.CreateConnection();
using var channel = connection.CreateModel();
channel.QueueDeclare(
    queue,
    durable: false,
    exclusive: false,
    autoDelete: false,
    arguments: null);
// Fair Dispatch    
// channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false); 
var consumer = new EventingBasicConsumer(channel);
var random = new Random();
consumer.Received += (model, ea) =>
{
    var processingTime = random.Next(1, 5);
    var body = ea.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);
    Console.WriteLine($"Recieved: '{message}' ");
    Task.Delay(TimeSpan.FromSeconds(processingTime)).Wait();
    channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
};
channel.BasicConsume(queue, autoAck: false, consumer);
Console.WriteLine("Consuming (press Enter to exit)");
Console.ReadKey();
channel.Close();
connection.Close();