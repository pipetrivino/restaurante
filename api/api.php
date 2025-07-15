<?php
require 'conexion.php'; // Conexión a MongoDB Atlas

$collection = $db->restaurante; //nombre de base de datos

// Obtener todos los documentos
$documentos = $collection->find();

// Convertir el cursor a un array y procesarlo
$datos = [];
foreach ($documentos as $doc) {
    $doc['_id'] = (string)$doc['_id']; // Convertir el ID a string para evitar errores en JSON
    $datos[] = $doc;
}

// Enviar respuesta como JSON
header('Content-Type: application/json');
echo json_encode($datos);
?>
