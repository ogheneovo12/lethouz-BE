## LETHOUZ BACKEND REPOSITORY
### Search Apartment

##### GET /apartment

Request

```
/apartment?lng=3.3515&lat=6.6019&price=3000&state=new&type=duplex
```

Response

```
{
    "data": [
        {
            "sold": false,
            "attachments": [],
            "_id": "5f6dbe911b838a452b17c7a8",
            "title": "5 bedroom flat",
            "price": 2000,
            "description": "",
            "purpose": "sale",
            "type": "duplex",
            "details": {
                "_id": "5f6dbe911b838a452b17c7a9",
                "bedrooms": "5",
                "bathrooms": "4",
                "toilets": "3",
                "size": "1200"
            },
            "address": {
                "_id": "5f6dbe911b838a452b17c7aa",
                "lga": "victoria island",
                "state": "lagos",
                "address": "123 Ahmadu bello way victoria island, lagos"
            },
            "geometry": {
                "type": "Point",
                "_id": "5f6dbe911b838a452b17c7ab",
                "coordinates": [
                    3.4172646,
                    6.4296012
                ]
            },
            "published": 0,
            "posted_by": {
                "_id": "5f670e2643b4a411460aa9e0",
                "firstName": "emmanuel",
                "lastName": "chukwurah",
                "email": "emek@dev.com"
            },
            "createdAt": "2020-09-25T09:55:29.409Z",
            "updatedAt": "2020-09-25T09:55:29.409Z",
            "__v": 0
        }
    ],
    "errors": null,
    "message": "apartments found"
}
```
