import { siteConfig } from "@/config/site";
import { Github, Instagram, InstagramIcon, Mail, Twitter } from "lucide-react";
import { Icons } from "./icons";

export function SiteFooter() {
  return(
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a target="_blank" rel="noreferrer" href="mailto:princekunal601@gamil.com">
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6"/>
          </a>
          {/* <a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            <span className="sr-only">Twitter</span>
            <Icons.twitter className="h-6 w-6"/>
          </a> */}
          <a target="_blank" rel="noreferrer" href={siteConfig.links.instagram}>
            <span className="sr-only">Instagram</span>
            {/* <Icons.instagram className="h-6 w-6"/> */}
            <InstagramIcon/>
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            {/* <Icons.github className="h-6 w-6"/> */}
            <Github/>
          </a>
        </div>
        {/* <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <a href={siteConfig.links.personalSite} target="_blank">{siteConfig.author}</a>
        </div> */}
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <p> &copy; 2024 <a href="https://www.mohemohe.in">{siteConfig.name}</a> | All rights Reserved </p>
        </div>
      </div>
    </footer>
  )
}