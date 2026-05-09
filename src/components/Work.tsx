import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>

                <div>
                  <h4>OptiMouse</h4>
                  <p>AI Powered Monitor Control System</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, OpenCV, MediaPipe, PyAutoGUI, Speech Recognition</p>
              <h4>Description</h4>
              <p>
                An AI-powered computer control system that enables hands-free
                interaction using eye tracking and voice commands. Features
                real-time eye movement tracking for cursor control via computer
                vision and facial landmark detection. Integrates speech
                recognition for voice-activated operations, improving
                accessibility for users with mobility challenges. Built with
                a focus on automation, smart interaction, and human-computer
                interaction principles.
              </p>
            </div>
            <WorkImage image="/images/optimouse.webp" alt="OptiMouse - AI Powered Monitor Control System" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
