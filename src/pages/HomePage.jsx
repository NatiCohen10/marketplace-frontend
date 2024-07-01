import React, { useEffect, useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import ContentWrapper from "../components/ui/ContentWrapper";

function HomePage() {
  const sectionsRef = useRef([]);

  function callback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeInUp");
      } else {
        entry.target.classList.remove("animate-fadeInUp");
      }
    });
  }

  const observer = useIntersectionObserver(callback, { threshold: 0.15 });

  useEffect(() => {
    const { current: currentObserver } = observer;
    const sections = sectionsRef.current;
    sections.forEach((section) => {
      if (section) currentObserver.observe(section);
    });

    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, [observer]);

  return (
    <div className=" mx-4 sm:mx-10 lg:mx-20">
      <img
        src="src\images\hero-image.jpeg"
        alt="logo"
        className=" mt-20 min-h-60vh"
      />
      <div className="container min-h-">
        <ContentWrapper>
          <h1
            ref={(el) => (sectionsRef.current[0] = el)}
            className="text-4xl  font-bold text-primary mb-4"
          >
            Welcome to MarketEase
          </h1>
          <p
            ref={(el) => (sectionsRef.current[1] = el)}
            className="text-lg text-onBackground-800 leading-10 mb-4"
          >
            Discover a world of endless possibilities with MarketEase, your
            ultimate destination for a diverse range of products. From the
            latest in electronics to everyday essentials, we bring you an
            extensive collection that caters to all your needs. Enjoy a seamless
            shopping experience with our user-friendly interface, making it
            easier than ever to find exactly what you're looking for.
          </p>
        </ContentWrapper>
        <ContentWrapper>
          <h2
            ref={(el) => (sectionsRef.current[2] = el)}
            className="text-3xl font-semibold text-secondary mb-4"
          >
            Why Choose MarketEase?
          </h2>
          <p
            ref={(el) => (sectionsRef.current[3] = el)}
            className="text-lg text-onBackground-800 leading-10  mb-4"
          >
            At MarketEase, we prioritize your satisfaction by offering top-notch
            products at unbeatable prices. Our platform is designed to provide
            you with a smooth and secure shopping journey, ensuring that every
            transaction is safe and reliable. Whether you're shopping for
            yourself or looking for the perfect gift, MarketEase is your go-to
            marketplace for quality and convenience.
          </p>
        </ContentWrapper>
        <ContentWrapper>
          <h2
            ref={(el) => (sectionsRef.current[4] = el)}
            className="text-3xl font-semibold text-primary mb-4"
          >
            Explore Our Categories
          </h2>
          <p
            ref={(el) => (sectionsRef.current[5] = el)}
            className="text-lg text-onBackground-800 leading-10  mb-4"
          >
            Dive into our well-organized categories to find products that suit
            your lifestyle. From electronics and accessories to home appliances
            and automotive essentials, we have something for everyone. Our
            curated selections are constantly updated with the latest trends and
            innovations, so you can stay ahead of the curve and enjoy the best
            that the market has to offer.
          </p>
        </ContentWrapper>
        <ContentWrapper>
          <h2
            ref={(el) => (sectionsRef.current[6] = el)}
            className="text-3xl font-semibold text-secondary mb-4"
          >
            Join Our Community
          </h2>
          <p
            ref={(el) => (sectionsRef.current[7] = el)}
            className="text-lg text-onBackground-800 leading-10  mb-4"
          >
            Become a part of the MarketEase community and enjoy exclusive
            benefits. Sign up for our newsletter to receive the latest updates,
            special offers, and personalized recommendations. Follow us on
            social media to stay connected and engage with fellow shoppers. At
            MarketEase, we're more than just a marketplace – we're a community
            dedicated to enhancing your shopping experience.
          </p>
        </ContentWrapper>
      </div>
    </div>
  );
}

export default HomePage;
