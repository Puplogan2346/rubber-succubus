/**
 * Social Links Configuration
 * 
 * Update the URLs below with your actual social media profiles.
 * This configuration is used by the Navigation component.
 * 
 * To add or remove social links, edit this file and the Navigation component will automatically update.
 */

import { Instagram, Mail, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    url: "https://x.com/rubber_succubus", // UPDATE: Replace with your X/Twitter profile URL
    icon: Heart, // Using Heart as X icon alternative (can change to custom icon)
    label: "X / Twitter",
  },
  {
    name: "Email",
    url: "mailto:rubbersuccubusbiz@gmail.com", // UPDATE: Replace with your email address
    icon: Mail,
    label: "Email",
  },
  // Add more social links as needed:
  // {
  //   name: "TikTok",
  //   url: "https://tiktok.com/@your_handle",
  //   icon: Music, // or another icon from lucide-react
  //   label: "TikTok",
  // },
  // {
  //   name: "YouTube",
  //   url: "https://youtube.com/@your_channel",
  //   icon: Video,
  //   label: "YouTube",
  // },
];
