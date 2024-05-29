import React from 'react';
import LocationInMap from '../Components/Map/LocationInMap';
import ServiceSlider from '../Components/Slider/ServiceSlider';
import BeforeAfter2 from '../Components/BeforeAfter/BeforeAfter2';
import TestimonialSlider2 from '../Components/Slider/TestimonialSlider2';
import Price2 from '../Components/Price/Price2';
import About4 from '../Components/About/About4';
import Funfact2 from '../Components/Funfact/Funfact2';
import Hero15 from '../Components/Hero/Hero15';
import SpecialistsSlider3 from '../Components/Slider/SpecialistsSlider3';
import PostWrapper3 from '../Components/Post/PostWrapper3';
import Appointment3 from '../Components/Appointment/Appointment3';
import Contact3 from '../Components/Contact/Contact3';

const heroData = {
  subTitle: 'Trusted by 25 years',
  title: 'Provide high quality dental services',
  text: 'Our service and the work efficiency of our doctors are the <br /> reasons for our success.',
  imgSrc: '/images/dental/hero-img.jpg',
  videoSrc: 'https://www.youtube.com/embed/_oIlv59bTL4',
};

const aboutData = {
  imgSrc: `images/dental/about2.png`,
  title: `Place of high-quality <span className="st-pink">dental</span> services, which make patients happy.`,
  textLine: [
    {
      text: ` Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua.`,
    },
    {
      text: ` Duis autem vel eum iriure dolor in hendrerit in vulputate
      velit esse molestie consequat, vel illum dolore eu feugiat
      nulla facilisis at vero eros et accumsan et iusto odio
      dignissim qui blandit praesent luptatum.`,
    },
    {
      text: `Delenit augue duis dolore te feugait nulla facilisi. Lorem
      ipsum dolor sit amet, consectetuer adipiscing elit.`,
    },
  ],
};

const serviceData = {
  sectionHeadingData: {
    title: `The main feature of our service <br /> is to <span className="st-pink">serve</span> the patient.`,
  },
  services: [
    {
      img: 'images/dental/service1.jpg',
      title: 'Root Canal Treatment',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    },
    {
      img: 'images/dental/service2.jpg',
      title: 'Straighten Teeth',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    },
    {
      img: 'images/dental/service3.jpg',
      title: 'Dental Implants',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    },
    {
      img: 'images/dental/service1.jpg',
      title: 'Root Canal Treatment',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    },
    {
      img: 'images/dental/service2.jpg',
      title: 'Straighten Teeth',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    },
    {
      img: 'images/dental/service3.jpg',
      title: 'Dental Implants',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
    },
  ],
};

const beforeAfterData = {
  bgImg: '/images/before-after-bg.jpg',
  beforeImg: '/images/dental/after.jpg',
  afterImg: 'images/dental/before.jpg',
  sectionHeadingData: {
    title: `Some samples of our work <br> <span class="st-pink">before</span>
  and <span class="st-pink">after</span>`,
  },
};

const priceData = {
  sectionHeadingData: {
    title: `What is the <span className="st-pink">cost</span> your <br />
    dental treatment`,
  },
  pricePlan: [
    {
      title: 'Plan A is for under 15 year olds',
      img: 'images/dental/plana.jpg',
      featureList: [
        {
          title: 'New patient consultation',
          price: '100',
        },
        {
          title: 'Regular checkups',
          price: '250',
        },
        {
          title: 'X-rays',
          price: '100',
        },
        {
          title: 'Root canal',
          price: '495',
        },
        {
          title: 'Straighten teeth',
          price: '350',
        },
        {
          title: 'Porcelain bridge',
          price: '650',
        },
        {
          title: 'Simple extraction',
          price: '180',
        },
      ],
    },
    {
      title: 'Plan B is for above 16 year olds',
      img: 'images/dental/plana2.jpg',
      featureList: [
        {
          title: 'New patient consultation',
          price: '120',
        },
        {
          title: 'Regular checkups',
          price: '270',
        },
        {
          title: 'X-rays',
          price: '120',
        },
        {
          title: 'Root canal',
          price: '520',
        },
        {
          title: 'Straighten teeth',
          price: '370',
        },
        {
          title: 'Porcelain bridge',
          price: '670',
        },
        {
          title: 'Simple extraction',
          price: '200',
        },
      ],
    },
    {
      title: 'Plan C is for above 40 year olds',
      img: 'images/dental/plana3.jpg',
      featureList: [
        {
          title: 'New patient consultation',
          price: '150',
        },
        {
          title: 'Regular checkups',
          price: '300',
        },
        {
          title: 'X-rays',
          price: '150',
        },
        {
          title: 'Root canal',
          price: '550',
        },
        {
          title: 'Straighten teeth',
          price: '400',
        },
        {
          title: 'Porcelain bridge',
          price: '700',
        },
        {
          title: 'Simple extraction',
          price: '220',
        },
      ],
    },
  ],
};

const appointmentData = {
  title: `Make <span className="st-pink">appointment</span> We always welcome new patients`,
  img: `/images/dental/appointment2.png`,
  phone: `1 800-123-4567`,
};

