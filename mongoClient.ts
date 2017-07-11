import { Person } from "./person"
//import { Error } from "./error"
import * as MongoDb from 'mongodb'

export class PersonCache {

    private readonly db: MongoDb.Db;

    constructor() {

        //create server object
        var server = new MongoDb.Server('localhost', 3000, { socketOptions: { autoReconnect: true } })

        //create and open db object
        this.db = new MongoDb.Db("test", server);
        this.db.open();

    }

    public async getAllPerson() {

        return await this.db.collection('Person').find().toArray();

    }

    //returns a representation of a person object
    public async getPersonbyId(id: string) {

        return await this.db.collection('Person').findOne({ "_id": id});

    }

    //inserts a person to the web api server
    public async postPerson(person: Person) {

        return await this.db.collection('Person').insertOne(person)
    }

    //updates a person object information, case exists. 
    //if doesn't exist: creates a new Person
    public async putPerson(id: string, person: any) {

        return await this.db.collection('Person').updateOne({ "_id": id }, { "name": person.name, "gender": person.gender }, { upsert: true });

    }

    //delets a person object from the web api server
    public async deletePersonbyId(id: string) {

        return await this.db.collection('Person').deleteOne({ "_id": id });

    }

    public closeConnection() {
        console.log("Closing down database")
        this.db.close(true);
    }
}
