import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

import { useCallback } from "react";
const Particle = () => {
  const particlesInit = useCallback(async (engine:any) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container:any) => {
    // console.log(container);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        style={
          {
            //   transform: "rotateZ(20deg)",
            //   maxHeight: "550px",
            //   maxWidth: "70%",
            //   marginTop: "100px",
          }
        }
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: false,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 300,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#00d09b",
            },
            links: {
              color: "#00d09b",
              distance: 100,
              enable: true,
              opacity: 1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: false,
                area: 180,
              },
              value: 25,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </>
  );
};

export default Particle;
