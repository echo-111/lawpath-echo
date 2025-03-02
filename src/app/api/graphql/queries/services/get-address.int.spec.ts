import { getAddress } from './get-address';
import nock from 'nock';
import { AddressApiError } from '../../errors/address-api-error';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

describe('getAddress', () => {
  it('should have correct response at single locality', async () => {
    const scope = nock(`${API_URL}`)
      .get('/search.json')
      .query({ q: '1234', state: 'NSW' })
      .reply(200, {
        localities: {
          locality:{
            id: 1,
            location: '123 Main St',
            postcode: 1234,
            state: 'NSW',
          },
        },
      });

    const address = await getAddress('1234', 'NSW');

    expect(scope.isDone()).toBe(true);
    expect(address).toMatchObject([
      {
        id: 1,
        location: '123 Main St',
        postcode: 1234,
        state: 'NSW',
      },
    ]);
  });

  it('should have correct response at multi localities', async () => {
    const scope = nock(`${API_URL}`)
      .get('/search.json')
      .query({ q: '1234', state: 'NSW' })
      .reply(200, {
        localities: {
          locality: [
            {
              id: 1,
              location: '123 Main St 0',
              postcode: 1234,
              state: 'NSW',
            },
            {
              id: 2,
              location: '123 Main St 1',
              postcode: 1234,
              state: 'NSW',
            },
            {
              id: 3,
              location: '123 Main St 2',
              postcode: 1234,
              state: 'NSW',
            }
          ],
        },
      });

    const address = await getAddress('1234', 'NSW');

    expect(scope.isDone()).toBe(true);
    expect(address).toMatchObject([
      {
        id: 1,
        location: '123 Main St 0',
        postcode: 1234,
        state: 'NSW',
      },
      {
        id: 2,
        location: '123 Main St 1',
        postcode: 1234,
        state: 'NSW',
      },
      {
        id: 3,
        location: '123 Main St 2',
        postcode: 1234,
        state: 'NSW',
      }
    ]);
  });

  it('should return empty array if locality is undefined', async () => {
    const scope = nock(`${API_URL}`)
    .get('/search.json')
    .query({ q: '1234', state: 'NSW' })
    .reply(200, {});

    const address = await getAddress('1234', 'NSW');

    expect(scope.isDone()).toBe(true);
    expect(address.length).toBe(0)
  })

  it('should throw an error if api call fails', async () => {
    nock(`${API_URL}`)
      .get('/search.json')
      .query({ q: '1234', state: 'NSW' })
      .reply(500);

    await expect(getAddress('1234', 'NSW')).rejects.toThrow(AddressApiError);
  });
});
