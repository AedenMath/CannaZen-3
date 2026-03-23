import { useState, useMemo } from "react";

/* ═══════════════════════════════════════════════
   PRODUCTS DATABASE
   ═══════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1, slug: "gorilla-cookies-magic-sauce", name: "GORILLA COOKIES",
    subtitle: "50% MAGIC SAUCE", type: "flower", molecule: "magic-sauce",
    intensity: "INTENSE", badge: "🔥 BEST-SELLER", promo: true, promoText: "-30%",
    rating: 4.8, reviews: 142,
    image: "https://sixty8.fr/1394-medium_default/gorilla-cookies-30-fleur-magic-sauce.jpg",
    description: "La Gorilla Cookies en version Magic Sauce : compacte, poudreuse, parsemée de pistils. Notes de cyprès, miel et pin avec des pointes sucrées en bouche.",
    smokellier: "La Gorilla Cookies Magic Sauce, c'est la douceur du miel de forêt qui rencontre la puissance brute du chanvre. Un classique réinventé.",
    effects: ["Relaxation profonde", "Stimulation créative", "Anti-stress puissant", "Euphorie douce"],
    aromas: ["Cyprès", "Miel", "Pin sylvestre", "Pointes sucrées"],
    prices: { "1g": 9.90, "3g": 26.73, "5g": 41.58, "10g": 74.25 },
    warning: "Déconseillé aux débutants"
  },
  {
    id: 2, slug: "tinky-winky-magic-sauce", name: "TINKY WINKY",
    subtitle: "50% MAGIC SAUCE", type: "flower", molecule: "magic-sauce",
    intensity: "INTENSE", badge: "⚡ CRÉATIF", promo: true, promoText: "-70%",
    rating: 4.7, reviews: 98,
    image: "https://sixty8.fr/1390-medium_default/tinky-winky-30-fleur-magic-sauce.jpg",
    description: "La Tinky Winky ne plaisante pas : sommité florale qui stimule la créativité et la pensée en arborescence.",
    smokellier: "La Tinky Winky, c'est un aller simple vers l'imaginaire. Le cerveau en fête, le corps en paix.",
    effects: ["Stimulation créative", "Pensée en arborescence", "Envie de discuter", "Euphorie"],
    aromas: ["Herbe puissante", "Diesel", "Skunk authentique", "Notes corsées"],
    prices: { "1g": 11.90, "3g": 32.13, "5g": 50.15, "10g": 89.25 },
    warning: "Déconseillé aux débutants"
  },
  {
    id: 3, slug: "donny-burger-magic-sauce", name: "DONNY BURGER",
    subtitle: "50% MAGIC SAUCE", type: "flower", molecule: "magic-sauce",
    intensity: "INTENSE", badge: "🏷️ NOUVEAU", promo: false,
    rating: 4.9, reviews: 67,
    image: "https://sixty8.fr/1387-medium_default/donny-burger-50-magic-sauce.jpg",
    description: "Issue du croisement GMO × Han Solo Burger, la Donny Burger est une indica qui sort du lot. Arômes funky d'ail rôti et diesel brut.",
    smokellier: "La Donny Burger, c'est l'inattendu fait fleur. Elle vous emmène dans un chill extrême.",
    effects: ["Détente profonde", "Apaisement corporel", "Lâcher-prise total", "Chill extrême"],
    aromas: ["Ail rôti", "Fromage affiné", "Diesel brut", "Épices"],
    prices: { "1g": 10.90, "3g": 29.43, "5g": 45.79, "10g": 81.75 },
    warning: "Déconseillé aux débutants"
  },
  {
    id: 4, slug: "911-og-magic-sauce", name: "911 OG",
    subtitle: "50% MAGIC SAUCE", type: "flower", molecule: "magic-sauce",
    intensity: "EXTREME", badge: "🚨 EXTRÊME", promo: true, promoText: "-40%",
    rating: 4.6, reviews: 203,
    image: "https://sixty8.fr/1384-medium_default/911-og-30-fleur-magic-sauce.jpg",
    description: "911 OG, c'est l'urgence sensorielle. Intensité quasi-bourdonnante : envie de rire, parler, danser, méditer.",
    smokellier: "La 911 OG n'attend pas les présentations. Épicée, poivrée, avec un profil musc envoûtant. Code rouge sensoriel.",
    effects: ["Vigueur immédiate", "Motivation", "Créativité explosive", "Euphorie intense"],
    aromas: ["Poivre de Kampot", "Musc", "Épices chaudes", "Herbe verte"],
    prices: { "1g": 9.90, "3g": 26.73, "5g": 41.58, "10g": 74.25 },
    warning: "EXTRÊME — Strictement déconseillé aux débutants"
  },
  {
    id: 5, slug: "khalifa-kush-magic-sauce", name: "KHALIFA KUSH",
    subtitle: "50% MAGIC SAUCE", type: "flower", molecule: "magic-sauce",
    intensity: "EXTREME", badge: "👑 LÉGENDE", promo: false,
    rating: 4.9, reviews: 156,
    image: "https://sixty8.fr/1381-medium_default/khalifa-kush-30-fleur-magic-sauce.jpg",
    description: "Inspirée par Wiz Khalifa, cette variété légendaire enrichie en Magic Sauce. Audacieuse et puissante.",
    smokellier: "Khalifa Kush Magic Sauce : quand la Californie rencontre l'innovation européenne.",
    effects: ["Relaxation californienne", "Stimulation mentale", "Détente musculaire", "Euphorie"],
    aromas: ["Kush californien", "Pin", "Terre chaude", "Agrumes subtils"],
    prices: { "1g": 10.90, "3g": 29.43, "5g": 45.79, "10g": 81.75 },
    warning: "Déconseillé aux débutants"
  },
  {
    id: 6, slug: "crazy-dog-magic-sauce", name: "CRAZY DOG",
    subtitle: "50% MAGIC SAUCE", type: "flower", molecule: "magic-sauce",
    intensity: "EXTREME", badge: "⚠️ EXTRÊME", promo: false,
    rating: 4.5, reviews: 89,
    image: "https://sixty8.fr/1378-medium_default/crazy-dog-30-fleur-magic-sauce.jpg",
    description: "Le Crazy Dog : fleur unique enrichie en THCP concentré. Effets immédiats et ultra convaincants.",
    smokellier: "Le Crazy Dog, c'est le chien fou du catalogue. Il aboie fort et mord encore plus fort.",
    effects: ["Puissance maximale", "Effets immédiats", "Relaxation totale", "Somnolence"],
    aromas: ["Herbe dense", "Résine", "Notes terreuses", "Épices lourdes"],
    prices: { "1g": 11.90, "3g": 32.13, "5g": 50.15, "10g": 89.25 },
    warning: "THCP concentré — Strictement déconseillé aux débutants"
  },
  {
    id: 7, slug: "caviar-haze-magic-sauce", name: "CAVIAR HAZE",
    subtitle: "MAGIC SAUCE 10%", type: "flower", molecule: "magic-sauce",
    intensity: "STRONG", badge: "💎 PREMIUM", promo: false,
    rating: 4.8, reviews: 178,
    image: "https://sixty8.fr/746-medium_default/caviar-haze-magic-sauce-10.jpg",
    description: "La Caviar Haze, fleur d'exception. Épicée, subtile et puissante avec un arrière-goût floral durable.",
    smokellier: "La Caviar Haze laisse un goût de luxe sur la langue. Un caviar, littéralement.",
    effects: ["Détente rapide", "Stimulation fine", "Bien-être durable", "Relaxation élégante"],
    aromas: ["Épices subtiles", "Amertume noble", "Floral persistant", "Herbe fine"],
    prices: { "1g": 8.90, "3g": 24.03, "5g": 37.38, "10g": 66.75 },
    warning: null
  },
  {
    id: 8, slug: "la-confidential-magic-sauce", name: "L.A CONFIDENTIAL",
    subtitle: "MAGIC SAUCE 10%", type: "flower", molecule: "magic-sauce",
    intensity: "STRONG", badge: "🌙 NUIT", promo: false,
    rating: 4.7, reviews: 134,
    image: "https://sixty8.fr/748-medium_default/la-confidential-magic-sauce.jpg",
    description: "Inspirée des nuits de Los Angeles. Relaxation profonde, sérénité totale, endormissement favorisé.",
    smokellier: "L.A Confidential, c'est le sunset sur Venice Beach en version fleur.",
    effects: ["Relaxation profonde", "Sérénité", "Sommeil favorisé", "Calme mental"],
    aromas: ["Pin doux", "Terre humide", "Lavande subtile", "Bois de santal"],
    prices: { "1g": 8.90, "3g": 24.03, "5g": 37.38, "10g": 66.75 },
    warning: null
  },
  {
    id: 9, slug: "small-buds-magic-sauce", name: "SMALL BUDS",
    subtitle: "30% MAGIC SAUCE", type: "flower", molecule: "magic-sauce",
    intensity: "STRONG", badge: "🏷️ BON PLAN", promo: true, promoText: "-50%",
    rating: 4.4, reviews: 267,
    image: "https://sixty8.fr/1344-medium_default/small-buds-30-fleur-magic-sauce.jpg",
    description: "Les Small Buds Magic Sauce : même puissance, petit format. Le rapport qualité-prix imbattable.",
    smokellier: "Les Small Buds, c'est la preuve que la taille ne fait pas tout.",
    effects: ["Relaxation intense", "Stimulation mentale", "Bien-être général", "Anti-stress"],
    aromas: ["Mix variétal", "Herbe", "Notes terreuses", "Touches épicées"],
    prices: { "1g": 4.90, "3g": 13.23, "5g": 20.58, "10g": 36.75 },
    warning: null
  },
  {
    id: 10, slug: "charas-hash-magic-sauce", name: "CHARAS HASH",
    subtitle: "MAGIC SAUCE 10%", type: "resin", molecule: "magic-sauce",
    intensity: "INTENSE", badge: "🕉️ ANCESTRAL", promo: false,
    rating: 4.8, reviews: 91,
    image: "https://sixty8.fr/752-medium_default/charas-hash-magic-sauce-10.jpg",
    description: "Le Charas, résine mythique de l'Himalaya réinventée en Magic Sauce. Texture lisse et malléable.",
    smokellier: "Le Charas Magic Sauce, c'est 3000 ans de tradition himalayenne qui rencontre la technologie du futur.",
    effects: ["Apaisement corporel total", "Détente musculaire", "Sérénité profonde", "Sommeil"],
    aromas: ["Terre d'Himalaya", "Épices chaudes", "Fruits subtils", "Résine pure"],
    prices: { "1g": 7.90, "3g": 21.33, "5g": 33.18, "10g": 59.25 },
    warning: "Déconseillé aux débutants"
  },
  {
    id: 11, slug: "marrakech-dream-magic-sauce", name: "MARRAKECH DREAM",
    subtitle: "MAGIC SAUCE 10%", type: "resin", molecule: "magic-sauce",
    intensity: "INTENSE", badge: "🌍 EXOTIQUE", promo: false,
    rating: 4.6, reviews: 73,
    image: "https://sixty8.fr/754-medium_default/marrakech-dream-magic-sauce.jpg",
    description: "Hash marocain enrichi en Magic Sauce. Texture fondante, arômes de cuir et d'épices orientales.",
    smokellier: "Le Marrakech Dream, c'est un tapis volant version hash.",
    effects: ["Voyage sensoriel", "Relaxation orientale", "Détente progressive", "Euphorie douce"],
    aromas: ["Cuir marocain", "Épices orientales", "Menthe", "Terre sèche"],
    prices: { "1g": 7.90, "3g": 21.33, "5g": 33.18, "10g": 59.25 },
    warning: null
  },
  {
    id: 12, slug: "puff-crazy-dog-magic-sauce", name: "PUFF CRAZY DOG",
    subtitle: "2ML • 1000 PUFFS", type: "vape", molecule: "magic-sauce",
    intensity: "EXTREME", badge: "💨 VAPE", promo: true, promoText: "-25%",
    rating: 4.5, reviews: 189,
    image: "https://sixty8.fr/1393-medium_default/copie-de-disposable-magic-sauce-2ml-1000-puffs-crazy-dog.jpg",
    description: "Puff jetable 2ML, 1000 bouffées de Magic Sauce Crazy Dog. Format nomade, effets puissants.",
    smokellier: "Le Crazy Dog en puff, c'est la tempête dans un format de poche.",
    effects: ["Effets rapides", "Puissance maximale", "Relaxation intense", "Euphorie"],
    aromas: ["Terpènes naturels", "Notes fruitées", "Herbe fraîche", "Résine"],
    prices: { "x1": 34.90, "x3": 89.90, "x5": 139.90, "x10": 249.90 },
    warning: "EXTRÊME — Déconseillé aux débutants"
  },
  {
    id: 13, slug: "runtz-cbd", name: "RUNTZ CBD",
    subtitle: "CBD Premium", type: "flower", molecule: "cbd",
    intensity: "MODERATE", badge: "🍬 GOURMAND", promo: true, promoText: "-20%",
    rating: 4.6, reviews: 312,
    image: "https://sixty8.fr/628-medium_default/runtz-cbd.jpg",
    description: "La Runtz en version CBD : tout le profil bonbon sans l'effet dévastateur. Notes de bonbon aux fruits.",
    smokellier: "La Runtz CBD, c'est la confiserie en version chanvre. Un rayon de soleil apaisant.",
    effects: ["Relaxation douce", "Bonne humeur", "Anti-stress", "Découverte"],
    aromas: ["Bonbon aux fruits", "Sucre candi", "Agrumes", "Floral"],
    prices: { "1g": 6.90, "3g": 18.63, "5g": 28.98, "10g": 51.75 },
    warning: null
  },
  {
    id: 14, slug: "mandarine-sherbet", name: "MANDARINE SHERBET",
    subtitle: "CBD Premium", type: "flower", molecule: "cbd",
    intensity: "MODERATE", badge: "🍊 FRUITÉ", promo: false,
    rating: 4.5, reviews: 187,
    image: "https://sixty8.fr/630-medium_default/mandarine-sherbet.jpg",
    description: "Explosion d'agrumes frais. Un sorbet au soleil, parfait pour les journées légères.",
    smokellier: "La Mandarine Sherbet, c'est le sud de la France en une bouffée.",
    effects: ["Bonne humeur", "Énergie douce", "Relaxation légère", "Créativité"],
    aromas: ["Mandarine", "Zeste d'agrumes", "Sorbet", "Fleurs blanches"],
    prices: { "1g": 9.90, "3g": 26.73, "5g": 41.58, "10g": 74.25 },
    warning: null
  },
  {
    id: 15, slug: "platinium-og", name: "PLATINIUM OG",
    subtitle: "CBD Premium", type: "flower", molecule: "cbd",
    intensity: "MODERATE", badge: "💎 CLASSIQUE", promo: false,
    rating: 4.7, reviews: 201,
    image: "https://sixty8.fr/634-medium_default/platinium-og.jpg",
    description: "Le Platinium OG est un monument du CBD. Pin argenté, terre minérale et citron subtil.",
    smokellier: "Le Platinium OG, c'est le costume trois pièces du CBD.",
    effects: ["Relaxation classique", "Apaisement", "Sérénité", "Anti-douleur"],
    aromas: ["Pin argenté", "Terre minérale", "Citron subtil", "Bois"],
    prices: { "1g": 9.90, "3g": 26.73, "5g": 41.58, "10g": 74.25 },
    warning: null
  },
  {
    id: 16, slug: "gelato-hec10", name: "GELATO",
    subtitle: "HEC-10 30%", type: "flower", molecule: "hec-10",
    intensity: "STRONG", badge: "🍦 ONCTUEUX", promo: true, promoText: "-35%",
    rating: 4.8, reviews: 167,
    image: "https://sixty8.fr/850-medium_default/gelato-hec-10.jpg",
    description: "La Gelato HEC-10 est un dessert glacé en version chanvre. Crémeuse, sucrée, surprenante.",
    smokellier: "La Gelato HEC-10, c'est le glacier artisanal du cannabis légal.",
    effects: ["Relaxation onctueuse", "Euphorie légère", "Bien-être corporel", "Gourmandise"],
    aromas: ["Crème glacée", "Vanille", "Baies", "Pâtisserie"],
    prices: { "1g": 8.90, "3g": 24.03, "5g": 37.38, "10g": 66.75 },
    warning: null
  },
  {
    id: 17, slug: "wedding-cake-10oh", name: "WEDDING CAKE",
    subtitle: "10-OH+ Premium", type: "flower", molecule: "10-oh",
    intensity: "STRONG", badge: "🎂 GOURMET", promo: false,
    rating: 4.9, reviews: 98,
    image: "https://sixty8.fr/860-medium_default/wedding-cake-10-oh.jpg",
    description: "Le Wedding Cake 10-OH+ est une pièce montée cannabique. Vanille, crème et caramel.",
    smokellier: "Le Wedding Cake, c'est le jour de votre mariage en version fleur.",
    effects: ["Relaxation gourmande", "Euphorie douce", "Sommeil", "Apaisement total"],
    aromas: ["Vanille", "Crème pâtissière", "Caramel", "Terre douce"],
    prices: { "1g": 9.90, "3g": 26.73, "5g": 41.58, "10g": 74.25 },
    warning: null
  },
  {
    id: 18, slug: "afghan-black-cbd", name: "AFGHAN BLACK",
    subtitle: "CBD Hash Premium", type: "resin", molecule: "cbd",
    intensity: "MODERATE", badge: "🏔️ TRADITION", promo: false,
    rating: 4.7, reviews: 234,
    image: "https://sixty8.fr/680-medium_default/afghan-black-cbd.jpg",
    description: "L'Afghan Black CBD : hash pressé à la main, texture souple, arômes profonds de terre et d'épices.",
    smokellier: "L'Afghan Black, c'est la route de la soie en version CBD.",
    effects: ["Relaxation profonde", "Tradition", "Sommeil", "Méditation"],
    aromas: ["Terre afghane", "Épices millénaires", "Bois de cèdre", "Encens"],
    prices: { "1g": 5.90, "3g": 15.93, "5g": 24.78, "10g": 44.25 },
    warning: null
  },
  {
    id: 19, slug: "ketama-gold-cbd", name: "KETAMA GOLD",
    subtitle: "CBD Hash Premium", type: "resin", molecule: "cbd",
    intensity: "MODERATE", badge: "✨ GOLD", promo: true, promoText: "-15%",
    rating: 4.5, reviews: 189,
    image: "https://sixty8.fr/682-medium_default/ketama-gold-cbd.jpg",
    description: "Le Ketama Gold CBD est l'or du Rif marocain. Texture fondante, couleur dorée.",
    smokellier: "Le Ketama Gold, c'est le trésor du Maroc. Doré, fondant, précieux.",
    effects: ["Relaxation dorée", "Sérénité", "Anti-douleur", "Voyage"],
    aromas: ["Miel sauvage", "Herbes sèches", "Terre du Rif", "Épices douces"],
    prices: { "1g": 5.90, "3g": 15.93, "5g": 24.78, "10g": 44.25 },
    warning: null
  },
  {
    id: 20, slug: "puff-blueberry-cbd", name: "PUFF BLUEBERRY",
    subtitle: "CBD 1000 Puffs", type: "vape", molecule: "cbd",
    intensity: "MODERATE", badge: "🫐 FRUITÉ", promo: false,
    rating: 4.3, reviews: 213,
    image: "https://sixty8.fr/700-medium_default/puff-blueberry-cbd.jpg",
    description: "Puff CBD Blueberry : 1000 bouffées de myrtille sucrée. Discret, savoureux, relaxant.",
    smokellier: "La Puff Blueberry, c'est le smoothie de l'après-midi.",
    effects: ["Relaxation douce", "Bonne humeur", "Discrétion", "Plaisir"],
    aromas: ["Myrtille", "Fruits rouges", "Sucre", "Fraîcheur"],
    prices: { "x1": 19.90, "x3": 49.90, "x5": 74.90, "x10": 129.90 },
    warning: null
  },
  {
    id: 21, slug: "gummies-delta9", name: "GUMMIES DELTA-9",
    subtitle: "Mix Fruité • 10pcs", type: "comestible", molecule: "delta-9",
    intensity: "STRONG", badge: "🍬 CANDY", promo: false,
    rating: 4.8, reviews: 345,
    image: "https://sixty8.fr/900-medium_default/gummies-delta-9.jpg",
    description: "Gummies Delta-9 THC : 10 bonbons fruités avec montée progressive et effets durables.",
    smokellier: "Les Gummies Delta-9, c'est Halloween pour adultes.",
    effects: ["Montée progressive", "Effets durables", "Euphorie gourmande", "Relaxation"],
    aromas: ["Fraise", "Mangue", "Myrtille", "Citron"],
    prices: { "x10": 24.90, "x20": 44.90, "x30": 59.90 },
    warning: "Attendez 1h avant de reprendre une dose"
  },
  {
    id: 22, slug: "grinder-cannazen", name: "GRINDER CANNAZEN",
    subtitle: "Aluminium Premium", type: "accessoire", molecule: null,
    intensity: null, badge: "🛠️ ACCESSOIRE", promo: false,
    rating: 4.9, reviews: 456,
    image: "https://sixty8.fr/950-medium_default/grinder-premium.jpg",
    description: "Grinder 4 pièces en aluminium anodisé noir. Dents diamant, récupérateur de pollen.",
    smokellier: null,
    effects: [], aromas: [],
    prices: { "1": 14.90 },
    warning: null
  },
];

const MOLECULES = [
  { id: "magic-sauce", name: "Magic Sauce", emoji: "🔮", color: "#9333EA" },
  { id: "cbd", name: "CBD", emoji: "🌿", color: "#22c55e" },
  { id: "hec-10", name: "HEC-10", emoji: "🔥", color: "#f97316" },
  { id: "10-oh", name: "10-OH+", emoji: "🌙", color: "#6366f1" },
  { id: "delta-9", name: "Delta-9 THC", emoji: "⚡", color: "#eab308" },
];

const TYPES = {
  all: "Tous", flower: "🌿 Fleurs", resin: "🧱 Résines",
  vape: "💨 Vapes", comestible: "🍪 Comestibles", accessoire: "🛠️ Accessoires"
};

const INTENSITIES = {
  MODERATE: { label: "MODÉRÉ", color: "#22c55e", dots: 2 },
  STRONG: { label: "FORT", color: "#f59e0b", dots: 3 },
  INTENSE: { label: "INTENSE", color: "#ef4444", dots: 4 },
  EXTREME: { label: "EXTRÊME", color: "#dc2626", dots: 5 },
};

function getMolColor(mol) {
  const found = MOLECULES.find(function (m) { return m.id === mol; });
  return found ? found.color : "#666";
}

function getMolEmoji(mol) {
  const found = MOLECULES.find(function (m) { return m.id === mol; });
  return found ? found.emoji : "🛠️";
}

/* ═══ COMPONENTS ═══ */

