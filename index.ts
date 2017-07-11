import { DummyApiServer } from './webapi'

const dummy = new DummyApiServer();

async function main() {
    try {
        await dummy.listen(8000);
    } catch (e) {
        console.log(e.message);
    }
}

main();


