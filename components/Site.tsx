'use client';

import Image from "next/image";
import { useMemo, useState } from "react";

type Photo = { id: string; src: string; alt: string; size: "wide" | "tall" | "normal" };
type MenuItem = { id: string; name: string; description: string; price: string; image: string };

const initialPhotos: Photo[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85", alt: "Eleganckie wnętrze restauracji", size: "wide" },
  { id: "2", src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85", alt: "Pizza w stylu włoskim", size: "tall" },
  { id: "3", src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85", alt: "Makaron z sosem", size: "normal" },
  { id: "4", src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85", alt: "Świeże danie kuchni włoskiej", size: "normal" },
  { id: "5", src: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=900&q=85", alt: "Pizza przy stole", size: "wide" },
  { id: "6", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=85", alt: "Stół w restauracji", size: "normal" }
];

const initialMenu: MenuItem[] = [
  { id: "m1", name: "Pizza Margherita", description: "San Marzano, mozzarella, bazylia i oliwa extra virgin.", price: "32 zł", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85" },
  { id: "m2", name: "Pasta al Pomodoro", description: "Makaron, dojrzałe pomidory, czosnek, bazylia i parmezan.", price: "34 zł", image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=900&q=85" },
  { id: "m3", name: "Tiramisu", description: "Klasyczny włoski deser z mascarpone, kawą i kakao.", price: "22 zł", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85" }
];

const reviews = [
  { name: "xd xd", text: "Bardzo dobre jedzenie, ładny lokal i miła obsługa. Jedzenie ładnie podane i co najważniejsze smaczne, porcje solidne.", stars: 5 },
  { name: "Magdalena Piasecka", text: "Bardzo fajne miejsce z dobrym jedzeniem. Sympatyczna obsługa, pyszny schabowy i ciekawe drinki.", stars: 5 },
  { name: "Anna Szulc", text: "Restauracja zrobiła na mnie bardzo dobre wrażenie. Smaczne jedzenie, dobrze doprawione i widać dbałość o jakość składników.", stars: 5 }
];

export default function Site() {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    if (typeof window === "undefined") return initialMenu;
    try { return JSON.parse(localStorage.getItem("mazowiecka-menu") || "null") || initialMenu; } catch { return initialMenu; }
  });
  const [photos, setPhotos] = useState<Photo[]>(() => {
    if (typeof window === "undefined") return initialPhotos;
    try { return JSON.parse(localStorage.getItem("mazowiecka-gallery") || "null") || initialPhotos; } catch { return initialPhotos; }
  });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [owner, setOwner] = useState(false);
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");

  const saveMenu = (next: MenuItem[]) => {
    setMenu(next);
    localStorage.setItem("mazowiecka-menu", JSON.stringify(next));
  };

  const addMenuItem = () => {
    const name = window.prompt("Nazwa dania:");
    if (!name) return;
    const description = window.prompt("Opis dania:") || "";
    const price = window.prompt("Cena, np. 39 zł:") || "";
    const image = window.prompt("Bezpośredni adres HTTPS zdjęcia:") || "";
    if (!image.startsWith("https://")) return;
    saveMenu([...menu, { id: crypto.randomUUID(), name, description, price, image }]);
  };

  const editMenuItem = (item: MenuItem) => {
    const name = window.prompt("Nazwa dania:", item.name);
    if (!name) return;
    const description = window.prompt("Opis dania:", item.description) || "";
    const price = window.prompt("Cena:", item.price) || "";
    const image = window.prompt("Adres HTTPS zdjęcia:", item.image) || item.image;
    saveMenu(menu.map(x => x.id === item.id ? { ...x, name, description, price, image } : x));
  };

  const savePhotos = (next: Photo[]) => {
    setPhotos(next);
    localStorage.setItem("mazowiecka-gallery", JSON.stringify(next));
  };

  const addPhoto = () => {
    const src = window.prompt("Wklej bezpośredni adres HTTPS zdjęcia:");
    if (!src || !src.startsWith("https://")) return;
    const next = [...photos, { id: crypto.randomUUID(), src, alt: "Zdjęcie Mazowieckiej", size: photos.length % 3 === 0 ? "wide" : "normal" as Photo["size"] }];
    savePhotos(next);
    setNotice("Zdjęcie dodane. W wersji demonstracyjnej zapis jest lokalny w tej przeglądarce.");
  };

  const directions = "https://www.google.com/maps/dir/?api=1&destination=Aleja+Stanis%C5%82awa+Jachowicza+49%2C+09-400+P%C5%82ock";
  const mapSrc = "https://www.google.com/maps?q=Aleja+Stanis%C5%82awa+Jachowicza+49,+09-400+P%C5%82ock&output=embed";

  const current = useMemo(() => lightbox === null ? null : photos[lightbox], [lightbox, photos]);

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top"><span>M</span> MAZOWIECKA</a>
        <nav><a href="#menu">Menu</a><a href="#story">O nas</a><a href="#gallery">Galeria</a><a href="#reviews">Opinie</a><a href="#contact">Kontakt</a></nav>
        <a className="navCta" href="tel:+48690001504">690 001 504</a>
      </header>

      <section id="top" className="hero">
        <div className="heroImage" />
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow">PŁOCK · ALEJA STANISŁAWA JACHOWICZA 49</p>
          <h1>Dobry stół.<br /><em>Dobre historie.</em></h1>
          <p className="lead">Mazowiecka to swobodna restauracja, w której włoskie inspiracje spotykają się z kuchnią, na którą chce się wracać.</p>
          <div className="actions"><a className="button buttonLight" href="#menu">Zobacz menu</a><a className="button buttonGhost" href={directions} target="_blank">Wyznacz trasę ↗</a></div>
          <div className="heroMeta"><span>★ 4,0 <small>z 102 opinii</small></span><span>40–60 zł <small>za osobę</small></span><span>Otwarte do 00:00</span></div>
        </div>
      </section>

      <section className="intro section" id="story">
        <div className="sectionKicker">01 / O MIEJSCU</div>
        <div className="introGrid"><h2>Miejsce na lunch, kolację i wieczór, który nie musi się kończyć szybko.</h2><div><p>W Mazowieckiej liczy się atmosfera bez zadęcia. Dobre jedzenie, ładny lokal i obsługa, która sprawia, że chce się zostać jeszcze chwilę.</p><p>W karcie znajdziesz włoskie klasyki i dania dla tych, którzy lubią odkrywać coś poza oczywistym wyborem.</p><a className="textLink" href="#contact">Poznaj lokal →</a></div></div>
      </section>

      <section className="menuSection section" id="menu">
        <div className="sectionKicker">02 / MENU</div>
        <div className="menuHead"><h2>Kuchnia włoska,<br /><em>po naszemu.</em></h2><span>40–60 zł / osoba</span></div>
        <div className="menuItems">{menu.map(item => <article className="menuItem" key={item.id}><div className="menuItemImage"><Image src={item.image} alt={item.name} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div className="menuItemBody"><div><h3>{item.name}</h3><strong>{item.price}</strong></div><p>{item.description}</p></div></article>)}</div>
        <div className="menuCards">
          <article><span>01</span><h3>Pizza</h3><p>Klasyczne włoskie inspiracje, chrupiące ciasto i składniki, które robią różnicę.</p></article>
          <article><span>02</span><h3>Makaron</h3><p>Prosto, intensywnie i bez zbędnych dodatków. Komfortowe dania na dobry wieczór.</p></article>
          <article><span>03</span><h3>Deser</h3><p>Tiramisu i słodkie zakończenie spotkania. Bo ostatni kęs też powinien zostać w pamięci.</p></article>
        </div>
      </section>

      <section className="quote"><p>„Bardzo dobre jedzenie, ładny lokal i miła obsługa.”</p><span>— opinia gościa</span></section>

      <section className="gallery section" id="gallery">
        <div className="galleryHead"><div><div className="sectionKicker">03 / GALERIA</div><h2>Tak wygląda <em>nasz stół.</em></h2></div><p>Kliknij zdjęcie, aby zobaczyć je w pełnym rozmiarze.</p></div>
        <div className="masonry">{photos.map((photo, i) => <button key={photo.id} className={"photo " + photo.size} onClick={() => setLightbox(i)} aria-label={"Otwórz " + photo.alt}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 33vw" /></button>)}</div>
      </section>

      <section className="reviews section" id="reviews">
        <div className="sectionKicker">04 / OPINIE</div>
        <div className="reviewTop"><h2>Goście<br /><em>mówią.</em></h2><div className="rating"><strong>4,0</strong><span>★★★★★</span><small>102 opinie</small></div></div>
        <div className="reviewGrid">{reviews.map(r => <article key={r.name}><div className="stars">{"★".repeat(r.stars)}</div><p>„{r.text}”</p><strong>{r.name}</strong></article>)}</div>
      </section>

      <section className="contact section" id="contact">
        <div className="contactCard"><div><div className="sectionKicker">05 / KONTAKT</div><h2>Wpadnij.<br /><em>Jesteśmy tutaj.</em></h2><div className="contactList"><a href="tel:+48690001504"><small>TELEFON</small>690 001 504</a><div><small>ADRES</small>Aleja Stanisława Jachowicza 49<br />09-400 Płock</div><div><small>GODZINY</small>Otwarte · zamknięcie 00:00</div></div><a className="button buttonDark" href={directions} target="_blank">Wyznacz trasę ↗</a></div><div className="map"><iframe title="Mapa do Mazowieckiej w Płocku" src={mapSrc} loading="lazy" /></div></div>
      </section>

      <footer><div><a className="brand" href="#top"><span>M</span> MAZOWIECKA</a><p>Kuchnia włoska · Płock</p></div><div className="footerLinks"><a href="tel:+48690001504">690 001 504</a><a href={directions} target="_blank">Mapa i trasa</a><button onClick={() => { setOwner(true); setLogged(false); setPassword(""); }}>Panel właściciela</button></div><small>© {new Date().getFullYear()} Mazowiecka. Wszystkie prawa zastrzeżone.</small></footer>

      {lightbox !== null && current && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button className="close" onClick={() => setLightbox(null)}>×</button><button className="prev" onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}>‹</button><div className="lightImage" onClick={e => e.stopPropagation()}><Image src={current.src} alt={current.alt} fill sizes="100vw" /></div><button className="next" onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}>›</button></div>}

      {owner && <div className="modalBackdrop" onClick={() => setOwner(false)}><div className="ownerModal" onClick={e => e.stopPropagation()}><button className="modalClose" onClick={() => setOwner(false)}>×</button>{!logged ? <><div className="sectionKicker">PANEL WŁAŚCICIELA</div><h2>Zarządzaj stroną.</h2><p>Demo lokalne: logowanie i galeria działają w tej przeglądarce. Docelowo moduł można podpiąć do Supabase Storage/Auth.</p><input value={password} onChange={e => setPassword(e.target.value)} placeholder="Hasło demonstracyjne" type="password" /><button className="button buttonDark full" onClick={() => { if(password === "mazowiecka-demo") setLogged(true); else setNotice("Hasło demonstracyjne: mazowiecka-demo"); }}>{notice || "Zaloguj się"}</button></> : <><div className="ownerTop"><div><div className="sectionKicker">PANEL WŁAŚCICIELA</div><h2>Galeria i menu</h2></div></div>
          <div className="ownerSection"><div className="ownerTop"><h3>Galeria</h3><button className="button buttonDark" onClick={addPhoto}>+ Dodaj zdjęcie</button></div><p className="demoNote">Zdjęcia galerii są niezależne od menu.</p><div className="ownerGrid">{photos.map((p,i)=><div className="ownerPhoto" key={p.id}><Image src={p.src} alt={p.alt} fill sizes="160px" /><button onClick={() => savePhotos(photos.filter(x => x.id !== p.id))}>Usuń</button><span>#{i+1}</span></div>)}</div></>}</div></div>}
    </main>
  );
}