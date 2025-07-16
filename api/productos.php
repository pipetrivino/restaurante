<?php
require __DIR__ . '/vendor/autoload.php';
use MongoDB\Client;

header('Content-Type: application/json');

try {
    $client = new Client('mongodb+srv://pipe:pipe@clusterrestaurante.o6ivt52.mongodb.net/?retryWrites=true&w=majority&appName=Clusterrestaurante');
    $collection = $client->restaurante->producto;

    $method = $_SERVER['REQUEST_METHOD'];

    // ✅ GET: Mostrar productos
    if ($method === 'GET') {
        $productos = $collection->find()->toArray();
        echo json_encode($productos);
        exit;
    }

    // ✅ POST: Insertar nuevo producto
    if ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data || !isset($data['nombre'], $data['costo'], $data['cantidad'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
            exit;
        }

        $result = $collection->insertOne([
            'nombre' => $data['nombre'],
            'costo' => $data['precio'],
            'cantidad' => $data['cantidad']
        ]);

        echo json_encode(['mensaje' => 'Producto insertado', 'id' => (string)$result->getInsertedId()]);
        exit;
    }

    // ✅ PUT: Actualizar producto
    if ($method === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data || !isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requerido']);
            exit;
        }

        $updateData = [];
        if (isset($data['nombre'])) $updateData['nombre'] = $data['nombre'];
        if (isset($data['precio'])) $updateData['precio'] = (float)$data['precio'];
        if (isset($data['cantidad'])) $updateData['cantidad'] = (int)$data['cantidad'];

        if (empty($updateData)) {
            http_response_code(400);
            echo json_encode(['error' => 'Nada que actualizar']);
            exit;
        }

        $result = $collection->updateOne(
            ['_id' => new MongoDB\BSON\ObjectId($data['id'])],
            ['$set' => $updateData]
        );

        echo json_encode(['mensaje' => 'Producto actualizado', 'modificados' => $result->getModifiedCount()]);
        exit;
    }

    // ✅ DELETE: Eliminar producto
    if ($method === 'DELETE') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data || !isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requerido para eliminar']);
            exit;
        }

        $result = $collection->deleteOne(['_id' => new MongoDB\BSON\ObjectId($data['id'])]);

        echo json_encode(['mensaje' => 'Producto eliminado', 'eliminados' => $result->getDeletedCount()]);
        exit;
    }

    // Si llega un método no permitido
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error interno: ' . $e->getMessage()]);
}
