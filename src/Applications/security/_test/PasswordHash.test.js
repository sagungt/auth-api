const PasswordHash = require('../PasswordHash');

describe('PasswordHash interface', () => {
  describe('hash function', () => {
    it('should throw error when invoke abstract behavior', async () => {
      const passwordHash = new PasswordHash();

      await expect(passwordHash.hash('secret')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
    });
  });

  describe('compare function', () => {
    it('should throw error when invoke abstract behavior', async () => {
      const passwordHash = new PasswordHash();

      await expect(passwordHash.compare('secret', 'S3crEt')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
    });
  });
});
