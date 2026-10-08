// The homes in the Listings carousel, in order. Each one gets its own screen.
// `id` is the MLS feed id on search.rosecalveloteam.com; `photo` is the main
// image and `detail` the second room that floats in front of it.
// Brokerage credit is required by the board: keep `brokerage` accurate.
import killarney from '../assets/listings/killarney.jpg';
import killarney2 from '../assets/listings/killarney-2.jpg';
import beltline from '../assets/listings/13-ave.jpg';
import beltline2 from '../assets/listings/13-ave-2.jpg';
import arbour from '../assets/listings/arbour-stone.jpg';
import arbour2 from '../assets/listings/arbour-stone-2.jpg';
import shawnessy from '../assets/listings/shawcliffe.jpg';
import shawnessy2 from '../assets/listings/shawcliffe-2.jpg';
import altadore from '../assets/listings/44-ave.jpg';
import altadore2 from '../assets/listings/44-ave-2.jpg';

export const listings = [
  {
    id: 270917465, hood: 'Killarney', address: '364 Killarney Glen Court SW', postal: 'T3E 7H4',
    beds: 2, baths: 3, sqft: 1082, price: 399000, brokerage: 'Century 21 Bamber Realty Ltd.',
    listed: '2026-10-07', photo: killarney, detail: killarney2, detailLabel: 'Dining area',
  },
  {
    id: 270916862, hood: 'Beltline', address: '339 13 Avenue SW #509', postal: 'T2R 0K3',
    beds: 1, baths: 1, sqft: 502, price: 179900, brokerage: 'RE/MAX Innovations',
    listed: '2026-10-07', photo: beltline, detail: beltline2, detailLabel: 'Living room',
  },
  {
    id: 270916863, hood: 'Arbour Lake', address: '133 Arbour Stone Close NW', postal: 'T3G 4T2',
    beds: 6, baths: 4, sqft: 2882, price: 1068000, brokerage: 'CIR Realty',
    listed: '2026-10-07', photo: arbour, detail: arbour2, detailLabel: 'Great room',
  },
  {
    id: 270915975, hood: 'Shawnessy', address: '235 Shawcliffe Circle SW', postal: 'T2Y 1E8',
    beds: 4, baths: 2, sqft: 1156, price: 580000, brokerage: 'Real Estate Professionals Inc.',
    listed: '2026-10-07', photo: shawnessy, detail: shawnessy2, detailLabel: 'Front entry',
  },
  {
    id: 270915976, hood: 'Altadore', address: '1927 44 Avenue SW', postal: 'T2T 2N7',
    beds: 4, baths: 4, sqft: 2053, price: 1320000, brokerage: 'RE/MAX First',
    listed: '2026-10-07', photo: altadore, detail: altadore2, detailLabel: 'Dining room',
  },
];
