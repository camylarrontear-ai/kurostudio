import { Product, CartItem, CatalogCardItem } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1VzNz7HDGPU7qS8Tg6gKMcTYikeAwaVZYjELEj4266Kl7EwDLzqOAj40QQAUElx0opvMS2UXfaXCdTOsYaSnG1y5HQaBNV5lIic3t3FEy4i4dD5jVfbL8pccwQXcxWhxNQpg_KAke9lge3E-bcPQ4uu_TvFZiBC_7l7M67b9h8n_iSAkHhhn7C5O6zVKtm_tuDl011rUegMvXERRHvu9Fd1z1hRMq2HT_0rIpdUV7yoin5inzKoaoF6l14";

export const PRODUCTS: Product[] = [
  {
    id: "01-heavyweight-boxy-hoodie",
    sku: "KR-450-SLT",
    name: "01 // Heavyweight Boxy Hoodie",
    subtitle: "Washed Slate Grey Mineral Wash",
    price: 95,
    weightGsm: 450,
    fabric: "100% Algodón Peinado Orgánico Loopback French Terry",
    fit: "Oversized Boxy Drop Shoulder",
    badge: "Stock Crítico: 4 Piezas",
    badgeType: "stock",
    rating: 4.9,
    reviewsCount: 1420,
    description: "Construcción de patrón caja relajado con hombros caídos marcados. Confeccionado en 450GSM loopback 100% algodón peinado con tintado en prenda y lavado mineral a la piedra para un tacto suave y cuerpo arquitectónico inalterable.",
    origin: "Braga, Portugal (Taller ético OEKO-TEX®)",
    composition: "100% Algodón Peinado Orgánico",
    treatment: "Lavado a la piedra pre-encogido",
    stockStatus: "low_stock",
    stockCount: 4,
    colors: [
      {
        name: "Washed Slate Grey",
        hex: "#52555a",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfzfeieArPVGirK8dRLg23BsWGAuMb7XSXI4OaMPMyr9BRbA6iP766nMcUK8vkqKdpqkqZ9wbHx5-qMbJ0F0_NYK6p8XVaKgeYF0hK2IsvRlBEHU57rSvCawiG4Uw8kTGHgQqZMz40-NJpXTbD1NC9ct3VnsE9-jTc3XcSRAIbvS3tpjhH7v-vPpknnfw1r1EjPJ3tY_WPK5cBALwYScdvwPDd2c2gpIwrVGnhkYVwuIJ8Uhd8O1ES"
      },
      {
        name: "Raw Sand",
        hex: "#dfdad2",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcNBHk6aq-JHh-2tT-XwAyLKp_V4JTqSRC1MFavOUl1uoeIDPHhUH5TI9tbEtexFqapJWiVbhZXBQEddyv3CxvA0tE7o73Np_oDlR5hi0MLB7621ht0ibDNp6rFg3Wjdb5kGx4Z-JbHG2hWZIWdgnRV4o9z2eoqjG7UWbhQyGlZTsFxZDTfOevR4cVL3R2WL0rDqIZN3FS0JhAARdSTGAzmoNJv-bqbMiwsWYwymPsgWQL5yHTtfsO"
      },
      {
        name: "Pitch Black",
        hex: "#1b1c1e",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrW6gudY_dpfdvWNZWZyK8ZuJzQEuI_RGQKjN4VxzQ9TzCwUfK_g7uFT8TnvfhIAjzcILpPJXufeLqhguUIWCIi-6gZeI9JUV23SUtUDFlIz8grGID8JKLiUsFZXfyOHqlwudDUFlNi8XxMsBQb5FHvW1EnablFS7ps57_-y8525Mqt6ub36c5IuRD-qArY5uZJsGISImIjmWoaCLvRt455vt4UHpTVdIALDV33G6bAyLc-D_3Uz98"
      },
      {
        name: "Earthy Sage",
        hex: "#414b43",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1lV6N2q58oo4r2djIzkk-INu1x18GPvQpotMoOQ-hYE2uhAxqqzzY4yGreGkdRfr-QIrWgs3aueifgFkBrFBk7tkt53WYzYIGkg4837qU7v474XS0qAwg5Gv4uGPpVT4QqiLmeJ7bcNCzbDmOELL7UwmvYABr3rCX-pHYycXh0pxETXZ7fRoncXCtHvbI0SblmFKSutqpvnek_3o8VKymbvi3kmkldxPrE3mbKRLMCb5G13x9EBBe"
      }
    ],
    images: [
      {
        label: "Look 01",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfzfeieArPVGirK8dRLg23BsWGAuMb7XSXI4OaMPMyr9BRbA6iP766nMcUK8vkqKdpqkqZ9wbHx5-qMbJ0F0_NYK6p8XVaKgeYF0hK2IsvRlBEHU57rSvCawiG4Uw8kTGHgQqZMz40-NJpXTbD1NC9ct3VnsE9-jTc3XcSRAIbvS3tpjhH7v-vPpknnfw1r1EjPJ3tY_WPK5cBALwYScdvwPDd2c2gpIwrVGnhkYVwuIJ8Uhd8O1ES",
        alt: "Modelo masculino 1.84m con hoodie oversized 450GSM en washed slate grey"
      },
      {
        label: "Espalda",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq28cXCqreAiS-rR9CU_7K2W5JR3iHGqaG1YmeyvPOWm76IJ5kog8KZO1k5DAIzYZTxP4L_BwRfn3rIAt7xxWGwag5NCF4GjQ47DZ8E2eSMXS16oNZbntUZpT-OIeivie5qAujvNp6P5OUCKtDWOILg1YXaFJaaJAxnS0_zHdCXNsbVBUliOsF076CIOnTIxA8bJGe64lc7LrF2i--pzPk-ACXRGtZlpshBgnC8wPlaZZ4ycMCb3eM",
        alt: "Vista posterior editorial con caída de hombro caído y canalé inferior grueso"
      },
      {
        label: "450 GSM",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_-__SRgRziPv0fpUhIPfgpSMqFMqwE4S03VFuvffpnjfGlLTzDLrBZo_-B0WS87Cd3Wd4QTfDuMEuxiB7PUGAUTbv5UTbOf1Z79hjDBUcGVs1hnIhiMUf__OhyAcVGVYnpkrxIcU648adrkQgemdq3gT4xf5ye8lbGh4sfdMfdm0uTdc_iNx6wTIyszjcipfYS2usRqQJosmjsYa5FHVya6KYx3WHZvGZJjd-hHpwjzzczasYY88l",
        alt: "Macro detalle del tejido loopback 450GSM peinado"
      },
      {
        label: "Fit 1.84M",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_sCu9L1uUxzOhCP5WdmG4G0gZvC39fKTFL8GV0iUCqPKm2JGyLzn0BESbGgrtDuZrOVYrzdvq0iBHNGD12AO6c3azvmYuDwzXSSIO6GKkpOOSWayJV-754i9NrSl-JeND1DkrV1w3dMJxpUCVU8wooQI2lqRZI8EFcypG-8PEXPJTwALRxylAp9OlJVMg5WRKiyCATA2_ZkFLD2sO_o3mwW-VjOsz3mr_k3KM0dAwts-Jfs7LVY6U",
        alt: "Retrato lifestyle en escaleras brutalistas mostrando silueta holgada"
      }
    ],
    availableSizes: [
      { size: "XS", chestWidth: "46cm", stock: "in" },
      { size: "S", chestWidth: "50cm", stock: "in" },
      { size: "M", chestWidth: "54cm", stock: "low", unitsLeft: 2 },
      { size: "L", chestWidth: "58cm", stock: "in" },
      { size: "XL", chestWidth: "62cm", stock: "in" },
      { size: "XXL", chestWidth: "66cm", stock: "out" }
    ]
  },
  {
    id: "02-raw-sand-minimalist-fleece",
    sku: "KR-450-RAW",
    name: "02 // Raw Sand Minimalist Fleece",
    subtitle: "Off-White Natural Unbleached",
    price: 90,
    weightGsm: 450,
    fabric: "100% Algodón Crudo sin Blanqueantes Químicos",
    fit: "Regular Architectural Fit",
    badge: "Edición Sostenible",
    badgeType: "eco",
    rating: 4.8,
    reviewsCount: 312,
    description: "Fibra orgánica virgen en su tonalidad cruda original con diminutas motas de cáscara vegetal visibles. Cuello estructurado sin cordones para una silueta purista y atemporal.",
    origin: "Braga, Portugal",
    composition: "100% Algodón Crudo Orgánico",
    treatment: "Sin químicos blanqueantes, lavado con vapor",
    stockStatus: "low_stock",
    stockCount: 4,
    colors: [
      {
        name: "Raw Sand",
        hex: "#EFECE6",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcNBHk6aq-JHh-2tT-XwAyLKp_V4JTqSRC1MFavOUl1uoeIDPHhUH5TI9tbEtexFqapJWiVbhZXBQEddyv3CxvA0tE7o73Np_oDlR5hi0MLB7621ht0ibDNp6rFg3Wjdb5kGx4Z-JbHG2hWZIWdgnRV4o9z2eoqjG7UWbhQyGlZTsFxZDTfOevR4cVL3R2WL0rDqIZN3FS0JhAARdSTGAzmoNJv-bqbMiwsWYwymPsgWQL5yHTtfsO"
      },
      {
        name: "Washed Slate",
        hex: "#525252",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFsqnIdqYTBaQa4H5tJ7XeTFGwsOzPEzQLaDvEJA5_VKR0Jjacea68xZQzH4UtZG0o4zUQ-BDhM18HqyuoEcuHeJaT87uWL2Oy4aQ_ut9SFBC4veJawOySqQ7CbcAZa4LsAU2FlT-PHI2_lvRdkevZDbtbkH49QTQgwbJWk3TCoNZt0PtwTmritr3S6QBGFTSdSgOPKZaowu_yAJTc719bjx4IgSo4F8okKhAkqvzhXPc4STgWaTFi"
      },
      {
        name: "Onyx Black",
        hex: "#1A1A1A",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrW6gudY_dpfdvWNZWZyK8ZuJzQEuI_RGQKjN4VxzQ9TzCwUfK_g7uFT8TnvfhIAjzcILpPJXufeLqhguUIWCIi-6gZeI9JUV23SUtUDFlIz8grGID8JKLiUsFZXfyOHqlwudDUFlNi8XxMsBQb5FHvW1EnablFS7ps57_-y8525Mqt6ub36c5IuRD-qArY5uZJsGISImIjmWoaCLvRt455vt4UHpTVdIALDV33G6bAyLc-D_3Uz98"
      }
    ],
    images: [
      {
        label: "Prenda Plegada",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcNBHk6aq-JHh-2tT-XwAyLKp_V4JTqSRC1MFavOUl1uoeIDPHhUH5TI9tbEtexFqapJWiVbhZXBQEddyv3CxvA0tE7o73Np_oDlR5hi0MLB7621ht0ibDNp6rFg3Wjdb5kGx4Z-JbHG2hWZIWdgnRV4o9z2eoqjG7UWbhQyGlZTsFxZDTfOevR4cVL3R2WL0rDqIZN3FS0JhAARdSTGAzmoNJv-bqbMiwsWYwymPsgWQL5yHTtfsO",
        alt: "Sudadera cruda doblada sobre bloque de travertino"
      },
      {
        label: "Detalle Algodón",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQBCvfwlTIDOLatTRvbydpRlfvNlW1mqAurrvrBCjzvCBhMFMI499eR9leAoo9bc0XypcPStGdjEFwYj5qB_OOAWOXa85R2L9fBWdjqDi0XP1q6dEQnVxIwl38qlUJiz1lP20uU7lpQ9lVJbkUEh-1OgmtRaAyKDRNdW8dDvTSIZ3UGgTBP_svsAuSMVih6mODKIxGQhDpLzNvfrp8ZmqjZ9c9yx41Jvg7mnAnFXe1FiT0IbbbI4P",
        alt: "Textura de algodón crudo orgánico"
      }
    ],
    availableSizes: [
      { size: "S", chestWidth: "50cm", stock: "in" },
      { size: "M", chestWidth: "54cm", stock: "in" },
      { size: "L", chestWidth: "58cm", stock: "in" },
      { size: "XL", chestWidth: "62cm", stock: "in" }
    ]
  },
  {
    id: "03-studio-zip-up-500gsm",
    sku: "KR-500-ZIP",
    name: "03 // Studio Zip-Up 500GSM",
    subtitle: "Charcoal Cast Heavy Armor",
    price: 110,
    weightGsm: 500,
    fabric: "500 GSM Heavy Armor Loopback",
    fit: "Architectural Boxy Outerwear",
    badge: "500 GSM Armor",
    badgeType: "heavy",
    rating: 5.0,
    reviewsCount: 38,
    description: "Nuestra prenda de mayor calibre térmico. Cremallera metálica bidireccional YKK con tirador arquitectónico en níquel cepillado y capucha de doble forro estructurada para retener postura erguida.",
    origin: "Porto, Portugal",
    composition: "100% Algodón Peinado Densidad Armor",
    treatment: "Tintado reactivo con fijación térmica",
    stockStatus: "in_stock",
    colors: [
      {
        name: "Charcoal Cast",
        hex: "#2c2e33",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrW6gudY_dpfdvWNZWZyK8ZuJzQEuI_RGQKjN4VxzQ9TzCwUfK_g7uFT8TnvfhIAjzcILpPJXufeLqhguUIWCIi-6gZeI9JUV23SUtUDFlIz8grGID8JKLiUsFZXfyOHqlwudDUFlNi8XxMsBQb5FHvW1EnablFS7ps57_-y8525Mqt6ub36c5IuRD-qArY5uZJsGISImIjmWoaCLvRt455vt4UHpTVdIALDV33G6bAyLc-D_3Uz98"
      }
    ],
    images: [
      {
        label: "Frontal",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrW6gudY_dpfdvWNZWZyK8ZuJzQEuI_RGQKjN4VxzQ9TzCwUfK_g7uFT8TnvfhIAjzcILpPJXufeLqhguUIWCIi-6gZeI9JUV23SUtUDFlIz8grGID8JKLiUsFZXfyOHqlwudDUFlNi8XxMsBQb5FHvW1EnablFS7ps57_-y8525Mqt6ub36c5IuRD-qArY5uZJsGISImIjmWoaCLvRt455vt4UHpTVdIALDV33G6bAyLc-D_3Uz98",
        alt: "Sudadera con cremallera 500GSM en gris grafito"
      }
    ],
    availableSizes: [
      { size: "S", chestWidth: "52cm", stock: "in" },
      { size: "M", chestWidth: "56cm", stock: "in" },
      { size: "L", chestWidth: "60cm", stock: "in" },
      { size: "XL", chestWidth: "64cm", stock: "in" }
    ]
  },
  {
    id: "04-atelier-custom-hoodie",
    sku: "KR-LAB-001",
    name: "04 // Atelier Custom Hoodie",
    subtitle: "Base a Elección // Tirada Limitada",
    price: 105,
    weightGsm: 450,
    fabric: "450 GSM Base Personalizable en Oporto",
    fit: "Custom Boxy Fit",
    badge: "Personalizable en 3D",
    badgeType: "custom",
    rating: 4.9,
    reviewsCount: 92,
    description: "Pieza individualizada confeccionada artesanalmente bajo demanda. Elige iniciales, bordado táctil de alta densidad o gráfica en relieve, color de hilo y ubicación exacta.",
    origin: "Atelier KURA, Oporto",
    composition: "100% Algodón Peinado Orgánico + Hilos Mercerizados",
    treatment: "Personalización artesanal + Control manual",
    stockStatus: "in_stock",
    colors: [
      {
        name: "Washed Slate",
        hex: "#52555a",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpyFesvt24MwAji3puF3uGBr5zQRqlk1_mZneRNnyb4AAdjDtVVPwqwUoFL2cPPLncb9yboJ-pH2EZIWrDmcx-2YWSV2u36xYbK3dpv_Yzjm1dYebGZoU6Or9umJ5bfBFxiQxzweYvXz4rhV-TTNMtDLTnsJY6BTlzr6TRklDQHF63Pwagb9el9tqRTPQ-gJmse8ehlClTVs3NUuJJZAoI7zfi8TOt1_Mq7xIWdooc3ma64NNuI_XB"
      },
      {
        name: "Raw Sand",
        hex: "#dfdad2",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQBCvfwlTIDOLatTRvbydpRlfvNlW1mqAurrvrBCjzvCBhMFMI499eR9leAoo9bc0XypcPStGdjEFwYj5qB_OOAWOXa85R2L9fBWdjqDi0XP1q6dEQnVxIwl38qlUJiz1lP20uU7lpQ9lVJbkUEh-1OgmtRaAyKDRNdW8dDvTSIZ3UGgTBP_svsAuSMVih6mODKIxGQhDpLzNvfrp8ZmqjZ9c9yx41Jvg7mnAnFXe1FiT0IbbbI4P"
      }
    ],
    images: [
      {
        label: "Atelier Lab",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpyFesvt24MwAji3puF3uGBr5zQRqlk1_mZneRNnyb4AAdjDtVVPwqwUoFL2cPPLncb9yboJ-pH2EZIWrDmcx-2YWSV2u36xYbK3dpv_Yzjm1dYebGZoU6Or9umJ5bfBFxiQxzweYvXz4rhV-TTNMtDLTnsJY6BTlzr6TRklDQHF63Pwagb9el9tqRTPQ-gJmse8ehlClTVs3NUuJJZAoI7zfi8TOt1_Mq7xIWdooc3ma64NNuI_XB",
        alt: "Bordado artesanal de precisión en taller de Oporto"
      }
    ],
    availableSizes: [
      { size: "S", chestWidth: "50cm", stock: "in" },
      { size: "M", chestWidth: "54cm", stock: "in" },
      { size: "L", chestWidth: "58cm", stock: "in" },
      { size: "XL", chestWidth: "62cm", stock: "in" }
    ]
  }
];

