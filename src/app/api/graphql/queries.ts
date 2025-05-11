import { gql } from "@apollo/client";
export const GET_ALL_SKILLS = gql`
  query {
    allSkills {
      heading
      description
      icon {
        type
        className
      }
    }
  }
`;

export const GET_ALL_BLOG_POSTS = gql`
  query {
    allBlogs {
      createdAt
      updatedDate
      excerpt
      title
      subtitle
      image
      id
      slug
    }
  }
`;

export const GET_SINGLE_BLOG_POST = gql`
  query singleBlog($slug: String) {
    blogBySlug(slug: $slug) {
      createdAt
      updatedDate
      content
      title
      subtitle
      image
      id
      slug
    }
  }
`;
