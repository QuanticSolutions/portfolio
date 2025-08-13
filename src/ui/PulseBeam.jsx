import React from "react";

const grad1 = {
  initial: {
    x1: "0%",
    x2: "0%",
    y1: "80%",
    y2: "100%",
  },
  animate: {
    x1: ["0%", "0%", "200%"],
    x2: ["0%", "0%", "180%"],
    y1: ["80%", "0%", "0%"],
    y2: ["100%", "20%", "20%"],
  },
};

const grad2 = {
  initial: {
    x1: "0%",
    x2: "0%",
    y1: "80%",
    y2: "100%",
  },
  animate: {
    x1: ["20%", "100%", "100%"],
    x2: ["0%", "90%", "90%"],
    y1: ["80%", "80%", "-20%"],
    y2: ["100%", "100%", "0%"],
  },
};

const grad3 = {
  initial: {
    x1: "0%",
    x2: "0%",
    y1: "80%",
    y2: "100%",
  },
  animate: {
    x1: ["20%", "100%", "100%"],
    x2: ["0%", "90%", "90%"],
    y1: ["80%", "80%", "-20%"],
    y2: ["100%", "100%", "0%"],
  },
};

const grad4 = {
  initial: {
    x1: "40%",
    x2: "50%",
    y1: "160%",
    y2: "180%",
  },
  animate: {
    x1: "0%",
    x2: "10%",
    y1: "-40%",
    y2: "-20%",
  },
};

const grad5 = {
  initial: {
    x1: "-40%",
    x2: "-10%",
    y1: "0%",
    y2: "20%",
  },
  animate: {
    x1: ["40%", "0%", "0%"],
    x2: ["10%", "0%", "0%"],
    y1: ["0%", "0%", "180%"],
    y2: ["20%", "20%", "200%"],
  },
};

const services = [
  {
    id: 1,
    number: "01",
    title: "Designing",
    description:
      "Creating bold, engaging designs that resonate with your audience and tell your brand's story.",
    projectSample: {
      title: "Brand Design",
      image: "/assets/projects/gaming/schedules/1.jpg",
      tech: ["Figma", "Illustrator", "Photoshop"],
    },
  },
  {
    id: 2,
    number: "02",
    title: "UI/UX",
    description:
      "Bringing ideas to life with stunning 3D models and visuals that add depth, realism, and impact to your brand's presentation.",
    projectSample: {
      title: "3D UI Concepts",
      image: "/assets/UI-Portfolio/Web/Shopify/Bechlo.jpg",
      tech: ["Figma", "Blender", "Adobe XD"],
    },
  },
  {
    id: 3,
    number: "03",
    title: "2D/3D Animation",
    description:
      "Crafting engaging & professional videos that tell your story, capture attention, & connect with your audience across platforms.",
    projectSample: {
      title: "Animated Explainer Video",
      image: "/api/placeholder/300/200",
      tech: ["After Effects", "Blender", "Premiere Pro"],
    },
  },
  {
    id: 4,
    number: "04",
    title: "Video Editing",
    description:
      "Crafting responsive and user-friendly websites that drive engagement and deliver results.",
    projectSample: {
      title: "Corporate Promo Video",
      image: "/api/placeholder/300/200",
      tech: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    },
  },
  {
    id: 5,
    number: "05",
    title: "Web Development",
    description:
      "Building intuitive mobile applications that enhance user experience and meet business objectives.",
    projectSample: {
      title: "Business Website",
      image: "/assets/custom/carsfinderpro.jpg",
      tech: ["React", "Node.js", "MongoDB"],
    },
  },
  {
    id: 6,
    number: "06",
    title: "App Development",
    description:
      "Building intuitive mobile applications that enhance user experience and meet business objectives.",
    projectSample: {
      title: "E-commerce Mobile App",
      image: "/assets/service-images/Beseus.jpg",
      tech: ["React Native", "Firebase", "Redux"],
    },
  },
  {
    id: 7,
    number: "07",
    title: "Software Development",
    description:
      "Crafting responsive and user-friendly websites that drive engagement and deliver results.",
    projectSample: {
      title: "Custom ERP System",
      image: "/assets/custom/Bookingmanagment.jpg",
      tech: ["Java", "Spring Boot", "PostgreSQL"],
    },
  },
  {
    id: 8,
    number: "08",
    title: "Digital Marketing",
    description:
      "Building intuitive mobile applications that enhance user experience and meet business objectives.",
    projectSample: {
      title: "Social Media Campaign",
      image: "/api/placeholder/300/200",
      tech: ["Facebook Ads", "Google Ads", "Canva"],
    },
  },
  {
    id: 9,
    number: "09",
    title: "SEO",
    description:
      "Building intuitive mobile applications that enhance user experience and meet business objectives.",
    projectSample: {
      title: "SEO Optimization",
      image: "/api/placeholder/300/200",
      tech: ["Ahrefs", "Google Analytics", "SEMRush"],
    },
  },
];

