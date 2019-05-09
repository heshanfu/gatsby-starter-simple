import React from "react";
import { Link, graphql } from "gatsby";
import { kebabCase } from "lodash";
import { Section, Title } from "bloomer";
import styled from "styled-components";

import Layout from "../components/Layout";

const TagsPage = (props) => {
  const { data } = props;
  const allTags = data.allMarkdownRemark.group;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={props.location} title={siteTitle}>
      <Section
        style={{
          minHeight: "60vh",
          paddingTop: "1.5rem",
          marginLeft: "7.5rem",
          marginRight: "7.5rem"
        }}
      >
        <Title
          isSize={2}
          hasTextColor="dark"
          style={{
            fontFamily: "Nunito, Noto Sans KR",
            fontWeight: 400,
            marginBottom: "1.7rem"
          }}
        >
          <span img="role" aria-label="Tag">
            🔖
          </span>{" "}
          Tags
        </Title>
        <ul>
          {allTags.map((tag) => (
            <TagBox key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </TagBox>
          ))}
        </ul>
      </Section>
    </Layout>
  );
};

const TagBox = styled.div`
  font-family: "Nunito, Noto Sans KR", sans-serif;
  text-transform: uppercase;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  margin: 0.3rem;
  padding: 0.2rem 0.7rem;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);

  a {
    box-shadow: none;
    font-size: 0.8rem;
  }

  &:hover {
    transition-delay: 0s !important;
    border: 1px solid hsl(171, 100%, 41%);

    a {
      color: hsl(171, 100%, 41%);
    }
  }
`;

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;