export const COMPLEMENTARY_ITEMS = [
  {
    id: "comp-jogger",
    name: "Heavyweight Slate Jogger 450GSM",
    category: "PARTE INFERIOR",
    badge: "TALLA L MATCH",
    description: "Patrón cónico con tiro estructurado y canalé de 500GSM en tobillos.",
    price: 85,
    weightGsm: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ38gFhvAYZT1gqhQcJbdpNzLCOxqY4jkGyRnhB4FE12LcApTOsTwkPNrHjyeMdmXRbgRG9cuhCKpK6e4GkRBas8xY3ZBnwIpsRcoaVGwOmbHGzGG_OwsX0E8ABK7ybVpvmMQulnHsrcEagRfpFTN0XvM9GmhHx3O51Eq-mNyEJBmNL6VsvAK9RFXzJGM_OLg8vNWSG-gq6g6BWWVdisbtJz-IlnqyWm0aYMbYkATZEWYI2EY9xIRY"
  },
  {
    id: "comp-tee",
    name: "300GSM Heavyweight Tee (Sand)",
    category: "CAMISETA ESTRUCTURADA",
    badge: "BASE LAYER",
    description: "Cuello reforzado de 3cm que no pierde forma tras 100 lavados a mano.",
    price: 45,
    weightGsm: 300,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBC_N2mcjkImIMjew7-dwN7hG9Mc37uxv0Lz5bb5FYuEAUPGw24-C87f2eAE7xpOKXphqFTC4Lvxbes03wbR3Xze31iuhw9rDRAHMH2NTDptW6PngG503dvQlueTeDebO62KpkqTap0BKqCn-pxnUGMXBHt7JIZksuXTcBwIziUO0mOLgDxxwzZyx_KMmzXM3wt90Hw3cjtvK-pb_RxnK8ysIhZlOo__VWEv6HqXTblHU0bmjSE-aC"
  },
  {
    id: "comp-cap",
    name: "Merino Ribbed Watch Cap",
    category: "ACCESORIO TEXTIL",
    badge: "EDICIÓN LAB",
    description: "100% Lana Merino de calibre pesado con micro-etiqueta tonal termosellada.",
    price: 35,
    weightGsm: 280,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-bJJMQvnNbwbb9JMio7i8ioe23C6_FlxSEpe3wvSk_Oosw_RpaAszigUpb9Ehz4vtwKwnOgwuAFNmPzL5cG5tHDsIkeHgDlCUpJXtieWbdGB_YyQOh5yGCotH5yx0ujJs8npHwxWq14wEPefqHEGsuqRHp6qqtrugbP3Q4W62QHrxewx1w-I5sZQPU2FEkUuP71gA5pO8vZzrzF3oKPge_kwECZ9Y0cfBdbdgG9-KKyiBpkKlFVd"
  }
];

