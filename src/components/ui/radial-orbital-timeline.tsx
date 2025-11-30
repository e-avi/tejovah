"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface TimelineItem {
  id: number;
  title: string;
  head: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: string[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className = "",
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [targetAngle, setTargetAngle] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isAnimatingToCenter, setIsAnimatingToCenter] = useState<boolean>(false);
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const ROTATION_SPEED = 0.015; // degrees per ms
  const ANIMATION_DURATION = 500; // ms for smooth centering

  // Function to smoothly interpolate between two angles
  const interpolateAngle = (current: number, target: number, speed: number) => {
    const diff = target - current;
    const normDiff = ((diff + 180) % 360) - 180;
    return current + normDiff * speed;
  };

  const centerViewOnNode = useCallback((nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    // Calculate the angle required to bring the node to the 12 o'clock position (270 degrees on the circle)
    const newTargetAngle = 270 - ((nodeIndex / totalNodes) * 360);
    setTargetAngle(newTargetAngle);
    setIsAnimatingToCenter(true);
  }, [timelineData]);

  // Smooth rotation and centering animation loop
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      setRotationAngle(prev => {
        let newAngle = prev;

        if (isAnimatingToCenter && targetAngle !== null) {
          // Smoothly move towards the target angle
          newAngle = interpolateAngle(prev, targetAngle, deltaTime / ANIMATION_DURATION);
          
          const angleDifference = Math.abs(newAngle - targetAngle);
          if (angleDifference < 0.1 || ANIMATION_DURATION * 2 < deltaTime) { // Check if close enough or time limit exceeded
            newAngle = targetAngle;
            setIsAnimatingToCenter(false);
            setTargetAngle(null);
          }

        } else if (autoRotate && activeNodeId === null) {
          // Continuous auto-rotation when no node is active
          newAngle = (prev + ROTATION_SPEED * deltaTime) % 360;
        }
        
        return newAngle;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, isAnimatingToCenter, targetAngle, activeNodeId, centerViewOnNode]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setAutoRotate(true);
      setIsAnimatingToCenter(false);
      setTargetAngle(null);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const isCurrentlyExpanded = prev[id];
      const newState: Record<number, boolean> = {};

      if (!isCurrentlyExpanded) {
        // Expand the new item
        newState[id] = true;
        setActiveNodeId(id);
        setAutoRotate(false);
        centerViewOnNode(id);
      } else {
        // Collapse the current item
        setActiveNodeId(null);
        setAutoRotate(true);
        setIsAnimatingToCenter(false);
        setTargetAngle(null);
      }
      
      return newState;
    });
  };

  const calculateNodePosition = (index: number, total: number) => {
    // We use the raw index angle to calculate the base position, and then apply the current rotation.
    const baseAngle = (index / total) * 360;
    const angle = (baseAngle + rotationAngle) % 360;
    
    const radius = 300; // Increased from 200 to 300
    const radian = (angle * Math.PI) / 180;
    
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    
    // Z-index and opacity for 3D depth effect
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    
    return { x, y, angle, zIndex, opacity };
  };

  const toggleRotation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAutoRotate(prev => !prev);
    if (!autoRotate) {
        // If turning rotation back on, ensure we stop any current centering animation
        setIsAnimatingToCenter(false);
        setTargetAngle(null);
        setActiveNodeId(null);
        setExpandedItems({});
    }
  };

  return (
    <div className={`w-full h-[900px] flex bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden ${className}`}>
      {/* Left Sidebar */}
      <div className="w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-blue-200/50 dark:border-slate-700/50 overflow-y-auto shadow-lg">
        <div className="p-6">
          <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-6 tracking-wider">
            SERVICE DOMAINS
          </h2>
          <div className="space-y-3">
            {timelineData.map((item) => {
              const Icon = item.icon;
              const isActive = activeNodeId === item.id;
              const isExpanded = expandedItems[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border-2 shadow-sm hover:shadow-md ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500 dark:border-blue-400 shadow-blue-500/20"
                      : "bg-white/50 dark:bg-slate-800/50 border-blue-100 dark:border-slate-700 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 hover:border-blue-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                          : "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 border-2 border-blue-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                      }`}>
                        <Icon size={16} />
                      </div>
                      <span className={`text-sm font-semibold ${
                        isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-200"
                      }`}>
                        {item.title}
                      </span>
                    </div>
                    {isExpanded && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse shadow-lg shadow-blue-500/50" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Orbital View */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative"
        ref={containerRef}
        onClick={handleContainerClick}
      >
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            {/* Rotation Control Button */}
            <Button
                variant="outline"
                size="icon"
                className="absolute top-6 right-6 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-slate-500 shadow-lg"
                onClick={toggleRotation}
            >
                {autoRotate ? <Pause size={16} className="text-slate-700 dark:text-slate-200" /> : <Play size={16} className="text-slate-700 dark:text-slate-200" />}
            </Button>
            
          <div
            className="absolute w-full h-full flex items-center justify-center"
            ref={orbitRef}
            style={{ perspective: "1000px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
          >
            {/* Center Logo */}
            <div className="absolute w-24 h-24 rounded-full flex items-center justify-center z-10 overflow-hidden bg-white dark:bg-slate-800 shadow-2xl border-4 border-blue-200 dark:border-slate-600">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Orbit rings - multiple for depth */}
            <div className="absolute w-[600px] h-[600px] rounded-full border-2 border-blue-200/30 dark:border-slate-600/30"></div>
            <div className="absolute w-[620px] h-[620px] rounded-full border border-purple-200/20 dark:border-slate-500/20"></div>
            <div className="absolute w-[580px] h-[580px] rounded-full border border-pink-200/20 dark:border-slate-700/20"></div>

            {/* Nodes */}
            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = expandedItems[item.id];
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
                transition: isAnimatingToCenter ? `transform ${ANIMATION_DURATION}ms ease-out, opacity 300ms ease` : "none",
              } as React.CSSProperties;

              return (
                <div
                  key={item.id}
                  ref={(el) => (nodeRefs.current[item.id] = el)}
                  className="absolute cursor-pointer"
                  style={nodeStyle}
                  onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
                >
                  {/* Energy glow - enhanced with gradient colors */}
                  <div
                    className="absolute rounded-full -inset-1"
                    style={{
                      background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.05) 100%)`,
                      width: `${item.energy * 0.6 + 50}px`,
                      height: `${item.energy * 0.6 + 50}px`,
                      left: `-${(item.energy * 0.6 + 50 - 50) / 2}px`,
                      top: `-${(item.energy * 0.6 + 50 - 50) / 2}px`,
                    }}
                  />

                  {/* Node circle - enhanced styling */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-3 transition-all duration-300 shadow-lg ${
                    isExpanded
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-white dark:border-slate-200 shadow-2xl shadow-blue-500/50 scale-[1.7]"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-blue-300 dark:border-slate-600 hover:scale-110 hover:shadow-xl"
                  }`}>
                    <Icon size={20} />
                  </div>

                  {/* Node title - enhanced styling */}
                  <div className={`absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-wider transition-all duration-300 text-center ${
                    isExpanded ? "text-slate-900 dark:text-white scale-125 drop-shadow-lg" : "text-slate-700 dark:text-slate-300 drop-shadow-sm"
                  }`}>
                    {item.head}
                  </div>

                  {/* Expanded card - enhanced styling */}
                  {isExpanded && (
                    <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-2 border-blue-300 dark:border-slate-600 shadow-2xl overflow-visible">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-blue-500 to-purple-500" />
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm mt-2 text-slate-900 dark:text-white font-bold">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs text-slate-600 dark:text-slate-300">
                        <p>{item.content}</p>
                        <br />
                        <a href="/Services" className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold underline">Read more...</a>
                        <br />
                        {item.relatedIds.length > 0 && (<>
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            {item.relatedIds.map((related, idx) => (
                              <li key={idx} className="text-xs text-slate-600 dark:text-slate-400">{related}</li>
                            ))}
                          </ul>
                        </>)}
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}