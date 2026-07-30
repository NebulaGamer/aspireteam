import { imageSize } from "./SiteImages";

/**
 * PHOTOGRAPHS OF PEOPLE
 * ---------------------
 * Any photograph containing identifiable people renders at its *natural*
 * aspect ratio inside a max-height constraint — never inside a fixed-aspect
 * frame with `object-fit: cover`, which silently discards up to half the
 * image (heads, trophies, the crew members at each end of a line-up).
 *
 * Where a fixed aspect ratio conflicts with the source, the aspect ratio
 * yields. Scenery and boat shots may still use `SiteImage` + object-cover.
 */

type PhotoFrameProps = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  /** Tailwind max-height utility, e.g. "max-h-[70vh]". */
  maxHeight?: string;
  className?: string;
  captionClassName?: string;
  priority?: boolean;
};

export function PhotoFrame({
  src,
  alt,
  caption,
  maxHeight = "max-h-[70vh]",
  className = "",
  captionClassName = "mt-4 text-sm leading-relaxed text-muted-foreground",
  priority = false,
}: PhotoFrameProps) {
  const { width, height } = imageSize(src);

  return (
    <figure className={className}>
      <div className="flex justify-center">
        {/* width/height are the true intrinsic dimensions, so the browser
            reserves the correct box and layout never shifts on load. */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={`h-auto w-auto max-w-full ${maxHeight} border border-gold/30 bg-abyss object-contain`}
        />
      </div>
      {caption ? <figcaption className={captionClassName}>{caption}</figcaption> : null}
    </figure>
  );
}
