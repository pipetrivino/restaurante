<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'conexion.php';

$collection = $db->menu;

$resultado = $collection->find();

$datos = [];
foreach ($resultado as $doc) {
    $doc['_id'] = (string)$doc['_id'];
    $datos[] = $doc;
}

header('Content-Type: application/json');
echo json_encode($datos);
