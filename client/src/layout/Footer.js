import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Divider, IconButton } from '@mui/material';
import React from 'react';

const Footer = () => {
  const sections = [
    {
      sectionTitle: 'Support',
      links: [
        { link: '/404', linkTitle: 'Help Center' },
        { link: '/404', linkTitle: 'Safety Information' },
        { link: '/404', linkTitle: 'Cancellation options' },
      ],
    },
    {
      sectionTitle: 'Community',
      links: [
        { link: '/404', linkTitle: 'Celebrating diversity & belonging' },
        { link: '/404', linkTitle: 'Combating discrimiation' },
      ],
    },
    {
      sectionTitle: 'Owners',
      links: [
        { link: '/404', linkTitle: 'Try providing your parking space' },
        { link: '/404', linkTitle: 'How to provide responsibly' },
      ],
    },
    {
      sectionTitle: 'About',
      links: [
        { link: '/404', linkTitle: 'Learn about new features' },
        { link: '/about', linkTitle: 'Get to know the team' },
        { link: '/404', linkTitle: 'Careers' },
      ],
    },
  ];
  return (
    <div className="bg-offWhite flex flex-col justify-center px-10 h-[180px] bottom-0">
      <div className="flex py-2 justify-between">
        {/* links by sections */}
        {sections.map((section, idx) => (
          <div key={idx}>
            <div className="text-sm mb-2 font-semibold">{section.sectionTitle}</div>
            <div>
              {section.links.map((sectionLink, idx) => (
                <div key={idx}>
                  <a href={sectionLink.link} className="text-xs mb-2 hover:underline">
                    {sectionLink.linkTitle}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <div className="py-2 text-xs flex justify-between ">
        <div className="flex items-center space-x-2">
          <div>&copy; 2022 ParkingPal</div>
        </div>
        {/* Social media links */}
        <div>
          <IconButton>
            <Instagram color="secondary" sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton>
            <Facebook color="secondary" sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton>
            <Twitter color="secondary" sx={{ fontSize: 16 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Footer;
