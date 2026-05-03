import { useState, useEffect } from "react";

const POLES = ["EP Lahwa","Musique Film","Association","Ateliers","Collabs","Compositions","Admin","Perso"];
const CATEGORIES_CONTACT = ["Éditeurs","Tourneurs","Salles Paris/IDF","Salles Marseille","Salles Belgique","Musique de Film"];
const STATUTS_CONTACT = ["À contacter","Contacté","En attente","Relancé","Deal ✓","Pas pour l'instant"];
const STATUT_CONTACT_COLORS = {
  "À contacter":       { bg:"#F4F1FA", text:"#6A5A8A" },
  "Contacté":          { bg:"#E5EFF8", text:"#3A6FA8" },
  "En attente":        { bg:"#FAEEDA", text:"#854F0B" },
  "Relancé":           { bg:"#FDF0E8", text:"#D4732A" },
  "Deal ✓":            { bg:"#EAF3DE", text:"#3B6D11" },
  "Pas pour l'instant":{ bg:"#F7F5F2", text:"#A09080" },
};
const CAT_COLORS = {
  "Éditeurs":          { bg:"#EEEDFE", text:"#534AB7" },
  "Tourneurs":         { bg:"#F7EDF3", text:"#993556" },
  "Salles Paris/IDF":  { bg:"#FCEBEB", text:"#A32D2D" },
  "Salles Marseille":  { bg:"#FDF0E8", text:"#D4732A" },
  "Salles Belgique":   { bg:"#E4F5F4", text:"#2A8F8A" },
  "Musique de Film":   { bg:"#E5EFF8", text:"#3A6FA8" },
};
const initContacts = [
  {id:101,nom:"440 Hz",role:"Charles Braud / Eglantine Bouyssou",categorie:"Éditeurs",statut:"En attente",ou:"",notes:"Background musiques actuelles. OK pour travailler ensemble mais très tourné musique à l'image.",relance:"",email:""},
  {id:102,nom:"Universal Classics",role:"Enzo Iannuzi / Eric Denut",categorie:"Éditeurs",statut:"En attente",ou:"",notes:"Enthousiaste mais Enzo ne peut pas motiver le DA pop. Intérêt syncro/musique à l'image. Pas de contrat pour l'instant.",relance:"",email:""},
  {id:103,nom:"Jan Ghazi",role:"Conseiller",categorie:"Éditeurs",statut:"Contacté",ou:"",notes:"Conseille album plutôt qu'EP. Suggère: Warner Chappell (Mathieu Tessier), Because, Tot ou Tard, My Melody (music supervisors).",relance:"",email:""},
  {id:104,nom:"Budde Music",role:"Juan Tamayo",categorie:"Éditeurs",statut:"Deal ✓",ou:"",notes:"A aimé le projet. Intéressé pour accompagner les émergents. Proposition de contrat.",relance:"",email:""},
  {id:105,nom:"Allo Floride",role:"Thomas Lusseau",categorie:"Éditeurs",statut:"En attente",ou:"",notes:"OK co-édition. Contacts: Jonathan Gourmel (Infiné), Isaac Delusion, Møme, French Fuse, Douran. Tour très electro.",relance:"",email:""},
  {id:106,nom:"Sync Sync",role:"Valérie Albert / Samuel Levet",categorie:"Éditeurs",statut:"Deal ✓",ou:"",notes:"Aiment le projet. Co-édition possible. Contacts: Infiné, Fondation Cartier Soirées Nomades, IMA, Julie Gayet, Zamora tourneur. Pub Hermès, défilés de mode.",relance:"",email:"valeriealbert@syncsync.fr"},
  {id:107,nom:"Because",role:"Alice Marchal / Michel Duval",categorie:"Éditeurs",statut:"En attente",ou:"",notes:"Intéressés carrière complète + syncro (Aurélien Viot). Les tenir au courant des prochains lives.",relance:"",email:""},
  {id:108,nom:"22 D",role:"Emmanuel Deletang & Thibaud Feyhl",categorie:"Éditeurs",statut:"En attente",ou:"",notes:"Projets hors BO (L'Impératrice, Isaac Delusion). Ne pas détacher compositrice de l'artiste scène. Reviennent après écoute EP. Demande rencontre Warner Chappell Matthieu Tessier.",relance:"",email:""},
  {id:109,nom:"Warner Chappell",role:"Hélène / Mathieu Tessier",categorie:"Éditeurs",statut:"Contacté",ou:"",notes:"Showcase Cannes 15 mai — répondre en urgence. Recommandé par Jan Ghazi et 22D.",relance:"30/04/2026",email:""},
  {id:201,nom:"Palmier Rouge",role:"Foucauld Ledesert",categorie:"Tourneurs",statut:"En attente",ou:"RDV tél 18/11/24",notes:"Quelque chose l'attire mais pas de certitude. Parle de Piano Day Arte, lieux La Chica, Coline Rio, Hania Rani.",relance:"",email:"fuko@palmier-rouge.com"},
  {id:202,nom:"Tartine Prod",role:"",categorie:"Tourneurs",statut:"Pas pour l'instant",ou:"Via Daphné H.",notes:"Réponse négative.",relance:"",email:""},
  {id:203,nom:"Caramba",role:"David Dupoirieux",categorie:"Tourneurs",statut:"Pas pour l'instant",ou:"",notes:"Réponse négative.",relance:"",email:""},
  {id:204,nom:"UNI-T",role:"Agent Tamino",categorie:"Tourneurs",statut:"Pas pour l'instant",ou:"Via Daphné H.",notes:"Réponse négative.",relance:"",email:""},
  {id:205,nom:"Alias Prod",role:"(Agnès Obel)",categorie:"Tourneurs",statut:"À contacter",ou:"",notes:"",relance:"",email:"ariane@alias-production.com"},
  {id:301,nom:"Conservatoire Le Perreux",role:"Stéphanie Scansetti",categorie:"Salles Paris/IDF",statut:"Deal ✓",ou:"Le Perreux 94",notes:"Réponse positive ! 3 concerts à partir de sept 2025. Résidence + ingé son/lumière. Jauge 150p.",relance:"",email:"sscansetti@leperreux94.fr"},
  {id:302,nom:"So Far Sound",role:"Jérémy Richet / Alice Graziano",categorie:"Salles Paris/IDF",statut:"Deal ✓",ou:"",notes:"Réponse positive ! En attente d'une date.",relance:"",email:"artists@boulapop.org"},
  {id:303,nom:"Festi'Val de Marne",role:"Élodie Mermoz",categorie:"Salles Paris/IDF",statut:"Relancé",ou:"Via Ëda Diaz",notes:"Message insta envoyé 27/11/24.",relance:"",email:""},
  {id:304,nom:"Studio La Batterie",role:"",categorie:"Salles Paris/IDF",statut:"Pas pour l'instant",ou:"Guyancourt 78",notes:"Tremplin Artistes Émergents — Refusé 19/11.",relance:"",email:"studios.labatterie@ville-guyancourt.fr"},
  {id:305,nom:"Maad in 93",role:"Fanny Demester",categorie:"Salles Paris/IDF",statut:"En attente",ou:"Via Ëda Diaz",notes:"Rencontrée 14/01/25. Accompagnement Maad 93 via Théâtre des Bergeries. Café la Pêche, Maison Pop, Africolor, Le Triton, Rare Talent.",relance:"",email:"fanny@maad93.com"},
  {id:306,nom:"Paul B / Massy",role:"François Beaudenon",categorie:"Salles Paris/IDF",statut:"Contacté",ou:"Massy 91",notes:"Ont programmé La Chica, Gabi Hartmann. Jauge 550p + festival. Mail envoyé 2/12/24.",relance:"",email:"beaudenon@paul-b.fr"},
  {id:307,nom:"Le Hasard Ludique",role:"Céline Pigier",categorie:"Salles Paris/IDF",statut:"Relancé",ou:"Paris 18e",notes:"Proposition 1ère partie Laura Misch 6/03/2025. Puis plus de réponse — relancer.",relance:"",email:"celine.pi@lehasardludique.fr"},
  {id:308,nom:"Le Tamanoir",role:"Jessie Royer / Daphné",categorie:"Salles Paris/IDF",statut:"En attente",ou:"Gennevilliers",notes:"Retour JC (directeur) attendu le 07/01.",relance:"",email:"direction@letamanoir.com"},
  {id:309,nom:"CPA Jacques Bravo",role:"Yann Le Bars",categorie:"Salles Paris/IDF",statut:"En attente",ou:"Paris",notes:"A répondu le 17/12 — va écouter.",relance:"",email:"ylebars@ligueparis.org"},
  {id:310,nom:"Le Hangar",role:"Riyad Hanni",categorie:"Salles Paris/IDF",statut:"Contacté",ou:"Ivry 94",notes:"Contacté via Daphné/WomenBeats 18/12/24.",relance:"",email:"rhanni@ivry94.fr"},
  {id:311,nom:"Théâtre des Bergeries",role:"Lucie Chataigner",categorie:"Salles Paris/IDF",statut:"Contacté",ou:"Noisy-le-Sec",notes:"Référent accompagnement Maad 93. Via Anne Laure & Fanny de Maad 93.",relance:"",email:"lucie.chataigner@noisylesec.fr"},
  {id:312,nom:"Théâtre Simenon",role:"Stéphane Moquet",categorie:"Salles Paris/IDF",statut:"Contacté",ou:"Rosny-sous-Bois",notes:"Référent accompagnement Maad 93.",relance:"",email:"stephane.moquet@rosnysousbois.fr"},
  {id:313,nom:"Maison Populaire",role:"Sarah Grosso",categorie:"Salles Paris/IDF",statut:"Contacté",ou:"Montreuil",notes:"Demande rencontre pour live Lahwa.",relance:"",email:"sarah.grosso@maisonpop.fr"},
  {id:314,nom:"Théâtre Jacques Carat",role:"Géraldine Duchesne",categorie:"Salles Paris/IDF",statut:"En attente",ou:"Cachan 94",notes:"Géraldine a aimé la voix et le projet, transmis à sa directrice.",relance:"",email:"g.duchesne@theatrejacquescarat.fr"},
  {id:315,nom:"Centre Culturel 19e",role:"Giada Seghers",categorie:"Salles Paris/IDF",statut:"Deal ✓",ou:"Paris 19e",notes:"Réponse positive ! Relancer pour avril. Contact via insta.",relance:"",email:""},
  {id:316,nom:"Dispositif PAPA 92",role:"",categorie:"Salles Paris/IDF",statut:"En attente",ou:"",notes:"Rencontre avec le jury le 19/03.",relance:"",email:""},
  {id:317,nom:"Quai de Jemmapes",role:"Véronique Ravet",categorie:"Salles Paris/IDF",statut:"Contacté",ou:"Paris",notes:"Via Jessie Royer 19/03/25.",relance:"",email:"veronique.ravet@crl10.net"},
  {id:318,nom:"Le Réacteur",role:"Marino Crespino",categorie:"Salles Paris/IDF",statut:"Contacté",ou:"Issy-les-Moulineaux",notes:"Via Jessie Royer 19/03/25.",relance:"",email:"marino.crespino@ville-issy.fr"},
  {id:319,nom:"Le 25 de la Vallée",role:"Rémy Ardaillon / Quentin",categorie:"Salles Paris/IDF",statut:"Deal ✓",ou:"Chaville 92",notes:"Rencontre Chorus/Emergence Day. Propose soirée en automne puis résidence à la suite du concert.",relance:"",email:"remy.ardaillon@mjcdelavallee.fr"},
  {id:320,nom:"Théâtre Rutebeuf",role:"Jane Gray",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"Clichy",notes:"Via Jessie Royer.",relance:"",email:"jane.gray@ville-clichy.fr"},
  {id:321,nom:"La Flèche d'Or",role:"",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"Paris 20e",notes:"Via Ëda Diaz.",relance:"",email:""},
  {id:322,nom:"Cherchez la Femme",role:"Flore Benguigui",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"",notes:"Mise en avant femmes artistes émergentes. Mail à faire via Daphné.",relance:"",email:""},
  {id:323,nom:"La Bellevilloise",role:"",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"",notes:"",relance:"",email:""},
  {id:324,nom:"L'Usine à Chapeaux",role:"Marie Sabbah",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"Rambouillet 78",notes:"MJC.",relance:"",email:""},
  {id:325,nom:"Manufacture de la Chanson",role:"Stéphane Riva",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"",notes:"Via Paul Romann.",relance:"",email:"acp@manufacturechanson.org"},
  {id:326,nom:"Kiosquorama",role:"Élodie Mermoz",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"",notes:"Via Ëda Diaz.",relance:"",email:""},
  {id:327,nom:"La Cité Audacieuse",role:"",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"",notes:"Via Auraj.",relance:"",email:""},
  {id:328,nom:"Fondation Fiminco",role:"",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"",notes:"",relance:"",email:""},
  {id:329,nom:"L'Archipel",role:"",categorie:"Salles Paris/IDF",statut:"À contacter",ou:"",notes:"",relance:"",email:""},
  {id:401,nom:"Théâtre de l'Oeuvre",role:"",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"",relance:"",email:""},
  {id:402,nom:"La Cité de la Musique",role:"Manu Théron",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"Manu Théron adore les projets vocaux.",relance:"",email:""},
  {id:403,nom:"L'Espace Julien",role:"",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"",relance:"",email:""},
  {id:404,nom:"Le Talus",role:"",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"",relance:"",email:""},
  {id:405,nom:"Data",role:"",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"Alternatif, moins de budget mais public très attentif.",relance:"",email:""},
  {id:406,nom:"La Maison du Chant",role:"",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"Beaucoup d'ensembles vocaux, bon public.",relance:"",email:""},
  {id:407,nom:"Nuits Métis",role:"Marc Ambroggiani",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"Programme dans beaucoup de lieux de Marseille.",relance:"",email:""},
  {id:408,nom:"La Casa Consolat",role:"",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"Incontournable pour les musiques méditerranéennes.",relance:"",email:""},
  {id:409,nom:"L'Ostau Dau Pais",role:"",categorie:"Salles Marseille",statut:"À contacter",ou:"Marseille",notes:"Lieu occitan, cultures minoritaires, concerts kabyles.",relance:"",email:""},
  {id:501,nom:"Kultura Liège",role:"Simon F.",categorie:"Salles Belgique",statut:"Contacté",ou:"Liège",notes:"Lieu culturel alternatif coopératif. Contacté 17/04/25.",relance:"",email:"prog@kulturaliege.be"},
  {id:502,nom:"L'An Vert",role:"Simon F.",categorie:"Salles Belgique",statut:"À contacter",ou:"Liège",notes:"Lieu de qualité éclectique.",relance:"",email:"prog@lanvert.be"},
  {id:503,nom:"CRC Belgique",role:"Simon F.",categorie:"Salles Belgique",statut:"À contacter",ou:"Belgique",notes:"Aide artistes pour diffusion, répétitions, création.",relance:"",email:"info@crc-belgique.be"},
  {id:504,nom:"Art Base",role:"Simon F.",categorie:"Salles Belgique",statut:"À contacter",ou:"Belgique",notes:"Lieu multiculturel.",relance:"",email:"info2@art-base.be"},
  {id:505,nom:"Reflektor",role:"Simon F.",categorie:"Salles Belgique",statut:"À contacter",ou:"Belgique",notes:"Éclectique.",relance:"",email:""},
  {id:506,nom:"Om Concerts",role:"Simon F.",categorie:"Salles Belgique",statut:"À contacter",ou:"Belgique",notes:"Grande salle (programme Tamino). Peuvent connecter avec d'autres lieux.",relance:"",email:""},
  {id:601,nom:"Katia",role:"Réalisatrice",categorie:"Musique de Film",statut:"En attente",ou:"Festival Marseille",notes:"Film Braquer Beyrouth — mail envoyé 30/04/2026. Prix Avant-Son Sœurs Jumelles possible ensemble.",relance:"21/05/2026",email:""},
  {id:602,nom:"Clémence Ducreux",role:"Réalisatrice / DA",categorie:"Musique de Film",statut:"Deal ✓",ou:"Studio",notes:"Enregistrement voix 03/2025.",relance:"",email:""},
  {id:603,nom:"Prod. Films du Soleil",role:"Producteur",categorie:"Musique de Film",statut:"Contacté",ou:"",notes:"Film documentaire 03/2025.",relance:"",email:""},
  {id:604,nom:"UNIVERSAL Library",role:"Direction artistique",categorie:"Musique de Film",statut:"Deal ✓",ou:"",notes:"3 titres placés en 2025 : A Place I Feel Safe, Letting You Go, Glow Frequency.",relance:"",email:""},
];
const QUAND = ["Cette semaine","Ce mois","Plus tard"];
const STATUTS = ["À faire","En cours","Fait ✓"];