export const INITIAL_CART: CartItem[] = [
  {
    id: "cart-item-1",
    productId: "01-heavyweight-boxy-hoodie",
    sku: "KR-450-SLT",
    name: "01 // Heavyweight Boxy Hoodie",
    subtitle: "DROP 04 / ARCHITECTURAL FIT",
    price: 110,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfzfeieArPVGirK8dRLg23BsWGAuMb7XSXI4OaMPMyr9BRbA6iP766nMcUK8vkqKdpqkqZ9wbHx5-qMbJ0F0_NYK6p8XVaKgeYF0hK2IsvRlBEHU57rSvCawiG4Uw8kTGHgQqZMz40-NJpXTbD1NC9ct3VnsE9-jTc3XcSRAIbvS3tpjhH7v-vPpknnfw1r1EjPJ3tY_WPK5cBALwYScdvwPDd2c2gpIwrVGnhkYVwuIJ8Uhd8O1ES",
    weightGsm: 450,
    size: "L (Boxy Oversize)",
    colorName: "Washed Slate",
    colorHex: "#4A4D52",
    customization: {
      enabled: true,
      monogram: "KR",
      threadColor: "tonal",
      placement: "chest",
      extraPrice: 15
    },
    quantity: 1,
    stockNote: "Algodón peinado orgánico de 450 g/m² listo para despacho"
  },
  {
    id: "cart-item-2",
    productId: "02-raw-sand-minimalist-fleece",
    sku: "KR-450-RAW",
    name: "02 // Raw Sand Minimalist Fleece",
    subtitle: "DROP 04 / ESSENTIAL FLEECE",
    price: 90,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcNBHk6aq-JHh-2tT-XwAyLKp_V4JTqSRC1MFavOUl1uoeIDPHhUH5TI9tbEtexFqapJWiVbhZXBQEddyv3CxvA0tE7o73Np_oDlR5hi0MLB7621ht0ibDNp6rFg3Wjdb5kGx4Z-JbHG2hWZIWdgnRV4o9z2eoqjG7UWbhQyGlZTsFxZDTfOevR4cVL3R2WL0rDqIZN3FS0JhAARdSTGAzmoNJv-bqbMiwsWYwymPsgWQL5yHTtfsO",
    weightGsm: 450,
    size: "M (Regular Arch)",
    colorName: "Raw Sand",
    colorHex: "#E5DFD4",
    quantity: 1,
    stockNote: "Solo 4 piezas restantes en este lote de teñido natural"
  }
];

