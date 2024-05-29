import React from 'react';
import LocationInMap from '../Components/Map/LocationInMap';
import Contact from '../Components/Contact/Contact';
import Department from '../Components/Department/Department';
import Appointment from '../Components/Appointment/Appointment';
import About from '../Components/About/About';
import Iconbox from '../Components/Iconbox/Iconbox';
import PostWrapper from '../Components/Post/PostWrapper';
import SpecialistsSlider from '../Components/Slider/SpecialistsSlider';
import TestimonialSlider from '../Components/Slider/TestimonialSlider';
import BrandSlider from '../Components/Slider/BrandSlider';
import Newsletter from '../Components/Newsletter/Newsletter';
import Accordion from '../Components/Accordion/Accordion';
import PriceSlider from '../Components/Slider/PriceSlider';
import Funfact from '../Components/Funfact/Funfact';
import BeforeAfter from '../Components/BeforeAfter/BeforeAfter';
import MasonryGallery from '../Components/Gallery/Gallery';
import Hero7 from '../Components/Hero/Hero7';

const heroData = {
  bgImg: 'images/youtube-video-bg.jpg',
  bgShape: 'shape/hero-shape.png',
  videoSrc: 'https://www.youtube.com/watch?v=2MEy18SPIDM',
  sliderImages: [
    {
      img: 'images/hero-img.png',
    },
    {
      img: 'images/hero-img1.png',
    },
    {
      img: 'images/hero-img2.png',
    },
    {
      img: 'images/hero-img.png',
    },
    {
      img: 'images/hero-img1.png',
    },
    {
      img: 'images/hero-img2.png',
    },
  ],
  title: ['Crutches', 'Laboratory', 'Cardiology', 'Dentist', 'Neurology'],
};

const iconboxData = [
  {
    bg: 'purple',
    icon: 'icons/icon1.svg',
    title: 'Qualified Doctors',
    subTitle:
      'Lorem ipsum dolor sit amet consectet adipis sed do eiusmod tempor inc ididunt utid labore.',
  },
  {
    bg: 'green',
    icon: 'icons/icon2.svg',
    title: '24 Hours Service',
    subTitle:
      'Lorem ipsum dolor sit amet consectet adipis sed do eiusmod tempor inc ididunt utid labore.',
  },
  {
    bg: 'red',
    icon: 'icons/icon3.svg',
    title: 'Need Emergency',
    subTitle:
      'Lorem ipsum dolor sit amet consectet adipis sed do eiusmod tempor inc ididunt utid labore.',
  },
];

const aboutData = {
  title:
    'A hospital is a health care institution providing patient treatment with specialized medical',
  subTitle:
    '  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid unt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamc  laboris nisi ut aliquip. Commodo consequat.<br /><br />  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid unt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamc laboris nisi ut aliquip. Commodo consequat. Sed do eiusmod  tempor incidid unt labore et dolore magna aliqua.',

  avater: {
    img: 'images/avatar1.png',
    name: 'David Ambrose',
    designation: 'Founder & Director',
  },
  timeTable: [
    {
      day: 'Monday',
      startTime: '8:00',
      endTime: '7:00',
    },
    {
      day: 'Tuesday',
      startTime: '9:00',
      endTime: '6:00',
    },
    {
      day: 'Wednesday',
      startTime: '9:00',
      endTime: '6:00',
    },
    {
      day: 'Thursday',
      startTime: '8:00',
      endTime: '7:00',
    },
    {
      day: 'Friday',
      startTime: '9:00',
      endTime: '5:00',
    },
    {
      day: 'Saturday',
      startTime: '8:00',
      endTime: '7:00',
    },
    {
      day: 'Sunday',
      startTime: '9:00',
      endTime: '3:00',
    },
  ],
  contact: '(+01) - 234 567 890',
};

const specialistData = [
  {
    img: 'images/member1.jpg',
    name: 'Dr. Philip Bailey',
    designation: 'Urology',
    authorLink: '/doctor-profile'
  },
  {
    img: 'images/member2.jpg',
    name: 'Dr. Vera Hasson',
    designation: 'Cardiology',
    authorLink: '/doctor-profile'
  },
  {
    img: 'images/member3.jpg',
    name: 'Dr. Matthew Hill',
    designation: 'Neurosurgery',
    authorLink: '/doctor-profile'
  },
  {
    img: 'images/member4.jpg',
    name: 'Dr. Jeanette Hoff',
    designation: 'Surgery',
    authorLink: '/doctor-profile'
  },
  {
    img: 'images/member1.jpg',
    name: 'Dr. Philip Bailey',
    designation: 'Urology',
    authorLink: '/doctor-profile'
  },
  {
    img: 'images/member2.jpg',
    name: 'Dr. Vera Hasson',
    designation: 'Cardiology',
    authorLink: '/doctor-profile'
  },
  {
    img: 'images/member3.jpg',
    name: 'Dr. Matthew Hill',
    designation: 'Neurosurgery',
    authorLink: '/doctor-profile'
  },
  {
    img: 'images/member4.jpg',
    name: 'Dr. Jeanette Hoff',
    designation: 'Surgery',
    authorLink: '/doctor-profile'
  },
];

