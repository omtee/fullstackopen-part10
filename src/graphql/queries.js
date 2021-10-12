import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories {
    repositories {
      edges {
        node {
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