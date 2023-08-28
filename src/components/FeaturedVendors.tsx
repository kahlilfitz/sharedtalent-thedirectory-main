import React from "react";
import { Box, Heading, Text, Image, Spinner } from "@chakra-ui/react";
import Carousel from "components/Carousel";
import { Limiter } from "components/Limiter";
import axios from "axios";

function FeaturedVendors() {
  const [logos, setLogos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const tempBusinessLogoUrl: string =
    "https://place-hold.it/150x85?fontsize=12";

  React.useEffect(() => {
    const fetchLogos = async () => {
      axios
        .get("/users/featured-logos")
        .then((response: any) => {
          setLogos(response.data);
          setLoading(false);
        })
        .catch((error: any) =>
          console.error(
            `There was an error retrieving the featured list: ${error}`
          )
        );
    };
    fetchLogos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Limiter mt="1em" mb="5em">
      <Heading as="h3" size="lg">
        Featured Vendors
      </Heading>
      <Text mb="1em">Diam sollicitudin tempor id eu nisl nunc mi ipsum.</Text>
      <Carousel>
        {logos.length > 0 &&
          logos.map(({ businessLogoUrl, businessName }: any, index: number) => (
            <Box key={index} textAlign="center" className="embla__slide">
              <Image
                src={
                  businessLogoUrl
                    ? `/images/${businessLogoUrl}`
                    : `${tempBusinessLogoUrl}&text=${businessName}`
                }
                alt={businessName}
                maxWidth="200px"
                objectFit="contain"
                objectPosition="50% 50%"
                w="180px"
                h="auto"
                borderRadius="5px"
                onError={(e) => console.log(e)}
              />
            </Box>
          ))}
      </Carousel>
    </Limiter>
  );
}

export default FeaturedVendors;
