# Products Monorepo
This is a E Commerce web application build using event based architecture

## Quick Start
To start the web app
```bash
make up
```
Application runs in http://localhost:3000

---

### Server Details
#### Frontend
Main App - http://localhost:3000
#### Backend
API Gateway - http://localhost:4000
#### Service Map
| Service       | Host                       | Gateway URL                         |
|---------------|----------------------------|-------------------------------------|
| Inventory     | http://localhost:4001      | http://localhost:4000/inventory     |
| Orders        | http://localhost:4002      | http://localhost:4000/orders        |
| Cart          | http://localhost:4003      | http://localhost:4000/cart          |
| Notifications | http://localhost:4004      | http://localhost:4000/notifications |
| Payments      | http://localhost:4005      | http://localhost:4000/payments      |
| Accounts      | http://localhost:4006      | http://localhost:4000/accounts      |


