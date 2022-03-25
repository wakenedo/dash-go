import { createServer, Factory, Model } from 'miragejs'
import faker from 'faker'

type User = {
    name: string,
    email: string,
    created_at: string,
}

export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({} as User)
        },

        factories: {
            user: Factory.extend({
                name(index: number) {
                    return `users ${index + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase()
                },
                createdAt() {
                    return faker.date.recent(10)
                },
            })
        },

        seeds(server) {
            
            server.createList('user', 10)
        },

        routes() {
            this.namespace = 'api';
            this.timing = 750; //For loading and spinners tests

            this.get('/users');
            this.post('/users');

            this.namespace = '';
            this.passthrough();
        }
    })

   
    return server;

}