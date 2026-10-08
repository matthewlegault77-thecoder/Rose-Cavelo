// Site-wide facts. Change a phone number or link here and every place that
// shows it (menu, team section, footer) updates.
export const site = {
  name: 'Rose Calvelo',
  title: 'Rose Calvelo · Luxury Home Builders',
  description: 'Custom luxury homes built with precision and vision. Rose Calvelo at eXp Realty, Calgary.',
  bookingEmail: 'rose@rosecalveloteam.com',
  office: {
    name: 'Rose Calvelo Team at eXp Realty',
    address: '#210, 739 11 Avenue SW, Calgary',
    phone: '(403) 998-0287',
    tel: '+14039980287',
    email: 'info@rosecalveloteam.com',
  },
  searchUrl:
    'https://search.rosecalveloteam.com/search?s[locations][0][city]=Calgary&s[locations][0][state]=ALBERTA&s[orderBy]=sourceCreationDate%2Cdesc',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/rosecalveloteam/' },
    { label: 'Facebook', href: 'https://www.facebook.com/rosecalveloteam' },
    { label: 'YouTube', href: 'https://www.youtube.com/@rosecalveloteam9310' },
  ],
};

// The in-page sections, in page order. The menu is built from this list.
export const sections = [
  { id: 'listings', label: 'Listings' },
  { id: 'builds', label: 'Builds' },
  { id: 'vision', label: 'Vision' },
  { id: 'approach', label: 'Approach' },
  { id: 'team', label: 'Team' },
  { id: 'consult', label: 'Contact' },
];
