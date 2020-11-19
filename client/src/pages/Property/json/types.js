export const types = {
  "coworking space": [
    "meeting room",
    "private office",
    "desk",
    "workstation",
    "conference room",
  ],
  COMMERCIAL: [
    "show room",
    "shop",
    "space in mall",
    "warehouse",
    "church",
    "event centre",
    "factory",
    "office space",
    "hotel",
    "guest house",
    "farmland",
  ],
  APARTMENT: [
    "self contain",
    "mini-flat",
    "boys quarters",
    "penthouse",
    "studio apartment",
  ],
  HOUSE: ["bungalow", "duplex", "blocks of flats", "maisonette"],
  LAND: [
    "residential",
    "mixed-use ",
    "serviced residential",
    "joint-venture",
    "industrial",
  ],
};

export function formatTypesToDropDown() {
  return Object.keys(types).map((type) => ({ label: type, value: type }));
}
export function getSubType(picked) {
  return types[picked]
    ? types[picked].map((list) => ({ label: list, value: list }))
    : [];
}
