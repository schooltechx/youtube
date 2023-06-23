using System.Text;
using RabbitMQ.Client;
var queue = "ConcurrentConsumer";
var uri = new Uri("amqp://frappet:Password@localhost");
var factory = new ConnectionFactory(){Uri=uri};
using var connection = factory.CreateConnection();
using var channel = connection.CreateModel();
channel.QueueDeclare(
    queue,
    durable: false,
    exclusive: false,
    autoDelete: false,
    arguments: null);
Console.WriteLine(" Type Message to send (type exit to quit)");
var messageId = 1;
while(true)
{
    string line = Console.ReadLine()??"";
    if(line.Equals("exit")) break;
    var message = $"[{messageId}] {line}";
    var body = Encoding.UTF8.GetBytes(message);
    channel.BasicPublish(exchange: string.Empty, routingKey:queue, basicProperties:null, body: body);
    Console.WriteLine($"Send message: {message}");  
    messageId++;
}
channel.Close();
connection.Close();