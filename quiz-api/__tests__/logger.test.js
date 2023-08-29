const logger = require('../config/logger');

describe('logger_function', () => {

    // Tests that logger logs to console
    it('logs to console', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        logger.log('info', 'test message');
        consoleSpy.mockRestore();
    });

    // Tests that logger logs to error.log file
    it('logs to error.log file', () => {
        const fs = require('fs');
        logger.log('error', 'test message');
        const logFile = fs.readFileSync('error.log', 'utf8');
        expect(logFile).toContain('test message');
    });

    // Tests that logger logs to combined.log file
    it('logs to combined.log file', () => {
        const fs = require('fs');
        logger.log('info', 'test message');
        const logFile = fs.readFileSync('combined.log', 'utf8');
        expect(logFile).toContain('test message');
    });

    // Tests that logger handles error when error.log file is not writable
    it('handles error when error.log file is not writable', () => {
        const fs = require('fs');
        fs.chmodSync('error.log', 0o444);
        expect(() => logger.log('error', 'test message')).not.toThrow();
        fs.chmodSync('error.log', 0o644);
    });

    // Tests that logger handles error when combined.log file is not writable
    it('handles error when combined.log file is not writable', () => {
        const fs = require('fs');
        fs.chmodSync('combined.log', 0o444);
        expect(() => logger.log('info', 'test message')).not.toThrow();
        fs.chmodSync('combined.log', 0o644);
    });
});
