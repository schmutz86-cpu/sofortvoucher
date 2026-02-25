// AGB/Impressum Page - German
export default function AGBPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
        
        <div className="space-y-6 text-slate-300">
          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">§1 Geltungsbereich</h2>
            <p>Diese AGB gelten für alle Bestellungen über unseren Webshop guthabenkarten.ch.</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">§2 Lieferung</h2>
            <p>Die Lieferung erfolgt ausschliesslich per E-Mail innerhalb von 30-60 Sekunden nach Zahlungseingang.</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">§3 Preise</h2>
            <p>Alle Preise sind in Schweizer Franken (CHF) angegeben und verstehen sich inklusive Mehrwertssteuer.</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">§4 Rückgabe</h2>
            <p>Digitalcodes sind von der Rückgabe ausgeschlossen. Bei technischen Problemen wenden Sie sich an info@guthabenkarten.ch.</p>
          </section>

          <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">§5 Impressum</h2>
            <p className="mb-2"><strong>Anbieter:</strong> Guthabenkarten.ch</p>
            <p className="mb-2"><strong>E-Mail:</strong> info@guthabenkarten.ch</p>
            <p className="mb-2"><strong>Verantwortlich:</strong> Philipp Schmutz, Würenlos, Schweiz</p>
          </section>
        </div>
      </div>
    </div>
  );
}
