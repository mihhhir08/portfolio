import Image from "next/image";

export default function PhotoCard() {
  return (
    <div className="flex h-full items-center justify-center py-4">
      <div className="relative h-44 w-44 md:h-48 md:w-48">
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]"
        >
          <defs>
            <path
              id="orbit-path"
              d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0"
            />
          </defs>
          <text className="fill-muted/60 font-mono text-[10.5px] tracking-[2.5px]">
            <textPath href="#orbit-path" textLength="570" lengthAdjust="spacing">
              SOFTWARE ENGINEER · AI · OPEN SOURCE ·
            </textPath>
          </text>
        </svg>
        {/* inset frame-in-frame */}
        <div className="absolute inset-6 rounded-full border border-hairline p-1.5">
          <div className="relative h-full w-full overflow-hidden rounded-full border border-hairline-bright">
            <Image
              src="/photo.jpg"
              alt="Mihirsinh Chavda"
              fill
              sizes="192px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
