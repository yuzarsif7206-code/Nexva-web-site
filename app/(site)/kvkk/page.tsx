import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/seo";
import { SITE, fullAddress } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "Nexva Digital teklif formu aracılığıyla işlenen kişisel veriler hakkında 6698 sayılı KVKK kapsamında aydınlatma metni.",
  path: "/kvkk",
});

const H2 = "display mt-12 text-[1.75rem] leading-none md:text-[2rem]";

export default function KvkkPage() {
  return (
    <>
      <PageIntro eyebrow="YASAL" title="KVKK AYDINLATMA METNİ" />
      <section aria-label="Aydınlatma metni" className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="max-w-3xl text-[1.0625rem] leading-[1.75] text-fg/85 [&_li]:mt-2 [&_p]:mt-4 [&_strong]:text-fg [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
            <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
              Bu metin yayına almadan önce hukuki danışman tarafından gözden geçirilmelidir.
            </p>

            <h2 className={H2}>1. Veri sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca kişisel verileriniz, veri
              sorumlusu sıfatıyla <strong>Nexva Digital</strong> tarafından aşağıda açıklanan kapsamda işlenmektedir.
            </p>
            <ul>
              <li>Adres: {fullAddress}</li>
              <li>
                Telefon: <a className="underline underline-offset-4 hover:text-accent" href={`tel:${SITE.phone.tel}`}>{SITE.phone.display}</a>
              </li>
              <li>
                E-posta: <a className="underline underline-offset-4 hover:text-accent" href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>

            <h2 className={H2}>2. İşlenen kişisel veriler</h2>
            <p>Teklif formu aracılığıyla yalnızca sizin paylaştığınız şu veriler işlenir:</p>
            <ul>
              <li>Kimlik bilgisi: ad soyad</li>
              <li>İletişim bilgisi: cep telefonu numarası, (seçerseniz) e-posta adresi</li>
              <li>Firma adı (isteğe bağlı)</li>
              <li>Talep bilgileri: ihtiyaç duyduğunuz hizmet, markanızın aşaması, bütçe aralığı, zamanlama ve notunuz</li>
              <li>
                İşlem güvenliği bilgisi: kötüye kullanımı önlemek için IP adresinizin geri döndürülemez biçimde
                özetlenmiş (hash) hali
              </li>
            </ul>

            <h2 className={H2}>3. İşleme amaçları</h2>
            <ul>
              <li>Teklif talebinizin değerlendirilmesi ve size dönüş yapılması</li>
              <li>Talebinize uygun hizmet kapsamının ve teklifin hazırlanması</li>
              <li>Form güvenliğinin sağlanması ve istenmeyen (spam) gönderimlerin engellenmesi</li>
            </ul>

            <h2 className={H2}>4. Hukuki sebep ve toplama yöntemi</h2>
            <p>
              Verileriniz, web sitemizdeki teklif formu aracılığıyla elektronik ortamda toplanır. KVKK m.5/2-c
              (bir sözleşmenin kurulmasıyla doğrudan ilgili olması), m.5/2-f (meşru menfaat) ve formda verdiğiniz
              onaya dayanılarak işlenir.
            </p>

            <h2 className={H2}>5. Aktarım</h2>
            <p>
              Verileriniz üçüncü kişilere satılmaz ve pazarlama amacıyla paylaşılmaz. Talebin iletilmesi ve
              saklanması için hizmet aldığımız barındırma, veritabanı ve e-posta altyapısı sağlayıcılarına (yurt
              dışında sunucuları bulunabilen) yalnızca bu amaçla sınırlı olarak aktarılabilir.
            </p>

            <h2 className={H2}>6. Saklama süresi</h2>
            <p>
              Verileriniz talebinizin değerlendirilmesi için gereken süre boyunca ve her halükârda en fazla 2 yıl
              saklanır. Süre sonunda silinir, yok edilir veya anonim hale getirilir.
            </p>

            <h2 className={H2}>7. Haklarınız (KVKK m.11)</h2>
            <p>Veri sorumlusuna başvurarak:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
              <li>KVKK m.7&apos;deki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
              <li>Düzeltme ve silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
              <li>
                Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz
                etme,
              </li>
              <li>Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
            </ul>
            <p>haklarına sahipsiniz.</p>

            <h2 className={H2}>8. Başvuru</h2>
            <p>
              Taleplerinizi <a className="underline underline-offset-4 hover:text-accent" href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
              adresine e-posta ile iletebilirsiniz. Başvurunuz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
