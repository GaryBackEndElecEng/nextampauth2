/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createImageAPI = /* GraphQL */ `
  mutation CreateImageAPI(
    $input: CreateImageAPIInput!
    $condition: ModelImageAPIConditionInput
  ) {
    createImageAPI(input: $input, condition: $condition) {
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
export const updateImageAPI = /* GraphQL */ `
  mutation UpdateImageAPI(
    $input: UpdateImageAPIInput!
    $condition: ModelImageAPIConditionInput
  ) {
    updateImageAPI(input: $input, condition: $condition) {
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
export const deleteImageAPI = /* GraphQL */ `
  mutation DeleteImageAPI(
    $input: DeleteImageAPIInput!
    $condition: ModelImageAPIConditionInput
  ) {
    deleteImageAPI(input: $input, condition: $condition) {
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
