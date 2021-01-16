// Dependencies
import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
// Components
import { CompaniesList } from '../src/screens/companies_list/';
// Queries
import { GET_ALL_COMPANIES } from '../src/graphql/queries';

async function wait(ms = 0) {
  await renderer.act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

describe('CompaniesList', () => {
  it('shows loading', () => {
    const component = renderer.create(
      <MockedProvider>
        <CompaniesList />
      </MockedProvider>,
    );
    console.log(component.toJSON());
    expect(() => component.root.findByType('ActivityIndicator')).not.toThrow();
  });

  it('shows error', async () => {
    const mockedError = {
      request: {
        query: GET_ALL_COMPANIES,
      },
      result: {
        errors: [new GraphQLError('Oops we can not get companies')],
      },
    };
    const component = renderer.create(
      <MockedProvider mocks={[mockedError]} addTypename={false}>
        <CompaniesList />
      </MockedProvider>,
    );

    await wait();

    expect(() => {
      component.root.findByProps({
        children: 'GraphQL error: Oops we can not get companies',
      });
    }).not.toThrow();
  });

  it('shows companies list', async () => {
    const mockedData = {
      request: {
        query: GET_ALL_COMPANIES,
      },
      result: {
        data: {
          products: [
            {
              id: 'cjtu8etmr001n0824o1v2qvgr',
              name: 'Apollo',
              logoUrl: 'https://cdn.filestackcontent.com/uRGQ5QfTT8mforGeyUS5',
              websiteUrl: 'https://www.apollographql.com/',
            },
            {
              id: 'cjuv4wxdc00dl0735ts4ukqs7',
              name: 'Prisma',
              logoUrl: 'https://cdn.filestackcontent.com/dZHmLkPRTFObRrqHsD7A',
              websiteUrl: 'https://www.prisma.io',
            },
          ],
        },
      },
    };
    const component = renderer.create(
      <MockedProvider mocks={[mockedData]} addTypename={false}>
        <CompaniesList />
      </MockedProvider>,
    );

    await wait();

    console.log(component.toJSON());
    expect(() => {
      component.root.findByProps({
        children: 'Apollo',
      });
    }).not.toThrow();
    expect(() => {
      component.root.findByProps({
        children: 'Prisma',
      });
    }).not.toThrow();
  });
});
