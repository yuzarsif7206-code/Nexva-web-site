# Nexva Digital — Web Sitesi

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 · Vercel

Sayfalar: Ana sayfa, `/hizmetler`, `/isler` (+ detay), `/hakkimizda`, `/teklif-al` (çok adımlı teklif formu), `/kvkk`, 404.
Teklif formu `/api/lead` uç noktasına gider: talep Supabase'e kaydedilir ve nexvadigital@gmail.com adresine e-posta düşer.

---

## 1. Bilgisayarda çalıştırma

```bash
npm install
cp .env.example .env.local     # Windows: copy .env.example .env.local
npm run dev                    # http://localhost:3000
```

Kontroller:

```bash
npm run build    # üretim derlemesi
npm run lint     # kod denetimi
```

---

## 2. İletişim formunun çalışması için gerekenler

**Şu anki mod: WhatsApp.** Teklif formu soruları sorar, son adımda cevaplar hazır mesaja dönüşür ve müşteri alttaki **WhatsApp'tan Gönder** ya da **Bizi Ara** butonunu kullanır. Bu modda sunucuya hiçbir şey gönderilmez, ek ayar gerekmez.

**E-posta moduna geçmek için:** aşağıdaki Gmail Uygulama Şifresini girin ve Vercel'e `NEXT_PUBLIC_FORM_MODE=email` ekleyip yeniden yayınlayın. O zaman form `/api/lead` uç noktasına gönderilir.

E-posta modunda form, ortam değişkenleri girilmeden de açılır. Gönderim başarısız olursa müşteri hazır mesajlı WhatsApp ve "Bizi Ara" butonlarını görür, yani talep kaybolmaz. Talebin size e-postayla gelmesi için en az **Gmail Uygulama Şifresi** gereklidir.

| Değişken | Zorunlu mu | Ne işe yarar |
|---|---|---|
| `GMAIL_USER` | Evet | Gönderen Gmail hesabı (nexvadigital@gmail.com) |
| `GMAIL_APP_PASSWORD` | Evet | Gmail Uygulama Şifresi (16 hane) |
| `LEAD_TO_EMAIL` | Hayır | Talebin gideceği adres (boşsa `GMAIL_USER`) |
| `SUPABASE_URL` | Önerilir | Talep kaydı, hız sınırı, otomatik yeniden deneme |
| `SUPABASE_SERVICE_ROLE_KEY` | Önerilir | Supabase gizli anahtarı (asla paylaşmayın) |
| `IP_HASH_SALT` | Önerilir | Rastgele uzun metin (IP adresi saklanmaz, özeti saklanır) |
| `CRON_SECRET` | Önerilir | Rastgele uzun metin (günlük yeniden deneme görevi için) |
| `NEXT_PUBLIC_SITE_URL` | Evet | Sitenin adresi, sonda `/` olmadan |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Evet | Alan adı bağlanana kadar `false` |
| `NEXT_PUBLIC_USE_PLACEHOLDER_WORKS` | Hayır | Yalnızca tasarım incelemesi için `true` |

### 2.1 Gmail Uygulama Şifresi

1. nexvadigital@gmail.com ile giriş yapın: https://myaccount.google.com/security
2. **2 Adımlı Doğrulama**'yı açın (kapalıysa uygulama şifresi seçeneği görünmez).
3. https://myaccount.google.com/apppasswords adresine gidin, ad olarak "Nexva Web" yazın, **Oluştur**'a basın.
4. Çıkan 16 haneli şifreyi `GMAIL_APP_PASSWORD` olarak girin (boşluklu da yazabilirsiniz).
5. Telefonunuzdaki Gmail uygulamasında bu hesap için bildirimleri açın.

### 2.2 Supabase (önerilir)

1. https://supabase.com adresinde ücretsiz hesap ve yeni proje açın (bölge: Frankfurt, `eu-central-1`).
2. **SQL Editor > New query**: `supabase/schema.sql` dosyasının içeriğini yapıştırıp **Run**.
3. **Project Settings > API**: `Project URL` değerini `SUPABASE_URL`, `service_role` anahtarını `SUPABASE_SERVICE_ROLE_KEY` olarak girin.
4. Talepleri **Table Editor > leads** tablosunda görürsünüz.

