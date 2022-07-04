const UserLogin = require('../UserLogin');

describe('a UserLogin entities', () => {
  it('should throw when payload did not contain needed property', () => {
    const payload = {
      username: 'testing',
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data specification', () => {
    const payload = {
      username: 123,
      password: 'secret'.split(''),
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create UserLogin oject correctly', () => {
    const payload = {
      username: 'testing',
      password: 'secret',
    };

    const { username, password } = new UserLogin(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
