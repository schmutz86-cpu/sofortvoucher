import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum | sofortvoucher.de',
  description: 'Impressum und rechtliche Informationen zu sofortvoucher.de',
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Impressum</h1>

        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700 text-slate-300 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              sofortvoucher.de<br />
              [Firmenname wird nach Registrierung eingetragen]<br />
              [Adresse wird nach Registrierung eingetragen]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Kontakt</h2>
            <p>
              E-Mail: info@sofortvoucher.de<br />
              Telefon: [Wird nach Verfügbarkeit eingetragen]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [Wird nach Registrierung beim Finanzamt eingetragen]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              [Name des Verantwortlichen]<br />
              [Anschrift]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-2">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>

        <p className="text-slate-500 text-sm mt-8">
          Stand: Februar 2026
        </p>
      </div>
    </div>
  );
}
