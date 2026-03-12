<?php
/**
 * Robust Data Handler for PCBA Dashboard - Azure Optimized
 * Manages a JSON file with safe concurrent locking.
 */

$file = 'dashboard_data.json';

// CORS and Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (file_exists($file)) {
        // Read file with shared lock
        $handle = fopen($file, 'r');
        if ($handle) {
            flock($handle, LOCK_SH);
            $content = file_get_contents($file);
            flock($handle, LOCK_UN);
            fclose($handle);
            echo $content;
        } else {
            echo json_encode(['error' => 'Could not open file']);
        }
    } else {
        // Initial state if file doesn't exist
        echo json_encode([
            'version' => '5.0',
            'data' => [],
            'history' => [],
            'status' => 'initialized'
        ]);
    }
} elseif ($method === 'POST') {
    $input = file_get_contents('php://input');
    
    if ($input) {
        // Validate JSON before saving
        $jsonTest = json_decode($input);
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON data received']);
            exit;
        }

        // Write file with exclusive lock to prevent corruption
        $bytes = file_put_contents($file, $input, LOCK_EX);
        
        if ($bytes !== false) {
            echo json_encode([
                'success' => true, 
                'message' => 'Data saved successfully', 
                'bytes' => $bytes,
                'timestamp' => date('Y-m-d H:i:s')
            ]);
        } else {
            $error = error_get_last();
            http_response_code(500);
            echo json_encode([
                'success' => false, 
                'message' => 'Failed to write to file. Check Azure storage permissions.',
                'php_error' => $error['message'] ?? 'Unknown error'
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No data received']);
    }
} elseif ($method === 'OPTIONS') {
    exit;
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
