## API

## Product

### GET /products
- `headers`: 
   - `Content-Type`: application/json
   
#### Example JSON:
```yaml
[
   {
      "id": 1,
      "name": "Cartera Mujer",
      "sku": "64905740",
      "upc": 1111111111,
      "price": 10000,
      "long_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "short_description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae",
      "werehouse": [
         {
            "id": 1,
            "name": "Tienda Oeste",
            "stock": 100
         },
         {
            "id": 2,
            "name": "Tienda Este",
            "stock": 1
         }
      ]
   },
   {
      "id": 3,
      "name": "Zapatilla Hombre",
      "sku": "55402710",
      "upc": 1111111112,
      "price": 20000,
      "long_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "short_description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae",
      "werehouse": [
         {
            "id": 3,
            "name": "Tienda Centro",
            "stock": 11
         }
      ]
   },
   {
      "id": 4,
      "name": "Camisa Hombre",
      "sku": "23435167",
      "upc": 1111111113,
      "price": 30000,
      "long_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "short_description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae",
      "werehouse": []
   },
   {
      "id": 5,
      "name": "Producto Ficticio",
      "sku": "64905741",
      "upc": 111111111,
      "price": 30000,
      "long_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "short_description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae",
      "werehouse": []
   }
]
```

### GET /products/{ id }
- `headers`: 
   - `Content-Type`: application/json
- `params`: Query Params
   - `id`: is a primary key from product. 
   
#### Example JSON:
```yaml
{
   "id": 1,
   "name": "Cartera Mujer",
   "sku": "64905740",
   "upc": 1111111111,
   "price": 10000,
   "iva": 19,
   "werehouse": [
      {
         "id": 1,
         "name": "Tienda Oeste",
         "stock": 100
      },
      {
         "id": 2,
         "name": "Tienda Este",
         "stock": 1
      }
   ]
}
```

### POST /product
- `headers`: 
   - `Content-Type`: application/json
- `body`: 
   - `id`: is a primary key from product. 
   
#### Example JSON:
```yaml
{
   "name": "Cartera Mujer",
   "sku": "64905740",
   "upc": 1111111111,
   "price": 10000,
   "iva": 19,
   "werehouse": [
      {
         "id": 1,
         "name": "Tienda Oeste",
         "stock": 100
      },
      {
         "id": 2,
         "name": "Tienda Este",
         "stock": 1
      }
   ]
}
```

#### Example JSON Error:
```yaml
{
   "errors": [
      {
         "msg": "Invalid value(s)",
         "param": "_error",
         "nestedErrors": [
            {
               "value": "64905740",
               "msg": "SKU Already exists",
               "param": "sku",
               "location": "body"
            }
         ]
      },
      {
         "msg": "Invalid value(s)",
         "param": "_error",
         "nestedErrors": [
            {
               "value": "1111111111",
               "msg": "UPC Already exists",
               "param": "upc",
               "location": "body"
            }
         ]
      },
      {
         "msg": "Invalid value(s)",
         "param": "_error",
         "nestedErrors": [
            {
               "msg": "Invalid value",
               "param": "long_description",
               "location": "body"
            },
            {
               "value": "",
               "msg": "must be at least 1 chars long",
               "param": "long_description",
               "location": "body"
            }
         ]
      },
      {
         "msg": "Invalid value(s)",
         "param": "_error",
         "nestedErrors": [
            {
               "msg": "Invalid value",
               "param": "short_description",
               "location": "body"
            },
            {
               "value": "",
               "msg": "must be at least 1 chars long",
               "param": "short_description",
               "location": "body"
            }
         ]
      }
   ]
}
```
