import Hero from "components/Hero";
import FeaturedVendors from "components/FeaturedVendors";
import Testimonials from "components/Testimonials";
import Features from "components/Features";
import Layout from "components/Layout";

function Home() {
  return (
    <Layout>
      <Hero />
      <FeaturedVendors />
      <Testimonials />
      <Features />
    </Layout>
  );
}

export default Home;
