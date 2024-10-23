## Read all Contacts
curl "http://localhost:3000/contacts"

## Request (2)
curl "https://improved-robot-q79qr9wr9xcx5v6-3000.app.github.dev/"

## Insert a Contact
curl -X "POST" "http://localhost:3000/contacts" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "name": "Diego",
  "age": "25"
}'

## Delete Contact
curl -X "DELETE" "http://localhost:3000/contacts/67175142eb5ea3dde9ba8e90?id=7373" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{}'
