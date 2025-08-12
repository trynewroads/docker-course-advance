#!/bin/bash
# filepath: setup-swarm.sh

# Crear red
echo "[INFO] Creando red swarm-net..."
docker rm -f $(docker ps -q --filter "network=swarm-net") 2>/dev/null
docker network rm swarm-net
docker network create --driver bridge swarm-net

# Crear manager
echo "[INFO] Creando nodo manager..."
docker rm -f swarm-manager 2>/dev/null
docker run -d --privileged --name swarm-manager \
  --hostname swarm-manager \
  --network swarm-net \
  -p 2377:2377 \
  -p 7946:7946 \
  -p 4789:4789 \
  -p 3000:3000 \
  -p 80:80 \
  -p 8080:8080 \
  docker:dind

# Esperar a que el manager esté listo
echo "[INFO] Esperando a que el manager esté listo..."
sleep 10

# Inicializar swarm
echo "[INFO] Inicializando swarm en el manager..."
docker exec swarm-manager docker swarm init --advertise-addr eth0

# Obtener token
echo "[INFO] Obteniendo token de join para workers..."
TOKEN=$(docker exec swarm-manager docker swarm join-token worker -q)

# Crear workers
for i in $(seq 1 2); do
  echo "[INFO] Creando nodo worker$i..."
  docker rm -f swarm-worker$i 2>/dev/null
  docker run -d --privileged --name swarm-worker$i \
    --hostname swarm-worker$i \
    --network swarm-net \
    docker:dind

  echo "[INFO] Esperando a que worker$i esté listo..."
  sleep 5

  echo "[INFO] Uniendo worker$i al swarm..."
  docker exec swarm-worker$i docker swarm join --token $TOKEN swarm-manager:2377
done

# Mostrar nodos
echo "[INFO] Nodos del cluster:"
docker exec swarm-manager docker node ls