const testimonialData = {
  sectionHeadingData: {
    title: ` All that our clients have  <span class="st-pink">said</span><br/>
    about our work`,
  },
  testimonials: [
    {
      img: 'images/avatar2.png',
      name: 'Ralph Jones',
      designation: 'Executive',
      subTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
    },
    {
      img: 'images/avatar3.png',
      name: 'Francis Jara',
      designation: 'Biographer',
      subTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
    },
    {
      img: 'images/avatar4.png',
      name: 'David Baer',
      designation: 'UX Designer',
      subTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
    },
    {
      img: 'images/avatar2.png',
      name: 'Ralph Jones',
      designation: 'Executive',
      subTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
    },
    {
      img: 'images/avatar3.png',
      name: 'Francis Jara',
      designation: 'Biographer',
      subTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
    },
    {
      img: 'images/avatar4.png',
      name: 'David Baer',
      designation: 'UX Designer',
      subTitle:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
    },
  ],
};

const specialistData = {
  sectionHeadingData: {
    title: ` Professional staff at our <br/><span class="st-pink"> dental </span> hospital`,
  },
  doctors: [
    {
      img: 'images/member1.jpg',
      name: 'Dr. Philip Bailey',
      designation: 'Urology',
      authorLink: 'doctor-profile3',
    },
    {
      img: 'images/member2.jpg',
      name: 'Dr. Vera Hasson',
      designation: 'Cardiology',
      authorLink: 'doctor-profile3',
    },
    {
      img: 'images/member3.jpg',
      name: 'Dr. Matthew Hill',
      designation: 'Neurosurgery',
      authorLink: 'doctor-profile3',
    },
    {
      img: 'images/member4.jpg',
      name: 'Dr. Jeanette Hoff',
      designation: 'Surgery',
      authorLink: 'doctor-profile3',
    },
    {
      img: 'images/member1.jpg',
      name: 'Dr. Philip Bailey',
      designation: 'Urology',
      authorLink: 'doctor-profile3',
    },
    {
      img: 'images/member2.jpg',
      name: 'Dr. Vera Hasson',
      designation: 'Cardiology',
      authorLink: 'doctor-profile3',
    },
    {
      img: 'images/member3.jpg',
      name: 'Dr. Matthew Hill',
      designation: 'Neurosurgery',
      authorLink: 'doctor-profile3',
    },
    {
      img: 'images/member4.jpg',
      name: 'Dr. Jeanette Hoff',
      designation: 'Surgery',
      authorLink: 'doctor-profile3',
    },
  ],
};

const postData = {
  sectionHeadingData: {
    title: `Read the updated <span class="st-pink"> news </span><br/>about
    dental treatment`,
  },
  posts: [
    {
      img: 'images/dental/blog1.jpg',
      title: 'Working in emergency medicine',
      date: 'Aug 23, 2020',
      author: 'Albert Brian',
      authorLink: '',
      subTitle:
        "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
      postLink: '/post/post_details_right_sitebar_One',
    },
    {
      img: 'images/dental/blog2.jpg',
      title: 'Individual treatment & assistance',
      date: 'Aug 22, 2020',
      author: 'William Juarez',
      authorLink: '',
      subTitle:
        "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
      postLink: '/post/post_details_right_sitebar_One',
    },
    {
      img: 'images/dental/blog3.jpg',
      title: 'Child’s first hospital visit',
      date: 'Aug 21, 2020',
      author: 'Jamse Lewis',
      authorLink: '',
      subTitle:
        "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
      postLink: '/post/post_details_right_sitebar_One',
    },
    {
      img: 'images/blog3.jpg',
      title: 'Child’s first hospital visit',
      date: 'Aug 21, 2020',
      author: 'Jamse Lewis',
      authorLink: '',
      subTitle:
        "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
      postLink: '/post/post_details_right_sitebar_One',
    },
  ],
};

const mapLocationURL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d193175.30893635444!2d-74.373409!3d40.841927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a82f1352d0dd%3A0x81d4f72c4435aab5!2sTroy%20Meadows%20Wetlands!5e0!3m2!1sen!2sbd!4v1701067943819!5m2!1sen!2sbd';

const contactData = {
  sectionHeadingData: {
    title: `Contact us for any  <span class="st-pink">said</span><br/>
      treatment`,
  },
};

const Home15 = () => {
  return (
    <div>
      <div className="st-height-b125 st-height-lg-b80" id="home"></div>
      <Hero15 data={heroData} />
      <About4 data={aboutData} />
      <Funfact2 />
      <ServiceSlider data={serviceData} varient="st-type1" />
      <BeforeAfter2 data={beforeAfterData} />
      <Price2 data={priceData} varient="st-color2" />
      <Appointment3 data={appointmentData} />
      <TestimonialSlider2 data={testimonialData} varient="st-type1 st-color1" />
      <SpecialistsSlider3 data={specialistData} />
      <PostWrapper3 data={postData} varient="st-type2" />
      <LocationInMap data={mapLocationURL} />
      <Contact3 data={contactData} />
    </div>
  );
};

export default Home15;
