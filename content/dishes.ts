import { Bilingual } from "./types";

export type Dish = {
  id: string;
  image: string;
  village: string;
  name: Bilingual;
  desc: Bilingual;
  tag?: Bilingual;
};

export const dishes: Dish[] = [
  {
    id: "bun-hen-mai-xa",
    image: "/dishes/bun-hen-mai-xa.jpg",
    village: "Mai Xá",
    name: { vi: "Bún hến Mai Xá", en: "Mai Xá clam noodle soup" },
    desc: {
      vi: "Hồn của món ăn là con chắt chắt — loài hến nước ngọt nhỏ sống ở sông Cánh Hòm.",
      en: "The soul of the dish is the chắt chắt, a tiny freshwater clam from the Cánh Hòm river.",
    },
    tag: { vi: "Top 100 Đặc Sản Việt Nam", en: "Top 100 VN Cuisine" },
  },
  {
    id: "banh-bot-loc-my-chanh",
    image: "/dishes/banh-bot-loc-my-chanh.jpg",
    village: "Mỹ Chánh",
    name: { vi: "Bánh bột lọc Mỹ Chánh", en: "Mỹ Chánh tapioca dumplings" },
    desc: {
      vi: "Bánh bột lọc nhân tôm thịt, gói bằng lá chuối thay vì lá dong — nét riêng làm nên thương hiệu của làng.",
      en: "Cassava-starch dumplings filled with shrimp and pork, wrapped in banana leaf instead of dong leaf — the local hallmark.",
    },
  },
  {
    id: "chao-vat-giuong",
    image: "/dishes/chao-vat-giuong.jpg",
    village: "Quảng Trị",
    name: { vi: "Cháo vạt giường", en: "Vạt giường rice-noodle congee" },
    desc: {
      vi: "Cháo cá lóc nấu cùng những sợi bánh bột gạo dài, dẹt như thanh vạt giường.",
      en: "Snakehead fish congee with long, flat rice-flour noodle strips shaped like bed slats.",
    },
  },
  {
    id: "thit-trau-la-trong",
    image: "/dishes/thit-trau-la-trong.jpg",
    village: "Hướng Hóa",
    name: { vi: "Thịt trâu lá trơng", en: "Buffalo meat with lá trơng leaf" },
    desc: {
      vi: "Thịt trâu chế biến cùng lá trơng, đặc sản mang đậm bản sắc vùng cao.",
      en: "Buffalo meat cooked with the pungent lá trơng leaf, a specialty of the mountain region.",
    },
  },
  {
    id: "banh-khoai",
    image: "/dishes/banh-khoai.jpg",
    village: "Đông Hà",
    name: { vi: "Bánh khoái Quảng Trị", en: "Quảng Trị bánh khoái pancake" },
    desc: {
      vi: "Bánh khoái nhỏ, giòn rụm, nhưng hồn cốt nằm ở chén nước chấm béo đậm làm từ ruốc, gan và thịt heo băm.",
      en: "A small, crispy savory pancake whose soul lies in the rich dipping sauce made from shrimp paste, liver, and minced pork.",
    },
  },
  {
    id: "mit-thau",
    image: "/dishes/mit-thau.jpg",
    village: "Đông Hà",
    name: { vi: "Mít thấu", en: "Young jackfruit salad" },
    desc: {
      vi: "Gỏi mít non trộn cùng thịt heo, da heo và đậu phộng, chua giòn hài hòa.",
      en: "A salad of young jackfruit tossed with pork, pork skin, and peanuts for a tangy, crunchy balance.",
    },
  },
  {
    id: "nem-lui-cho-sai",
    image: "/dishes/nem-lui-cho-sai.jpg",
    village: "Chợ Sãi",
    name: { vi: "Nem lụi chợ Sãi", en: "Chợ Sãi grilled pork skewers" },
    desc: {
      vi: "Thịt heo nướng xiên que, chấm cùng nước chấm đậu phộng sánh đặc, cuốn rau sống và bánh tráng.",
      en: "Grilled pork skewers served with a thick peanut-pork dipping sauce, rolled with fresh herbs and rice paper.",
    },
  },
  {
    id: "goi-tep-nhay",
    image: "/dishes/goi-tep-nhay.jpg",
    village: "Bàu Tràm",
    name: { vi: "Gỏi tép nhảy", en: "Live river-shrimp salad" },
    desc: {
      vi: "Tép sông còn tươi nhảy, trộn cùng nước cốt chanh ngay trước khi ăn.",
      en: "Live river shrimp dressed with fresh lime juice right before serving.",
    },
  },
  {
    id: "canh-am-lang-lam",
    image: "/dishes/canh-am-lang-lam.jpg",
    village: "Hải Lăng",
    name: { vi: "Canh ám làng Lam", en: "Làng Lam fish soup" },
    desc: {
      vi: "Canh cá lóc nấu cùng rau sôông, vị thanh đặc trưng của vùng Hải Lăng.",
      en: "Snakehead fish soup simmered with rau sôông leaves, a clean, distinctive flavor of the Hải Lăng region.",
    },
  },
  {
    id: "banh-uot-phuong-lang",
    image: "/dishes/banh-uot-phuong-lang.jpg",
    village: "Phương Lang",
    name: { vi: "Bánh ướt Phương Lang", en: "Phương Lang steamed rice rolls" },
    desc: {
      vi: "Bánh ướt mềm mỏng ăn cùng thịt heo và chén nước mắm chấm đặc trưng riêng của làng.",
      en: "Soft, thin steamed rice rolls served with pork and a distinctive village-style dipping fish sauce.",
    },
  },
  {
    id: "bap-ham",
    image: "/dishes/bap-ham.jpg",
    village: "Quảng Trị",
    name: { vi: "Bắp hầm", en: "Stewed sticky corn" },
    desc: {
      vi: "Bắp nếp trắng hầm nhuyễn cùng đậu xanh, món quà vặt dân dã ấm bụng.",
      en: "White sticky corn stewed soft with mung beans, a humble, comforting snack.",
    },
  },
  {
    id: "banh-it-la-gai",
    image: "/dishes/banh-it-la-gai.jpg",
    village: "Quảng Trị",
    name: { vi: "Bánh ít lá gai", en: "Lá gai leaf cake" },
    desc: {
      vi: "Bánh làm từ lá gai, nhân đậu xanh, món bánh truyền thống không thể thiếu trong ngày lễ, Tết.",
      en: "A cake made from lá gai leaf with a mung-bean filling, a traditional treat for festivals and Tết.",
    },
  },
];
