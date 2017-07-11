import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as KoaParser from 'koa-bodyparser'
import { PersonCache } from './mongoClient'

export class DummyApiServer {


    private readonly app: Koa;
    private readonly mclient: PersonCache;
    private server: any;

    constructor() {
        //Koa application configuration
        this.app = new Koa();
        this.app.use(KoaParser());
        //Mongo Client inicialization
        this.mclient = new PersonCache();
        //Koa routing configuration
        const router: KoaRouter = new KoaRouter();

        router.get('/apidummy/people', async (ctx) => {
            ctx.body = await this.mclient.getAllPerson();
        })

        router.get('/apidummy/people/:id', async (ctx) => {
            const person = await this.mclient.getPersonbyId(ctx.params.id);

            if (person != {})
                ctx.body = person;
            else
                ctx.status = 404;
        });

        router.post('/apidummy/people/', async (ctx) => {
            const res = await this.mclient.postPerson(ctx.request.body)

            if (res.insertedCount !== 0)
                ctx.status = 201;
            else
                ctx.status = 400;
        });

        router.put('/apidummy/people/:id', async (ctx) => {
            const res = await this.mclient.putPerson(ctx.params.id, ctx.request.body);

            if (res.matchedCount !== 0)
                ctx.status = 200;
            else
                ctx.status = 201;
        })

        router.del('/apidummy/people/:id', async (ctx) => {
            const res = await this.mclient.deletePersonbyId(ctx.params.id)
            
            if (res.deletedCount !== 0)
                ctx.status = 204;
            else
                ctx.status = 404;
        })

        this.app.use(async (ctx, next) => {
            try {
                await next()
            } catch (e) {
                ctx.body = { type: e.name, message: e.message };
                ctx.status = 500;
            }
        })

        this.app.use(router.routes());
        this.app.use(router.allowedMethods());
    }

    public async listen(portnumber: number) {
        this.server = await this.app.listen(portnumber, () => console.log("Hearing on port " + portnumber));
    }



}


