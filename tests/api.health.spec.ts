import request from 'supertest';

import app from '../src/app';

describe('GET /health', () => {
    it('should return 200 OK', () => {
        return request(app).get('/api/health').expect(200)
    });

    it('should return `Healthy` in response', () => {
        return request(app).get('/api/health').expect('Healthy')
    });
});