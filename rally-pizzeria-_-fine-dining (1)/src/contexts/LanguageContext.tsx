import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.cart': 'Cart',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.orderStatus': 'Order Status',
    
    'home.hero.subtitle': 'Gießen\'s Finest',
    'home.hero.title1': 'Taste the',
    'home.hero.title2': 'Intensity.',
    'home.hero.description': 'Authentic Italian tradition fused with modern bold flavors. Wood-fired excellence, delivered to your doorstep.',
    'home.hero.ctaMenu': 'Launch Menu',
    'home.hero.ctaStatus': 'Operational Status',
    
    'home.about.title1': 'The',
    'home.about.title2': 'Rally Manifesto',
    'home.about.p1': 'At Rally Fine Dine, we don\'t just bake dough; we engineer culinary experiences. Born in the heart of Gießen, our mission was simple: to bring high-intensity flavor to a city that demands excellence.',
    'home.about.p2': 'Every pizza starts with our signature 48-hour fermented dough, hand-stretched and fired in 450°C wood-fired ovens. We source our tomatoes from the slopes of Mount Vesuvius and our mozzarella from artisanal producers who care as much about the craft as we do.',
    'home.about.stat1': 'Natural Ingredients',
    'home.about.stat2': 'Dough Fermentation',
    
    'home.sectors.title1': 'Culinary',
    'home.sectors.title2': 'Sectors',
    'home.sectors.description': 'Our specialized menu is partitioned into distinct taste experiences.',
    'home.sectors.cta': 'View Full Index',
    'home.sectors.cat1': 'Artisan Crust',
    'home.sectors.cat2': 'Fuel Cells',
    'home.sectors.cat3': 'Italian Core',
    'home.sectors.cat4': 'Limited Release',
    
    'home.signature.label': 'Chef\'s Reconnaissance Choice',
    'home.signature.title1': 'Cheese Burst',
    'home.signature.title2': 'Supreme',
    'home.signature.description': 'Our legendary golden crust stuffed with molten, premium mozzarella that oozes out with every slice. Engineered for maximum decadence.',
    'home.signature.cta': 'Order this Masterpiece',
    
    'home.hours.title1': 'Operational',
    'home.hours.title2': 'Hours',
    'home.hours.subtitle': 'Gießen Headquarters Availability',
    'home.hours.monFri': 'Monday - Friday',
    'home.hours.satSun': 'Saturday - Sunday',
    'home.hours.holidays': 'Public Holidays',
    'home.hours.holidayProtocol': 'Holiday Protocol',
    'home.hours.holidayDescription': 'Open on most public holidays with modified times (14:00 - 22:00). Closed only on Dec 24th/25th.',
    
    'home.location.title1': 'Base',
    'home.location.title2': 'Location',
    'home.location.subtitle': 'Physical Coordinate Access',
    
    'home.reviews.title1': 'Verified',
    'home.reviews.title2': 'Feedback',
    'home.reviews.subtitle': 'Real-time customer status reports',
    'home.reviews.verified': 'Verified Customer',
    
    'menu.header.title1': 'Sector',
    'menu.header.title2': 'Inventory',
    'menu.header.subtitle': 'AUTHENTIC RALLY PIZZERIA SELECTIONS — HANDCRAFTED IN OUR GIEßEN FACILITY.',
    'menu.categories.all': 'All',
    'menu.item.fixedParameter': 'Fixed Parameter',
    'menu.item.add': 'Add to Mission',
    'menu.item.added': 'Deployed to Order',
    'menu.cartBar.status': 'Payload Readiness',
    'menu.cartBar.units': 'UNITS SELECTED',
    'menu.cartBar.cta': 'Finalize Order',
    
    'cart.header.title1': 'Order',
    'cart.header.title2': 'Summary',
    'cart.header.subtitle': 'Review your acquisition list',
    'cart.header.back': 'Back to Menu',
    'cart.empty.title1': 'Selection',
    'cart.empty.title2': 'Empty',
    'cart.empty.description': 'The tactical order queue is currently silent. Revisit the menu to initiate deployment.',
    'cart.empty.cta': 'Explore Inventory',
    'cart.totals.logs': 'Sector Logistics',
    'cart.totals.coverage': 'Operational Coverage: Active',
    'cart.totals.estimate': 'Dispatch Estimate: 35-45 Minutes',
    'cart.totals.title': 'Tactical Tally',
    'cart.totals.base': 'Payload Base Value',
    'cart.totals.factor': 'Distance Factor',
    'cart.totals.factorValue': 'Calculated next',
    'cart.totals.total': 'Total Due',
    'cart.totals.cta': 'Initiate Deployment',
    
    'order.header.title1': 'Order',
    'order.header.title2': 'Checkout',
    'order.header.subtitle': 'Finalize your acquisition parameters',
    'order.tabs.delivery': 'Delivery',
    'order.tabs.pickup': 'Pickup',
    'order.delivery.verifyZip': 'Verify Postal Code (Gießen Area)',
    'order.delivery.verifyBtn': 'Verify',
    'order.delivery.authorized': 'Authorized',
    'order.delivery.outOfZone': 'Out of Zone',
    'order.delivery.estimateLabel': 'Estimated Dispatch',
    'order.form.name': 'Full Name',
    'order.form.phone': 'Contact Signal',
    'order.form.address': 'Delivery Coordinates',
    'order.form.addressPlaceholder': 'Street, House, Floor...',
    'order.pickup.point': 'Extraction Point',
    'order.pickup.minutes': 'mins',
    'order.pickup.temporalWindow': 'Temporal Window',
    'order.summary.label': 'Total Acquisition Cost',
    'order.summary.fee': 'Logistic Fee',
    'order.summary.cta': 'Authorize Payment',
    'order.summary.error': 'Operational Failure: Inventory Empty',
    'order.success.title1': 'Order',
    'order.success.title2': 'Initiated',
    'order.success.description': 'The kitchen has received your ticket. We\'re firing up the ovens in Gießen!',
    'order.success.cta': 'Return to HQ',
    
    'login.modal.title': 'Authentication Required',
    'login.modal.id': 'Operational ID',
    'login.modal.idPlaceholder': 'Enter your ID',
    'login.modal.password': 'Security Clearance',
    'login.modal.passwordPlaceholder': 'Enter password',
    'login.modal.cta': 'Authorize Access',
    'login.modal.or': 'or continue with',
    
    'footer.description': 'Engineering the future of pizza in the heart of Gießen. High-intensity flavors, artisanal precision.',
    'footer.location.title': 'Location Base',
    'footer.hours.title': 'Service Hours',
    'footer.contact.title': 'Direct Contact',
    'footer.copyright': 'All Rights Reserved. Tactical Pizza Deployment.'
  },
  de: {
    'nav.home': 'Startseite',
    'nav.menu': 'Speisekarte',
    'nav.cart': 'Warenkorb',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.login': 'Anmelden',
    'nav.logout': 'Abmelden',
    'nav.orderStatus': 'Bestellstatus',

    'home.hero.subtitle': 'Das Beste in Gießen',
    'home.hero.title1': 'Probieren Sie die',
    'home.hero.title2': 'Intensität.',
    'home.hero.description': 'Authentische italienische Tradition verschmolzen mit modernen, kräftigen Aromen. Exzellenz aus dem Holzofen, direkt zu Ihnen nach Hause geliefert.',
    'home.hero.ctaMenu': 'Speisekarte öffnen',
    'home.hero.ctaStatus': 'Betriebsstatus',

    'home.about.title1': 'Das',
    'home.about.title2': 'Rally-Manifest',
    'home.about.p1': 'Bei Rally Fine Dine backen wir nicht nur Teig; wir konstruieren kulinarische Erlebnisse. Mitten im Herzen von Gießen geboren, war unsere Mission einfach: Hochintensive Aromen in eine Stadt zu bringen, die Exzellenz fordert.',
    'home.about.p2': 'Jede Pizza beginnt mit unserem charakteristischen 48-Stunden-fermentierten Teig, handgezogen und in 450°C heißen Holzöfen gebacken. Wir beziehen unsere Tomaten von den Hängen des Vesuvs und unseren Mozzarella von handwerklichen Erzeugern, denen das Handwerk genauso am Herzen liegt wie uns.',
    'home.about.stat1': 'Natürliche Zutaten',
    'home.about.stat2': 'Teigfermentation',

    'home.sectors.title1': 'Kulinarische',
    'home.sectors.title2': 'Sektoren',
    'home.sectors.description': 'Unsere spezialisierte Speisekarte ist in verschiedene Geschmackserlebnisse unterteilt.',
    'home.sectors.cta': 'Vollständigen Index anzeigen',
    'home.sectors.cat1': 'Handwerkliche Kruste',
    'home.sectors.cat2': 'Brennstoffzellen',
    'home.sectors.cat3': 'Italienischer Kern',
    'home.sectors.cat4': 'Limitierte Auflage',

    'home.signature.label': 'Wahl der Küchenaufklärung',
    'home.signature.title1': 'Cheese Burst',
    'home.signature.title2': 'Supreme',
    'home.signature.description': 'Unsere legendäre goldene Kruste, gefüllt mit geschmolzenem Premium-Mozzarella, der bei jedem Stück herausfließt. Entwickelt für maximale Dekadenz.',
    'home.signature.cta': 'Dieses Meisterwerk bestellen',

    'home.hours.title1': 'Betriebs-',
    'home.hours.title2': 'Zeiten',
    'home.hours.subtitle': 'Verfügbarkeit der Gießener Zentrale',
    'home.hours.monFri': 'Montag - Freitag',
    'home.hours.satSun': 'Samstag - Sonntag',
    'home.hours.holidays': 'Feiertage',
    'home.hours.holidayProtocol': 'Feiertagsprotokoll',
    'home.hours.holidayDescription': 'An den meisten Feiertagen mit geänderten Zeiten geöffnet (14:00 - 22:00). Nur am 24./25. Dezember geschlossen.',

    'home.location.title1': 'Standort-',
    'home.location.title2': 'Basis',
    'home.location.subtitle': 'Physischer Koordinatenzugriff',

    'home.reviews.title1': 'Verifiziertes',
    'home.reviews.title2': 'Feedback',
    'home.reviews.subtitle': 'Echtzeit-Kundenstatusberichte',
    'home.reviews.verified': 'Verifizierter Kunde',

    'menu.header.title1': 'Sektor-',
    'menu.header.title2': 'Inventar',
    'menu.header.subtitle': 'AUTHENTISCHE RALLY PIZZERIA SELEKTIONEN — HANDGEFERTIGT IN UNSERER GIEßENER EINRICHTUNG.',
    'menu.categories.all': 'Alle',
    'menu.item.fixedParameter': 'Fester Parameter',
    'menu.item.add': 'Zur Mission hinzufügen',
    'menu.item.added': 'Zur Bestellung bereitgestellt',
    'menu.cartBar.status': 'Nutzlastbereitschaft',
    'menu.cartBar.units': 'EINHEITEN AUSGEWÄHLT',
    'menu.cartBar.cta': 'Bestellung abschließen',

    'cart.header.title1': 'Bestell-',
    'cart.header.title2': 'Übersicht',
    'cart.header.subtitle': 'Überprüfen Sie Ihre Erfassungsliste',
    'cart.header.back': 'Zurück zum Menü',
    'cart.empty.title1': 'Auswahl',
    'cart.empty.title2': 'Leer',
    'cart.empty.description': 'Die taktische Warteschlange ist derzeit leer. Besuchen Sie das Menü, um den Einsatz zu starten.',
    'cart.empty.cta': 'Inventar erkunden',
    'cart.totals.logs': 'Sektor-Logistik',
    'cart.totals.coverage': 'Betriebliche Abdeckung: Aktiv',
    'cart.totals.estimate': 'Versandschätzung: 35-45 Minuten',
    'cart.totals.title': 'Taktische Abrechnung',
    'cart.totals.base': 'Nutzlast-Basiswert',
    'cart.totals.factor': 'Distanzfaktor',
    'cart.totals.factorValue': 'Wird als nächstes berechnet',
    'cart.totals.total': 'Gesamtbetrag',
    'cart.totals.cta': 'Einsatz einleiten',

    'order.header.title1': 'Bestell-',
    'order.header.title2': 'Checkout',
    'order.header.subtitle': 'Finalisieren Sie Ihre Erfassungsparameter',
    'order.tabs.delivery': 'Lieferung',
    'order.tabs.pickup': 'Abholung',
    'order.delivery.verifyZip': 'Postleitzahl prüfen (Bereich Gießen)',
    'order.delivery.verifyBtn': 'Prüfen',
    'order.delivery.authorized': 'Autorisiert',
    'order.delivery.outOfZone': 'Außerhalb der Zone',
    'order.delivery.estimateLabel': 'Voraussichtlicher Versand',
    'order.form.name': 'Vollständiger Name',
    'order.form.phone': 'Kontaktsignal',
    'order.form.address': 'Lieferkoordinaten',
    'order.form.addressPlaceholder': 'Straße, Hausnummer, Etage...',
    'order.pickup.point': 'Extraktionspunkt',
    'order.pickup.minutes': 'Min.',
    'order.pickup.temporalWindow': 'Zeitfenster',
    'order.summary.label': 'Gesamte Erfassungskosten',
    'order.summary.fee': 'Logistikgebühr',
    'order.summary.cta': 'Zahlung autorisieren',
    'order.summary.error': 'Betriebsfehler: Inventar leer',
    'order.success.title1': 'Bestellung',
    'order.success.title2': 'Eingeleitet',
    'order.success.description': 'Die Küche hat Ihr Ticket erhalten. Wir heizen die Öfen in Gießen an!',
    'order.success.cta': 'Zurück zum Hauptquartier',

    'login.modal.title': 'Authentifizierung erforderlich',
    'login.modal.id': 'Betriebs-ID',
    'login.modal.idPlaceholder': 'Geben Sie Ihre ID ein',
    'login.modal.password': 'Sicherheitsfreigabe',
    'login.modal.passwordPlaceholder': 'Passwort eingeben',
    'login.modal.cta': 'Zugriff autorisieren',
    'login.modal.or': 'oder weiter mit',

    'footer.description': 'Die Zukunft der Pizza im Herzen von Gießen gestalten. Hochintensive Aromen, handwerkliche Präzision.',
    'footer.location.title': 'Standortbasis',
    'footer.hours.title': 'Servicezeiten',
    'footer.contact.title': 'Direkter Kontakt',
    'footer.copyright': 'Alle Rechte vorbehalten. Taktischer Pizza-Einsatz.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
