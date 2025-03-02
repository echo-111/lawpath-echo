import * as Services from './services/get-address';
import { addressResolver } from './address-resolver';

jest.mock('./services/get-address');

describe('addressResolver', () => {

  it('should invoke getAddress with the correct parameters', async () => {

    const addressSpy = jest.spyOn(Services, 'getAddress').mockResolvedValue([
      {
        id: 1,
        location: '1234',
        state: 'NSW',
        postcode: 1234,
      },
    ]);

    await addressResolver(
      {},
      {
        q: '1234',
        state: 'NSW',
      },
    );

    expect(addressSpy).toHaveBeenCalledWith('1234', 'NSW');
    
  })

})