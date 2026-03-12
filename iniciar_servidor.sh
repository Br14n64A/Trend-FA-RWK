#!/bin/bash
# Iniciar servidor PHP en segundo plano para el Dashboard
# Asegúrate de ejecutarlo desde la carpeta del proyecto

PORT=8080
LOG_FILE="server.log"

# Matar procesos previos en ese puerto si existen (opcional)
# fuser -k ${PORT}/tcp > /dev/null 2>&1

nohup php -S 0.0.0.0:${PORT} > ${LOG_FILE} 2>&1 &

echo "============================================"
echo " DASHBOARD SERVER (Linux/Background)"
echo "============================================"
echo "Servidor iniciado en el puerto: ${PORT}"
echo "Logs: tail -f ${LOG_FILE}"
echo "PID: $!"
echo "============================================"
