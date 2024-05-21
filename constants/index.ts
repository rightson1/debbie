import { positionsType } from "./../types/index";
import { SocialIconsTypes } from "@/types";
export const quickLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

export const clubs = [
  {
    name: "Christian Union",
    image: "/images/1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
  {
    name: "Theater Club",
    image: "/images/2.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
  {
    name: "Football Club",
    image: "/images/3.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
  {
    name: "Tech Club",
    image: "/images/1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
];
export const editorColors = [
  "#25262b",
  "#fff",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
];
export const socialLinks: {
  name: keyof SocialIconsTypes;
  placeholder: string;
}[] = [
  {
    name: "Facebook",
    placeholder: "https://www.facebook.com/username",
  },
  {
    name: "Twitter",
    placeholder: "https://twitter.com/username",
  },
  {
    name: "Instagram",
    placeholder: "https://www.instagram.com/username",
  },
  {
    name: "LinkedIn",
    placeholder: "https://www.linkedin.com/in/username",
  },
  {
    name: "YouTube",
    placeholder: "https://www.youtube.com/channel/username",
  },
  {
    name: "GitHub",
    placeholder: "https://github.com/username",
  },
  {
    name: "Website",
    placeholder: "https://www.example.com",
  },
  {
    name: "Gmail",
    placeholder: "user@gmail.com",
  },
  {
    name: "WhatsApp",
    placeholder: "+2547XXXXXXXX",
  },
];

export const sampleCandidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    position: "President",
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    position: "Vice President",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    position: "Treasurer",
  },
  {
    id: 4,
    name: "Eva Brown",
    email: "eva.brown@example.com",
    position: "Secretary",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    position: "Public Relations Officer",
  },
  // Add more sample data as needed
];

export const pieData = [
  {
    id: "1",
    value: 10,
    label: "Ms Riara",
  },
  {
    id: "2",
    value: 20,
    label: "Mr Riara",
  },
];
export const positions: positionsType[] = ["Miss Riara", "Mr Riara"];
