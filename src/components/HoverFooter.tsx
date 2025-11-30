import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";

function HoverFooter() {
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "hello@tejovah.com",
      href: "mailto:hello@tejovah.com",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "+91 8085685200",
      href: "tel:+918085685200",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa]" />,
      text: "New Delhi, India",
      href: "https://www.google.com/maps/place/New+Delhi",
    },
  ];

  const socialLinks = [
    { icon: <Twitter size={20} />, label: "Twitter", href: "https://x.com/tejovah" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/company/tejovah/" },
    { icon: <Globe size={20} />, label: "Website", href: "#" },
  ];

  return (
    <footer className="bg-white/90 dark:bg-[#0F0F11]/90 relative h-fit overflow-hidden">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="flex justify-around gap-12 md:gap-8 lg:gap-16 pb-12">
          <div className="flex flex-col space-y-4 max-w-xs">
            <div className="flex items-center space-x-2">
              <span className="text-[#3ca2fa] text-3xl font-extrabold">
                ♥
              </span>
              <span className="text-gray-900 dark:text-white text-3xl font-bold">Tejovah</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Tejovah is a modern technology company delivering innovative solutions for the digital age.
            </p>
          </div>

          <div className="max-w-xs">
            <h4 className="text-gray-900 dark:text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-[#3ca2fa] transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span
                      className="text-gray-600 dark:text-gray-300 hover:text-[#3ca2fa] transition-colors text-sm"
                    >
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-300 dark:border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex space-x-6 text-gray-500 dark:text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-center md:text-left text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Tejovah. All rights reserved.
          </p>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="TEJOVAH" className="z-50" />
      </div>

      <FooterBackgroundGradient className="dark:opacity-100 opacity-40" />
    </footer>
  );
}

export default HoverFooter;