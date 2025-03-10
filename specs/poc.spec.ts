import * as supertest from 'supertest';
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC', () => {
  describe("Get Request", () => {
  // it('GET /posts', async () => {
  //   const response = await request.get('/posts');
  //   console.log(response.body);
  //   expect(response.status).toBe(200);
  //   expect(response.body.length).toBeGreaterThan(0);
  //   expect(response.body[0].id).toBe(1);
  // });
  it('GET /comments with query params', async () => {
    const response = await request.get('/comments').query({ postId: 1,limit:3 });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].postId).toBe(1);
  });
  });
});
describe("Post Request", () => {
  it('POST /posts', async () => {
    const data = {    
       title: 'foo',
       body: 'bar',
       userId: 1
  }
    const response = await request.post('/posts').send(data);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(data.title);
    expect(response.body.body).toBe(data.body);
    expect(response.body.userId).toBe(data.userId);
  });
  describe("Put Request", () => { 
    it('PUT /posts/1', async () => {
      const data = {    
         title: 'Updated Title111',
         body: 'Updated body11111',
         userId: 1
    }
      const geTreq = await request.get('/posts');
      const beforeTitle = geTreq.body[0].title;
      console.log(beforeTitle);
      const response = await request.put('/posts/1').send(data);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(data.title);
      expect(response.body.body).toBe(data.body);
      expect(response.body.userId).toBe(data.userId);
      expect(response.body.title).not.toBe(beforeTitle);
    });
    describe("Patch Request", () => {
      it('PATCH /posts/1', async () => {
        const data = {
          title: 'Updated Title111'
        };
        const getReq = await request.get('/posts/1');
        const beforeTitle = getReq.body.title;
        console.log("before title is " + beforeTitle);

        const response = await request.patch('/posts/1').send(data);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.title).not.toBe(beforeTitle);
        expect(response.body.title).toBe(data.title);
      });
      describe("Delete Request", () => {
        it('DELETE /posts/1', async () => {
          const response = await request.delete('/posts/1');
          console.log(response.body);
          expect(response.status).toBe(200);
          expect(response.body).toEqual({});
          });
        });
      });
    });
  });