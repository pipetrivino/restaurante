<?php
require __DIR__ . '/vendor/autoload.php';

use MongoDB\Client;

// Conexión directa sin .env por ahora
$uri = 'mongodb+srv://pipe:pipe@clusterrestaurante.o6ivt52.mongodb.net/?retryWrites=true&w=majority&appName=Clusterrestaurante';

$client = new Client($uri);

$collection = $client->restaurante->producto;

// Leer datos JSON enviados por POST
$data = json_decode(file_get_contents("php://input"), true);
console.log($data);
if (!$data || !isset($data['nombre']) || !isset($data['cantidad']) || !isset($data['costo'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

// Insertar en MongoDB
$result = $collection->insertOne([
    'nombre' => $data['nombre'],
    'cantidad' => (float)$data['cantidad'],
    'costo' => (int)$data['costo'],
    'fecha' => date('Y-m-d H:i:s')
]);

echo json_encode(['mensaje' => 'Producto agregado', 'id' => (string)$result->getInsertedId()]);
