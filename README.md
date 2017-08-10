# vitrine-server

## Used Technologies

Server : Express 4.15.2, with nodejs,
Storage: MongoDB, with mongoose 4.11.1,
Communication: JSON.

## Config
Fill in the `config\production.json`

## Database

### MongoDB

- Launch MongoDB

```shell
$ mongod
```

- Import JSON
Don't forget to use the Date type for date string with `ISODate(<String>)` function
Use timestamp fields (create, update, ...)