const POLE_COLORS = {
  "EP Lahwa":      { bg: "#F7EDF3", text: "#993556" },
  "Musique Film":  { bg: "#EEEDFE", text: "#534AB7" },
  "Association":   { bg: "#E4F5F4", text: "#2A8F8A" },
  "Ateliers":      { bg: "#FDF0E8", text: "#D4732A" },
  "Collabs":       { bg: "#E5EFF8", text: "#3A6FA8" },
  "Compositions":  { bg: "#EAF3DE", text: "#3B6D11" },
  "Admin":         { bg: "#F4F1FA", text: "#6A5A8A" },
  "Perso":         { bg: "#FAEEDA", text: "#854F0B" },
};

const QUAND_COLORS = {
  "Cette semaine": { bg: "#FCEBEB", text: "#A32D2D" },
  "Ce mois":       { bg: "#FAEEDA", text: "#854F0B" },
  "Plus tard":     { bg: "#EAF3DE", text: "#3B6D11" },
};

const STATUT_COLORS = {
  "À faire":  { bg: "#F4F1FA", text: "#6A5A8A" },
  "En cours": { bg: "#E5EFF8", text: "#3A6FA8" },
  "Fait ✓":   { bg: "#EAF3DE", text: "#3B6D11" },
};

const initTaches = [
  { id:1,  tache:"Répondre Hélène — Warner Chappell, showcase Cannes", pole:"Musique Film", quand:"Cette semaine", statut:"À faire", deadline:"05/05/2026" },
  { id:2,  tache:"Déclarer CESU Shani — avril", pole:"Admin", quand:"Cette semaine", statut:"À faire", deadline:"05/05/2026" },
  { id:3,  tache:"Avancer sur la nouvelle chanson", pole:"EP Lahwa", quand:"Cette semaine", statut:"En cours", deadline:"14/05/2026" },
  { id:4,  tache:"Mixer les 2 poèmes — centre maternel", pole:"Ateliers", quand:"Cette semaine", statut:"À faire", deadline:"14/05/2026" },
  { id:5,  tache:"Morceau instrumental pour Melissa", pole:"Ateliers", quand:"Cette semaine", statut:"À faire", deadline:"14/05/2026" },
  { id:6,  tache:"Dossier candidature MAMA 2026", pole:"EP Lahwa", quand:"Cette semaine", statut:"À faire", deadline:"15/05/2026" },
  { id:7,  tache:"Mail à Katia — relance film Braquer Beyrouth", pole:"Musique Film", quand:"Cette semaine", statut:"Fait ✓", deadline:"" },
  { id:8,  tache:"Créer setlist SACEM pour concerts live", pole:"Admin", quand:"Ce mois", statut:"À faire", deadline:"" },
  { id:9,  tache:"Modifier déclarations SACEM — Paolo en ayant droit", pole:"Admin", quand:"Ce mois", statut:"À faire", deadline:"" },
  { id:10, tache:"Prix Avant-Son — Sœurs Jumelles x Sony", pole:"Musique Film", quand:"Ce mois", statut:"À faire", deadline:"29/05/2026" },
  { id:11, tache:"Répondre famille Millar — arrivée bébé", pole:"Perso", quand:"Ce mois", statut:"À faire", deadline:"" },
  { id:12, tache:"Écrire à l'avocate — décision juge copro", pole:"Perso", quand:"Ce mois", statut:"À faire", deadline:"" },
  { id:13, tache:"Poster photos & vidéos du dernier concert", pole:"EP Lahwa", quand:"Ce mois", statut:"À faire", deadline:"" },
  { id:14, tache:"Inscription SPEDIDAM", pole:"Admin", quand:"Ce mois", statut:"À faire", deadline:"" },
  { id:15, tache:"Décision éditeur vs autoprod EP Lahwa", pole:"EP Lahwa", quand:"Ce mois", statut:"À faire", deadline:"" },
  { id:16, tache:"Mise à jour ordi & portable", pole:"Admin", quand:"Ce mois", statut:"À faire", deadline:"" },
  { id:17, tache:"Demande licence de spectacle — association", pole:"Association", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:18, tache:"Vérifier droits ADAMI — aide promo", pole:"Admin", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:19, tache:"Calendrier éditorial réseaux sociaux", pole:"EP Lahwa", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:20, tache:"Chercher nouvel appartement", pole:"Perso", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:21, tache:"Échelonnement remboursement Etienne", pole:"Perso", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:22, tache:"Candidature Bars en Trans 2026", pole:"EP Lahwa", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:23, tache:"Acheter vélo cargo — Etienne & Ennio", pole:"Perso", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:24, tache:"Comptabilité claire — vision mensuelle", pole:"Admin", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:25, tache:"RDV médecin — fatigue chronique", pole:"Perso", quand:"Plus tard", statut:"À faire", deadline:"" },
  { id:26, tache:"Payer les amendes", pole:"Perso", quand:"Cette semaine", statut:"À faire", deadline:"" },
  { id:27, tache:"RDV accordeur de piano", pole:"Perso", quand:"Ce mois", statut:"À faire", deadline:"" },
];

const initInbox = [
  { id:1, text:"", done:false }
];

const PAGES = [
  { id:"accueil",  icon:"🏡", label:"Vue d'ensemble" },
  { id:"inbox",    icon:"📬", label:"Inbox" },
  { id:"semaine",  icon:"🗓️", label:"Ma semaine" },
  { id:"taches",   icon:"📋", label:"Mes tâches" },
  { id:"projets",  icon:"🎯", label:"Mes projets" },
  { id:"contacts", icon:"📇", label:"Contacts" },
  { id:"flanerie", icon:"🌿", label:"Flânerie" },
  { id:"finances", icon:"💰", label:"Mes finances" },
];

function Badge({ label, colors, small }) {
  return (
    <span style={{
      display:"inline-block", fontSize: small ? 10 : 11, fontWeight:500,
      padding: small ? "1px 7px" : "2px 9px",
      borderRadius:20, background:colors.bg, color:colors.text,
      whiteSpace:"nowrap"
    }}>{label}</span>
  );
}

function Checkbox({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{
      width:16, height:16, borderRadius:4, flexShrink:0, cursor:"pointer",
      border: checked ? "none" : "1.5px solid #C0B8D0",
      background: checked ? "#3B6D11" : "transparent",
      display:"flex", alignItems:"center", justifyContent:"center",
      transition:"all 0.15s"
    }}>
      {checked && <span style={{color:"#fff",fontSize:10,lineHeight:1}}>✓</span>}
    </div>
  );
}

