import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import "./Timeline.css";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="ace-timeline" ref={containerRef}>
      <div ref={ref} className="ace-timeline__list">
        {data.map((item, index) => (
          <div key={index} className="ace-timeline__item">
            <div className="ace-timeline__marker-col">
              <div className="ace-timeline__marker-bg">
                <div className="ace-timeline__marker-dot" />
              </div>
              <h3 className="ace-timeline__title-desktop">{item.title}</h3>
            </div>

            <div className="ace-timeline__content-col">
              <h3 className="ace-timeline__title-mobile">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="ace-timeline__track"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="ace-timeline__track-fill"
          />
        </div>
      </div>
    </div>
  );
};
