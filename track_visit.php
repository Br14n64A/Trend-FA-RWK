<?php
/**
 * Visitor Tracking System - Anonymous
 * Captures IP and visit timestamp.
 */

$logFile = 'visitor_log.json';

// CORS and Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($logFile)) {
        echo file_get_contents($logFile);
    } else {
        echo json_encode([]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Get IP and User Agent
    $ip = $_SERVER['REMOTE_ADDR'] ?: 'Unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?: 'Unknown';
    $timestamp = date('Y-m-d H:i:s');
    
    // Attempt to get hostname (useful for intranet)
    $hostname = gethostbyaddr($ip);

    $entry = [
        'timestamp' => $timestamp,
        'ip' => $ip,
        'hostname' => $hostname,
        'visitor_id' => $data['visitor_id'] ?? 'N/A',
        'userAgent' => $userAgent
    ];

    // Load existing logs
    $logs = [];
    if (file_exists($logFile)) {
        $content = file_get_contents($logFile);
        $logs = json_decode($content, true) ?: [];
    }

    // Add new entry
    $logs[] = $entry;

    // Keep only last 1000 logs to prevent file bloat
    if (count($logs) > 1000) {
        array_shift($logs);
    }

    // Save logs
    if (file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT), LOCK_EX) !== false) {
        echo json_encode([
            'success' => true, 
            'message' => 'Visit recorded', 
            'ip' => $ip,
            'hostname' => $hostname
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to save log']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