const beforeAfterData = {
  bgImg: '/images/before-after-bg.jpg',
  beforeImg: '/images/after.jpg',
  afterImg: 'images/before.jpg',
};

const testimonialData = [
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
];

const priceData = [
  {
    title: 'Blood Test',
    price: '39',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '0',
      },
      {
        title: 'Fifth Description',
        status: '0',
      },
    ],
  },
  {
    title: 'Hemoglobin Test',
    price: '89',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '1',
      },
      {
        title: 'Fifth Description',
        status: '0',
      },
    ],
  },
  {
    title: 'Homocysteine Test',
    price: '150',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '1',
      },
      {
        title: 'Fifth Description',
        status: '1',
      },
    ],
  },
  {
    title: 'Blood Test',
    price: '39',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '0',
      },
      {
        title: 'Fifth Description',
        status: '0',
      },
    ],
  },
  {
    title: 'Hemoglobin Test',
    price: '89',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '1',
      },
      {
        title: 'Fifth Description',
        status: '0',
      },
    ],
  },
  {
    title: 'Homocysteine Test',
    price: '150',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '1',
      },
      {
        title: 'Fifth Description',
        status: '1',
      },
    ],
  },
];

const faqData = {
  title: 'Just Answer the Questions',
  img: 'images/faq-img.png',
  bgImg: 'shape/faq-bg.svg',
  faqItems: [
    {
      title: 'What is Medi solution?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: 'How do I get a refill on my prescription?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: 'How competent our total treatment?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: 'If I get sick what should I do?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: 'What is emergency cary to your hospital?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
  ],
};

const newsletterData = {
  bgImg: 'images/news-letter-bg.png',
  contact: '(+01) - 234 567 890',
};

const postData = [
  {
    img: 'images/blog1.jpg',
    title: 'Working in emergency medicine',
    date: 'Aug 23, 2020',
    author: 'Albert Brian',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: '/post/post_details',
  },
  {
    img: 'images/blog2.jpg',
    title: 'Individual treatment & assistance',
    date: 'Aug 22, 2020',
    author: 'William Juarez',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: '/post/post_details',
  },
  {
    img: 'images/blog3.jpg',
    title: 'Child’s first hospital visit',
    date: 'Aug 21, 2020',
    author: 'Jamse Lewis',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: '/post/post_details',
  },
  {
    img: 'images/blog3.jpg',
    title: 'Child’s first hospital visit',
    date: 'Aug 21, 2020',
    author: 'Jamse Lewis',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: '/post/post_details',
  },
];

const brandData = [
  {
    bg: 'orange',
    img: 'images/client1.png',
  },
  {
    bg: 'blue',
    img: 'images/client2.png',
  },
  {
    bg: 'red',
    img: 'images/client3.png',
  },
  {
    bg: 'green',
    img: 'images/client4.png',
  },
  {
    bg: 'dip-blue',
    img: 'images/client5.png',
  },
  {
    bg: 'orange',
    img: 'images/client1.png',
  },
  {
    bg: 'blue',
    img: 'images/client2.png',
  },
  {
    bg: 'red',
    img: 'images/client3.png',
  },
  {
    bg: 'green',
    img: 'images/client4.png',
  },
  {
    bg: 'dip-blue',
    img: 'images/client5.png',
  },
];

const mapLocationURL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d193175.30893635444!2d-74.373409!3d40.841927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a82f1352d0dd%3A0x81d4f72c4435aab5!2sTroy%20Meadows%20Wetlands!5e0!3m2!1sen!2sbd!4v1701067943819!5m2!1sen!2sbd';

const Home7 = () => {
  return (
    <>
      <Hero7 data={heroData} />
      <Iconbox data={iconboxData} />
      <About data={aboutData} />
      <Department />
      <Appointment />
      <SpecialistsSlider data={specialistData} />
      <hr />
      <MasonryGallery />
      <BeforeAfter data={beforeAfterData} />
      <TestimonialSlider data={testimonialData} />
      <Funfact />
      <PriceSlider data={priceData} />
      <Accordion data={faqData} />
      <Newsletter data={newsletterData} />
      <PostWrapper data={postData} />
      <BrandSlider data={brandData} />
      <Contact />
      <LocationInMap data={mapLocationURL} />
    </>
  );
};

export default Home7;
