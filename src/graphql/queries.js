/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImageAPI = /* GraphQL */ `
  query GetImageAPI($id: ID!) {
    getImageAPI(id: $id) {
      userId
      imageKey
      postId
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listImageAPIS = /* GraphQL */ `
  query ListImageAPIS(
    $filter: ModelImageAPIFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageAPIS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        userId
        imageKey
        postId
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
