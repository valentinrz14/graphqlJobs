// Dependencies
import { gql } from '@apollo/client';

// Queries
export const JOB_FRAGMENT = gql`
  fragment JobFragment on Job {
    id
    slug
    title
    postedAt
    description
    countries {
      name
    }
    cities {
      name
    }
  }
`;

export const FAVORITE_JOB_FRAGMENT = gql`
  fragment FavoriteJobFragment on Job {
    favorite
  }
`;

export const GET_FAVORITE_JOBS_COUNT = gql`
  {
    favoriteJobsCount @client
  }
`;
export const GET_FAVORITE_JOBS_LIST = gql`
  {
    favoriteJobsList @client
  }
`;
export const GET_ALL_COMPANIES = gql`
  query getAllCompanies {
    companies {
      id
      name
      logoUrl
      websiteUrl
    }
  }
`;

export const GET_ALL_JOBS = gql`
  query getAllJobs {
    jobs {
      ...JobFragment
      favorite @client
      company {
        id
        name
      }
    }
  }
  ${JOB_FRAGMENT}
`;
export const GET_JOB = gql`
  query getJob($job: String!, $company: String!) {
    job(input: { jobSlug: $job, companySlug: $company }) {
      ...JobFragment
      company {
        id
        name
        logoUrl
        websiteUrl
        twitter
        slug
      }
      remotes {
        name
      }
      commitment {
        title
      }
    }
  }
  ${JOB_FRAGMENT}
`;

export const ADD_OR_REMOVE_JOB_FROM_FAVORITE = gql`
  mutation AddOrRemoveJobFromFavorite(
    $jobId: ID!
    $title: String!
    $slug: String!
    $company: Array
    $description: String
    $countries: Array
    $cities: Array
    $postedAt: DateTime
  ) {
    addOrRemoveJobFromFavorite(
      jobId: $jobId
      company: $company
      title: $title
      description: $description
      countries: $countries
      cities: $cities
      postedAt: $postedAt
      slug: $slug
    ) @client
  }
`;
