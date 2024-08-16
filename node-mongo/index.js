const MongoClient = require('mongodb').MongoClient;

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'nucampsite';

MongoClient.connect(url, {}, (err, client) => {
    
    console.log('Connected correctly to server');

    const db = client.db(dbName);

    db.dropCollection('campsites')
        .then(result => {
            console.log('Dropped Collection:', result);
        })
        .catch(err => console.log('Error Dropping Collection:'));

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"}, 
            'campsites').then(result => {
                console.log('Inser Document:', result.ops);
                return dboper.findDocuments(db, 'campsites');
            })
            .then(docs => {
                console.log('Found Documents:', docs);

                return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description"}, 'campsites');
            })
            .then(result => {
                console.log('Updated Document Count:', result.result.nModified);

                return dboper.findDocuments(db, 'campsites');
            })
            .then(result => {
                console.log('Delete Document Count:', result.deletedCount);

                return client.close();
            })
            .catch(err => {
                console.log(err);
                client.close();
            });
        })
.catch(err => console.log(err));           

            
