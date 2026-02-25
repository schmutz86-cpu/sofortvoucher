// Datenschutzerklärung (Privacy Policy) - Swiss Legal Requirement
export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Datenschutzerklärung</h1>
        
        <div className="space-y-6 text-slate-300">
          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">1. Übersicht</h2>
            <p className="mb-3">Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie über die Erhebung und Verarbeitung Ihrer Daten beim Besuch unserer Website und bei der Nutzung unserer Dienste.</p>
            <p><strong>Verantwortlicher:</strong> Philipp Schmutz, Guthabenkarten.ch, 5303 Würenlos, Schweiz, E-Mail: info@guthabenkarten.ch</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">2. Erhobene Daten</h2>
            <p className="mb-3">Wir erheben folgende Daten wenn Sie unsere Website nutzen:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>E-Mail-Adresse (bei Bestellungen)</li>
              <li>IP-Adresse (technisch bedingt)</li>
              <li>Browser-Typ und Version</li>
              <li>Bestelldaten (Produkt, Menge, Preis)</li>
              <li>Zahlungsdaten (über Stripe, siehe Abschnitt 4)</li>
            </ul>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">3. Zweck der Datenverarbeitung</h2>
            <p className="mb-3">Ihre Daten werden verwendet für:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Abwicklung Ihrer Bestellungen</li>
              <li>Lieferung der digitalen Guthabenkarten per E-Mail</li>
              <li>Kundenservice und Support</li>
              <li>Technischen Betrieb der Website</li>
              <li>Rechtliche Compliance</li>
            </ul>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">4. Zahlungsabwicklung (Stripe)</h2>
            <p className="mb-3">Für die Zahlungsabwicklung nutzen wir <strong>Stripe Payments Europe, Ltd.</strong>, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland.</p>
            <p className="mb-3">Stripe verarbeitet Ihre Zahlungsdaten (Kreditkarte, TWINT etc.) in unserem Auftrag. Wir erhalten keine vollständigen Zahlungsdaten, sondern nur Informationen über den Zahlungsstatus.</p>
            <p>Weitere Informationen: <a href="https://stripe.com/ch/privacy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">stripe.com/ch/privacy</a></p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">5. Cookies</h2>
            <p className="mb-3">Unsere Website verwendet technisch notwendige Cookies für:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Warenkorb-Funktionalität</li>
              <li>Sitzungsverwaltung</li>
              <li>Spracheinstellungen</li>
            </ul>
            <p className="mt-3">Wir verwenden keine Tracking-Cookies oder Analyse-Tools von Drittanbietern.</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">6. Speicherdauer</h2>
            <p className="mb-3">Ihre Daten werden gespeichert solange es für die Erfüllung des Vertrages oder gesetzliche Aufbewahrungspflichten erforderlich ist.</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bestelldaten: 10 Jahre (steuerrechtliche Aufbewahrungspflicht)</li>
              <li>Session-Daten: Bis zum Schließen des Browsers</li>
            </ul>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">7. Ihre Rechte</h2>
            <p className="mb-3">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Auskunft:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen</li>
              <li><strong>Berichtigung:</strong> Korrektur unrichtiger Daten</li>
              <li><strong>Löschung:</strong> Löschung Ihrer Daten (soweit gesetzlich zulässig)</li>
              <li><strong>Datenübertragbarkeit:</strong> Erhalt Ihrer Daten in maschinenlesbarem Format</li>
              <li><strong>Widerspruch:</strong> Widerspruch gegen die Verarbeitung</li>
            </ul>
            <p className="mt-3">Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter: info@guthabenkarten.ch</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">8. Datensicherheit</h2>
            <p>Wir verwenden SSL-Verschlüsselung (HTTPS) für die Übertragung Ihrer Daten. Unsere Systeme sind mit aktuellen Sicherheitsmassnahmen gegen unbefugten Zugriff geschützt.</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">9. Drittanbieter</h2>
            <p className="mb-3">Wir geben Ihre Daten nicht an Dritte weiter, ausser:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Zahlungsdienstleister (Stripe) zur Zahlungsabwicklung</li>
              <li>Cloud-Hosting (Vercel) für technischen Betrieb</li>
              <li>Guthabenkarten-Lieferanten zur Bestellabwicklung</li>
            </ul>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">10. Änderungen</h2>
            <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Die aktuelle Version ist stets auf dieser Seite verfügbar.</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">11. Kontakt</h2>
            <p>Bei Fragen zum Datenschutz erreichen Sie uns unter:</p>
            <p className="mt-2"><strong>E-Mail:</strong> info@guthabenkarten.ch</p>
          </section>
        </div>

        <p className="text-slate-500 text-sm mt-8 text-center">
          Stand: Februar 2026
        </p>
      </div>
    </div>
  );
}
