import { type SVGProps } from 'react'

export function TensorflowIconLight(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 266.79 269.02" width="1em" height="1em" {...props}>
            <defs>
                <clipPath id="tensorflow_icon_light__clip-path">
                    <polygon fill="none" points="200.76 95.86 136.29 59.02 136.29 210 162.05 195.04 162.05 152.57 181.5 163.82 181.39 134.77 162.05 123.72 162.05 106.85 200.85 129.27 200.76 95.86" />
                </clipPath>
                <linearGradient id="tensorflow_icon_light__linear-gradient" x1="60.08" y1="134.33" x2="218.39" y2="134.33" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ff6f00" />
                    <stop offset="1" stopColor="#ffa800" />
                </linearGradient>
                <clipPath id="tensorflow_icon_light__clip-path-2">
                    <polygon fill="none" points="66.03 95.86 130.5 59.02 130.5 210 104.74 195.04 104.74 106.85 65.94 129.27 66.03 95.86" />
                </clipPath>
                <linearGradient id="tensorflow_icon_light__linear-gradient-2" x1="59" y1="134.33" x2="217.32" y2="134.33" xlinkHref="#tensorflow_icon_light__linear-gradient" />
            </defs>
            <g clipPath="url(#tensorflow_icon_light__clip-path)">
                <rect fill="url(#tensorflow_icon_light__linear-gradient)" x="60.08" y="58.47" width="158.31" height="151.72" />
            </g>
            <g clipPath="url(#tensorflow_icon_light__clip-path-2)">
                <rect fill="url(#tensorflow_icon_light__linear-gradient-2)" x="59" y="58.47" width="158.31" height="151.72" />
            </g>
        </svg>
    )
}
