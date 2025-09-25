const request = require('supertest');
const app = require('./server'); // Assuming your app is exported from server.js
const nodemailer = require('nodemailer');

// Mock nodemailer
jest.mock('nodemailer');

describe('POST /send', () => {
    let createTransportMock;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Mock the transport and sendMail
        const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
        createTransportMock = jest.fn().mockReturnValue({ sendMail: sendMailMock });
        nodemailer.createTransport.mockImplementation(createTransportMock);
    });

    it('should send an email and return 200 on valid data', async () => {
        const response = await request(app)
            .post('/send')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                message: 'This is a test message.'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Mensagem enviada com sucesso!');
        expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
        expect(createTransportMock().sendMail).toHaveBeenCalledTimes(1);
    });

    it('should return 400 on validation error', async () => {
        const response = await request(app)
            .post('/send')
            .send({
                name: '', // Invalid name
                email: 'not-an-email',
                message: 'shrt' // short message
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeInstanceOf(Array);
        expect(response.body.errors.length).toBe(3);
        expect(nodemailer.createTransport).not.toHaveBeenCalled();
    });

    it('should return 500 if sending email fails', async () => {
        // Override the mock to simulate an error
        const sendMailMock = jest.fn().mockRejectedValue(new Error('Failed to send email'));
        createTransportMock = jest.fn().mockReturnValue({ sendMail: sendMailMock });
        nodemailer.createTransport.mockImplementation(createTransportMock);

        const response = await request(app)
            .post('/send')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                message: 'This is a test message.'
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Ocorreu um erro no servidor ao tentar enviar a mensagem.');
        expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
        expect(createTransportMock().sendMail).toHaveBeenCalledTimes(1);
    });
});
