<?php
require __DIR__ . '/vendor/autoload.php';

use MongoDB\Client;

// URI de conexión (puedes mover la contraseña a una variable de entorno si lo vas a hacer más seguro)
$env = parse_ini_file(__DIR__ . '/config.env');
$uri = $env['MONGODB_URI']

$client = new Client($uri);

// Selecciona base de datos y colección
$db = $client->restaurante; // nombre de tu base de datos
$collection = $db->producto;    // nombre de tu colección (puedes cambiarlo)

try {
    $documentos = $collection->find()->toArray();

    header('Content-Type: application/json');
    echo json_encode($documentos);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
