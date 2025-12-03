"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Pause, Play, Menu, X } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "../../lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  head: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: string[];
  status: string;
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
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const ROTATION_SPEED = 0.015;
  const ANIMATION_DURATION = 500;

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get responsive radius based on screen size
  const getRadius = useCallback(() => {
    if (typeof window === "undefined") return 200;
    const width = window.innerWidth;
    if (width < 480) return 100;
    if (width < 640) return 120;
    if (width < 768) return 150;
    if (width < 1024) return 200;
    return 300;
  }, []);

  const [radius, setRadius] = useState(200);

  useEffect(() => {
    const updateRadius = () => setRadius(getRadius());
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [getRadius]);

  const interpolateAngle = (current: number, target: number, speed: number) => {
    const diff = target - current;
    const normDiff = ((diff + 180) % 360) - 180;
    return current + normDiff * speed;
  };

  const centerViewOnNode = useCallback((nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const newTargetAngle = 270 - ((nodeIndex / totalNodes) * 360);
    setTargetAngle(newTargetAngle);
    setIsAnimatingToCenter(true);
  }, [timelineData]);

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
          newAngle = interpolateAngle(prev, targetAngle, deltaTime / ANIMATION_DURATION);
          
          const angleDifference = Math.abs(newAngle - targetAngle);
          if (angleDifference < 0.1 || ANIMATION_DURATION * 2 < deltaTime) {
            newAngle = targetAngle;
            setIsAnimatingToCenter(false);
            setTargetAngle(null);
          }
        } else if (autoRotate && activeNodeId === null) {
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
  }, [autoRotate, isAnimatingToCenter, targetAngle, activeNodeId]);

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
        newState[id] = true;
        setActiveNodeId(id);
        setAutoRotate(false);
        centerViewOnNode(id);
        if (isMobile) setSidebarOpen(false);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setIsAnimatingToCenter(false);
        setTargetAngle(null);
      }
      
      return newState;
    });
  };

  const calculateNodePosition = (index: number, total: number) => {
    const baseAngle = (index / total) * 360;
    const angle = (baseAngle + rotationAngle) % 360;
    
    const radian = (angle * Math.PI) / 180;
    
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    
    return { x, y, angle, zIndex, opacity };
  };

  const toggleRotation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAutoRotate(prev => !prev);
    if (!autoRotate) {
      setIsAnimatingToCenter(false);
      setTargetAngle(null);
      setActiveNodeId(null);
      setExpandedItems({});
    }
  };

  const orbitSize = radius * 2 + 40;
  const nodeSize = isMobile ? 40 : 56;
  const centerSize = isMobile ? 64 : 96;

  return (
    <div className={cn(
      "w-full min-h-screen md:h-[900px] flex flex-col md:flex-row",
      "bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50",
      "dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
      "relative",
      className
    )}>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-blue-200/50 dark:border-slate-700/50">
        <h2 className="text-slate-900 dark:text-white text-base font-bold tracking-wider">
          SERVICE DOMAINS
        </h2>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 dark:bg-slate-800/80 border-blue-200 dark:border-slate-600"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar - Desktop always visible, Mobile as overlay */}
      <div className={cn(
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-blue-200/50 dark:border-slate-700/50 overflow-y-auto shadow-lg",
        "transition-all duration-300 ease-in-out z-40",
        // Desktop styles
        "hidden md:block md:w-80",
        // Mobile overlay styles
        isMobile && sidebarOpen && "!block fixed inset-0 top-[57px] w-full"
      )}>
        <div className="p-4 md:p-6">
          <h2 className="hidden md:block text-slate-900 dark:text-white text-lg font-bold mb-6 tracking-wider">
            SERVICE DOMAINS
          </h2>
          <div className="space-y-2 md:space-y-3">
            {timelineData.map((item) => {
              const Icon = item.icon;
              const isActive = activeNodeId === item.id;
              const isExpanded = expandedItems[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "w-full text-left p-3 md:p-4 rounded-xl transition-all duration-300 border-2 shadow-sm hover:shadow-md",
                    isActive
                      ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500 dark:border-blue-400 shadow-blue-500/20"
                      : "bg-white/50 dark:bg-slate-800/50 border-blue-100 dark:border-slate-700 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 hover:border-blue-300 dark:hover:border-slate-600"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={cn(
                        "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-3 shadow-sm",
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                          : "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 border-2 border-blue-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                      )}>
                        <Icon size={isMobile ? 14 : 16} />
                      </div>
                      <span className={cn(
                        "text-sm font-semibold",
                        isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-200"
                      )}>
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
        className="flex-1 flex flex-col items-center justify-center relative p-4 md:p-0"
        ref={containerRef}
        onClick={handleContainerClick}
      >
        <div className="relative w-full h-full flex items-center justify-center min-h-[400px] md:min-h-0">
          {/* Rotation Control Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
              "border-2 border-blue-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-slate-500 shadow-lg",
              "top-2 right-2 md:top-6 md:right-6",
              "w-8 h-8 md:w-10 md:h-10"
            )}
            onClick={toggleRotation}
          >
            {autoRotate ? (
              <Pause size={isMobile ? 14 : 16} className="text-slate-700 dark:text-slate-200" />
            ) : (
              <Play size={isMobile ? 14 : 16} className="text-slate-700 dark:text-slate-200" />
            )}
          </Button>
            
          <div
            className="absolute flex items-center justify-center"
            ref={orbitRef}
            style={{ 
              perspective: "1000px", 
              transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
              width: orbitSize,
              height: orbitSize,
            }}
          >
            {/* Center Logo */}
            <div 
              className="absolute rounded-full flex items-center justify-center z-10 overflow-hidden bg-white dark:bg-slate-800 shadow-2xl border-4 border-blue-200 dark:border-slate-600"
              style={{ width: centerSize, height: centerSize }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Orbit rings - responsive */}
            <div 
              className="absolute rounded-full border-2 border-blue-200/30 dark:border-slate-600/30"
              style={{ width: radius * 2, height: radius * 2 }}
            />
            <div 
              className="absolute rounded-full border border-purple-200/20 dark:border-slate-500/20"
              style={{ width: radius * 2 + 20, height: radius * 2 + 20 }}
            />
            <div 
              className="absolute rounded-full border border-pink-200/20 dark:border-slate-700/20"
              style={{ width: radius * 2 - 20, height: radius * 2 - 20 }}
            />

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
                  ref={(el) => {
                    nodeRefs.current[item.id] = el;
                  }}
                  className="absolute cursor-pointer"
                  style={nodeStyle}
                  onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
                >
                  {/* Energy glow */}
                  <div
                    className="absolute rounded-full -inset-1"
                    style={{
                      background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.05) 100%)`,
                      width: `${item.energy * (isMobile ? 0.3 : 0.6) + (isMobile ? 30 : 50)}px`,
                      height: `${item.energy * (isMobile ? 0.3 : 0.6) + (isMobile ? 30 : 50)}px`,
                      left: `-${(item.energy * (isMobile ? 0.3 : 0.6) + (isMobile ? 30 : 50) - nodeSize) / 2}px`,
                      top: `-${(item.energy * (isMobile ? 0.3 : 0.6) + (isMobile ? 30 : 50) - nodeSize) / 2}px`,
                    }}
                  />

                  {/* Node circle */}
                  <div 
                    className={cn(
                      "rounded-full flex items-center justify-center border-2 md:border-3 transition-all duration-300 shadow-lg",
                      isExpanded
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-white dark:border-slate-200 shadow-2xl shadow-blue-500/50 scale-[1.5] md:scale-[1.7]"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-blue-300 dark:border-slate-600 hover:scale-110 hover:shadow-xl"
                    )}
                    style={{ width: nodeSize, height: nodeSize }}
                  >
                    <Icon size={isMobile ? 16 : 20} />
                  </div>

                  {/* Node title */}
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-bold tracking-wider transition-all duration-300 text-center",
                    isMobile ? "top-12 text-[10px]" : "top-16 text-xs",
                    isExpanded 
                      ? "text-slate-900 dark:text-white scale-110 md:scale-125 drop-shadow-lg" 
                      : "text-slate-700 dark:text-slate-300 drop-shadow-sm"
                  )}>
                    {item.head}
                  </div>

                  {/* Expanded card */}
                  {isExpanded && (
                    <Card className={cn(
                      "absolute left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl",
                      "border-2 border-blue-300 dark:border-slate-600 shadow-2xl overflow-visible",
                      isMobile 
                        ? "top-20 w-56 text-xs" 
                        : "top-24 w-72"
                    )}>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-blue-500 to-purple-500" />
                      <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
                        <CardTitle className={cn(
                          "mt-2 text-slate-900 dark:text-white font-bold",
                          isMobile ? "text-xs" : "text-sm"
                        )}>
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className={cn(
                        "text-slate-600 dark:text-slate-300 p-3 pt-0 md:p-6 md:pt-0",
                        isMobile ? "text-[11px]" : "text-xs"
                      )}>
                        <p className="line-clamp-3 md:line-clamp-none">{item.content}</p>
                        <br />
                        <a href="/Services" className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold underline">
                          Read more...
                        </a>
                        {item.relatedIds.length > 0 && (
                          <ul className="list-disc list-inside mt-2 space-y-1 hidden md:block">
                            {item.relatedIds.map((related, idx) => (
                              <li key={idx} className="text-xs text-slate-600 dark:text-slate-400">{related}</li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile backdrop when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 top-[57px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
