const sendMail = require("../config/mail");


describe('sendMail_function', () => {

    // Tests that an email is successfully sent with valid options
    it('sends email successfully', async () => {
        const options = {
            to: 'test@example.com',
            subject: 'Test email',
            html: '<p>This is a test email</p>',
        };
        const result = await sendMail(options);
        expect(result).toBeUndefined();
    });

    // Tests that an error is thrown if options are missing
    it('throws error if options are missing', async () => {
        const options = {};
        await expect(sendMail(options)).rejects.toThrow();
    });

    // Tests that an error is thrown if options are invalid
    it('throws error if options are invalid', async () => {
        const options = {
            to: 'invalid email',
            subject: '',
            html: '',
        };
        await expect(sendMail(options)).rejects.toThrow();
    });

    // Tests that an error is thrown if transporter is not defined
    it('throws error if transporter is not defined', async () => {
        const options = {
            to: 'test@example.com',
            subject: 'Test email',
            html: '<p>This is a test email</p>',
        };
        transporter = undefined;
        await expect(sendMail(options)).rejects.toThrow();
    });
});
