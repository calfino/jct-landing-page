import { ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  image: string;
  links: Array<{
    label: string;
    url: string;
    icon: LucideIcon;
  }>;
}

export const projects: Project[] = [
  {
    title: "Ocean by BCA",
    description: "Enterprise web application developed for BCA.",
    image: "/business-dashboard-ocean.PNG",
    links: [{ label: "Visit Website", url: "https://ocean.bca.co.id/", icon: ExternalLink }],
  },
  {
    title: "SmartSales",
    description: "Sales tracking and management platform.",
    image: "/smartsales-userdashboard.PNG",
    links: [{ label: "Visit Website", url: "https://smartsales.id/", icon: ExternalLink }],
  },
  {
    title: "TravelingYuk",
    description: "Travel planning and booking web application.",
    image: "/travelyuk.PNG",
    links: [{ label: "Visit Website", url: "https://travelingyuk.vercel.app/", icon: ExternalLink }],
  },
  {
    title: "Jalur5",
    description: "Indonesia's largest public-transport information community.",
    image: "/JALUR5-text-ORI-01.png",
    links: [{ label: "Visit Website", url: "https://jalur5.com/", icon: ExternalLink }],
  },
  {
    title: "JFC Expense",
    description: "Personal expense tracker and financial management app.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    links: [{ label: "Visit Website", url: "https://jfc-expense.vercel.app/", icon: ExternalLink }],
  },
  {
    title: "Johannes Calvin",
    description: "Personal landing page and resume portfolio.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    links: [{ label: "Visit Website", url: "https://johannes-calvin.vercel.app/", icon: ExternalLink }],
  },
];