function Stars({ rating, size }) {
  var s = size || 11;
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map(function (i) {
        return <span key={i} style={{ fontSize: s, color: i <= Math.round(rating) ? "#eab308" : "#333" }}>★</span>;
      })}
    </div>
  );
}

function IntensityDots({ intensity }) {
  var info = INTENSITIES[intensity];
  if (!info) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {[1, 2, 3, 4, 5].map(function (i) {
        return (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: "50%",
            background: i <= info.dots ? info.color : "rgba(255,255,255,0.1)",
            boxShadow: i <= info.dots ? ("0 0 5px " + info.color + "60") : "none",
          }} />
        );
      })}
      <span style={{ fontSize: 9, fontWeight: 800, color: info.color, letterSpacing: "0.08em", marginLeft: 3 }}>
        {info.label}
      </span>
    </div>
  );
}

function ProductImage({ src, name, imgStyle }) {
  var _s = useState(false);
  var hasError = _s[0];
  var setError = _s[1];
  var _l = useState(false);
  var loaded = _l[0];
  var setLoaded = _l[1];

  var fallbackColor = getMolColor(null);

  if (hasError) {
    return (
      <div style={Object.assign({}, imgStyle, {
        background: "linear-gradient(135deg, #6B21A830, #111)",
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
      })}>
        <span style={{ fontSize: 36, opacity: 0.5 }}>🔮</span>
        <span style={{ fontSize: 10, color: "#888", marginTop: 6, fontWeight: 600 }}>{name}</span>
      </div>
    );
  }

  return (
    <div style={Object.assign({}, imgStyle, { position: "relative", overflow: "hidden" })}>
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0, background: "linear-gradient(135deg, #6B21A820, #080808)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <span style={{ fontSize: 24 }}>🔮</span>
        </div>
      )}
      <img
        src={src}
        alt={name}
        onError={function () { setError(true); }}
        onLoad={function () { setLoaded(true); }}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          opacity: loaded ? 1 : 0, transition: "opacity 0.4s"
        }}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function ProductCard({ product, onClick }) {
  var _h = useState(false);
  var hovered = _h[0];
  var setHover = _h[1];
  var mc = getMolColor(product.molecule);
  var firstPrice = Object.values(product.prices)[0];
  var firstKey = Object.keys(product.prices)[0];

  return (
    <div
      onClick={function () { onClick(product); }}
      onMouseEnter={function () { setHover(true); }}
      onMouseLeave={function () { setHover(false); }}
      style={{
        background: "linear-gradient(145deg, #111111, #090909)",
        borderRadius: 14, overflow: "hidden", cursor: "pointer",
        border: "1px solid " + (hovered ? mc : "#1a1a1a"),
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? ("0 16px 50px " + mc + "25") : "0 2px 15px rgba(0,0,0,0.3)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative"
      }}
    >
      {product.promo && (
        <div style={{
          position: "absolute", top: 10, left: 10, zIndex: 5,
          background: "#dc2626", color: "#fff", padding: "2px 8px",
          borderRadius: 6, fontSize: 10, fontWeight: 800
        }}>
          {product.promoText || "PROMO"}
        </div>
      )}
      <div style={{
        position: "absolute", top: 10, right: 10, zIndex: 5,
        background: "linear-gradient(135deg, " + mc + "cc, " + mc + ")",
        color: "#fff", padding: "2px 8px", borderRadius: 6,
        fontSize: 9, fontWeight: 700, boxShadow: "0 0 12px " + mc + "50"
      }}>
        {getMolEmoji(product.molecule)} {(product.molecule || "accessoire").toUpperCase()}
      </div>

      <ProductImage src={product.image} name={product.name} imgStyle={{ width: "100%", height: 200, background: "#080808" }} />

      <div style={{ padding: "12px 14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>{product.name}</h3>
            <div style={{ fontSize: 10, color: "#777", fontWeight: 500, marginTop: 1 }}>{product.subtitle}</div>
          </div>
          <span style={{
            fontSize: 9, padding: "2px 6px", borderRadius: 5,
            background: mc + "15", color: mc + "cc", fontWeight: 600,
            whiteSpace: "nowrap", flexShrink: 0
          }}>
            {product.badge}
          </span>
        </div>

        {product.intensity && <IntensityDots intensity={product.intensity} />}

        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 9, color: "#555" }}>({product.reviews})</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 6 }}>
          {product.aromas.slice(0, 3).map(function (a) {
            return <span key={a} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#777" }}>{a}</span>;
          })}
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.04)"
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{firstPrice.toFixed(2)} €</div>
            <div style={{ fontSize: 9, color: "#555" }}>{firstKey}</div>
          </div>
          <button style={{
            background: "linear-gradient(135deg, " + mc + "cc, " + mc + ")",
            color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px",
            fontSize: 11, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 3px 12px " + mc + "30"
          }}>
            VOIR
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetail({ product, onClose, onAddCart }) {
  var _q = useState(1);
  var qty = _q[0];
  var setQty = _q[1];
  var priceKeys = Object.keys(product.prices);
  var _w = useState(priceKeys[0]);
  var selW = _w[0];
  var setSelW = _w[1];
  var _t = useState("desc");
  var tab = _t[0];
  var setTab = _t[1];
  var price = product.prices[selW];
  var mc = getMolColor(product.molecule);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: 16, overflowY: "auto"
      }}
      onClick={function (e) { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }} />
      <div style={{
        position: "relative", zIndex: 1,
        background: "linear-gradient(160deg, #111, #090909)",
        borderRadius: 18, maxWidth: 920, width: "100%", margin: "20px 0",
        border: "1px solid #1f1f1f", boxShadow: "0 40px 80px " + mc + "15"
      }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, zIndex: 10,
          background: "rgba(255,255,255,0.08)", border: "none", color: "#fff",
          width: 34, height: 34, borderRadius: "50%", fontSize: 16, cursor: "pointer"
        }}>✕</button>

        {/* Warning */}
        {product.warning && (
          <div style={{
            background: "linear-gradient(90deg, #7f1d1d, #991b1b)",
            padding: "8px 18px", display: "flex", alignItems: "center", gap: 8,
            borderRadius: "18px 18px 0 0"
          }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <span style={{ color: "#fca5a5", fontSize: 12, fontWeight: 600 }}>{product.warning}</span>
          </div>
        )}

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="detail-grid">
          {/* Image */}
          <div style={{ position: "relative" }}>
            <ProductImage src={product.image} name={product.name} imgStyle={{ width: "100%", height: 420, background: "#070707" }} />
            <div style={{
              position: "absolute", top: 14, left: 14,
              background: "linear-gradient(135deg, " + mc + "cc, " + mc + ")",
              color: "#fff", padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700
            }}>
              {getMolEmoji(product.molecule)} {(product.molecule || "accessoire").toUpperCase()}
            </div>
          </div>

          {/* Details */}
          <div style={{ padding: "24px 24px 18px" }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 0 2px" }}>{product.name}</h2>
            <div style={{ fontSize: 13, color: mc, fontWeight: 600, marginBottom: 8 }}>{product.subtitle}</div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              {product.intensity && <IntensityDots intensity={product.intensity} />}
              <Stars rating={product.rating} />
              <span style={{ fontSize: 11, color: "#555" }}>({product.reviews} avis)</span>
            </div>

            {/* Smokellier */}
            {product.smokellier && (
              <div style={{
                margin: "0 0 14px", padding: "12px 14px",
                background: "linear-gradient(135deg, " + mc + "10, " + mc + "05)",
                borderRadius: 10, borderLeft: "3px solid " + mc
              }}>
                <div style={{ fontSize: 9, color: mc, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4 }}>
                  LE SMOKELLIER CANNAZEN
                </div>
                <p style={{ fontSize: 12, color: "#bbb", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                  &ldquo;{product.smokellier}&rdquo;
                </p>
              </div>
            )}

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, marginBottom: 12, borderBottom: "1px solid #1a1a1a" }}>
              {[["desc", "Description"], ["effects", "Effets"], ["legal", "Légal"]].map(function (item) {
                return (
                  <button key={item[0]} onClick={function () { setTab(item[0]); }} style={{
                    background: "none", border: "none",
                    borderBottom: tab === item[0] ? ("2px solid " + mc) : "2px solid transparent",
                    color: tab === item[0] ? "#fff" : "#666",
                    padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer"
                  }}>
                    {item[1]}
                  </button>
                );
              })}
            </div>

            {tab === "desc" && (
              <p style={{ fontSize: 12, color: "#999", lineHeight: 1.7, margin: "0 0 12px" }}>{product.description}</p>
            )}
            {tab === "effects" && (
              <div style={{ margin: "0 0 12px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                  {product.effects.map(function (e) {
                    return <span key={e} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 8, background: mc + "15", color: mc + "cc", fontWeight: 500 }}>{e}</span>;
                  })}
                </div>
                {product.aromas.length > 0 && (
                  <div>
                    <div style={{ fontSize: 9, color: "#555", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4, marginTop: 8 }}>ARÔMES</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {product.aromas.map(function (a) {
                        return <span key={a} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 8, background: "rgba(255,255,255,0.05)", color: "#999" }}>{a}</span>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            {tab === "legal" && (
              <p style={{ fontSize: 11, color: "#666", lineHeight: 1.7, margin: "0 0 12px" }}>
                Ce produit contient des extraits de chanvre (THC &lt; 0.3%) conforme à la législation européenne et française.
                Vente interdite aux mineurs (-18 ans). Déconseillé aux femmes enceintes ou allaitantes.
                Ne pas conduire après consommation. Non médicamenteux.
              </p>
            )}

            {/* Prices */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, color: "#555", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>GRAMMAGE / QUANTITÉ</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(" + Math.min(priceKeys.length, 4) + ", 1fr)", gap: 5 }}>
                {Object.entries(product.prices).map(function (entry) {
                  var w = entry[0];
                  var pr = entry[1];
                  return (
                    <button key={w} onClick={function () { setSelW(w); }} style={{
                      background: selW === w ? ("linear-gradient(135deg, " + mc + "cc, " + mc + ")") : "rgba(255,255,255,0.03)",
                      border: selW === w ? ("1px solid " + mc) : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 8, padding: "6px 3px", cursor: "pointer",
                      display: "flex", flexDirection: "column", alignItems: "center"
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{w}</span>
                      <span style={{ fontSize: 10, color: selW === w ? "#e9d5ff" : "#777", fontWeight: 600 }}>{pr.toFixed(2)}€</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qty + Add */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                display: "flex", alignItems: "center",
                background: "rgba(255,255,255,0.03)", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)"
              }}>
                <button onClick={function () { setQty(Math.max(1, qty - 1)); }} style={{
                  background: "none", border: "none", color: "#fff", padding: "7px 12px", fontSize: 16, cursor: "pointer"
                }}>−</button>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: "center" }}>{qty}</span>
                <button onClick={function () { setQty(qty + 1); }} style={{
                  background: "none", border: "none", color: "#fff", padding: "7px 12px", fontSize: 16, cursor: "pointer"
                }}>+</button>
              </div>
              <button onClick={function () { onAddCart(product, selW, qty); }} style={{
                flex: 1, background: "linear-gradient(135deg, " + mc + "cc, " + mc + ")",
                border: "none", borderRadius: 10, padding: "12px", color: "#fff",
                fontSize: 14, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 6px 24px " + mc + "30"
              }}>
                Ajouter — {(price * qty).toFixed(2)} €
              </button>
            </div>

            {/* Badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {[["🚚", "Livraison 48h"], ["🔒", "Paiement sécurisé"], ["📦", "Emballage discret"]].map(function (item) {
                return (
                  <div key={item[1]} style={{ textAlign: "center", padding: 6, background: "rgba(255,255,255,0.02)", borderRadius: 6 }}>
                    <div style={{ fontSize: 14 }}>{item[0]}</div>
                    <div style={{ fontSize: 9, color: "#ccc", fontWeight: 700 }}>{item[1]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartPanel({ items, onClose, onRemove, onUpdateQty }) {
  var total = items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var shipping = total >= 49 ? 0 : 4.90;

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1099 }} onClick={onClose} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 400, maxWidth: "100vw",
        zIndex: 1100, background: "linear-gradient(180deg, #111, #090909)",
        borderLeft: "1px solid #1a1a1a", boxShadow: "-8px 0 30px rgba(0,0,0,0.5)",
        display: "flex", flexDirection: "column", animation: "slideRight 0.3s ease-out"
      }}>
        {/* Header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, color: "#fff", fontSize: 16, fontWeight: 800 }}>
            🛒 PANIER <span style={{ color: "#9333EA" }}>({items.length})</span>
          </h3>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", width: 30, height: 30, borderRadius: 8, fontSize: 14, cursor: "pointer" }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflow: "auto", padding: "12px 20px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>🛒</div>
              <p style={{ color: "#555", fontSize: 13 }}>Panier vide</p>
            </div>
          ) : items.map(function (item, i) {
            return (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #151515" }}>
                <ProductImage src={item.image} name={item.name} imgStyle={{ width: 56, height: 56, borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#a78bfa" }}>{item.weight}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <button onClick={function () { onUpdateQty(i, Math.max(1, item.qty - 1)); }} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", width: 22, height: 22, borderRadius: 4, fontSize: 12, cursor: "pointer" }}>−</button>
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{item.qty}</span>
                    <button onClick={function () { onUpdateQty(i, item.qty + 1); }} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", width: 22, height: 22, borderRadius: 4, fontSize: 12, cursor: "pointer" }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#9333EA" }}>{(item.price * item.qty).toFixed(2)}€</div>
                  <button onClick={function () { onRemove(i); }} style={{ background: "none", border: "none", color: "#444", fontSize: 11, cursor: "pointer", marginTop: 4 }}>✕ retirer</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "14px 20px 20px", borderTop: "1px solid #1a1a1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginBottom: 4 }}>
              <span>Sous-total</span><span>{total.toFixed(2)}€</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: shipping === 0 ? "#22c55e" : "#666", marginBottom: 8 }}>
              <span>Livraison</span><span>{shipping === 0 ? "OFFERTE ✓" : (shipping.toFixed(2) + "€")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingTop: 8, borderTop: "1px solid #1a1a1a" }}>
              <span style={{ color: "#999", fontSize: 14, fontWeight: 600 }}>Total</span>
              <span style={{ color: "#fff", fontSize: 22, fontWeight: 900 }}>{(total + shipping).toFixed(2)}€</span>
            </div>
            <button style={{
              width: "100%", background: "linear-gradient(135deg, #7C3AED, #9333EA)",
              border: "none", borderRadius: 10, padding: "13px", color: "#fff",
              fontSize: 14, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 6px 24px rgba(147,51,234,0.3)"
            }}>
              PASSER COMMANDE
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */

export default function App() {
  var _page = useState("home");
  var page = _page[0];
  var setPage = _page[1];

  var _filter = useState("all");
  var filter = _filter[0];
  var setFilter = _filter[1];

  var _mol = useState(null);
  var molFilter = _mol[0];
  var setMolFilter = _mol[1];

  var _search = useState("");
  var search = _search[0];
  var setSearch = _search[1];

  var _selected = useState(null);
  var selected = _selected[0];
  var setSelected = _selected[1];

  var _cart = useState([]);
  var cart = _cart[0];
  var setCart = _cart[1];

  var _showCart = useState(false);
  var showCart = _showCart[0];
  var setShowCart = _showCart[1];

  var _notif = useState(null);
  var notif = _notif[0];
  var setNotif = _notif[1];

  var _ageOk = useState(false);
  var ageOk = _ageOk[0];
  var setAgeOk = _ageOk[1];

  var _showSearch = useState(false);
  var showSearch = _showSearch[0];
  var setShowSearch = _showSearch[1];

  var _sortBy = useState("popular");
  var sortBy = _sortBy[0];
  var setSortBy = _sortBy[1];

  var filtered = useMemo(function () {
    var list = PRODUCTS.slice();
    if (filter !== "all") list = list.filter(function (p) { return p.type === filter; });
    if (molFilter) list = list.filter(function (p) { return p.molecule === molFilter; });
    if (search.trim()) {
      var q = search.toLowerCase();
      list = list.filter(function (p) {
        return (p.name + " " + p.subtitle + " " + (p.molecule || "") + " " + p.aromas.join(" ")).toLowerCase().indexOf(q) >= 0;
      });
    }
    if (sortBy === "price-asc") list.sort(function (a, b) { return Object.values(a.prices)[0] - Object.values(b.prices)[0]; });
    if (sortBy === "price-desc") list.sort(function (a, b) { return Object.values(b.prices)[0] - Object.values(a.prices)[0]; });
    if (sortBy === "rating") list.sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
    if (sortBy === "popular") list.sort(function (a, b) { return (b.reviews || 0) - (a.reviews || 0); });
    return list;
  }, [filter, molFilter, search, sortBy]);

  function addToCart(product, weight, qty) {
    setCart(function (prev) {
      var idx = prev.findIndex(function (i) { return i.id === product.id && i.weight === weight; });
      if (idx >= 0) {
        var n = prev.slice();
        n[idx] = Object.assign({}, n[idx], { qty: n[idx].qty + qty });
        return n;
      }
      return prev.concat([{ id: product.id, name: product.name, image: product.image, weight: weight, qty: qty, price: product.prices[weight] }]);
    });
    setSelected(null);
    setNotif(product.name + " ajouté au panier !");
    setTimeout(function () { setNotif(null); }, 2500);
  }

  function updateQty(i, q) {
    setCart(function (prev) {
      var n = prev.slice();
      n[i] = Object.assign({}, n[i], { qty: q });
      return n;
    });
  }

  function removeFromCart(i) {
    setCart(function (prev) { return prev.filter(function (_, idx) { return idx !== i; }); });
  }

  var cartCount = cart.reduce(function (s, i) { return s + i.qty; }, 0);

  /* ═══ AGE GATE ═══ */
  if (!ageOk) {
    return (
      <div style={{ minHeight: "100vh", background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <style>{cssReset}</style>
        <div style={{ textAlign: "center", maxWidth: 420, padding: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🍃</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 8 }}>
            Canna<span style={{ color: "#9333EA" }}>Zen</span>
          </h1>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>La référence du cannabis légal en France</p>
          <div style={{ background: "#111", borderRadius: 16, padding: 32, border: "1px solid #1a1a1a" }}>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Vérification d'âge</h2>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
              Ce site est réservé aux personnes majeures. En entrant, vous confirmez avoir plus de 18 ans.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={function () { setAgeOk(true); }} style={{
                flex: 1, background: "linear-gradient(135deg, #7C3AED, #9333EA)",
                border: "none", borderRadius: 10, padding: "14px", color: "#fff",
                fontSize: 15, fontWeight: 800, cursor: "pointer"
              }}>
                J'ai +18 ans ✓
              </button>
              <button style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "14px", color: "#888",
                fontSize: 15, fontWeight: 600, cursor: "pointer"
              }}>
                Non
              </button>
            </div>
          </div>
          <p style={{ color: "#333", fontSize: 10, marginTop: 16 }}>THC &lt; 0.3% - Vente interdite aux mineurs</p>
        </div>
      </div>
    );
  }

  /* ═══ MAIN APP ═══ */
  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{cssReset}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(5,5,5,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={function () { setPage("home"); setFilter("all"); setMolFilter(null); setSearch(""); }} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <span style={{ fontSize: 22 }}>🍃</span>
            <span style={{ fontSize: 18, fontWeight: 900 }}>
              <span style={{ color: "#fff" }}>Canna</span><span style={{ color: "#9333EA" }}>Zen</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={function () { setPage("about"); }} style={{ background: "none", border: "none", color: "#888", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "6px 12px" }}>
              À Propos
            </button>
            <button onClick={function () { setShowSearch(!showSearch); }} style={{ background: "rgba(255,255,255,0.04)", border: "none", color: "#999", borderRadius: 8, padding: "7px 10px", fontSize: 14, cursor: "pointer" }}>
              🔍
            </button>
            <button onClick={function () { setShowCart(true); }} style={{
              background: "linear-gradient(135deg, #7C3AED, #9333EA)",
              border: "none", color: "#fff", borderRadius: 8, padding: "7px 14px",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5
            }}>
              🛒
              {cartCount > 0 && (
                <span style={{
                  background: "#fff", color: "#7C3AED", borderRadius: "50%",
                  width: 18, height: 18, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 10, fontWeight: 900
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {showSearch && (
          <div style={{ padding: "8px 28px 12px" }}>
            <input
              value={search}
              onChange={function (e) { setSearch(e.target.value); setPage("home"); }}
              placeholder="Rechercher un produit..."
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                padding: "10px 16px", color: "#fff", fontSize: 13, outline: "none"
              }}
            />
          </div>
        )}
      </nav>

      {/* ═══ ABOUT PAGE ═══ */}
      {page === "about" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 28px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 48 }}>🍃</span>
            <h1 style={{ fontSize: 36, fontWeight: 900, marginTop: 12, marginBottom: 8 }}>
              Canna<span style={{ color: "#9333EA" }}>Zen</span>
            </h1>
            <p style={{ color: "#888", fontSize: 15 }}>La référence du cannabis légal en France</p>
          </div>
          <div style={{ background: "#111", borderRadius: 16, padding: 32, border: "1px solid #1a1a1a", marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Notre Mission</h2>
            <p style={{ color: "#999", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
              CannaZen est né d'une conviction : le cannabis légal mérite mieux. Chaque produit est sélectionné avec l'exigence d'un sommelier du chanvre.
            </p>
            <p style={{ color: "#999", fontSize: 14, lineHeight: 1.8 }}>
              Avec {PRODUCTS.length} produits et {MOLECULES.length} molécules, nous proposons la gamme la plus complète du marché français.
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={function () { setPage("home"); }} style={{
              background: "linear-gradient(135deg, #7C3AED, #9333EA)",
              border: "none", borderRadius: 10, padding: "12px 32px", color: "#fff",
              fontSize: 14, fontWeight: 800, cursor: "pointer"
            }}>
              🛒 Explorer la boutique
            </button>
          </div>
        </div>
      )}

      {/* ═══ HOME ═══ */}
      {page === "home" && (
        <>
          {/* Hero */}
          {!search && !molFilter && filter === "all" && (
            <section style={{ position: "relative", padding: "60px 28px 40px", textAlign: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(147,51,234,0.12) 0%, transparent 55%)" }} />
              <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
                <div style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, rgba(147,51,234,0.15), rgba(107,33,168,0.08))",
                  border: "1px solid rgba(147,51,234,0.2)", borderRadius: 24, padding: "4px 16px", marginBottom: 16
                }}>
                  <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 700, letterSpacing: "0.12em" }}>
                    🔮 {PRODUCTS.length} PRODUITS • {MOLECULES.length} MOLÉCULES • 2026
                  </span>
                </div>
                <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 12 }}>
                  <span style={{ color: "#fff" }}>La référence du </span><br />
                  <span style={{ background: "linear-gradient(135deg, #9333EA, #c084fc, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    cannabis légal
                  </span>
                </h1>
                <p style={{ fontSize: 15, color: "#777", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 24px" }}>
                  Fleurs, résines, vapes et comestibles d'exception. Qualité premium, livraison 48h, paiement sécurisé.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  {MOLECULES.map(function (m) {
                    return (
                      <button key={m.id} onClick={function () { setMolFilter(m.id); setFilter("all"); }} style={{
                        background: m.color + "10", border: "1px solid " + m.color + "30",
                        borderRadius: 10, padding: "8px 16px", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6
                      }}>
                        <span style={{ fontSize: 14 }}>{m.emoji}</span>
                        <span style={{ fontSize: 12, color: m.color, fontWeight: 700 }}>{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Molecule header */}
          {molFilter && (
            <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 28px 12px" }}>
              {(function () {
                var m = MOLECULES.find(function (x) { return x.id === molFilter; });
                if (!m) return null;
                return (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 32 }}>{m.emoji}</span>
                      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: 0 }}>{m.name}</h2>
                    </div>
                    <button onClick={function () { setMolFilter(null); }} style={{
                      background: "rgba(255,255,255,0.05)", border: "none", color: "#999",
                      borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer"
                    }}>
                      ✕ Tout voir
                    </button>
                  </div>
                );
              })()}
            </section>
          )}

          {/* Filters */}
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 28px 12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", flex: 1 }}>
                {Object.entries(TYPES).map(function (entry) {
                  var k = entry[0];
                  var v = entry[1];
                  var count = k === "all"
                    ? PRODUCTS.filter(function (p) { return !molFilter || p.molecule === molFilter; }).length
                    : PRODUCTS.filter(function (p) { return p.type === k && (!molFilter || p.molecule === molFilter); }).length;
                  return (
                    <button key={k} onClick={function () { setFilter(k); }} style={{
                      background: filter === k ? "linear-gradient(135deg, #7C3AED, #9333EA)" : "rgba(255,255,255,0.03)",
                      border: filter === k ? "1px solid #9333EA" : "1px solid rgba(255,255,255,0.06)",
                      color: filter === k ? "#fff" : "#777", borderRadius: 8,
                      padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}>
                      {v} ({count})
                    </button>
                  );
                })}
              </div>
              <select value={sortBy} onChange={function (e) { setSortBy(e.target.value); }} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "6px 10px", color: "#888", fontSize: 11, cursor: "pointer", outline: "none"
              }}>
                <option value="popular">Plus populaire</option>
                <option value="rating">Mieux noté</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </section>

          {/* Results */}
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px 8px" }}>
            <p style={{ fontSize: 11, color: "#555" }}>
              {filtered.length} produit{filtered.length > 1 ? "s" : ""}
              {search ? (" pour \"" + search + "\"") : ""}
            </p>
          </section>

          {/* Grid */}
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px 48px" }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 48, opacity: 0.2, marginBottom: 12 }}>🔍</div>
                <p style={{ color: "#555", fontSize: 14 }}>Aucun produit trouvé</p>
                <button onClick={function () { setFilter("all"); setMolFilter(null); setSearch(""); }} style={{
                  marginTop: 12, background: "rgba(255,255,255,0.05)", border: "none",
                  color: "#999", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 12
                }}>
                  Réinitialiser
                </button>
              </div>
            ) : (
              <div className="pgrid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {filtered.map(function (p) {
                  return (
                    <div key={p.id}>
                      <ProductCard product={p} onClick={setSelected} />
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "32px 28px 20px", background: "#050505" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 32, marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>🍃</span>
                <span style={{ fontSize: 16, fontWeight: 900 }}>
                  <span style={{ color: "#fff" }}>Canna</span><span style={{ color: "#9333EA" }}>Zen</span>
                </span>
              </div>
              <p style={{ fontSize: 11, color: "#444", lineHeight: 1.7 }}>
                La référence du cannabis légal en France. {PRODUCTS.length}+ produits, {MOLECULES.length} molécules. 🔥
              </p>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#777", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>MOLÉCULES</div>
              {MOLECULES.map(function (m) {
                return (
                  <div key={m.id} onClick={function () { setPage("home"); setMolFilter(m.id); setFilter("all"); }} style={{
                    fontSize: 11, color: m.id === "magic-sauce" ? "#a78bfa" : "#444",
                    padding: "3px 0", cursor: "pointer",
                    fontWeight: m.id === "magic-sauce" ? 700 : 400
                  }}>
                    {m.emoji} {m.name}
                  </div>
                );
              })}
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#777", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>LÉGAL</div>
              {["CGV", "Mentions légales", "Confidentialité", "Cookies"].map(function (l) {
                return <div key={l} style={{ fontSize: 11, color: "#444", padding: "3px 0" }}>{l}</div>;
              })}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #151515", paddingTop: 16, textAlign: "center" }}>
            <p style={{ fontSize: 9, color: "#2a2a2a", lineHeight: 1.7 }}>
              © 2026 CannaZen — Tous droits réservés. THC &lt; 0.3%. Vente interdite aux mineurs (-18 ans). 🍃
            </p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {selected && <ProductDetail product={selected} onClose={function () { setSelected(null); }} onAddCart={addToCart} />}
      {showCart && <CartPanel items={cart} onClose={function () { setShowCart(false); }} onRemove={removeFromCart} onUpdateQty={updateQty} />}

      {/* NOTIFICATION */}
      {notif && (
        <div style={{
          position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #7C3AED, #9333EA)", color: "#fff",
          padding: "10px 22px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          boxShadow: "0 8px 32px rgba(147,51,234,0.4)", zIndex: 2000,
          display: "flex", alignItems: "center", gap: 6
        }}>
          ✅ {notif}
        </div>
      )}
    </div>
  );
}

/* ═══ CSS ═══ */
var cssReset = "\n@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,900&display=swap');\n* { box-sizing: border-box; margin: 0; padding: 0; }\nbody { background: #050505 !important; }\n::-webkit-scrollbar { width: 5px; }\n::-webkit-scrollbar-track { background: #0a0a0a; }\n::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }\n@keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }\n@media (max-width: 768px) {\n  .pgrid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }\n  .detail-grid { grid-template-columns: 1fr !important; }\n}\n@media (max-width: 480px) {\n  .pgrid { grid-template-columns: 1fr !important; }\n}\n";
