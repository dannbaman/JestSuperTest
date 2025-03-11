import * as supertest from 'supertest';
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('Get Brands', () => {
    let newBrand = "New Brand "+ Math.floor(Math.random() * 1000);
    let brandID;
it('GET /brands', async () => {
        const response = await request.get('/brands');
        
        console.log("Response Status:", response.status);
        console.log("First Item:", response.body[0]); // Debugging output

        // Ensure API response is successful
        expect(response.status).toBe(200);

        // Ensure response is an array
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        // Ensure first item has expected structure
        expect(response.body[0]).toBeDefined();
        expect(typeof response.body[0]).toBe("object");

        // Validate properties
        expect(Object.keys(response.body[0])).toEqual(["_id","name"]);
        //expect(response.body[0]).toHaveProperty("name");
        expect(typeof response.body[0].name).toBe("string");

        // ✅ Use .toEqual() correctly
        expect(response.body[0]).toEqual(expect.objectContaining({
            _id: expect.any(String),
            name: expect.any(String)
    }));
});
describe('Create Brands', () => {
it('POST /brands', async () => {
    const data = {
        name: "New Brand "+ Math.floor(Math.random() * 1000),
        description: "This is a new brand"
    };

    const response = await request.post('/brands').send(data);
    
    console.log("Response Status:", response.status);
    console.log("Response Body:", response.body); // Debugging output

    // Ensure API response is successful
    expect(response.status).toBe(200);

    // Ensure response is an object
    expect(typeof response.body).toBe("object");
    expect(response.body.name).toBe(data.name);
    expect(response.body).toHaveProperty('createdAt');
}); // Closing `it` block
}); // Closing `describe` block
describe('Create and Fetch Brands', () => {

    it('POST /brands', async () => {
        const data = {
            name: newBrand,
            description: "This is a new brand"
        };
    
        const response = await request.post('/brands').send(data);
        
        console.log("Response Status:", response.status);
        console.log("Response Body:", response.body); // Debugging output
    
        // Ensure API response is successful
        expect(response.status).toBe(200);
    
        // Ensure response is an object
        expect(typeof response.body).toBe("object");
        expect(response.body.name).toBe(data.name);
        expect(response.body).toHaveProperty('createdAt');
        brandID = response.body._id; // Store the new brand for later use
    }); // Closing `it` block
    it('GET /brands/:id', async () => {
        const response = await request.get('/brands/'+ brandID);
        
        console.log("Response Status:", response.status);
        console.log("Response Body:", response.body); // Debugging output
    
        // Ensure API response is successful
        expect(response.status).toBe(200);
    
        // Ensure response is an object
        expect(typeof response.body).toBe("object");
        expect(response.body.name).toContain(newBrand);
    });
    }); // Closing `describe` block
describe('Update Brands', () => {
it('PUT /brands/:id', async () => {
    const data = {
        name: newBrand + 'updated',
    };

    const response = await request.put('/brands/'+brandID).send(data);
    
    console.log("Response Status:", response.status);
    console.log("Response Body:", response.body); // Debugging output

    // Ensure API response is successful
    expect(response.status).toBe(200);

    // Ensure response is an object
    expect(typeof response.body).toBe("object");
    expect(response.body.name).toBe(data.name);
}); // Closing `it` block
describe('Delete Brands',()=>{
    it('Delete /brands/:id', async () => {
        const response = await request.delete('/brands/'+ brandID);
        
        console.log("Response Status:", response.status);
        console.log("Response Body:", response.body); // Debugging output
    
        // Ensure API response is successful
        expect(response.status).toBe(200);
    
        // Ensure response is an object
        expect(typeof response.body).toBe("object");
        expect(response.body).toEqual(null);
    });
})
}); 
});