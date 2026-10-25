# Yayına Alma Rehberi (Vercel)

## Mevcut durum (25 Ekim 2026)

- Kod GitHub'da: https://github.com/yuzarsif7206-code/Nexva-web-site
- Site yayında: https://nexva-dijital.vercel.app (Vercel projesi: `nexva/nexva-dijital`)
- Vercel'e girilmiş değişkenler: `NEXT_PUBLIC_ALLOW_INDEXING`, `NEXT_PUBLIC_USE_PLACEHOLDER_WORKS`, `GMAIL_USER`, `LEAD_TO_EMAIL`, `IP_HASH_SALT`, `CRON_SECRET`.
  `NEXT_PUBLIC_SITE_URL` verilmedi; site adresini Vercel'den otomatik alır.
- **Eksik:** `GMAIL_APP_PASSWORD` (README 2.1) ve isteğe bağlı Supabase değişkenleri. Bunlar girilene kadar form, müşteriye WhatsApp/Ara yedeğini gösterir.
- **Otomatik yayın kapalı:** Vercel hesabında GitHub bağlantısı yok. Açmak için: Vercel > sağ üst profil > **Account Settings > Authentication > GitHub > Connect**, sonra proje > **Settings > Git > Connect Git Repository** > `Nexva-web-site`. Bundan sonra her `git push` siteyi kendiliğinden günceller.

Değişken ekledikten sonra: Vercel > proje > **Deployments** > en üstteki > **⋯ > Redeploy**.

Aşağıdaki A–B adımları zaten yapıldı; yeni bir hesapta kurulum gerekirse başvuru için duruyor.

---

Toplam süre: yaklaşık 30–45 dakika. Kod tarafı hazır; aşağıdaki adımlar yalnızca sizin hesaplarınızla yapılabilecek işlerdir.

## A. Kodu GitHub'a yükleyin

1. https://github.com/signup adresinden ücretsiz hesap açın (varsa giriş yapın).
2. Sağ üstte **+ > New repository**. Ad: `nexva-dijital`, görünürlük: **Private**. "Add a README" vb. hiçbir kutuyu işaretlemeyin. **Create repository**.
3. Bilgisayarda `nexva-dijital` klasöründe terminal açıp (VS Code'da Terminal > New Terminal) şunu çalıştırın. `KULLANICI_ADINIZ` kısmını kendi GitHub kullanıcı adınızla değiştirin:

   ```bash
   git remote add origin https://github.com/KULLANICI_ADINIZ/nexva-dijital.git
   git push -u origin main
   ```

   İlk seferde tarayıcıda GitHub girişi açılır; onaylayın.

## B. Vercel'de projeyi oluşturun

4. https://vercel.com/signup adresinde **Continue with GitHub** ile hesap açın (Hobby planı ücretsiz).
5. **Add New… > Project**, listeden `nexva-dijital` deposunu seçip **Import**.
6. Framework otomatik **Next.js** gelir. Ayarlara dokunmayın, **Environment Variables** bölümünü açın ve şunları girin:

   | Ad | Değer |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | şimdilik `https://nexva-dijital.vercel.app` (8. adımda kesinleşir) |
   | `NEXT_PUBLIC_ALLOW_INDEXING` | `false` |
   | `GMAIL_USER` | `nexvadigital@gmail.com` |
   | `GMAIL_APP_PASSWORD` | Gmail Uygulama Şifresi (README 2.1) |
   | `LEAD_TO_EMAIL` | `nexvadigital@gmail.com` |
   | `SUPABASE_URL` | Supabase Project URL (README 2.2, isteğe bağlı) |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role anahtarı (isteğe bağlı) |
   | `IP_HASH_SALT` | rastgele uzun metin, ör. https://generate-secret.vercel.app/32 |
   | `CRON_SECRET` | başka bir rastgele uzun metin |

7. **Deploy**'a basın. 1–2 dakikada site `https://<proje-adı>.vercel.app` adresinde açılır.
8. Vercel'in verdiği adresi kontrol edin. `NEXT_PUBLIC_SITE_URL` farklıysa **Settings > Environment Variables**'tan düzeltin, ardından **Deployments > en üstteki > ⋯ > Redeploy**. (`NEXT_PUBLIC_` ile başlayan değerler yalnızca yeniden derlemede uygulanır.)

## C. Test

9. Telefonunuzdan siteyi açın, `/teklif-al` üzerinden bir deneme talebi gönderin.
   - nexvadigital@gmail.com'a "Yeni Talep: …" konulu e-posta düşmeli.
   - Supabase kurduysanız **Table Editor > leads** tablosunda kayıt görünmeli.
   - E-posta gelmezse: Vercel > proje > **Logs** sekmesinde `mail` hatasına bakın (çoğunlukla uygulama şifresi yanlış girilmiştir).
10. Instagram uygulamasında kendi profil bağlantınızdan açıp "Ara" ve "WhatsApp" butonlarını deneyin.

## D. Alan adı bağlama (alan adını aldığınızda)

11. Alan adını herhangi bir firmadan alın (ör. `nexvadijital.com`).
12. Vercel > proje > **Settings > Domains > Add**: `nexvadijital.com` yazın. "www" yönlendirmesini önerdiği gibi ekleyin.
13. Vercel'in gösterdiği DNS kayıtlarını alan adı firmanızın paneline girin. Genellikle:
    - `@` için **A** kaydı → `76.76.21.21`
    - `www` için **CNAME** kaydı → `cname.vercel-dns.com`

    (Vercel ekranındaki değerler farklıysa onları kullanın.) Yayılması birkaç dakika ile birkaç saat sürebilir; Vercel SSL sertifikasını otomatik kurar.
14. **Settings > Environment Variables**: `NEXT_PUBLIC_SITE_URL` = `https://nexvadijital.com`, `NEXT_PUBLIC_ALLOW_INDEXING` = `true`. Sonra **Redeploy**.
15. https://search.google.com/search-console adresinde alan adınızı ekleyin, **Sitemaps** bölümüne `sitemap.xml` yazıp gönderin.
16. Yayına almadan önce KVKK sayfasındaki "hukuki danışman" notunu kaldırın: `app/(site)/kvkk/page.tsx` (metni bir hukukçuya okutun).
17. Instagram biyografinize site bağlantısını ekleyin.

## Sonraki güncellemeler

Kodda değişiklik yapıp `git push` ettiğinizde Vercel siteyi otomatik yeniden yayınlar.
