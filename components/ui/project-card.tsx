import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, title, description, link, linkText = "View Project", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-white/20",
          className
        )}
        {...props}
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-white">
            {title}
          </h3>
          <p className="mt-3 flex-1 text-white/60">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-all duration-300 hover:text-white hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
