import LocationInMap from '../Components/Map/LocationInMap';
import Hero14 from '../Components/Hero/Hero14';
import About3 from '../Components/About/About3';
import Contact2 from '../Components/Contact/Contact2';
import PostWrapper2 from '../Components/Post/PostWrapper2';
import Price2 from '../Components/Price/Price2';
import SpecialistsSlider2 from '../Components/Slider/SpecialistsSlider2';
import TestimonialSlider2 from '../Components/Slider/TestimonialSlider2';
import BeforeAfter2 from '../Components/BeforeAfter/BeforeAfter2';
import Appointment2 from '../Components/Appointment/Appointment2';
import ServiceSlider from '../Components/Slider/ServiceSlider';
import VideoBlock2 from '../Components/VideoBlock/VideoBlock2';

const heroData = [
  {
    title: `Way to get happy. <br/> Best promises.`,
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br /> Tempor incididunt ut labore et dolore magna.',
    bgImg: 'images/hero-bg8.jpg',
  },
  {
    title: ` Our hospital always <br>  provides high quality <br>  <span class="st-light-blue">dental</span> services`,
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br /> Tempor incididunt ut labore et dolore magna.',
    bgImg: 'images/dental/hero-bg.jpg',
  },
];

const aboutData = {
  bgImg: `images/dental/about.png`,
  title: `We have been working in the <span class="st-light-blue">dental</span> treatment profession for about 25 years long.`,
  text: `<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
  <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>`,
};

const serviceData = {
  sectionHeadingData: {
    subTitle: `Service`,
    title: `The main feature of our service <br /> is to <span className="st-light-blue">serve</span> the patient.`,
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

const appointmentData = {
  title: `Make <span className="st-light-blue">appointment</span> We always welcome new patients`,
  img: `/images/dental/appointment.png`,
  phone: `1 800-123-4567`,
};

const beforeAfterData = {
  beforeImg: '/images/dental/after.jpg',
  afterImg: 'images/dental/before.jpg',
  sectionHeadingData: {
    subTitle: `Before and after procedures`,
    title: `Some samples of our work <br> <span class="st-light-blue">before</span>
  and <span class="st-light-blue">after</span>`,
  },
};

const testimonialData = {
  sectionHeadingData: {
    subTitle: `Testimonial`,
    title: ` All that our clients have  <span class="st-light-blue">said</span><br/>
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

const videoBlock = {
  sectionHeadingData: {
    subTitle: `Testimonial`,
    title: `Here are some <br/> sample <span class="st-light-blue">videos</span> about our work`,
  },
  imgSrc: 'images/dental/video.jpg',
  videoSrc: 'https://www.youtube.com/embed/l2uQyBCmj9I?autoplay=1',
};

const specialistData = [
  {
    img: 'images/dental/member1.jpg',
    name: 'Dr. Philip Bailey',
    designation: 'Urology',
    authorLink: 'doctor-profile2',
  },
  {
    img: 'images/dental/member2.jpg',
    name: 'Dr. Vera Hasson',
    designation: 'Cardiology',
    authorLink: 'doctor-profile2',
  },
  {
    img: 'images/dental/member3.jpg',
    name: 'Dr. Matthew Hill',
    designation: 'Neurosurgery',
    authorLink: 'doctor-profile2',
  },
  {
    img: 'images/dental/member1.jpg',
    name: 'Dr. Philip Bailey',
    designation: 'Urology',
    authorLink: 'doctor-profile2',
  },
  {
    img: 'images/dental/member2.jpg',
    name: 'Dr. Vera Hasson',
    designation: 'Cardiology',
    authorLink: 'doctor-profile2',
  },
  {
    img: 'images/dental/member3.jpg',
    name: 'Dr. Matthew Hill',
    designation: 'Neurosurgery',
    authorLink: 'doctor-profile2',
  },
];

const priceData = {
  sectionHeadingData: {
    subTitle: `Pricing plan`,
    title: `What is the <span className="st-light-blue">cost</span> your <br />
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

const postData = {
  sectionHeadingData: {
    subTitle: `Our blog`,
    title: `Read the updated <span class="st-light-blue"> news </span><br/>about
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

const contactData = {
  sectionHeadingData: {
    subTitle: `Contact Us`,
    title: `Contact us for any  <span class="st-light-blue">said</span><br/>
    treatment`,
  },
};

const mapLocationURL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d193175.30893635444!2d-74.373409!3d40.841927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a82f1352d0dd%3A0x81d4f72c4435aab5!2sTroy%20Meadows%20Wetlands!5e0!3m2!1sen!2sbd!4v1701067943819!5m2!1sen!2sbd';

const Home14 = () => {
  return (
    <div>
      <Hero14 data={heroData} />
      <About3 data={aboutData} />
      <ServiceSlider data={serviceData} />
      <Appointment2 data={appointmentData} varient="st-rounded" />
      <BeforeAfter2 data={beforeAfterData} />
      <TestimonialSlider2 data={testimonialData} varient="st-type1" />
      <VideoBlock2 data={videoBlock} varient="st-bluis-bg" />
      <SpecialistsSlider2 data={specialistData} varient="st-type1" />
      <Price2 data={priceData} varient="st-color1" />
      <PostWrapper2 data={postData} varient="st-color1" />
      <Contact2 data={contactData} varient="st-bluis-bg" />
      <LocationInMap data={mapLocationURL} />
    </div>
  );
};

export default Home14;
