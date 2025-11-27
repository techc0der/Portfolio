import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  repoLink: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ 
  title, 
  description, 
  image, 
  tags, 
  liveLink, 
  repoLink 
}) => {
  return (
    <article className="
      group relative flex flex-col h-full w-full max-w-[350px]
      rounded-2xl bg-[#1b2028] bg-clip-padding 
      border-[3px] border-transparent
      transition-transform duration-300 hover:-translate-y-2
      
      bg-gradient-to-br from-[rgba(117,46,124,0.35)] via-[rgba(115,74,88,0.1)_15%] to-[#1b2028_20%]

      before:content-[''] before:absolute before:-top-[3px] before:-left-[3px] 
      before:-bottom-[3px] before:-right-[3px] before:-z-10 before:rounded-2xl
      before:bg-gradient-to-br before:from-[#752e7c] before:via-[#734a58_20%] before:to-[#2c333e]
      before:transition-opacity before:duration-300
    ">
      
      <div className="w-full h-48 rounded-t-xl overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>

      <div className="flex flex-col flex-grow p-6 text-center">
        
        <h2 className="text-2xl font-bold text-[#f1f3f3] mb-2">{title}</h2>
        
        <p className="text-[#7d8396] text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8 mt-auto">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs font-medium text-[#7d8396] border border-[#343945] rounded-full bg-[#1b2028]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          
          {/* <a 
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2 px-6 py-3 rounded-full 
              bg-[#3772ff] bg-gradient-to-br from-[#5587ff] to-[#3772ff] 
              text-white font-medium text-sm transition-all duration-300
              hover:bg-[length:150%] hover:shadow-[0_0_20px_rgba(55,114,255,0.5)]
            "
          >
            <ExternalLink size={16} />
            Live Demo
          </a> */}

          <a 
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center w-[46px] h-[46px] rounded-full
              border-[3px] border-[#343945] text-[#7d8396] transition-colors
              hover:border-[#f1f3f3] hover:text-white hover:bg-[#343945]
            "
            aria-label="View Source Code"
          >
            <Github size={20} />
          </a>
        </div>

      </div>
    </article>
  );
};

export default ProjectCard;