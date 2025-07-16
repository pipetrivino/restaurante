<?php
require __DIR__ . '/vendor/autoload.php';
use MongoDB\Client;

header('Content-Type: application/json'); // Asegura JSON en cualquier respuesta

try {
    $uri = 'mongodb+srv://pipe:pipe@clusterrestaurante.o6ivt52.mongodb.net/?retryWrites=true&w=majority&appName=Clusterrestaurante';

    $client = new Client($uri);
    $collection = $client->restaurante->producto;

    // Obtener datos JSON del cuerpo del POST
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['nombre']) || !isset($data['costo']) || !isset($data['cantidad'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos incompletos o mal formateados']);
        exit;
    }

    $insertado = $collection->insertOne([
        'nombre' => $data['nombre'],
        'costo' => $data['costo'],
        'cantidad' => $data['cantidad'],
    ]);

    echo json_encode([
        'mensaje' => 'Producto insertado correctamente',
        'id' => (string)$insertado->getInsertedId()
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error interno: ' . $e->getMessage()]);
}