export const HOODIE_01_SERIES_VIEWS: CatalogCardItem[] = [
  {
    id: "h01-frontal",
    productId: "01-heavyweight-boxy-hoodie",
    imageIndex: 0,
    sku: "KR-450-SLT",
    name: "01 // Heavyweight Boxy Hoodie",
    viewName: "Look 01 — Frontal Studio",
    subtitle: "Washed Slate Grey Mineral Wash",
    price: 95,
    weightGsm: 450,
    // Hombre relajado en loft industrial luminoso
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfzfeieArPVGirK8dRLg23BsWGAuMb7XSXI4OaMPMyr9BRbA6iP766nMcUK8vkqKdpqkqZ9wbHx5-qMbJ0F0_NYK6p8XVaKgeYF0hK2IsvRlBEHU57rSvCawiG4Uw8kTGHgQqZMz40-NJpXTbD1NC9ct3VnsE9-jTc3XcSRAIbvS3tpjhH7v-vPpknnfw1r1EjPJ3tY_WPK5cBALwYScdvwPDd2c2gpIwrVGnhkYVwuIJ8Uhd8O1ES",
    badge: "Stock Crítico: 4 Piezas",
    badgeType: "stock",
    rating: 4.9,
    reviewsCount: 1420,
    fit: "Oversized Boxy Drop Shoulder"
  },
  {
    id: "h01-espalda",
    productId: "01-heavyweight-boxy-hoodie",
    imageIndex: 1,
    sku: "KR-450-SLT-R",
    name: "01 // Heavyweight Boxy Hoodie",
    viewName: "Look 02 — Vista Dorsal / Espalda",
    subtitle: "Caída Drop Shoulder & Ribbed Hem",
    price: 95,
    weightGsm: 450,
    // Hombre de espaldas en estudio industrial
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq28cXCqreAiS-rR9CU_7K2W5JR3iHGqaG1YmeyvPOWm76IJ5kog8KZO1k5DAIzYZTxP4L_BwRfn3rIAt7xxWGwag5NCF4GjQ47DZ8E2eSMXS16oNZbntUZpT-OIeivie5qAujvNp6P5OUCKtDWOILg1YXaFJaaJAxnS0_zHdCXNsbVBUliOsF076CIOnTIxA8bJGe64lc7LrF2i--pzPk-ACXRGtZlpshBgnC8wPlaZZ4ycMCb3eM",
    badge: "Patrón Dorsal Caído",
    badgeType: "heavy",
    rating: 4.9,
    reviewsCount: 1420,
    fit: "Oversized Boxy Drop Shoulder"
  },
  {
    id: "h01-macro",
    productId: "01-heavyweight-boxy-hoodie",
    imageIndex: 2,
    sku: "KR-450-SLT-TXT",
    name: "01 // Heavyweight Boxy Hoodie",
    viewName: "Look 03 — Macro Tejido 450GSM",
    subtitle: "French Terry Loopback Peinado",
    price: 95,
    weightGsm: 450,
    // Detalle textil de costura gris
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_-__SRgRziPv0fpUhIPfgpSMqFMqwE4S03VFuvffpnjfGlLTzDLrBZo_-B0WS87Cd3Wd4QTfDuMEuxiB7PUGAUTbv5UTbOf1Z79hjDBUcGVs1hnIhiMUf__OhyAcVGVYnpkrxIcU648adrkQgemdq3gT4xf5ye8lbGh4sfdMfdm0uTdc_iNx6wTIyszjcipfYS2usRqQJosmjsYa5FHVya6KYx3WHZvGZJjd-hHpwjzzczasYY88l",
    badge: "100% Algodón Peinado",
    badgeType: "eco",
    rating: 5.0,
    reviewsCount: 1420,
    fit: "Loopback Inalterable"
  },
  {
    id: "h01-lifestyle",
    productId: "01-heavyweight-boxy-hoodie",
    imageIndex: 3,
    sku: "KR-450-SLT-FIT",
    name: "01 // Heavyweight Boxy Hoodie",
    viewName: "Look 04 — Fit Lifestyle 1.84M",
    subtitle: "Silueta en Galería de Hormigón",
    price: 95,
    weightGsm: 450,
    // Joven en galería de hormigón minimalista
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_sCu9L1uUxzOhCP5WdmG4G0gZvC39fKTFL8GV0iUCqPKm2JGyLzn0BESbGgrtDuZrOVYrzdvq0iBHNGD12AO6c3azvmYuDwzXSSIO6GKkpOOSWayJV-754i9NrSl-JeND1DkrV1w3dMJxpUCVU8wooQI2lqRZI8EFcypG-8PEXPJTwALRxylAp9OlJVMg5WRKiyCATA2_ZkFLD2sO_o3mwW-VjOsz3mr_k3KM0dAwts-Jfs7LVY6U",
    badge: "Proporción ExactFit",
    badgeType: "limited",
    rating: 4.9,
    reviewsCount: 1420,
    fit: "Talla L en Modelo 1.84m"
  }
];

