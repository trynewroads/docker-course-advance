#!/bin/bash
# filepath: setup-swarm.sh

# Crear red
docker network create --driver bridge swarm-net

# Crear manager
docker run -d --privileged --name swarm-manager \
  --hostname swarm-manager \
  --network swarm-net \
  -p 2377:2377 \
  -p 7946:7946 \
  -p 4789:4789 \
  docker:dind

# Esperar a que el manager esté listo
sleep 10

# Inicializar swarm
docker exec swarm-manager docker swarm init --advertise-addr eth0

# Obtener token
TOKEN=$(docker exec swarm-manager docker swarm join-token worker -q)

# Crear workers
for i in {1..2}; do
  docker run -d --privileged --name swarm-worker$i \
    --hostname swarm-worker$i \
    --network swarm-net \
    docker:dind
  
  sleep 5
  
  # Unir worker al swarm
  docker exec swarm-worker$i docker swarm join --token $TOKEN swarm-manager:2377
done

# Mostrar nodos
echo "Nodos del cluster:"
docker exec swarm-manager docker node ls