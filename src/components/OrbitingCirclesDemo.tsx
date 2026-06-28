import React from "react"
import { OrbitingCircles } from "./ui/orbiting-circles"
import { BrandIcons } from "./BrandIcons"

export function OrbitingCirclesDemo() {
    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
            {/* Central Logo */}
            <div className="z-10 flex items-center justify-center">
                <div className="w-24 h-24 relative">
                    <img
                        src="/Logo.png"
                        alt="Stenth Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* Inner Circles */}
            <OrbitingCircles
                className="size-[40px] border-none bg-transparent"
                duration={20}
                delay={0}
                radius={80}
            >
                <BrandIcons.googleAds />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[40px] border-none bg-transparent"
                duration={20}
                delay={5}
                radius={80}
            >
                <BrandIcons.meta />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[40px] border-none bg-transparent"
                duration={20}
                delay={10}
                radius={80}
            >
                <BrandIcons.tiktok />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[40px] border-none bg-transparent"
                duration={20}
                delay={15}
                radius={80}
            >
                <BrandIcons.shopify />
            </OrbitingCircles>

            {/* Outer Circles (reverse) */}
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={190}
                duration={30}
                reverse
            >
                <BrandIcons.hubspot />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={190}
                duration={30}
                delay={7.5}
                reverse
            >
                <BrandIcons.linkedin />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={190}
                duration={30}
                delay={15}
                reverse
            >
                <BrandIcons.stripe />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={190}
                duration={30}
                delay={22.5}
                reverse
            >
                <BrandIcons.youtube />
            </OrbitingCircles>
        </div>
    )
}
