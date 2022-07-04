const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const PasswordHash = require('../../security/PasswordHash');
const UserRepository = require('../../../Domains/users/UserRepository');
const AddUserUseCase = require('../AddUserUseCase');

describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      username: 'testing',
      password: 'secret',
      fullname: 'Testing Account',
    };
    const expectedRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: useCasePayload.username,
      fullname: useCasePayload.fullname,
    });

    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    mockUserRepository
      .verifyAvailableUsername = jest.fn().mockImplementation(() => Promise.resolve());
    mockPasswordHash
      .hash = jest.fn().mockImplementation(() => Promise.resolve('encrypted_password'));
    mockUserRepository
      .addUser = jest.fn().mockImplementation(() => Promise.resolve(expectedRegisteredUser));

    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    const registeredUser = await getUserUseCase.execute(useCasePayload);

    expect(registeredUser).toStrictEqual(expectedRegisteredUser);
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
      username: useCasePayload.username,
      password: 'encrypted_password',
      fullname: useCasePayload.fullname,
    }));
  });
});