---

## 3. İçerik güncelleme

- **Telefon, e-posta, adres, saatler, Instagram, LinkedIn:** `lib/site-config.ts`
- **Tüm metinler:** `content/copy.ts`, `content/services.ts`, `content/packages.ts`, `content/projects.ts`
- **Fiyatlar (sitede görünmez, yalnızca size gelen e-postada):** `server/internal-pricing.ts`
- **Logo:** `public/brand/nexva-logo.webp` (navbar/footer) ve `nexva-logo.png` (512 px): resmi logonun arka planı şeffaflaştırılmış, tasarımı değiştirilmemiş kopyaları. Sekme ikonları `app/icon.png` ve `app/apple-icon.png` aynı logoyu koyu zemin üzerinde kullanır.
- **Hero'daki 3 kutu:** kamera lensi illüstrasyonu, laptop fotoğrafı (`public/hero/laptop.webp`, marka paletine tonlandı) ve tasarım ekranı illüstrasyonu. İllüstrasyonlar: `components/art/TileArt.tsx`. Gerçek fotoğrafa geçmek için 320×320 AVIF/WebP (kırmızı-siyah tek ton, ≤12 KB) dosyaları `public/hero/` altına koyup `content/hero-tiles.ts` içinde `src: "/hero/cekim.avif"` gibi doldurun; `src` varsa illüstrasyon yerine fotoğraf görünür.
- **İşler (portföy):** Görselleri `public/works/<slug>/` altına koyun (AVIF/WebP, en geniş kenar 1600 px), `content/works.ts` içindeki `works` dizisine kayıt ekleyin:

```ts
{
  slug: "ornek-marka-reklam-filmi",
  title: "Örnek Marka Reklam Filmi",
  category: "uretim",                       // uretim | performans | marka | sosyal-web
  services: ["reklam-filmi", "dron-cekimi"],
  year: 2026,
  summary: "1-2 cümlelik özet.",
  cover: { src: "/works/ornek-marka-reklam-filmi/cover.avif", width: 1600, height: 900, alt: "..." },
  gallery: [{ src: "/works/ornek-marka-reklam-filmi/01.avif", width: 1600, height: 900, alt: "..." }],
}
```

İş eklenene kadar `/isler`'de illüstrasyonlu "Neler üretiyoruz" vitrini ve Instagram yönlendirmesi, ana sayfada Instagram yönlendirmesi görünür (sahte iş gösterilmez). İlk gerçek iş eklendiğinde vitrin yerini otomatik olarak iş galerisine bırakır.

---

## 4. Yayına alma (Vercel)

Adım adım rehber: **[DEPLOY.md](DEPLOY.md)**

---

## 5. Teknik notlar

- **Fiyat sızıntısı yok:** fiyatlar `server-only` dosyasında; istemci paketi ve HTML çıktısı derleme sonrası taranarak doğrulandı.
- **Hero shader:** kütüphanesiz WebGL2, `load` sonrası boşta kalma anında ayrı parça olarak yüklenir. Veri tasarrufu, yavaş ağ, düşük bellek veya WebGL2 yoksa hiç indirilmez ve CSS degradesi görünür. Görünüm ayarları `components/hero/shader.ts` içindeki sabitlerdedir.
- **Animasyon:** kaydırma belirmeleri tek IntersectionObserver + CSS ile yapılır. Framer Motion yalnızca `/teklif-al` sayfasında yüklenir. `prefers-reduced-motion` açıksa tüm hareket kapanır.
- **Spam:** gizli honeypot alanı, 3 saniyeden hızlı gönderim engeli, IP özeti başına 10 dakikada 5 talep sınırı.
- **SEO:** `NEXT_PUBLIC_ALLOW_INDEXING=false` iken tüm sayfalar `noindex`, `robots.txt` her şeyi kapatır, `sitemap.xml` boştur.
