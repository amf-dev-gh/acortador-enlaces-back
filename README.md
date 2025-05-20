# 🔗 Acortador de Enlaces - Node.js + Express

Este proyecto es un simple **acortador de enlaces** desarrollado con **Node.js** y **Express**, que permite crear, consultar y actualizar URLs acortadas. Usa una base de datos **Turso** y está desplegado en **Render**.

## Características

* Acorta cualquier URL con un identificador único.
* Redirige al enlace original mediante el ID.
* Permite actualizar una URL ya guardada.


## Tecnologías

* Node.js
* Express
* Turso (SQLite en la nube)
* Render (para despliegue)


## 🔗 Endpoints

### `GET /test`

Verifica que el servidor esté funcionando.

**Respuesta:**

```json
{ "message": "Server - Short Link running" }
```


### `GET /:id`

Retorna la URL correspondiente al identificador.

**Ejemplo:**

```http
GET /a1b2c3
```

**Respuesta:**

```json
{ "id": "a1b2c3", "url": "https://ejemplo.com" }
```


### `POST /`

Crea una nueva URL acortada y retorna el `id`. Recibe un JSON con el campo `url`.

**Body:**

```json
{ "url": "https://ejemplo.com" }
```

**Respuesta:**

```json
{ "id": "abc123" }
```


### `PUT /:id`

Actualiza la URL original de un ID existente.

**Body:**

```json
{ "url": "https://nueva-url.com" }
```

**Respuesta:**

```json
{ "id": "abc123", "url": "https://nueva-url.com" }
```

---

## Despliegue en Render

El proyecto está desplegado en: [https://acortador-enlaces-back.onrender.com](https://acortador-enlaces-back.onrender.com)


## Futuras mejoras

* Expiración de enlaces.
* Cuentas para gestionar Links limitados

---

### Autor: *Andres Mariano Fernández*
### Creado con Node Js v20.17 y Express v5.1.0