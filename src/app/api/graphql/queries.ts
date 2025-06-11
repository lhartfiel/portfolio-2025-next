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
      id
      highFiveCount
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

export const GET_DEVELOPMENT_PAGE = gql`
  query {
    development {
      title
      intro
      experienceHeading
      experienceSubheading
      projectHeading
      projectSubheading
      projects {
        projectTitle
        projectDescription
        order
        skill {
          type
        }
      }
      skills {
        heading
        description
        icon
        skillIcon {
          type
        }
      }
    }
  }
`;

export const GET_UX_PAGE = gql`
  query {
    userExperience {
      title
      intro
      processHeading
      processes {
        heading
        description
        icon
      }
    }
  }
`;

export const GET_UX_PROJECTS = gql`
  query {
    uxProject {
      title
      intro
      role
      duration
      projectType
      excerpt
      excerptImage
      slug
    }
  }
`;

export const GET_UX_PROJECT_BY_SLUG = gql`
  query uxProject($slug: String!) {
    uxProjectBySlug(slug: $slug) {
      title
      intro
      role
      duration
      projectType
      blocks {
        id
        showBackgroundColor
        slidesPerView
        limitHeight
        heading
        description
        blockquote
        images {
          image
          imageAlt
        }
      }
    }
  }
`;
