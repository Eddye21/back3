# Back3 API

## Prerrequisitos
- Docker instalado
- Cuenta de Docker Hub (opcional para publicar)

## Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con al menos:
```
PORT=8080
MONGODB_URI=mongodb://<host>:<port>/<db>
BCRYPT_ROUNDS=10
DEFAULT_PASSWORD=coder123
JWT_PRIVATE_KEY=secret
```

## Construir la Imagen Docker
```
docker build -t back3:latest .
```

## Ejecutar el Contenedor
```
docker run -d \
  -p 8080:8080 \
  --name back3 \
  --env-file .env \
  back3:latest
```

## Verificar
```
curl http://localhost:8080/api/users
```

## Documentación Swagger
Abre:
```
http://localhost:8080/api/docs
```

## Uso con Docker Hub
- Etiqueta la imagen:
```
docker tag back3:latest <dockerhub-username>/back3:latest
```
- Inicia sesión:
```
docker login
```
- Publica:
```
docker push <dockerhub-username>/back3:latest
```
- Descarga:
```
docker pull <dockerhub-username>/back3:latest
```

## Ejecutar desde la Imagen en Docker Hub
```
docker run -d \
  -p 8080:8080 \
  --name back3 \
  --env-file .env \
  <dockerhub-username>/back3:latest
```

## Endpoints Comunes
- GET `/api/users`
- GET `/api/users/{uid}`
- PUT `/api/users/{uid}`
- DELETE `/api/users/{uid}`
- GET `/api/docs`
