import React from "react";
import { Box } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AutoHeight from "embla-carousel-auto-height";

const Carousel = ({ children }: any) => {
  const autoplayOptions = {
    delay: 2000,
    autoPlay: true,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 3,
      align: "start",
      containScroll: "trimSnaps",
      loop: true,
    },
    [Autoplay(autoplayOptions), AutoHeight()]
  );

  React.useEffect(() => {
    if (emblaApi) {
    }
  }, [emblaApi]);

  return (
    <Box className="embla" ref={emblaRef}>
      <Box className="embla__container">{children}</Box>
    </Box>
  );
};

export default Carousel;
