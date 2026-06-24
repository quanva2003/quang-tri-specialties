import { Bilingual } from "./types";

export type Gift = {
  id: string;
  image: string;
  name: Bilingual;
  desc: Bilingual;
};

export const gifts: Gift[] = [
  {
    id: "ca-phe-khe-sanh",
    image: "/gifts/ca-phe-khe-sanh.jpg",
    name: { vi: "Cà phê Khe Sanh", en: "Khe Sanh coffee" },
    desc: {
      vi: "Trồng ở độ cao 1.000–1.500m trên đất bazan đỏ, hương vị đậm đà đặc trưng vùng cao.",
      en: "Grown at 1,000–1,500m on red basalt soil, with a bold flavor distinctive to the highlands.",
    },
  },
  {
    id: "cao-che-vang-cam-lo",
    image: "/gifts/cao-che-vang-cam-lo.jpg",
    name: { vi: "Cao chè vằng Cam Lộ", en: "Cam Lộ chè vằng extract" },
    desc: {
      vi: "Cao thảo dược cô đặc từ lá chè vằng, bài thuốc dân gian quen thuộc của người Quảng Trị.",
      en: "A concentrated herbal extract from chè vằng leaves, a familiar folk remedy from Quảng Trị.",
    },
  },
  {
    id: "ruou-kim-long",
    image: "/gifts/ruou-kim-long.jpg",
    name: { vi: "Rượu Kim Long", en: "Kim Long rice wine" },
    desc: {
      vi: "Rượu gạo nấu theo bí quyết truyền thống của làng Kim Long, nồng mà êm.",
      en: "A rice wine distilled by the traditional craft of Kim Long village, strong yet smooth.",
    },
  },
  {
    id: "ho-tieu-vinh-linh",
    image: "/gifts/ho-tieu-vinh-linh.jpg",
    name: { vi: "Hồ tiêu Vĩnh Linh", en: "Vĩnh Linh pepper" },
    desc: {
      vi: "Tiêu Vĩnh Linh nổi tiếng với hạt tiêu đỏ thơm cay, được giới sành tiêu ưa chuộng.",
      en: "Vĩnh Linh pepper is prized for its fragrant, fiery red peppercorns favored by pepper connoisseurs.",
    },
  },
  {
    id: "ot-dam-cau-nhi",
    image: "/gifts/ot-dam-cau-nhi.jpg",
    name: { vi: "Ớt dầm Câu Nhi", en: "Câu Nhi pickled chili" },
    desc: {
      vi: "Ớt dầm theo công thức riêng của làng Câu Nhi, cay nồng và đậm đà.",
      en: "Pickled chili made to Câu Nhi village's own recipe, fiery and full-flavored.",
    },
  },
];