export const PulseBeams = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentServiceIndex((prevIndex) => 
          (prevIndex + 1) % services.length
        );
        setIsVisible(true);
      }, 300); // Fade out duration
      
    }, 3000); // Change service every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-[40rem] relative items-center justify-center antialiased bg-black/80 backdrop-blur-md overflow-hidden">
      <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:shadow-green-500/50 transition-all duration-500 hover:scale-110 bg-teal-900 w-[320px] z-40 h-[100px] no-underline group cursor-pointer relative shadow-2xl shadow-emerald-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex justify-center text-center space-x-2 items-center z-10 rounded-full py-0.5 px-4">
          <span 
            className={`md:text-2xl text-base inline-block bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-emerald-900 transition-opacity duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {services[currentServiceIndex].title}
          </span>
        </div>
      </button>
      <div className="absolute inset-0 flex items-center justify-center">
        <SVGs />
      </div>
    </div>
  );
};

const SVGs = () => {
  const [gradientStates, setGradientStates] = React.useState({
    grad1: grad1.initial,
    grad2: grad2.initial,
    grad3: grad3.initial,
    grad4: grad4.initial,
    grad5: grad5.initial,
  });

  React.useEffect(() => {
    const animateGradient = (gradKey, gradConfig) => {
      const animate = () => {
        setGradientStates(prev => ({
          ...prev,
          [gradKey]: gradConfig.animate
        }));

        setTimeout(() => {
          setGradientStates(prev => ({
            ...prev,
            [gradKey]: gradConfig.initial
          }));
        }, 2000);
      };
      const initialDelay = Math.random() * 2000;
      setTimeout(() => {
        animate();
        setInterval(animate, 4000);
      }, initialDelay);
    };

    animateGradient('grad1', grad1);
    animateGradient('grad2', grad2);
    animateGradient('grad3', grad3);
    animateGradient('grad4', grad4);
    animateGradient('grad5', grad5);
  }, []);

  return (
    <svg
      width="858"
      height="434"
      viewBox="0 0 858 434"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex flex-shrink-0"
    >
      <path
        d="M320 217H16.5C10.9772 217 6.5 221.477 6.5 227V398.5"
        stroke="rgb(30 41 59)"
      />
      <path
        d="M538 217H841C846.523 217 851 212.523 851 207V40"
        stroke="rgb(30 41 59)"
      />
      <path
        d="M429 260V333C429 338.523 424.523 343 419 343H152C146.477 343 142 347.477 142 353V426.5"
        stroke="rgb(30 41 59)"
      />
      <path
        d="M429 260V333.226C429 338.749 433.477 343.226 439 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
        stroke="rgb(30 41 59)"
      />
      <path
        d="M429 174V17C429 11.4772 433.477 7 439 7H414"
        stroke="rgb(30 41 59)"
      />

      {/* Gradient Beams - now connected to button center */}
      <path
        d="M320 217H16.5C10.9772 217 6.5 221.477 6.5 227V398.5"
        stroke="url(#grad1)"
        style={{
          transition: 'all 2s linear'
        }}
      />
      <path
        d="M538 217H841C846.523 217 851 212.523 851 207V40"
        stroke="url(#grad2)"
        style={{
          transition: 'all 2s linear'
        }}
      />
      <path
        d="M429 260V333C429 338.523 424.523 343 419 343H152C146.477 343 142 347.477 142 353V426.5"
        stroke="url(#grad3)"
        style={{
          transition: 'all 2s linear'
        }}
      />
      <path
        d="M429 260V333.226C429 338.749 433.477 343.226 439 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
        stroke="url(#grad4)"
        style={{
          transition: 'all 2s linear'
        }}
      />
      <path
        d="M429 174V17C429 11.4772 433.477 7 439 7H414"
        stroke="url(#grad5)"
        style={{
          transition: 'all 2s linear'
        }}
      />

      <defs>
        <linearGradient
          id="grad1"
          x1={gradientStates.grad1.x1}
          x2={gradientStates.grad1.x2}
          y1={gradientStates.grad1.y1}
          y2={gradientStates.grad1.y2}
          style={{
            transition: 'all 2s linear'
          }}
        >
          <GradientColors />
        </linearGradient>
        
        <linearGradient
          id="grad2"
          x1={gradientStates.grad2.x1}
          x2={gradientStates.grad2.x2}
          y1={gradientStates.grad2.y1}
          y2={gradientStates.grad2.y2}
          style={{
            transition: 'all 2s linear'
          }}
        >
          <GradientColors />
        </linearGradient>
        
        <linearGradient
          id="grad3"
          x1={gradientStates.grad3.x1}
          x2={gradientStates.grad3.x2}
          y1={gradientStates.grad3.y1}
          y2={gradientStates.grad3.y2}
          style={{
            transition: 'all 2s linear'
          }}
        >
          <GradientColors />
        </linearGradient>
        
        <linearGradient
          id="grad4"
          x1={gradientStates.grad4.x1}
          x2={gradientStates.grad4.x2}
          y1={gradientStates.grad4.y1}
          y2={gradientStates.grad4.y2}
          style={{
            transition: 'all 2s linear'
          }}
        >
          <GradientColors />
        </linearGradient>
        
        <linearGradient
          id="grad5"
          x1={gradientStates.grad5.x1}
          x2={gradientStates.grad5.x2}
          y1={gradientStates.grad5.y1}
          y2={gradientStates.grad5.y2}
          style={{
            transition: 'all 2s linear'
          }}
        >
          <GradientColors />
        </linearGradient>
      </defs>

      {/* Connection points - circles that show where beams connect */}
      <circle
        cx="429"
        cy="217"
        r="4"
        fill="rgb(16 185 129)"
        className="animate-pulse"
      />
      
      {/* Endpoint circles */}
      <circle
        cx="851"
        cy="34"
        r="6.5"
        fill="rgb(51 65 85)"
        stroke="rgb(75 85 99)"
      />
      <circle
        cx="770"
        cy="427"
        r="6.5"
        fill="rgb(51 65 85)"
        stroke="rgb(75 85 99)"
      />
      <circle
        cx="142"
        cy="427"
        r="6.5"
        fill="rgb(51 65 85)"
        stroke="rgb(75 85 99)"
      />
      <circle
        cx="6.5"
        cy="398.5"
        r="6"
        fill="rgb(51 65 85)"
        stroke="rgb(75 85 99)"
      />
      <circle
        cx="420.5"
        cy="6.5"
        r="6"
        fill="rgb(51 65 85)"
        stroke="rgb(75 85 99)"
      />
    </svg>
  );
};

const GradientColors = () => {
  return (
    <>
      {/* Bright start at button */}
      <stop stopColor="#10b981" stopOpacity="1" />
      {/* Deep teal */}
      <stop offset="0.2" stopColor="#0d9488" />
      {/* Emerald midtone */}
      <stop offset="0.5" stopColor="#10b981" />
      {/* Fade to transparent */}
      <stop offset="1" stopColor="#000000" stopOpacity="0" />
    </>
  );
};

export default PulseBeams;