export default function NotionYasmine() {
  const [page, setPage] = useState("accueil");
  const [taches, setTaches] = useState(initTaches);
  const [inbox, setInbox] = useState([{id:Date.now(), text:"", done:false}]);
  const [filterQuand, setFilterQuand] = useState("Cette semaine");
  const [filterPole, setFilterPole] = useState("Tous");
  const [semainePrios, setSemainePrios] = useState(["Finir la nouvelle chanson pour le concert du 15 mai", "Compo instrumentale pour Melissa — centre maternel", "Appeler Cléo — concert juin (rémunéré ?)"]);
  const [semaineDeadlines, setSemaineDeadlines] = useState(["Mercredi 7 mai — Concert 🎤", "15 mai — MAMA candidature", "29 mai — Prix Avant-Son Sœurs Jumelles"]);
  const [semaineAttente, setSemaineAttente] = useState(["Katia — réponse film Braquer Beyrouth (mail envoyé 30/04)", "Cléo — proposition concert juin", "Centre maternel — confirmation décalage RDV lundi 12 mai"]);
  const [contacts, setContacts] = useState(initContacts);
  const [flanerie, setFlanerie] = useState({
    artistes: [
      { id:1,  nom:"Arca",                genre:"Électronique · Expérimental · Venezuela", note:"Écouter : Xen (2014) — ou Kick i pour commencer. A co-produit Vulnicura et Utopia avec Björk.", ecoute:false },
      { id:2,  nom:"Julia Holter",         genre:"Art pop · Orchestral · Californie",       note:"Écouter : Aviary (2018) — Ravel rencontrant une chanteuse d'avant-garde. Songwriting cinématographique total.", ecoute:false },
      { id:3,  nom:"Julianna Barwick",     genre:"Ambient · Voix en boucle · USA",          note:"Écouter : Nepenthe (2013) — la voix humaine comme seul instrument, démultipliée en nappes hypnotiques.", ecoute:false },
      { id:4,  nom:"Holly Herndon",        genre:"Électronique · Choral · IA",              note:"Écouter : PROTO (2019) — chœurs impossibles créés avec l'IA. Pousse Björk encore plus loin dans le futur.", ecoute:false },
      { id:5,  nom:"Ryuichi Sakamoto",     genre:"Piano · Électronique · Japon",            note:"Écouter : 12 (2023) — enregistré face à la mort. Ou async (2017) pour la dimension film.", ecoute:false },
      { id:6,  nom:"Hildur Guðnadóttir",   genre:"Violoncelle · Orchestral · Islande",      note:"Écouter : Joker OST (2019) ou Chernobyl OST. Compositrice — exactement ton territoire.", ecoute:false },
      { id:7,  nom:"Jóhann Jóhannsson",    genre:"Orchestral · Électronique · Islande",     note:"Écouter : Arrival OST ou Orphée (2016). Pont parfait entre Greenwood et Desplat. Décédé 2018.", ecoute:false },
      { id:8,  nom:"Max Richter",          genre:"Néo-classique · Minimaliste · Allemagne", note:"Écouter : On the Nature of Daylight (morceau) — ou Sleep pour l'œuvre conceptuelle. Héritier de Ravel.", ecoute:false },
      { id:9,  nom:"Scott Walker",         genre:"Avant-garde · Orchestral · USA/UK",       note:"Écouter : Scott 4 (1969) pour commencer, puis The Drift (2006). Cité par Thom Yorke comme influence majeure.", ecoute:false },
      { id:10, nom:"Talk Talk",            genre:"Post-rock · Jazz · Ambient · UK",          note:"Écouter : Spirit of Eden (1988) — Radiohead dit que c'est la plus grande influence de Kid A.", ecoute:false },
      { id:11, nom:"Nick Cave & Warren Ellis", genre:"Songwriting · Film · Australie",      note:"Écouter : The Assassination of Jesse James OST ou Carnage (2021). Warren Ellis = l'équivalent de Greenwood pour Cave.", ecoute:false },
      { id:12, nom:"Sufjan Stevens",       genre:"Folk · Orchestral · Électronique · USA",  note:"Écouter : Carrie & Lowell (2015) pour la douleur intime, ou Call Me By Your Name OST pour le film.", ecoute:false },
    ],
    films: [
      { id:1, titre:"Les Échappées", real:"Katia", note:"Documentaire de Katia — demander le lien", vu:false },
      { id:2, titre:"Houria", real:"", note:"BO écoutée par 22D — ils ont bien aimé", vu:false },
      { id:3, titre:"Les Demoiselles de Rochefort", real:"Jacques Demy", note:"Film fondateur du festival Sœurs Jumelles", vu:false },
    ],
    inspirations: [
      { id:1, texte:"Piano Day Arte — événement à suivre (Palmier Rouge)", categorie:"Événement" },
      { id:2, texte:"Fondation Cartier — Soirées Nomades (via Sync Sync)", categorie:"Lieu" },
      { id:3, texte:"Institut du Monde Arabe (via Sync Sync)", categorie:"Lieu" },
      { id:4, texte:"Festival Sœurs Jumelles — Rochefort (23-28 juin 2026)", categorie:"Festival" },
      { id:5, texte:"No Format — label à explorer (via 22D)", categorie:"Label" },
      { id:6, texte:"Librairie 7L — Paris, lieu atypique pour concerts", categorie:"Lieu" },
    ]
  });
  const [concertMode, setConcertMode] = useState(false);
  const [intention, setIntention] = useState("Créer, avancer, et prendre soin de moi.");
  const [accomplissements, setAccomplissements] = useState("Mail à Katia envoyé ✓");
  const [selectedPole, setSelectedPole] = useState(null);
  const [projetsSteps, setProjetsSteps] = useState({
    "EP Lahwa": [
      { section:"Production EP", items:[
        {id:"ep1",text:"Finaliser les arrangements",done:false,prio:"urgent"},
        {id:"ep2",text:"Sessions d'enregistrement restantes",done:false,prio:"urgent"},
        {id:"ep3",text:"Mixage & mastering",done:false,prio:"moyen"},
      ]},
      { section:"Sortie & Communication", items:[
        {id:"ep4",text:"Définir la date de sortie officielle",done:false,prio:"urgent"},
        {id:"ep5",text:"Stratégie réseaux sociaux — calendrier éditorial",done:false,prio:"moyen"},
        {id:"ep6",text:"Shooting photos / direction artistique visuelle",done:false,prio:"moyen"},
        {id:"ep7",text:"Rédiger le dossier de presse",done:false,prio:"moyen"},
        {id:"ep8",text:"Envoi aux journalistes & blogueurs",done:false,prio:"faible"},
        {id:"ep9",text:"Distribution numérique (Distrokid, CD Baby…)",done:false,prio:"moyen"},
      ]},
      { section:"Booking & Scènes Live", items:[
        {id:"ep10",text:"Mettre à jour le dossier de booking",done:false,prio:"urgent"},
        {id:"ep11",text:"Dresser la liste des salles & festivals à démarcher",done:false,prio:"moyen"},
        {id:"ep12",text:"Envoi des dossiers aux programmateurs",done:false,prio:"moyen"},
        {id:"ep13",text:"Suivi des relances (tableau de bord booking)",done:false,prio:"faible"},
      ]},
    ],
    "Musique Film": [
      { section:"Projets en cours", items:[
        {id:"mf1",text:"Lister tous les projets actifs avec deadlines",done:false,prio:"urgent"},
        {id:"mf2",text:"Créer une fiche de suivi par projet (brief, livrables, paiement)",done:false,prio:"urgent"},
        {id:"mf3",text:"Vérifier les déclarations SACEM en cours",done:false,prio:"urgent"},
      ]},
      { section:"Prospection", items:[
        {id:"mf4",text:"Mettre à jour le portfolio (reel, site web)",done:false,prio:"urgent"},
        {id:"mf5",text:"Identifier les réalisateurs & producteurs à contacter",done:false,prio:"moyen"},
        {id:"mf6",text:"Envoyer le démo reel aux superviseurs musicaux / agences",done:false,prio:"moyen"},
        {id:"mf7",text:"Participer à des festivals de cinéma (networking)",done:false,prio:"faible"},
      ]},
      { section:"Admin & Droits", items:[
        {id:"mf8",text:"Archiver les contrats de cession de droits",done:false,prio:"moyen"},
        {id:"mf9",text:"Vérifier les factures et paiements en attente",done:false,prio:"urgent"},
      ]},
    ],
    "Association": [
      { section:"Licence de Spectacle", items:[
        {id:"as1",text:"Rassembler les pièces justificatives requises",done:false,prio:"urgent"},
        {id:"as2",text:"Remplir le dossier sur le portail CNM / DRAC",done:false,prio:"urgent"},
        {id:"as3",text:"Déposer la demande de licence",done:false,prio:"urgent"},
        {id:"as4",text:"Suivre l'avancement de la demande",done:false,prio:"moyen"},
      ]},
      { section:"Comptabilité", items:[
        {id:"as5",text:"Choisir un outil de compta (Pennylane, Dougs…)",done:false,prio:"urgent"},
        {id:"as6",text:"Ouvrir (ou dédier) un compte bancaire association",done:false,prio:"urgent"},
        {id:"as7",text:"Recenser toutes les entrées/sorties depuis la création",done:false,prio:"moyen"},
        {id:"as8",text:"Préparer le bilan annuel",done:false,prio:"moyen"},
      ]},
      { section:"Fonctionnement", items:[
        {id:"as9",text:"Mettre à jour le registre des membres",done:false,prio:"faible"},
        {id:"as10",text:"Organiser l'AG annuelle",done:false,prio:"moyen"},
        {id:"as11",text:"Vérifier la conformité des statuts",done:false,prio:"faible"},
      ]},
    ],
    "Ateliers": [
      { section:"Concept & Contenu", items:[
        {id:"at1",text:"Rédiger la fiche projet (objectifs, public, format)",done:false,prio:"urgent"},
        {id:"at2",text:"Créer le programme détaillé d'un atelier type",done:false,prio:"urgent"},
        {id:"at3",text:"Organiser un atelier pilote (test)",done:false,prio:"moyen"},
      ]},
      { section:"Partenaires & Financement", items:[
        {id:"at4",text:"Lister les pouponnières, PMI et crèches à contacter",done:false,prio:"moyen"},
        {id:"at5",text:"Rédiger un dossier de présentation institutionnel",done:false,prio:"moyen"},
        {id:"at6",text:"Rechercher des financements (DRAC, CAF, fondations)",done:false,prio:"faible"},
      ]},
      { section:"Cadre Légal", items:[
        {id:"at7",text:"Vérifier si la licence de spectacle couvre ce projet",done:false,prio:"moyen"},
        {id:"at8",text:"Rédiger une convention type avec les structures d'accueil",done:false,prio:"faible"},
      ]},
    ],
    "Collabs": [
      { section:"Projets en cours", items:[
        {id:"co1",text:"Lister tous les projets de chansons entamés (artiste, titre, avancement)",done:false,prio:"urgent"},
        {id:"co2",text:"Pour chaque collab : définir la prochaine étape concrète",done:false,prio:"urgent"},
        {id:"co3",text:"Fixer des sessions de travail avec chaque artiste",done:false,prio:"moyen"},
      ]},
      { section:"Droits & Accord", items:[
        {id:"co4",text:"Vérifier les accords de co-écriture (partage de droits)",done:false,prio:"urgent"},
        {id:"co5",text:"Déclarer les œuvres communes à la SACEM",done:false,prio:"moyen"},
        {id:"co6",text:"Établir un accord écrit simple par collab",done:false,prio:"moyen"},
      ]},
      { section:"Finalisation & Sortie", items:[
        {id:"co7",text:"Identifier quelles collabs sont prêtes à être finalisées",done:false,prio:"moyen"},
        {id:"co8",text:"Décider : sortie solo, EP commun, ou single de l'artiste ?",done:false,prio:"moyen"},
        {id:"co9",text:"Planifier les sessions d'enregistrement finales",done:false,prio:"faible"},
      ]},
    ],
    "Compositions": [
      { section:"Idées & Ébauches", items:[
        {id:"cp1",text:"Centraliser toutes les idées (voice memos, carnets, notes…)",done:false,prio:"urgent"},
        {id:"cp2",text:"Classer les ébauches : idée brute / démo / en cours / à finir",done:false,prio:"urgent"},
        {id:"cp3",text:"Définir les thèmes ou l'univers du prochain projet",done:false,prio:"moyen"},
      ]},
      { section:"Écriture & Composition", items:[
        {id:"cp4",text:"Bloquer des créneaux d'écriture réguliers dans l'agenda",done:false,prio:"urgent"},
        {id:"cp5",text:"Finir les textes des titres les plus avancés",done:false,prio:"moyen"},
        {id:"cp6",text:"Travailler les arrangements des maquettes",done:false,prio:"moyen"},
        {id:"cp7",text:"Enregistrer des démos de référence pour chaque titre",done:false,prio:"moyen"},
      ]},
      { section:"Sélection & Vision", items:[
        {id:"cp8",text:"Sélectionner les titres retenus pour le prochain EP / album",done:false,prio:"faible"},
        {id:"cp9",text:"Définir la cohérence artistique et l'ordre des titres",done:false,prio:"faible"},
        {id:"cp10",text:"Décider : EP (4–6 titres) ou album (10–12 titres) ?",done:false,prio:"faible"},
      ]},
    ],
  });
  const [filterCat, setFilterCat] = useState("Tous");
  const [filterStatutC, setFilterStatutC] = useState("Tous");
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({nom:"",role:"",categorie:"Éditeurs",statut:"À contacter",ou:"",email:"",tel:"",notes:"",relance:""});
  const [newTache, setNewTache] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [addQuand, setAddQuand] = useState("Cette semaine");
  const [addPole, setAddPole] = useState("EP Lahwa");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (() => {
      try {
        const raw = localStorage.getItem("notion-yasmine-v7");
        if (raw) {
          const d = JSON.parse(raw);
          if (d.taches) setTaches(d.taches);
          if (d.contacts) setContacts(d.contacts);
          if (d.intention) setIntention(d.intention);
          if (d.accomplissements) setAccomplissements(d.accomplissements);
          if (d.projetsSteps) setProjetsSteps(d.projetsSteps);
          if (d.inbox) setInbox(d.inbox);
          if (d.semainePrios) setSemainePrios(d.semainePrios);
          if (d.semaineDeadlines) setSemaineDeadlines(d.semaineDeadlines);
          if (d.semaineAttente) setSemaineAttente(d.semaineAttente);
        }
      } catch {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem("notion-yasmine-v7", JSON.stringify({taches,contacts,flanerie,projetsSteps,intention,accomplissements,inbox,semainePrios,semaineDeadlines,semaineAttente})); } catch(e) {}
  }, [taches, contacts, flanerie, projetsSteps, intention, accomplissements, inbox, semainePrios, semaineDeadlines, semaineAttente, loaded]);

  const toggleProjStep = (pole, secTitle, itemId) => {
    setProjetsSteps(prev => ({
      ...prev,
      [pole]: prev[pole].map(sec =>
        sec.section !== secTitle ? sec : {
          ...sec,
          items: sec.items.map(it => it.id===itemId ? {...it, done:!it.done} : it)
        }
      )
    }));
  };

  const addContact = () => {
    if (!newContact.nom.trim()) return;
    setContacts(c => [...c, {...newContact, id:Date.now()}]);
    setNewContact({nom:"",role:"",categorie:"Musique de Film",statut:"À contacter",ou:"",notes:"",relance:""});
    setShowAddContact(false);
  };

  const updateContactStatut = (id) => {
    const order = ["À contacter","Contacté","En attente","Relancé","Deal ✓","Pas pour l'instant"];
    setContacts(c => c.map(ct => ct.id!==id ? ct : {...ct, statut: order[(order.indexOf(ct.statut)+1)%order.length]}));
  };

  const filteredContacts = contacts.filter(c =>
    (filterCat==="Tous" || c.categorie===filterCat) &&
    (filterStatutC==="Tous" || c.statut===filterStatutC)
  );

  const toggleStatut = (id) => {
    setTaches(t => t.map(task =>
      task.id !== id ? task : {
        ...task,
        statut: task.statut === "Fait ✓" ? "À faire" : task.statut === "À faire" ? "En cours" : "Fait ✓"
      }
    ));
  };

  const addToTaches = () => {
    if (!newTache.trim()) return;
    setTaches(t => [...t, {
      id: Date.now(), tache: newTache.trim(),
      pole: addPole, quand: addQuand, statut:"À faire", deadline:""
    }]);
    setNewTache(""); setShowAdd(false);
  };

  const addInboxLine = () => setInbox(i => [...i, {id:Date.now(), text:"", done:false}]);
  const updateInbox = (id, text) => setInbox(i => i.map(l => l.id===id ? {...l,text} : l));
  const toggleInbox = (id) => setInbox(i => i.map(l => l.id===id ? {...l,done:!l.done} : l));
  const moveToTaches = (item) => {
    if (!item.text.trim()) return;
    setTaches(t => [...t, {id:Date.now(), tache:item.text, pole:"EP Lahwa", quand:"Cette semaine", statut:"À faire", deadline:""}]);
    setInbox(i => i.filter(l => l.id !== item.id));
  };

  const filtered = taches.filter(t =>
    t.quand === filterQuand &&
    (filterPole === "Tous" || t.pole === filterPole)
  );

  const thisWeekDone = taches.filter(t => t.quand==="Cette semaine" && t.statut==="Fait ✓").length;
  const thisWeekTotal = taches.filter(t => t.quand==="Cette semaine").length;

  // Deadline alerts — parse DD/MM/YYYY and check within 7 days
  const parseDate = (str) => {
    if (!str) return null;
    const p = str.split("/");
    if (p.length < 3) return null;
    return new Date(parseInt(p[2]), parseInt(p[1])-1, parseInt(p[0]));
  };
  const today = new Date(); today.setHours(0,0,0,0);
  const in7 = new Date(today); in7.setDate(today.getDate()+7);
  const urgentDeadlines = taches.filter(t => {
    if (t.statut==="Fait ✓" || !t.deadline) return false;
    const d = parseDate(t.deadline);
    return d && d <= in7;
  }).sort((a,b) => parseDate(a.deadline) - parseDate(b.deadline));

  const daysLeft = (str) => {
    const d = parseDate(str); if (!d) return null;
    return Math.ceil((d - today)/(1000*60*60*24));
  };

  // Concert mode — tasks related to the concert
  const concertKeywords = ["chanson","concert","setlist","scène","live","mixage","morceau","melissa","poème","répét","scène","spectacle"];
  const concertTaches = taches.filter(t =>
    t.statut !== "Fait ✓" && (
      concertKeywords.some(k => t.tache.toLowerCase().includes(k)) ||
      t.pole === "EP Lahwa" || t.pole === "Ateliers"
    )
  );

  return (
    <div style={{display:"flex", height:"100vh", fontFamily:"'DM Sans', system-ui, sans-serif", background:"#FAF7F2", overflow:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Fraunces:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet"/>

      {/* Sidebar */}
      <div style={{width:224, background:"#F5EFE6", borderRight:"0.5px solid #E2D9CE", display:"flex", flexDirection:"column", padding:"16px 8px", flexShrink:0}}>
        <div style={{padding:"8px 12px 16px", borderBottom:"0.5px solid #E2D9CE", marginBottom:8}}>
          <div style={{fontFamily:"Fraunces, serif", fontSize:17, fontWeight:400, color:"#2A1A0A", letterSpacing:0.5}}>Yasmine</div>
          <div style={{fontSize:10, color:"#A09070", letterSpacing:1, textTransform:"uppercase", marginTop:2}}>Mon espace de travail</div>
        </div>

        {PAGES.map(p => (
          <button key={p.id} onClick={()=>setPage(p.id)} style={{
            display:"flex", alignItems:"center", gap:8, padding:"7px 12px",
            borderRadius:6, border:"none", cursor:"pointer", textAlign:"left", width:"100%",
            background: page===p.id ? "#F0E8DA" : "transparent",
            color: page===p.id ? "#8B5E3C" : "#6A5A48",
            fontSize:13, fontFamily:"inherit", fontWeight: page===p.id ? 500 : 400,
            transition:"all 0.1s"
          }}>
            <span style={{fontSize:14}}>{p.icon}</span>
            {p.label}
            {p.id==="contacts" && contacts.filter(c=>c.relance && c.statut!=="Deal ✓").length > 0 && (
              <span style={{marginLeft:"auto", background:"#C9884C", color:"#fff", fontSize:10, borderRadius:10, padding:"1px 6px", fontWeight:600}}>
                {contacts.filter(c=>c.relance && c.statut!=="Deal ✓").length}
              </span>
            )}
            {p.id==="inbox" && inbox.filter(i=>!i.done && i.text).length > 0 && (
              <span style={{marginLeft:"auto", background:"#C9884C", color:"#fff", fontSize:10, borderRadius:10, padding:"1px 6px", fontWeight:600}}>
                {inbox.filter(i=>!i.done && i.text).length}
              </span>
            )}
            {p.id==="semaine" && (
              <span style={{marginLeft:"auto", background:"#8B5E3C", color:"#fff", fontSize:10, borderRadius:10, padding:"1px 6px", fontWeight:600}}>
                {thisWeekTotal - thisWeekDone}
              </span>
            )}
          </button>
        ))}

        <div style={{marginTop:"auto", padding:"12px", borderTop:"0.5px solid #E2D9CE"}}>
          <button onClick={()=>setConcertMode(m=>!m)} style={{
            width:"100%", padding:"8px 10px", borderRadius:8, border:"none", cursor:"pointer",
            fontFamily:"inherit", fontSize:12, fontWeight:500, transition:"all 0.2s",
            background: concertMode ? "#8B5E3C" : "#EDE0D0",
            color: concertMode ? "#fff" : "#8B5E3C",
          }}>
            {concertMode ? "♪ Mode Concert ON" : "♪ Mode Concert"}
          </button>
          <div style={{fontSize:10, color:"#B0A080", marginTop:8, textAlign:"center"}}>Sauvegardé automatiquement</div>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1, overflowY:"auto", padding:"32px 40px", position:"relative"}}>

        {/* INBOX */}
        {page==="inbox" && (
          <div style={{maxWidth:680}}>
            <div style={{fontFamily:"Fraunces, serif", fontSize:28, fontWeight:300, color:"#2A1A4A", marginBottom:4}}>📥 Inbox</div>
            <div style={{fontSize:13, color:"#A09080", marginBottom:28}}>Capture tout ici sans trier. Tu déplaceras dans Mes tâches le dimanche soir ou dès que c'est urgent.</div>

            {inbox.map((item, idx) => (
              <div key={item.id} style={{display:"flex", alignItems:"flex-start", gap:10, marginBottom:8, padding:"8px 12px", background:"#fff", borderRadius:8, border:"0.5px solid #E8E5E0"}}>
                <Checkbox checked={item.done} onChange={()=>toggleInbox(item.id)}/>
                <input
                  value={item.text}
                  onChange={e=>updateInbox(item.id, e.target.value)}
                  onKeyDown={e=>{ if(e.key==="Enter") addInboxLine(); }}
                  placeholder={idx===0 ? "Note quelque chose ici... (Entrée pour ajouter une ligne)" : "..."}
                  style={{flex:1, border:"none", outline:"none", fontSize:13, color: item.done ? "#B0A898" : "#2A1A4A",
                    textDecoration: item.done ? "line-through" : "none",
                    background:"transparent", fontFamily:"inherit"}}
                />
                {item.text && !item.done && (
                  <button onClick={()=>moveToTaches(item)} style={{
                    fontSize:10, background:"#EEEDFE", color:"#534AB7", border:"none",
                    borderRadius:12, padding:"2px 8px", cursor:"pointer", fontFamily:"inherit", fontWeight:500, whiteSpace:"nowrap"
                  }}>→ Tâches</button>
                )}
              </div>
            ))}

            <button onClick={addInboxLine} style={{
              border:"none", background:"none", color:"#B0A898", fontSize:12,
              cursor:"pointer", fontFamily:"inherit", padding:"4px 12px", marginTop:4
            }}>+ Nouvelle ligne</button>
          </div>
        )}

        {/* VUE D'ENSEMBLE */}
        {page==="accueil" && !concertMode && (
          <div style={{maxWidth:860}}>

            {/* Bonjour — salutation chaleureuse */}
            <div style={{marginBottom:28}}>
              <div style={{fontFamily:"Fraunces, serif", fontSize:32, fontWeight:300, color:"#2A1A0A", letterSpacing:0.5}}>
                Bonjour Yasmine ✦
              </div>
              <div style={{fontSize:13, color:"#A09070", marginTop:4}}>
                {new Date().toLocaleDateString("fr-FR", {weekday:"long", day:"numeric", month:"long", year:"numeric"})}
              </div>
            </div>

            {/* Deux blocs : intention + ce que j'ai fait */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:28}}>
              <div style={{background:"#F0E8DA", borderRadius:10, padding:"18px 20px", border:"0.5px solid #E2D5C0"}}>
                <div style={{fontSize:10, fontWeight:500, color:"#8B5E3C", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:10}}>✦ Mon intention de la semaine</div>
                <textarea value={intention} onChange={e=>setIntention(e.target.value)}
                  style={{width:"100%", background:"transparent", border:"none", outline:"none",
                    fontSize:14, fontFamily:"Fraunces, serif", fontStyle:"italic",
                    color:"#4A2A0A", resize:"none", lineHeight:1.6, minHeight:52}}
                  placeholder="Écris une intention pour cette semaine..."/>
              </div>
              <div style={{background:"#EAF0E4", borderRadius:10, padding:"18px 20px", border:"0.5px solid #CDE0C0"}}>
                <div style={{fontSize:10, fontWeight:500, color:"#4A7A3A", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:10}}>✓ Cette semaine j'ai déjà...</div>
                <textarea value={accomplissements} onChange={e=>setAccomplissements(e.target.value)}
                  style={{width:"100%", background:"transparent", border:"none", outline:"none",
                    fontSize:13, fontFamily:"inherit", color:"#2A4A1A", resize:"none",
                    lineHeight:1.7, minHeight:52}}
                  placeholder="Note ce que tu as accompli, même de petit..."/>
              </div>
            </div>

            {/* Concert dans X jours — bloc doux */}
            {urgentDeadlines.filter(t=>concertKeywords.some(k=>t.tache.toLowerCase().includes(k))||t.pole==="EP Lahwa").slice(0,1).map(t=>{
              const days = daysLeft(t.deadline);
              if (!days || days > 30) return null;
              return (
                <div key={t.id} style={{background:"#F7EDF3", border:"0.5px solid #E8C8D8", borderRadius:10,
                  padding:"16px 22px", marginBottom:28, display:"flex", alignItems:"center", gap:16}}>
                  <div style={{textAlign:"center", minWidth:60}}>
                    <div style={{fontFamily:"Fraunces, serif", fontSize:36, fontWeight:300, color:"#993556", lineHeight:1}}>{days}</div>
                    <div style={{fontSize:11, color:"#C07A9C"}}>jours</div>
                  </div>
                  <div>
                    <div style={{fontSize:14, fontWeight:500, color:"#2A1A4A"}}>avant le prochain concert</div>
                    <div style={{fontSize:12, color:"#C07A9C", marginTop:2}}>♪ Mode Concert disponible en bas de la sidebar</div>
                  </div>
                </div>
              );
            })}

            {/* Ce qui mérite mon attention — ton doux, pas stressant */}
            <div style={{background:"#FBF5EC", border:"0.5px solid #E8D8C0", borderRadius:10, overflow:"hidden", marginBottom:28}}>
              <div style={{padding:"14px 20px", borderBottom:"0.5px solid #F0E4D0", display:"flex", alignItems:"center", gap:8}}>
                <span style={{fontSize:13}}>◌</span>
                <span style={{fontSize:12, fontWeight:500, color:"#8B5E3C", textTransform:"uppercase", letterSpacing:"0.08em"}}>Ce qui mérite mon attention</span>
              </div>
              <div style={{padding:"16px 20px", display:"flex", flexDirection:"column", gap:8}}>
                {taches.filter(t=>t.statut!=="Fait ✓"&&t.quand==="Cette semaine").slice(0,5).map(t=>(
                  <div key={t.id} onClick={()=>toggleStatut(t.id)}
                    style={{display:"flex", alignItems:"center", gap:10, padding:"8px 12px",
                      background:"#fff", borderRadius:7, cursor:"pointer", border:"0.5px solid #F0E4D0"}}>
                    <Checkbox checked={t.statut==="Fait ✓"} onChange={()=>{}}/>
                    <span style={{fontSize:13, color:"#4A3020", flex:1}}>{t.tache}</span>
                    {t.deadline && <span style={{fontSize:10, color:"#C9884C"}}>→ {t.deadline}</span>}
                  </div>
                ))}
                {taches.filter(t=>t.statut!=="Fait ✓"&&t.quand==="Cette semaine").length===0 && (
                  <div style={{textAlign:"center", color:"#C0A888", fontSize:13, padding:"12px 0"}}>
                    Tout est fait pour cette semaine — bravo ✦
                  </div>
                )}
              </div>
            </div>

            {/* Grille des pôles — chaleur, focus sur l'accompli */}
            <div style={{fontSize:10, fontWeight:500, color:"#A09070", textTransform:"uppercase", letterSpacing:"0.09em", marginBottom:12}}>Mes pôles</div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10, marginBottom:28}}>
              {[
                {pole:"EP Lahwa",     icon:"♪"},
                {pole:"Musique Film", icon:"▶"},
                {pole:"Association",  icon:"◈"},
                {pole:"Ateliers",     icon:"✦"},
                {pole:"Collabs",      icon:"⟡"},
                {pole:"Compositions", icon:"✍"},
                {pole:"Admin",        icon:"◎"},
                {pole:"Perso",        icon:"☽"},
              ].map(({pole,icon})=>{
                const c = POLE_COLORS[pole]||{bg:"#F5EFE6",text:"#8B5E3C"};
                const pSteps = projetsSteps[pole]||[];
                const allStepItems = pSteps.flatMap(s=>s.items);
                const allT = taches.filter(t=>t.pole===pole);
                const totalAll = allT.length + allStepItems.length;
                const doneAll = allT.filter(t=>t.statut==="Fait ✓").length + allStepItems.filter(i=>i.done).length;
                const pct = totalAll ? Math.round(doneAll/totalAll*100) : 0;
                const r=24, circ=2*Math.PI*r;
                return (
                  <div key={pole} onClick={()=>{setPage("projets");setSelectedPole(pole);}}
                    style={{background:"#fff", border:"0.5px solid #E8E0D4", borderRadius:10,
                      padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12,
                      transition:"all 0.15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="#FBF7F2"}
                    onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                    <svg width="56" height="56" viewBox="0 0 56 56" style={{flexShrink:0}}>
                      <circle cx="28" cy="28" r={r} fill="none" stroke="#EDE0D0" strokeWidth="4.5"/>
                      <circle cx="28" cy="28" r={r} fill="none" stroke={c.text}
                        strokeWidth="4.5"
                        strokeDasharray={circ}
                        strokeDashoffset={circ*(1-pct/100)}
                        strokeLinecap="round"
                        transform="rotate(-90 28 28)"
                        style={{transition:"stroke-dashoffset 0.6s ease"}}/>
                      <text x="28" y="25" textAnchor="middle" fill={c.text} fontSize="11" fontFamily="inherit">{icon}</text>
                      <text x="28" y="38" textAnchor="middle" fill={c.text} fontSize="11" fontFamily="inherit" fontWeight="500">{pct}%</text>
                    </svg>
                    <div>
                      <div style={{fontSize:12, fontWeight:500, color:"#2A1A0A"}}>{pole}</div>
                      <div style={{fontSize:10, color:"#A09070", marginTop:2}}>{doneAll}/{totalAll} faits</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE CONCERT */}
        {concertMode && (
          <div style={{position:"absolute", inset:0, background:"#1A0A1A", zIndex:50, overflowY:"auto", padding:"40px"}}>
            <div style={{maxWidth:700, margin:"0 auto"}}>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32}}>
                <div>
                  <div style={{fontFamily:"Fraunces, serif", fontSize:32, fontWeight:300, color:"#F7EDF3", letterSpacing:1}}>♪ Mode Concert</div>
                  <div style={{fontSize:13, color:"#C07A9C", marginTop:4}}>Focus total — uniquement les tâches du show. Tout le reste disparaît.</div>
                </div>
                <button onClick={()=>setConcertMode(false)} style={{
                  background:"rgba(255,255,255,0.08)", border:"0.5px solid #5A2A4A", color:"#F7EDF3",
                  borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:"inherit", fontSize:12
                }}>Quitter le mode concert</button>
              </div>

              {/* Concert dans X jours */}
              {urgentDeadlines.filter(t=>t.pole==="EP Lahwa"||concertKeywords.some(k=>t.tache.toLowerCase().includes(k))).slice(0,1).map(t=>{
                const days = daysLeft(t.deadline);
                return (
                  <div key={t.id} style={{background:"rgba(192,122,156,0.15)", border:"1px solid #993556", borderRadius:12, padding:"20px 24px", marginBottom:28, textAlign:"center"}}>
                    <div style={{fontSize:48, fontWeight:300, color:"#F7EDF3", fontFamily:"Fraunces, serif"}}>{days}</div>
                    <div style={{fontSize:14, color:"#C07A9C"}}>jours avant le concert</div>
                  </div>
                );
              })}

              {/* Tâches concert groupées */}
              {["Cette semaine","Ce mois","Plus tard"].map(quand => {
                const tasks = concertTaches.filter(t=>t.quand===quand);
                if (!tasks.length) return null;
                return (
                  <div key={quand} style={{marginBottom:20}}>
                    <div style={{fontSize:10, fontWeight:500, color:"#993556", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10}}>{quand}</div>
                    {tasks.map(t=>(
                      <div key={t.id} onClick={()=>toggleStatut(t.id)}
                        style={{display:"flex", alignItems:"center", gap:12, padding:"12px 16px", marginBottom:6,
                          background:"rgba(255,255,255,0.05)", border:"0.5px solid #3A1A3A",
                          borderRadius:8, cursor:"pointer", transition:"background 0.15s"}}>
                        <div style={{
                          width:20, height:20, borderRadius:4, flexShrink:0,
                          border: t.statut==="Fait ✓" ? "none" : "1.5px solid #993556",
                          background: t.statut==="Fait ✓" ? "#993556" : "transparent",
                          display:"flex", alignItems:"center", justifyContent:"center"
                        }}>
                          {t.statut==="Fait ✓" && <span style={{color:"#fff",fontSize:10}}>✓</span>}
                        </div>
                        <span style={{fontSize:14, color: t.statut==="Fait ✓"?"#6A3A5A":"#F7EDF3",
                          textDecoration: t.statut==="Fait ✓"?"line-through":"none"}}>{t.tache}</span>
                        {t.deadline && <span style={{marginLeft:"auto", fontSize:11, color:"#C07A9C", flexShrink:0}}>{t.deadline}</span>}
                      </div>
                    ))}
                  </div>
                );
              })}

              {concertTaches.length === 0 && (
                <div style={{textAlign:"center", color:"#6A3A5A", fontSize:14, marginTop:60}}>
                  Toutes les tâches concert sont cochées ✓
                </div>
              )}
            </div>
          </div>
        )}

        {/* MA SEMAINE */}
        {page==="semaine" && !concertMode && (
          <div style={{maxWidth:720}}>
            <div style={{display:"flex", alignItems:"baseline", gap:12, marginBottom:4}}>
              <div style={{fontFamily:"Fraunces, serif", fontSize:28, fontWeight:300, color:"#2A1A0A"}}>🗓️ Ma semaine</div>
              <div style={{fontSize:12, color:"#A09070"}}>5 — 11 mai 2026</div>
            </div>
            <div style={{fontSize:13, color:"#A09070", marginBottom:20}}>3 priorités maximum. Mise à jour chaque dimanche soir.</div>

            {/* Alertes deadlines automatiques < 7 jours */}
            {urgentDeadlines.length > 0 && (
              <div style={{background:"#FBF0E8", border:"1px solid #E8C8A0", borderRadius:10, padding:"14px 18px", marginBottom:20}}>
                <div style={{fontSize:11, fontWeight:500, color:"#8B5E3C", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>
                  ⏰ Deadlines dans moins de 7 jours
                </div>
                {urgentDeadlines.map(t => {
                  const days = daysLeft(t.deadline);
                  return (
                    <div key={t.id} style={{display:"flex", alignItems:"center", gap:10, marginBottom:6, padding:"7px 10px",
                      background: days <= 0 ? "#E8C0B0" : days <= 2 ? "#F0D0B0" : "#FBE8D0",
                      borderRadius:6}}>
                      <span style={{fontSize:11, fontWeight:700, color:"#8B3A1A", minWidth:32, textAlign:"center"}}>
                        {days <= 0 ? "⚠️" : `J-${days}`}
                      </span>
                      <span style={{fontSize:12, color:"#4A2A0A", flex:1}}>{t.tache}</span>
                      <span style={{fontSize:10, color:"#8B5E3C", flexShrink:0}}>{t.deadline}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Agenda de la semaine — spécifique */}
            <div style={{background:"#fff", border:"0.5px solid #E2D5C0", borderRadius:10, overflow:"hidden", marginBottom:16}}>
              <div style={{padding:"12px 20px", borderBottom:"0.5px solid #F0E4D0", background:"#FBF5EC", display:"flex", alignItems:"center", gap:8}}>
                <span style={{fontSize:14}}>📅</span>
                <span style={{fontSize:12, fontWeight:500, color:"#8B5E3C", textTransform:"uppercase", letterSpacing:"0.08em"}}>Cette semaine — agenda</span>
              </div>
              {[
                {jour:"Lundi 5",    icon:"🌅", color:"transparent", tag:"", items:[
                  {time:"Matin → 16h", tasks:["Appeler Cléo — proposition concert juin (rémunéré ?)","Compo instrumentale pour Melissa","Finir la nouvelle chanson — avancer le max","Décaler RDV centre maternel du mardi 13 au lundi 12 mai"]},
                  {time:"17h →", tasks:["🎸 Répétition pour le concert de mercredi"]},
                ]},
                {jour:"Mardi 6",   icon:"🎹", color:"transparent", tag:"", items:[
                  {time:"Matin", tasks:["RDV Centre maternel"]},
                  {time:"Après-midi", tasks:["Finir la nouvelle chanson","Répondre Hélène Warner Chappell — showcase Cannes"]},
                ]},
                {jour:"Mercredi 7",icon:"🎤", color:"#FBF0F5", tag:"CONCERT", items:[
                  {time:"Soirée", tasks:["🎤 Concert"]},
                ]},
                {jour:"Jeudi 8",   icon:"🎬", color:"transparent", tag:"", items:[
                  {time:"Matin", tasks:["Projection du film — écoute de ta musique à l'image 🎶"]},
                  {time:"Après-midi", tasks:["Temps libre — récupération après le concert"]},
                ]},
                {jour:"Vendredi 9",icon:"🌿", color:"#F2F7EE", tag:"OFF", items:[
                  {time:"", tasks:["Journée off — repos, recharge, Ennio ✦"]},
                ]},
              ].map((d,i)=>(
                <div key={d.jour} style={{padding:"12px 20px", borderBottom: i<4 ? "0.5px solid #F7F2EC" : "none",
                  background: d.color}}>
                  <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:8}}>
                    <span style={{fontSize:13, fontWeight:500, color: d.tag==="CONCERT" ? "#993556" : d.tag==="OFF" ? "#4A7A3A" : "#8B5E3C"}}>
                      {d.icon} {d.jour}
                    </span>
                    {d.tag && <span style={{fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:10,
                      background: d.tag==="CONCERT" ? "#F7EDF3" : "#EAF3DE",
                      color: d.tag==="CONCERT" ? "#993556" : "#4A7A3A"}}>{d.tag}</span>}
                  </div>
                  {d.items.map((block,j)=>(
                    <div key={j} style={{marginBottom: j<d.items.length-1 ? 8 : 0}}>
                      {block.time && <div style={{fontSize:10, fontWeight:500, color:"#C9884C", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:3}}>{block.time}</div>}
                      {block.tasks.map((task,k)=>(
                        <div key={k} style={{fontSize:12, color:"#5A4030", padding:"2px 0 2px 12px"}}>· {task}</div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Progression */}
            <div style={{background:"#fff", border:"0.5px solid #E2D5C0", borderRadius:10, padding:"16px 20px", marginBottom:16}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
                <span style={{fontSize:12, color:"#A09070", fontWeight:500}}>Progression cette semaine</span>
                <span style={{fontSize:12, fontWeight:500, color:"#8B5E3C"}}>{thisWeekDone} / {thisWeekTotal} tâches</span>
              </div>
              <div style={{height:6, background:"#F0E4D0", borderRadius:3}}>
                <div style={{height:"100%", borderRadius:3, background:"#C9884C", width:`${thisWeekTotal ? (thisWeekDone/thisWeekTotal)*100 : 0}%`, transition:"width 0.4s ease"}}/>
              </div>
            </div>

            {/* 3 priorités */}
            <div style={{background:"#fff", border:"0.5px solid #E2D5C0", borderRadius:10, marginBottom:16, overflow:"hidden"}}>
              <div style={{padding:"12px 20px", borderBottom:"0.5px solid #F0E4D0", display:"flex", alignItems:"center", gap:8, background:"#FBF5EC"}}>
                <span style={{fontSize:14}}>🎯</span>
                <span style={{fontSize:12, fontWeight:500, color:"#8B5E3C", textTransform:"uppercase", letterSpacing:"0.08em"}}>Mes 3 priorités</span>
              </div>
              {semainePrios.map((p,i) => (
                <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"11px 20px", borderBottom: i<semainePrios.length-1 ? "0.5px solid #F7F2EC" : "none"}}>
                  <div style={{width:22, height:22, borderRadius:4, background:"#F0E4D0", color:"#8B5E3C", fontSize:11, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>{i+1}</div>
                  <input value={p} onChange={e=>setSemainePrios(ps=>ps.map((x,j)=>j===i?e.target.value:x))}
                    style={{flex:1, border:"none", outline:"none", fontSize:13, color:"#2A1A0A", background:"transparent", fontFamily:"inherit"}}/>
                </div>
              ))}
            </div>

            {/* En attente */}
            <div style={{background:"#fff", border:"0.5px solid #E2D5C0", borderRadius:10, marginBottom:16, overflow:"hidden"}}>
              <div style={{padding:"12px 20px", borderBottom:"0.5px solid #F0E4D0", display:"flex", alignItems:"center", gap:8, background:"#FBF5EC"}}>
                <span style={{fontSize:14}}>💬</span>
                <span style={{fontSize:12, fontWeight:500, color:"#8B5E3C", textTransform:"uppercase", letterSpacing:"0.08em"}}>En attente de réponse</span>
              </div>
              {semaineAttente.map((a,i) => (
                <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"10px 20px", borderBottom: i<semaineAttente.length-1 ? "0.5px solid #F7F2EC":"none"}}>
                  <span style={{fontSize:12, color:"#C9884C"}}>◌</span>
                  <input value={a} onChange={e=>setSemaineAttente(as=>as.map((x,j)=>j===i?e.target.value:x))}
                    style={{flex:1, border:"none", outline:"none", fontSize:13, color:"#2A1A0A", background:"transparent", fontFamily:"inherit"}}/>
                </div>
              ))}
            </div>

            {/* Rituel du dimanche soir */}
            <div style={{background:"#F0EAF5", border:"0.5px solid #D8C8E8", borderRadius:10, overflow:"hidden"}}>
              <div style={{padding:"12px 20px", borderBottom:"0.5px solid #E0D0F0", display:"flex", alignItems:"center", gap:8}}>
                <span style={{fontSize:14}}>🌙</span>
                <span style={{fontSize:12, fontWeight:500, color:"#6A3A8A", textTransform:"uppercase", letterSpacing:"0.08em"}}>Rituel du dimanche soir</span>
                <span style={{fontSize:11, color:"#A080C0", marginLeft:4}}>— 15 min pour une semaine sereine</span>
              </div>
              <div style={{padding:"14px 20px", display:"flex", flexDirection:"column", gap:6}}>
                {[
                  {num:"1", text:"Vider l'Inbox (Notes iPhone) → placer chaque ligne dans Mes tâches"},
                  {num:"2", text:"Passer les tâches finies en Statut Fait ✓"},
                  {num:"3", text:"Regarder Ce mois → est-ce que quelque chose passe en Cette semaine ?"},
                  {num:"4", text:"Écrire les 3 priorités dans Ma semaine"},
                  {num:"5", text:"Mettre à jour l'agenda de la semaine (concerts, RDV, répétitions)"},
                  {num:"6", text:"Vérifier les deadlines qui approchent"},
                  {num:"7", text:"Écrire une intention — et noter ce que tu as accompli cette semaine"},
                ].map(step=>(
                  <div key={step.num} style={{display:"flex", gap:10, alignItems:"flex-start", padding:"6px 0",
                    borderBottom:"0.5px solid #E8D8F8"}}>
                    <div style={{width:20, height:20, borderRadius:"50%", background:"#D8C0F0", color:"#6A3A8A",
                      fontSize:10, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1}}>
                      {step.num}
                    </div>
                    <span style={{fontSize:12, color:"#4A3060", lineHeight:1.5}}>{step.text}</span>
                  </div>
                ))}
                <div style={{marginTop:6, fontSize:11, color:"#A080C0", fontStyle:"italic"}}>
                  Puis ferme Notion jusqu'au dimanche suivant — le reste de la semaine, tu travailles, tu ne gères pas.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MES TÂCHES */}
        {page==="taches" && (
          <div style={{maxWidth:860}}>
            <div style={{fontFamily:"Fraunces, serif", fontSize:28, fontWeight:300, color:"#2A1A4A", marginBottom:4}}>✅ Mes tâches</div>
            <div style={{fontSize:13, color:"#A09080", marginBottom:20}}>Toutes tes tâches centralisées. Filtre par période ou par pôle.</div>

            {/* Filtres */}
            <div style={{display:"flex", gap:8, marginBottom:20, flexWrap:"wrap", alignItems:"center"}}>
              <div style={{display:"flex", gap:4}}>
                {QUAND.map(q => (
                  <button key={q} onClick={()=>setFilterQuand(q)} style={{
                    fontSize:12, fontWeight:500, padding:"5px 12px", borderRadius:20, border:"0.5px solid",
                    cursor:"pointer", fontFamily:"inherit", transition:"all 0.1s",
                    background: filterQuand===q ? QUAND_COLORS[q].bg : "transparent",
                    color: filterQuand===q ? QUAND_COLORS[q].text : "#A09080",
                    borderColor: filterQuand===q ? QUAND_COLORS[q].text+"44" : "#E0DCE0",
                  }}>{q}</button>
                ))}
              </div>
              <div style={{width:"0.5px", height:20, background:"#E0DCE0"}}/>
              <select value={filterPole} onChange={e=>setFilterPole(e.target.value)} style={{
                fontSize:12, border:"0.5px solid #E0DCE0", borderRadius:20, padding:"5px 10px",
                background:"transparent", color:"#5A5A58", fontFamily:"inherit", cursor:"pointer", outline:"none"
              }}>
                <option>Tous</option>
                {POLES.map(p=><option key={p}>{p}</option>)}
              </select>
            </div>

            {/* Tableau */}
            <div style={{background:"#fff", border:"0.5px solid #E8E5E0", borderRadius:10, overflow:"hidden"}}>
              <div style={{display:"grid", gridTemplateColumns:"1fr 120px 110px 100px", padding:"8px 16px", borderBottom:"0.5px solid #F0EDE8", background:"#FAFAF9"}}>
                {["Tâche","Pôle","Statut","Deadline"].map(h=>(
                  <div key={h} style={{fontSize:11, fontWeight:500, color:"#B0A898", textTransform:"uppercase", letterSpacing:"0.07em"}}>{h}</div>
                ))}
              </div>

              {filtered.length===0 && (
                <div style={{padding:"32px", textAlign:"center", color:"#C0B8D0", fontSize:13}}>
                  Aucune tâche dans cette catégorie
                </div>
              )}

              {filtered.map((t,i) => (
                <div key={t.id} onClick={()=>toggleStatut(t.id)} style={{
                  display:"grid", gridTemplateColumns:"1fr 120px 110px 100px",
                  padding:"10px 16px", borderBottom: i<filtered.length-1 ? "0.5px solid #F7F5F2":"none",
                  cursor:"pointer", transition:"background 0.1s",
                  background: t.statut==="Fait ✓" ? "#FAFDF8" : "transparent"
                }}
                  onMouseEnter={e=>e.currentTarget.style.background="#FAFAF9"}
                  onMouseLeave={e=>e.currentTarget.style.background=t.statut==="Fait ✓"?"#FAFDF8":"transparent"}
                >
                  <div style={{display:"flex", alignItems:"center", gap:10, minWidth:0}}>
                    <Checkbox checked={t.statut==="Fait ✓"} onChange={()=>{}}/>
                    <span style={{
                      fontSize:13, color: t.statut==="Fait ✓" ? "#B0A898" : "#2A1A4A",
                      textDecoration: t.statut==="Fait ✓" ? "line-through" : "none",
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"
                    }}>{t.tache}</span>
                  </div>
                  <div style={{display:"flex", alignItems:"center"}}>
                    <Badge label={t.pole} colors={POLE_COLORS[t.pole]||{bg:"#eee",text:"#666"}} small/>
                  </div>
                  <div style={{display:"flex", alignItems:"center"}}>
                    <Badge label={t.statut} colors={STATUT_COLORS[t.statut]} small/>
                  </div>
                  <div style={{display:"flex", alignItems:"center", fontSize:12, color: t.deadline ? "#A32D2D" : "#C0B8D0"}}>
                    {t.deadline || "—"}
                  </div>
                </div>
              ))}
            </div>

            {/* Ajouter une tâche */}
            {showAdd ? (
              <div style={{marginTop:12, background:"#fff", border:"0.5px solid #EEEDFE", borderRadius:10, padding:"14px 16px"}}>
                <input autoFocus value={newTache} onChange={e=>setNewTache(e.target.value)}
                  onKeyDown={e=>{ if(e.key==="Enter") addToTaches(); if(e.key==="Escape") setShowAdd(false); }}
                  placeholder="Nouvelle tâche..." style={{
                    width:"100%", border:"none", outline:"none", fontSize:13,
                    color:"#2A1A4A", background:"transparent", fontFamily:"inherit", marginBottom:10
                  }}/>
                <div style={{display:"flex", gap:8, alignItems:"center"}}>
                  <select value={addPole} onChange={e=>setAddPole(e.target.value)} style={{fontSize:12, border:"0.5px solid #E0DCE0", borderRadius:6, padding:"4px 8px", fontFamily:"inherit", background:"transparent", color:"#5A5A58"}}>
                    {POLES.map(p=><option key={p}>{p}</option>)}
                  </select>
                  <select value={addQuand} onChange={e=>setAddQuand(e.target.value)} style={{fontSize:12, border:"0.5px solid #E0DCE0", borderRadius:6, padding:"4px 8px", fontFamily:"inherit", background:"transparent", color:"#5A5A58"}}>
                    {QUAND.map(q=><option key={q}>{q}</option>)}
                  </select>
                  <button onClick={addToTaches} style={{fontSize:12, background:"#534AB7", color:"#fff", border:"none", borderRadius:6, padding:"4px 14px", cursor:"pointer", fontFamily:"inherit", marginLeft:"auto"}}>Ajouter</button>
                  <button onClick={()=>setShowAdd(false)} style={{fontSize:12, background:"none", color:"#A09080", border:"0.5px solid #E0DCE0", borderRadius:6, padding:"4px 10px", cursor:"pointer", fontFamily:"inherit"}}>Annuler</button>
                </div>
              </div>
            ) : (
              <button onClick={()=>setShowAdd(true)} style={{
                marginTop:8, display:"block", width:"100%", padding:"9px",
                background:"none", border:"0.5px dashed #D0CCE0", borderRadius:8,
                color:"#B0A898", fontSize:12, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s"
              }}>+ Nouvelle tâche</button>
            )}
          </div>
        )}

        {/* MES PROJETS */}
        {page==="projets" && (
          <div style={{maxWidth:860}}>
            <div style={{fontFamily:"Fraunces, serif", fontSize:28, fontWeight:300, color:"#2A1A4A", marginBottom:4}}>🗂 Mes projets</div>
            <div style={{fontSize:13, color:"#A09080", marginBottom:20}}>Clique sur un pôle pour voir ses étapes détaillées.</div>

            {/* Grille de pôles */}
            <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:24}}>
              {[
                {pole:"EP Lahwa",       icon:"♪", desc:"Production · Sortie · Booking"},
                {pole:"Musique Film",   icon:"▶", desc:"Projets · Prospection · Droits"},
                {pole:"Association",    icon:"◈", desc:"Licence · Compta · Fonctionnement"},
                {pole:"Ateliers",       icon:"✦", desc:"Pouponnières · Partenaires"},
                {pole:"Collabs",        icon:"⟡", desc:"Co-écriture · Droits · Sortie"},
                {pole:"Compositions",   icon:"✍", desc:"Idées · Écriture · Sélection"},
              ].map(({pole,icon,desc})=>{
                const c = POLE_COLORS[pole]||{bg:"#eee",text:"#666"};
                const steps = projetsSteps[pole]||[];
                const allItems = steps.flatMap(s=>s.items);
                const done = allItems.filter(i=>i.done).length;
                const pct = allItems.length ? Math.round(done/allItems.length*100) : 0;
                const urgentLeft = allItems.filter(i=>!i.done&&i.prio==="urgent").length;
                const isOpen = selectedPole===pole;
                return (
                  <div key={pole} onClick={()=>setSelectedPole(isOpen?null:pole)} style={{
                    background:"#fff", border:`0.5px solid ${isOpen?c.text:"#E8E5E0"}`,
                    borderRadius:10, padding:"14px 16px", cursor:"pointer",
                    borderTop:`3px solid ${c.text}`, transition:"all 0.15s",
                    boxShadow: isOpen ? `0 0 0 2px ${c.text}22` : "none"
                  }}>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6}}>
                      <div>
                        <div style={{fontSize:13, fontWeight:500, color:"#2A1A4A"}}>{icon} {pole}</div>
                        <div style={{fontSize:10, color:"#A09080", marginTop:2}}>{desc}</div>
                      </div>
                      {urgentLeft>0 && <span style={{background:c.bg, color:c.text, fontSize:10, fontWeight:600, borderRadius:10, padding:"2px 6px"}}>{urgentLeft} urgent{urgentLeft>1?"s":""}</span>}
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8}}>
                      <div style={{flex:1, height:3, background:"#F0EDE8", borderRadius:2, marginRight:8}}>
                        <div style={{height:"100%", borderRadius:2, background:c.text, width:`${pct}%`, transition:"width 0.4s"}}/>
                      </div>
                      <span style={{fontSize:10, color:"#A09080"}}>{done}/{allItems.length}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Détail du pôle sélectionné */}
            {selectedPole && projetsSteps[selectedPole] && (()=>{
              const c = POLE_COLORS[selectedPole]||{bg:"#eee",text:"#666"};
              const PRIO_COLORS = {
                urgent:{ bg:"#FCEBEB", text:"#A32D2D", label:"Urgent" },
                moyen: { bg:"#FAEEDA", text:"#854F0B", label:"Moyen terme" },
                faible:{ bg:"#EAF3DE", text:"#3B6D11", label:"Quand possible" },
              };
              return (
                <div style={{background:"#fff", border:`0.5px solid ${c.text}44`, borderRadius:12, overflow:"hidden"}}>
                  {/* En-tête pôle */}
                  <div style={{background:c.bg, padding:"16px 22px", borderBottom:`0.5px solid ${c.text}33`, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{fontSize:16, fontWeight:500, color:c.text}}>
                      {{"EP Lahwa":"♪","Musique Film":"▶","Association":"◈","Ateliers":"✦","Collabs":"⟡","Compositions":"✍"}[selectedPole]} {selectedPole}
                    </div>
                    <button onClick={()=>setSelectedPole(null)} style={{background:"none", border:`0.5px solid ${c.text}44`, borderRadius:6, padding:"4px 10px", color:c.text, cursor:"pointer", fontSize:12, fontFamily:"inherit"}}>Fermer ×</button>
                  </div>

                  {/* Sections */}
                  <div style={{padding:"16px 22px", display:"flex", flexDirection:"column", gap:20}}>
                    {projetsSteps[selectedPole].map((sec,si)=>{
                      const secDone = sec.items.filter(i=>i.done).length;
                      return (
                        <div key={si}>
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
                            <div style={{fontSize:11, fontWeight:500, color:"#A09080", textTransform:"uppercase", letterSpacing:"0.08em"}}>{sec.section}</div>
                            <div style={{fontSize:10, color:"#C0B8D0"}}>{secDone}/{sec.items.length}</div>
                          </div>
                          <div style={{display:"flex", flexDirection:"column", gap:4}}>
                            {sec.items.map(item=>{
                              const pc = PRIO_COLORS[item.prio]||PRIO_COLORS.faible;
                              return (
                                <div key={item.id} onClick={()=>toggleProjStep(selectedPole, sec.section, item.id)}
                                  style={{display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
                                    background: item.done ? "#FAFDF8" : "#FAFAF9",
                                    borderRadius:7, cursor:"pointer", border:"0.5px solid #F0EDE8", transition:"background 0.1s"}}>
                                  <div style={{
                                    width:16, height:16, borderRadius:4, flexShrink:0,
                                    border: item.done ? "none" : `1.5px solid ${c.text}66`,
                                    background: item.done ? c.text : "transparent",
                                    display:"flex", alignItems:"center", justifyContent:"center"
                                  }}>
                                    {item.done && <span style={{color:"#fff", fontSize:9}}>✓</span>}
                                  </div>
                                  <span style={{flex:1, fontSize:13, color: item.done?"#B0A898":"#2A1A4A",
                                    textDecoration: item.done?"line-through":"none"}}>{item.text}</span>
                                  {!item.done && (
                                    <span style={{fontSize:10, fontWeight:500, padding:"2px 7px", borderRadius:10,
                                      background:pc.bg, color:pc.text, flexShrink:0}}>{pc.label}</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* CONTACTS */}
        {page==="contacts" && (
          <div style={{maxWidth:900}}>
            <div style={{fontFamily:"Fraunces, serif", fontSize:28, fontWeight:300, color:"#2A1A4A", marginBottom:4}}>👤 Contacts</div>
            <div style={{fontSize:13, color:"#A09080", marginBottom:20}}>Réalisateurs, producteurs, programmateurs, éditeurs — tous tes liens professionnels.</div>

            {/* Stats rapides */}
            <div style={{display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8, marginBottom:20}}>
              {[
                ["Éditeurs",         contacts.filter(c=>c.categorie==="Éditeurs").length,         "#534AB7","#EEEDFE"],
                ["Tourneurs",        contacts.filter(c=>c.categorie==="Tourneurs").length,        "#993556","#F7EDF3"],
                ["Paris/IDF",        contacts.filter(c=>c.categorie==="Salles Paris/IDF").length, "#A32D2D","#FCEBEB"],
                ["Marseille",        contacts.filter(c=>c.categorie==="Salles Marseille").length, "#D4732A","#FDF0E8"],
                ["Belgique",         contacts.filter(c=>c.categorie==="Salles Belgique").length,  "#2A8F8A","#E4F5F4"],
                ["Musique de Film",  contacts.filter(c=>c.categorie==="Musique de Film").length,  "#3A6FA8","#E5EFF8"],
              ].map(([lbl,nb,tc,bg])=>(
                <div key={lbl} style={{background:bg, borderRadius:8, padding:"10px 12px"}}>
                  <div style={{fontSize:18, fontWeight:500, color:tc}}>{nb}</div>
                  <div style={{fontSize:10, color:tc, opacity:0.8, marginTop:1}}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* Filtres */}
            <div style={{display:"flex", gap:8, marginBottom:16, flexWrap:"wrap"}}>
              {["Tous",...CATEGORIES_CONTACT].map(cat=>(
                <button key={cat} onClick={()=>setFilterCat(cat)} style={{
                  fontSize:12, fontWeight:500, padding:"5px 12px", borderRadius:20,
                  border:"0.5px solid", cursor:"pointer", fontFamily:"inherit", transition:"all 0.1s",
                  background: filterCat===cat ? (CAT_COLORS[cat]?.bg||"#EEEDFE") : "transparent",
                  color: filterCat===cat ? (CAT_COLORS[cat]?.text||"#534AB7") : "#A09080",
                  borderColor: filterCat===cat ? (CAT_COLORS[cat]?.text+"44"||"#534AB744") : "#E0DCE0",
                }}>{cat}</button>
              ))}
              <div style={{width:"0.5px", height:20, background:"#E0DCE0", alignSelf:"center"}}/>
              <select value={filterStatutC} onChange={e=>setFilterStatutC(e.target.value)} style={{
                fontSize:12, border:"0.5px solid #E0DCE0", borderRadius:20, padding:"5px 10px",
                background:"transparent", color:"#5A5A58", fontFamily:"inherit", cursor:"pointer", outline:"none"
              }}>
                <option>Tous</option>
                {STATUTS_CONTACT.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Grille de vignettes */}
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:10, marginBottom:12}}>
              {filteredContacts.map(ct=>{
                const sc = STATUT_CONTACT_COLORS[ct.statut]||{bg:"#eee",text:"#666"};
                const cc = CAT_COLORS[ct.categorie]||{bg:"#eee",text:"#666"};
                const hasRelance = ct.relance && ct.statut!=="Deal ✓" && ct.statut!=="Pas pour l'instant";
                const isContacted = ct.statut !== "À contacter";
                return (
                  <div key={ct.id} style={{
                    background:"#fff", border:"0.5px solid #E8E5E0",
                    borderRadius:10, padding:"14px 16px",
                    borderLeft:`3px solid ${cc.text}`,
                    opacity: ct.statut==="Pas pour l'instant" ? 0.55 : 1,
                  }}>
                    {/* En-tête : nom + statut */}
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6}}>
                      <div style={{flex:1, minWidth:0, marginRight:8}}>
                        <div style={{fontSize:13, fontWeight:500, color:"#2A1A4A", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{ct.nom||"—"}</div>
                        <div style={{fontSize:11, color:"#A09080", marginTop:1}}>{ct.role}</div>
                      </div>
                      <button onClick={()=>updateContactStatut(ct.id)} style={{
                        fontSize:10, fontWeight:500, padding:"2px 8px", borderRadius:12,
                        border:"none", cursor:"pointer", fontFamily:"inherit", flexShrink:0,
                        background:sc.bg, color:sc.text, whiteSpace:"nowrap"
                      }}>{ct.statut}</button>
                    </div>

                    {/* Catégorie + lieu */}
                    <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:8}}>
                      <Badge label={ct.categorie} colors={cc} small/>
                      {ct.ou && <span style={{fontSize:10, color:"#B0A898"}}>· {ct.ou}</span>}
                    </div>

                    {/* Email + tél */}
                    {(ct.email || ct.tel) && (
                      <div style={{background:"#F7F5F2", borderRadius:6, padding:"6px 10px", marginBottom:8}}>
                        {ct.email && <div style={{fontSize:11, color:"#3A6FA8", marginBottom: ct.tel ? 3 : 0}}>✉ {ct.email}</div>}
                        {ct.tel   && <div style={{fontSize:11, color:"#3B6D11"}}>☎ {ct.tel}</div>}
                      </div>
                    )}

                    {/* Notes */}
                    {ct.notes && (
                      <div style={{fontSize:11, color:"#6A5A8A", lineHeight:1.5, marginBottom:hasRelance?6:0,
                        display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"}}>
                        {ct.notes}
                      </div>
                    )}

                    {/* Relance */}
                    {hasRelance && (
                      <div style={{marginTop:6, fontSize:11, color:"#A32D2D", background:"#FCEBEB", borderRadius:6, padding:"4px 8px"}}>
                        ⚑ Relancer le {ct.relance}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* + Nouveau contact */}
              {!showAddContact && (
                <button onClick={()=>setShowAddContact(true)} style={{
                  background:"none", border:"0.5px dashed #D0CCE0", borderRadius:10,
                  padding:"14px", cursor:"pointer", color:"#B0A898", fontSize:13,
                  fontFamily:"inherit", minHeight:120, display:"flex", alignItems:"center", justifyContent:"center"
                }}>+ Nouveau contact</button>
              )}
            </div>

            {/* Formulaire ajout */}
            {showAddContact && (
              <div style={{background:"#fff", border:"0.5px solid #EEEDFE", borderRadius:10, padding:"16px 20px", marginBottom:12}}>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10}}>
                  {[["nom","Nom / Structure"],["role","Rôle"],["ou","Ville / Lieu"]].map(([k,ph])=>(
                    <input key={k} value={newContact[k]||""} onChange={e=>setNewContact(nc=>({...nc,[k]:e.target.value}))}
                      placeholder={ph} style={{border:"0.5px solid #E0DCE0", borderRadius:6, padding:"7px 10px", fontSize:13, fontFamily:"inherit", outline:"none", color:"#2A1A4A"}}/>
                  ))}
                </div>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10}}>
                  {[["email","Email"],["tel","Téléphone"]].map(([k,ph])=>(
                    <input key={k} value={newContact[k]||""} onChange={e=>setNewContact(nc=>({...nc,[k]:e.target.value}))}
                      placeholder={ph} style={{border:"0.5px solid #E0DCE0", borderRadius:6, padding:"7px 10px", fontSize:13, fontFamily:"inherit", outline:"none", color:"#2A1A4A"}}/>
                  ))}
                </div>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10}}>
                  <input value={newContact.relance||""} onChange={e=>setNewContact(nc=>({...nc,relance:e.target.value}))}
                    placeholder="Date de relance (ex: 15/05/2026)" style={{border:"0.5px solid #E0DCE0", borderRadius:6, padding:"7px 10px", fontSize:13, fontFamily:"inherit", outline:"none", color:"#2A1A4A"}}/>
                  <input value={newContact.notes||""} onChange={e=>setNewContact(nc=>({...nc,notes:e.target.value}))}
                    placeholder="Notes / commentaires" style={{border:"0.5px solid #E0DCE0", borderRadius:6, padding:"7px 10px", fontSize:13, fontFamily:"inherit", outline:"none", color:"#2A1A4A"}}/>
                </div>
                <div style={{display:"flex", gap:8, alignItems:"center"}}>
                  <select value={newContact.categorie} onChange={e=>setNewContact(nc=>({...nc,categorie:e.target.value}))} style={{fontSize:12, border:"0.5px solid #E0DCE0", borderRadius:6, padding:"6px 8px", fontFamily:"inherit", background:"transparent", color:"#5A5A58"}}>
                    {CATEGORIES_CONTACT.map(c=><option key={c}>{c}</option>)}
                  </select>
                  <select value={newContact.statut} onChange={e=>setNewContact(nc=>({...nc,statut:e.target.value}))} style={{fontSize:12, border:"0.5px solid #E0DCE0", borderRadius:6, padding:"6px 8px", fontFamily:"inherit", background:"transparent", color:"#5A5A58"}}>
                    {STATUTS_CONTACT.map(s=><option key={s}>{s}</option>)}
                  </select>
                  <button onClick={addContact} style={{fontSize:12, background:"#534AB7", color:"#fff", border:"none", borderRadius:6, padding:"6px 16px", cursor:"pointer", fontFamily:"inherit", marginLeft:"auto"}}>Ajouter</button>
                  <button onClick={()=>setShowAddContact(false)} style={{fontSize:12, background:"none", color:"#A09080", border:"0.5px solid #E0DCE0", borderRadius:6, padding:"6px 10px", cursor:"pointer", fontFamily:"inherit"}}>Annuler</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FLÂNERIE */}
        {page==="flanerie" && (
          <div style={{maxWidth:860}}>
            <div style={{fontFamily:"Fraunces, serif", fontSize:28, fontWeight:300, color:"#2A1A4A", marginBottom:4}}>✦ Flânerie</div>
            <div style={{fontSize:13, color:"#A09080", marginBottom:28}}>Un espace pour toi — artistes à écouter, films à voir, lieux et idées qui t'inspirent.</div>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}}>

              {/* Artistes à écouter */}
              <div>
                <div style={{fontSize:11, fontWeight:500, color:"#993556", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>♪ Artistes à écouter</div>
                <div style={{display:"flex", flexDirection:"column", gap:6}}>
                  {flanerie.artistes.map(a=>(
                    <div key={a.id} onClick={()=>setFlanerie(f=>({...f, artistes: f.artistes.map(x=>x.id===a.id?{...x,ecoute:!x.ecoute}:x)}))}
                      style={{
                        background:"#fff", border:"0.5px solid #E8E5E0", borderRadius:8,
                        padding:"10px 14px", cursor:"pointer", display:"flex", gap:10, alignItems:"flex-start",
                        opacity: a.ecoute ? 0.5 : 1, transition:"opacity 0.2s"
                      }}>
                      <div style={{
                        width:18, height:18, borderRadius:4, flexShrink:0, marginTop:1,
                        border: a.ecoute ? "none" : "1.5px solid #F0A0C0",
                        background: a.ecoute ? "#993556" : "transparent",
                        display:"flex", alignItems:"center", justifyContent:"center"
                      }}>
                        {a.ecoute && <span style={{color:"#fff", fontSize:10}}>✓</span>}
                      </div>
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontSize:13, fontWeight:500, color:"#2A1A4A", textDecoration: a.ecoute?"line-through":"none"}}>{a.nom}</div>
                        <div style={{fontSize:11, color:"#C07A9C", marginTop:1}}>{a.genre}</div>
                        {a.note && <div style={{fontSize:11, color:"#A09080", marginTop:2, lineHeight:1.4}}>{a.note}</div>}
                      </div>
                    </div>
                  ))}
                  <button onClick={()=>setFlanerie(f=>({...f, artistes:[...f.artistes, {id:Date.now(),nom:"",genre:"",note:"",ecoute:false}]}))}
                    style={{background:"none", border:"0.5px dashed #F0A0C0", borderRadius:8, padding:"8px", color:"#C07A9C", fontSize:12, cursor:"pointer", fontFamily:"inherit"}}>
                    + Ajouter un artiste
                  </button>
                </div>
              </div>

              {/* Films à voir + Inspirations */}
              <div style={{display:"flex", flexDirection:"column", gap:20}}>

                {/* Films */}
                <div>
                  <div style={{fontSize:11, fontWeight:500, color:"#534AB7", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>▶ Films à voir</div>
                  <div style={{display:"flex", flexDirection:"column", gap:6}}>
                    {flanerie.films.map(f=>(
                      <div key={f.id} onClick={()=>setFlanerie(fl=>({...fl, films: fl.films.map(x=>x.id===f.id?{...x,vu:!x.vu}:x)}))}
                        style={{
                          background:"#fff", border:"0.5px solid #E8E5E0", borderRadius:8,
                          padding:"10px 14px", cursor:"pointer", display:"flex", gap:10, alignItems:"flex-start",
                          opacity: f.vu ? 0.5 : 1
                        }}>
                        <div style={{
                          width:18, height:18, borderRadius:4, flexShrink:0, marginTop:1,
                          border: f.vu ? "none" : "1.5px solid #AFA9EC",
                          background: f.vu ? "#534AB7" : "transparent",
                          display:"flex", alignItems:"center", justifyContent:"center"
                        }}>
                          {f.vu && <span style={{color:"#fff", fontSize:10}}>✓</span>}
                        </div>
                        <div>
                          <div style={{fontSize:13, fontWeight:500, color:"#2A1A4A", textDecoration: f.vu?"line-through":"none"}}>{f.titre}</div>
                          {f.real && <div style={{fontSize:11, color:"#7F77DD", marginTop:1}}>{f.real}</div>}
                          {f.note && <div style={{fontSize:11, color:"#A09080", marginTop:2}}>{f.note}</div>}
                        </div>
                      </div>
                    ))}
                    <button onClick={()=>setFlanerie(f=>({...f, films:[...f.films, {id:Date.now(),titre:"",real:"",note:"",vu:false}]}))}
                      style={{background:"none", border:"0.5px dashed #AFA9EC", borderRadius:8, padding:"8px", color:"#534AB7", fontSize:12, cursor:"pointer", fontFamily:"inherit"}}>
                      + Ajouter un film
                    </button>
                  </div>
                </div>

                {/* Inspirations */}
                <div>
                  <div style={{fontSize:11, fontWeight:500, color:"#2A8F8A", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10}}>◎ Lieux · Idées · Recherches</div>
                  <div style={{display:"flex", flexDirection:"column", gap:6}}>
                    {flanerie.inspirations.map(ins=>(
                      <div key={ins.id} style={{
                        background:"#fff", border:"0.5px solid #E8E5E0", borderRadius:8,
                        padding:"10px 14px", display:"flex", gap:10, alignItems:"flex-start"
                      }}>
                        <span style={{
                          fontSize:9, fontWeight:500, padding:"2px 6px", borderRadius:10, flexShrink:0, marginTop:2,
                          background: ins.categorie==="Lieu"?"#E4F5F4": ins.categorie==="Festival"?"#F7EDF3": ins.categorie==="Événement"?"#FAEEDA":"#EEEDFE",
                          color: ins.categorie==="Lieu"?"#2A8F8A": ins.categorie==="Festival"?"#993556": ins.categorie==="Événement"?"#854F0B":"#534AB7",
                        }}>{ins.categorie}</span>
                        <div style={{fontSize:12, color:"#5A5A58", lineHeight:1.5}}>{ins.texte}</div>
                        <button onClick={()=>setFlanerie(f=>({...f, inspirations:f.inspirations.filter(x=>x.id!==ins.id)}))}
                          style={{background:"none", border:"none", color:"#D0CCE0", cursor:"pointer", fontSize:14, lineHeight:1, flexShrink:0, padding:0}}>×</button>
                      </div>
                    ))}
                    <button onClick={()=>{
                      const texte = prompt("Nouvelle idée, lieu ou inspiration :");
                      if(texte) setFlanerie(f=>({...f, inspirations:[...f.inspirations, {id:Date.now(),texte,categorie:"Lieu"}]}));
                    }} style={{background:"none", border:"0.5px dashed #9FE1CB", borderRadius:8, padding:"8px", color:"#2A8F8A", fontSize:12, cursor:"pointer", fontFamily:"inherit"}}>
                      + Ajouter une inspiration
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* MES FINANCES */}
        {page==="finances" && (
          <div style={{maxWidth:700}}>
            <div style={{fontFamily:"Fraunces, serif", fontSize:28, fontWeight:300, color:"#2A1A4A", marginBottom:4}}>💶 Mes finances</div>
            <div style={{fontSize:13, color:"#A09080", marginBottom:24}}>Lien vers tes tableaux Excel de suivi des cachets.</div>
            <div style={{background:"#fff", border:"0.5px solid #E8E5E0", borderRadius:10, padding:"20px 24px"}}>
              <div style={{fontSize:13, color:"#5A5A58", lineHeight:1.8}}>
                <p style={{marginBottom:12}}>Tes tableaux de suivi des cachets sont dans les fichiers Excel téléchargés :</p>
                <div style={{background:"#F7F5F2", borderRadius:8, padding:"12px 16px", fontFamily:"monospace", fontSize:12, color:"#534AB7", marginBottom:8}}>📊 cachets_v5.xlsx</div>
                <p style={{fontSize:12, color:"#A09080", marginTop:12, lineHeight:1.6}}>
                  Pour importer dans Notion : ouvre le fichier Excel → exporte l'onglet "Suivi des cachets" en CSV → dans Notion tape /import → CSV → sélectionne le fichier.
                </p>
              </div>
              <div style={{marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10}}>
                {[["24","Cachets 2025+2026","#534AB7","#EEEDFE"],["20","Encore manquants","#A32D2D","#FCEBEB"],["1 281 €","Net perçu 2026","#3B6D11","#EAF3DE"]].map(([val,lbl,tc,bg])=>(
                  <div key={lbl} style={{background:bg, borderRadius:8, padding:"12px 14px"}}>
                    <div style={{fontSize:20, fontWeight:500, color:tc}}>{val}</div>
                    <div style={{fontSize:11, color:tc, opacity:0.8, marginTop:2}}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
