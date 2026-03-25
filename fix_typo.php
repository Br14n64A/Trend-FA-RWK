<?php
$path = 'dashboard_data.json';
if (file_exists($path)) {
    $content = file_get_contents($path);
    $data = json_decode($content, true);
    if (isset($data['seconsData']) && !isset($data['secondData'])) {
        $data['secondData'] = $data['seconsData'];
        unset($data['seconsData']);
        file_put_contents($path, json_encode($data));
        echo "Fixed typo: seconsData -> secondData\n";
    } else {
        echo "Typo not found or secondData already exists.\n";
    }
}
?>
