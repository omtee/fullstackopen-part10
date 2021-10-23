import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories {
    repositories {
      edges {
        node {
          id,
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          reviewCount,
          ratingAverage,
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      id,
      fullName,
      description,
      language,
      stargazersCount,
      forksCount,
      reviewCount,
      ratingAverage,
      ownerAvatarUrl,
      url,
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const SIGNIN = gql`
  mutation signIn($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query authorizedUser {
    authorizedUser {
      id
      username
    }
  }
`;