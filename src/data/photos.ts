// Stock photography from Unsplash (free under the Unsplash License: https://unsplash.com/license).
// Credit isn't required by the license, but we give it on every photo and on /credits.
// None of these show our own cars. Replace with real fleet photos as they're shot.

export type Photo = {
  src: string;
  alt: string;
  credit: string;
  page: string;
  /** CSS object-position, to keep the subject in frame when the hero crops. */
  focus?: string;
};

export const photos = {
  jeepSnowRoad: {
    src: "https://images.unsplash.com/photo-1648929287542-476151381d28",
    alt: "A Jeep driving down a snow-covered road",
    credit: "Dragon White Munthe",
    page: "https://unsplash.com/photos/nt8BHgngc4Y",
    focus: "50% 60%",
  },
  wranglerSnowField: {
    src: "https://images.unsplash.com/photo-1591105327764-4c4b76f9e6a0",
    alt: "A Jeep Wrangler parked on snow under a blue sky",
    credit: "Brandon Green",
    page: "https://unsplash.com/photos/F_KScPBU93I",
    focus: "50% 65%",
  },
  denverSkyline: {
    src: "https://images.unsplash.com/photo-1544359837-8e110eb31d11",
    alt: "Aerial view of the Denver skyline with mountains behind it",
    credit: "Steve Long",
    page: "https://unsplash.com/photos/8xri7728IhI",
    focus: "50% 40%",
  },
  redRocks: {
    src: "https://images.unsplash.com/photo-1747607469697-2d05d5d91a80",
    alt: "Aerial view of Red Rocks Amphitheatre and the foothills around it",
    credit: "Clayton Cardinalli",
    page: "https://unsplash.com/photos/DHe6ZoUMNpc",
  },
  breckenridge: {
    src: "https://images.unsplash.com/photo-1547066325-217eee12e52d",
    alt: "Aerial view of Breckenridge Ski Resort's Peak 7 and Peak 8 in winter",
    credit: "Kevin Bree",
    page: "https://unsplash.com/photos/Yb8iY_ErIH8",
  },
  rmnpNight: {
    src: "https://images.unsplash.com/photo-1465101162946-4377e57745c3",
    alt: "The Milky Way over Rocky Mountain National Park",
    credit: "Jeremy Thomas",
    page: "https://unsplash.com/photos/4dpAqfTbvKA",
  },
  continentalDivideRoad: {
    src: "https://images.unsplash.com/photo-1672616051101-4a65a125a1e8",
    alt: "An empty road at the Continental Divide in Colorado with autumn color",
    credit: "Jon Cartagena",
    page: "https://unsplash.com/photos/iyu7p-PLJfE",
    focus: "50% 70%",
  },
  holyCross: {
    src: "https://images.unsplash.com/photo-1697044399245-2ba932fca8ef",
    alt: "Autumn turning to winter over Mount of the Holy Cross near Vail",
    credit: "Joel Holland",
    page: "https://unsplash.com/photos/a0n_2JE5D00",
  },
  unionStation: {
    src: "https://images.unsplash.com/photo-1566036604088-319bcef67086",
    alt: "Denver Union Station",
    credit: "Pieter van de Sande",
    page: "https://unsplash.com/photos/DZ7ZgGDsDrc",
  },
  unionStationHall: {
    src: "https://images.unsplash.com/photo-1540966700979-c62f5e79729a",
    alt: "People inside the great hall at Denver Union Station",
    credit: "Braden Collum",
    page: "https://unsplash.com/photos/hBmDzffBQUI",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
