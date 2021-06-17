```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```
server/.env
```js
NODE_PORT = 3000
NODE_ENV = development

SESSION_SECRET = 

MONGO_URI =
```