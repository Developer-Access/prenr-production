import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import Home from "./home";
import Header from "../components/header";
import SectionSeparator from "../components/section-separator";
import ContactForm from '../components/contact'

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Mediaprenr - Custom Web Development`}</title>
      </Head>
      <Container>
        <Header />
        {/* <Intro /> */}
        <Home />
        <SectionSeparator></SectionSeparator>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        <SectionSeparator></SectionSeparator>
        <ContactForm />
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(!preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};
