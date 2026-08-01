import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import './Dock.css';

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const DEFAULT_DISABLEMAGNIFICATION = false;

export const Dock = React.forwardRef(
  (
    {
      className = "",
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification: disableMagnification,
            distance: iconDistance,
          });
        }
        return child;
      });
    };

    let alignmentClass = "dock--middle";
    if (direction === "top") alignmentClass = "dock--top";
    if (direction === "bottom") alignmentClass = "dock--bottom";

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={`dock ${alignmentClass} ${className}`}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);
Dock.displayName = "Dock";

export const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className = "",
  children,
  ...props
}) => {
  const ref = useRef(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const targetSize = disableMagnification ? size : magnification;

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={`dock-icon ${disableMagnification ? "dock-icon--disabled" : ""} ${className}`}
      {...props}
    >
      <div className="dock-icon__inner">{children}</div>
    </motion.div>
  );
};
DockIcon.displayName = "DockIcon";
