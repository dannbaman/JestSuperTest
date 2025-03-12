import * as supertest from 'supertest';
const request = supertest('https://practice-react.sdetunicorns.com/api/test')

class BrandController {
    getBrands() {
        return request.get('/brands');
    }
    postBrands(data){
        return request.post('/brands').send(data);
    }
    getBrandsByID(id){
        return request.get('/brands/'+id);
    }
    putBrandsByID(id,data){
        return request.put('/brands/'+id).send(data);
    }
    deleteBrandsByID(id:string){
        return request.delete('/brands/'+id);
    }
}
export default new BrandController();