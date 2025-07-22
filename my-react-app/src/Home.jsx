import React from 'react';
import ChatBot from './chat'

function Home() {
  const companies = [
    { name: 'Engineers Mind', logo: 'https://aadcdn.msftauthimages.net/dbd5a2dd-brhczgdgf6ow-aljplae-xqpizummzjcwjnje4nwty4/logintenantbranding/0/bannerlogo?ts=638033184398940961' },
    { name: 'Infosys', logo: 'https://tse1.mm.bing.net/th/id/OIP.JQpD9YCl1lnyK_3PPXku6AAAAA?r=0&w=300&h=170&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { name: 'Wipro', logo: 'https://1000logos.net/wp-content/uploads/2021/05/Wipro-logo.png' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  ];

  const jobRoles = [
    { name: 'Full Stack Developer', jobs: '20.1K+ Jobs' },
    { name: 'Mobile / App Developer', jobs: '3.1K+ Jobs' },
    { name: 'Front End Developer', jobs: '5.1K+ Jobs' },
    { name: 'DevOps Engineer', jobs: '3.2K+ Jobs' },
    { name: 'Engineering Manager', jobs: '1.5K+ Jobs' },
    { name: 'Technical Lead', jobs: '10.9K+ Jobs' },
  ];

  const testimonials = [
    {
      quote: "This platform changed my life! I got placed in my dream company within weeks.",
      name: "Aman Gupta",
      role: "Software Developer",
      image: "https://www.marketingmind.in/wp-content/uploads/2022/02/Aman-Gupta-net-worth.jpeg"
    },
    {
      quote: "The interface is easy to use and has amazing job opportunities.",
      name: "Ashneer Grover",
      role: "Data Analyst",
      image: "https://tse2.mm.bing.net/th/id/OIP.KFTCNVhaWIc7x2nmz83a-AHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      quote: "Truly user‑centric and intuitive platform!",
      name: "Anupum Mittal",
      role: "Product Manager",
      image: "https://journalbharat.com/wp-content/uploads/2024/03/Anupam-Mittal.webp"
    },
  ];

  const primaryBlue = '#005f87';
  const accentGold = '#ffb800';
  const bgLight = '#fefefe';
  const textDark = '#1c1c1c';

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)',
        fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '3rem 2rem',
        color: textDark,
        letterSpacing: '0.03em',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <ChatBot />

      <section
        style={{
          textAlign: 'center',
          marginBottom: '4rem',
          paddingBottom: '2rem',
          borderBottom: `2px solid ${accentGold}`,
        }}
      >
        <h1
          style={{
            color: primaryBlue,
            fontSize: '3.5rem',
            fontWeight: '900',
            textShadow: '0 3px 8px rgba(0, 95, 135, 0.4)',
            letterSpacing: '0.1em',
            marginBottom: '0.6rem',
          }}
        >
          Hi Techies
        </h1>
        <p
          style={{
            fontSize: '1.4rem',
            color: '#555',
            maxWidth: '600px',
            margin: '0 auto',
            fontWeight: '500',
            textShadow: '0 1px 2px rgba(0,0,0,0.07)',
          }}
        >
          Find your dream job with us 
          <br/> 
          we connect talent with top companies!
        </p>
      </section>


      <div
        style={{
          marginBottom: '3.5rem',
          textAlign: 'center',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 95, 135, 0.15)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src="https://cdn.educba.com/academy/wp-content/uploads/2015/12/Find-a-Job-of-your-Dreams.jpg"
          alt="Dream job"
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
          }}
        />
      </div>


     <section
  style={{
    backgroundColor: bgLight,
    borderRadius: '20px',
    padding: '2.5rem 3rem',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
    marginBottom: '4rem',
    overflow: 'hidden',
    position: 'relative'
  }}
>
  <h2
    style={{
      color: primaryBlue,
      fontSize: '2rem',
      fontWeight: '900',
      marginBottom: '2rem',
      letterSpacing: '0.12em',
      textShadow: '1px 1px 5px rgba(255, 184, 0, 0.4)',
      textAlign: 'center',
    }}
  >
    Top Companies Hiring
  </h2>


  <div style={{ overflow: 'hidden', width: '100%' }}>
    <div
      className="marquee"
      style={{
        display: 'flex',
        gap: '3rem',
        animation: 'scroll 30s linear infinite',
      }}
    >
      {[...companies, ...companies].map((c, i) => (
        <div
          key={i}
          style={{
            textAlign: 'center',
            width: '160px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            padding: '0.8rem',
            borderRadius: '12px',
            backgroundColor: '#fff',
            boxShadow: '0 8px 20px rgba(0, 95, 135, 0.1)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '120px',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1.5px solid ${primaryBlue}33`,
              borderRadius: '10px',
              padding: '10px',
              backgroundColor: '#f7fbfe',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.07))',
            }}
          >
            <img
              src={c.logo}
              alt={`${c.name} logo`}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              loading="lazy"
            />
          </div>
          <p
            style={{
              marginTop: '0.8rem',
              fontSize: '1.05rem',
              fontWeight: '700',
              color: primaryBlue,
              letterSpacing: '0.03em',
              userSelect: 'none',
            }}
          >
            {c.name}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Animation style */}
  <style>{`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .marquee:hover {
      animation-play-state: paused;
    }
  `}</style>
</section>


      {/* Discover Roles */}
      <section
        style={{
          backgroundColor: bgLight,
          borderRadius: '20px',
          padding: '2.5rem 3rem',
          boxShadow: '0 14px 40px rgba(0, 95, 135, 0.1)',
          marginBottom: '4rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2.5rem',
        }}
      >
        <div style={{ flex: '1 1 320px', maxWidth: '450px' }}>
          <img
            src="https://static.naukimg.com/s/0/0/i/role-collection-ot.png"
            alt="Roles"
            style={{
              width: '500px',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 4px 5px rgba(0, 95, 135, 0.15))',
              userSelect: 'none',
            }}
            loading="lazy"
          />
          <h2
            style={{
              color: primaryBlue,
              fontSize: '2.1rem',
              fontWeight: '900',
              letterSpacing: '0.06em',
              marginBottom: '0.7rem',
              textShadow: '0 2px 6px rgba(0, 95, 135, 0.3)',
            }}
          >
            Discover jobs across popular roles
          </h2>
          <p
            style={{
              color: '#444',
              fontSize: '1.2rem',
              fontWeight: '500',
              maxWidth: '380px',
            }}
          >
            Select a role and well show you relevant jobs for it!
          </p>
        </div>
        <div
          style={{
            flex: '1 1 500px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))',
            gap: '1.5rem',
          }}
        >
          {jobRoles.map((r, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#d0e9ff',
                borderRadius: '16px',
                padding: '1.5rem 1.2rem',
                border: `2px solid transparent`,
                boxShadow: '0 3px 15px rgba(0, 95, 135, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: '700',
                color: primaryBlue,
                fontSize: '1.1rem',
                userSelect: 'none',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = accentGold;
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = '#b38600';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 184, 0, 0.5)';
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.textShadow = '2px 2px 6px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#d0e9ff';
                e.currentTarget.style.color = primaryBlue;
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 3px 15px rgba(0, 95, 135, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              <p style={{ marginBottom: '0.5rem' }}>{r.name}</p>
              <p
                style={{
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  color: '#004160',
                }}
              >
                {r.jobs}
              </p>
            </div>
          ))}
        </div>
      </section>


      <section
        style={{
          backgroundColor: bgLight,
          borderRadius: '24px',
          padding: '3rem 3.5rem',
          boxShadow: '0 18px 60px rgba(0, 95, 135, 0.15)',
          marginBottom: '4rem',
          maxWidth: '960px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h2
          style={{
            color: primaryBlue,
            fontSize: '2.4rem',
            fontWeight: '900',
            letterSpacing: '0.12em',
            textAlign: 'center',
            textShadow: '3px 3px 10px rgba(255, 184, 0, 0.6)',
            marginBottom: '3rem',
          }}
        >
          What Our Users Say
        </h2>
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {testimonials.map((u, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#fff8e1',
                borderRadius: '22px',
                padding: '2rem',
                boxShadow: '0 8px 30px rgba(255, 184, 0, 0.3)',
                maxWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.4s ease',
                cursor: 'default',
                userSelect: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-10px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <img
                src={u.image}
                alt={u.name}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1.2rem',
                  boxShadow: '0 5px 15px rgba(255, 184, 0, 0.6)',
                  border: `3px solid ${accentGold}`,
                }}
                loading="lazy"
              />
              <p
                style={{
                  fontStyle: 'italic',
                  fontWeight: '700',
                  color: primaryBlue,
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  lineHeight: '1.4',
                  letterSpacing: '0.03em',
                }}
              >
                "{u.quote}"
              </p>
              <h4
                style={{
                  fontWeight: '900',
                  marginBottom: '0.4rem',
                  color: '#bb8c00',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {u.name}
              </h4>
              <span
                style={{
                  fontSize: '1rem',
                  color: '#555',
                  fontWeight: '600',
                }}
              >
                {u.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#0a0a0a',
          color: '#f0e6d2',
          padding: '3rem 2rem',
          marginTop: '6rem',
          borderTop: `4px solid ${accentGold}`,
          fontSize: '0.95rem',
          letterSpacing: '0.04em',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto',
            gap: '2.5rem',
          }}
        >
          <div>
            <h4
              style={{
                marginBottom: '1.3rem',
                fontSize: '1.3rem',
                color: accentGold,
                fontWeight: '900',
                letterSpacing: '0.07em',
              }}
            >
              About Us
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                lineHeight: '2.1',
                color: '#d9c77f',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <li>Who We Are</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4
              style={{
                marginBottom: '1.3rem',
                fontSize: '1.3rem',
                color: accentGold,
                fontWeight: '900',
                letterSpacing: '0.07em',
              }}
            >
              Contact
            </h4>
            <p>Email: engineersmindt@hitechies.com</p>
            <p>Phone: +91 78468 33822</p>
            <p>Address: itpl, Tech Park, Bengaluru</p>
          </div>
          <div>
            <h4
              style={{
                marginBottom: '1.3rem',
                fontSize: '1.3rem',
                color: accentGold,
                fontWeight: '900',
                letterSpacing: '0.07em',
              }}
            >
              Follow Us
            </h4>
            <p>Twitter | LinkedIn | Facebook</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '3rem', color: '#999' }}>
          &copy; 2025 Hi Techies. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
