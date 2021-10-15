import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      const fullNameElements = getAllByTestId('fullName');
      expect(fullNameElements).toHaveLength(2);
      expect(fullNameElements[0]).toHaveTextContent('jaredpalmer/formik');
      expect(fullNameElements[1]).toHaveTextContent('async-library/react-async');

      const descriptionElements = getAllByTestId('description');
      expect(descriptionElements).toHaveLength(2);
      expect(descriptionElements[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(descriptionElements[1]).toHaveTextContent('Flexible promise-based React data loader');

      const languageElements = getAllByTestId('language');
      expect(languageElements).toHaveLength(2);
      expect(languageElements[0]).toHaveTextContent('TypeScript');
      expect(languageElements[1]).toHaveTextContent('JavaScript');

      const starsCountElements = getAllByTestId('StarsCount');
      expect(starsCountElements).toHaveLength(2);
      expect(starsCountElements[0]).toHaveTextContent('21.9k');
      expect(starsCountElements[1]).toHaveTextContent('1.8k');

      const forksCountElements = getAllByTestId('ForksCount');
      expect(forksCountElements).toHaveLength(2);
      expect(forksCountElements[0]).toHaveTextContent('1.6k');
      expect(forksCountElements[1]).toHaveTextContent('69');

      const ratingCountElements = getAllByTestId('RatingCount');
      expect(ratingCountElements).toHaveLength(2);
      expect(ratingCountElements[0]).toHaveTextContent('88');
      expect(ratingCountElements[1]).toHaveTextContent('72');

      const reviewCountElements = getAllByTestId('ReviewsCount');
      expect(reviewCountElements).toHaveLength(2);
      expect(reviewCountElements[0]).toHaveTextContent('3');
      expect(reviewCountElements[1]).toHaveTextContent('3');
    });
  });
});