import { TestBed } from '@microlambda/testing';
import { handler } from "../../../../src/handlers/http/hello-world";

describe('The hello endpoint', () => {
  beforeEach(() => {
    process.env.LANG = 'en-US';
  });
  it('should return 200 and and greet the world if no name specified', async () => {
    const testBed = new TestBed(handler);
    const res = await testBed.get();
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('Hello World!');
  });
  it('should return 200 and and greet the name given in query parameters', async () => {
    const testBed = new TestBed(handler);
    const res = await testBed.queryParameters({ name: 'John' }).get();
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('Hello John!');
  });
  it('should return 200 and greet the user in the selected language', async () => {
    process.env.LANG = 'fr-FR';
    const testBed = new TestBed(handler);
    const res = await testBed.queryParameters({ name: 'Jean' }).get();
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('Bonjour Jean!');
  });
  it('should return 200 and greet the world in the selected language', async () => {
    process.env.LANG = 'es-ES';
    const testBed = new TestBed(handler);
    const res = await testBed.queryParameters({}).get();
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('Hola Mundo!');
  });
});
