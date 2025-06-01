import { gql } from "@apollo/client";

export const GET_ABOUT_PAGE = gql`
  query {
    about {
      title
      intro
      image
      imageAlt
      subheading
      description
      funFactValue
      funFactHeading
      funFactDescription
      interests {
        name
        icon
        heading
        description
      }
    }
  }
`;

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

// TODO: Add excerpt for prod
export const GET_ALL_BLOG_POSTS = gql`
  query {
    allBlogs {
      createdAt
      updatedDate
      title
      subtitle
      excerpt
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

export const GET_HOME_PAGE = gql`
  query {
    home {
      title
      intro
      image
      imageAlt
      aboutHeading
      aboutDescription
      skillsHeading
      snapshotHeading
      skills {
        description
        icon
        iconAlt
        link
        subhead
      }
      snapshots {
        value
        description
      }
    }
  }
`;
