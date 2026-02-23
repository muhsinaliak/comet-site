# Comet Control - Proje İlerleme Notları

## Proje Hakkında
- Next.js 16, TypeScript, Tailwind CSS v4
- next-intl (TR/EN çoklu dil)
- Resend (email)
- Zustand (sepet durumu)
- React Three Fiber (3D ürün görüntüleyici)
- Dosya tabanlı ürün depolama (src/data/products.json)
- Cookie tabanlı admin kimlik doğrulama

## Canlı Ortam
- **URL:** https://cometcontrol.com
- **VPS IP:** 46.224.182.40
- **Docker Compose:** /root/mqtt/docker-compose.yml
- **Site klasörü:** /root/mqtt/comet_site/
- **Nginx config:** /root/mqtt/nginx/conf.d/cometcontrol.conf
- **SSL:** Let's Encrypt, otomatik yenileme cron'da (her gece 03:00)

## Docker Servisleri
- `comet_site` - Next.js sitesi (port 3000, iç)
- `mqtt_broker` - Eclipse Mosquitto (port 1883)
- `nginx` - Reverse proxy (port 80/443)
- `certbot` - SSL sertifika yönetimi

## Ortam Değişkenleri (/root/mqtt/comet_site/.env.local)
```
ADMIN_PASSWORD=Thelastus1995
RESEND_API_KEY=re_Xi12aJHQ_...
CONTACT_EMAIL=muhsinaliak@gmail.com
EMAIL_FROM=Comet Control <noreply@cometcontrol.com>
NEXT_PUBLIC_SITE_URL=https://cometcontrol.com
```

## Tamamlanan İşler

### Güvenlik & Production Hazırlığı
- [x] Rate limiting oluşturuldu (src/lib/rate-limit.ts)
- [x] Admin auth'ta hardcoded şifre kaldırıldı, rate limit eklendi
- [x] Contact API: Resend entegrasyonu + Zod validasyonu
- [x] Quote API: Resend entegrasyonu + Zod validasyonu
- [x] Upload API: MIME tipi kontrolü, path traversal koruması
- [x] Güvenlik header'ları eklendi (next.config.ts)
- [x] productionBrowserSourceMaps: false
- [x] .env.example oluşturuldu
- [x] .gitignore oluşturuldu

### SEO
- [x] sitemap.ts oluşturuldu
- [x] robots.ts oluşturuldu
- [x] layout.tsx: metadataBase, OpenGraph meta eklendi

### Deployment
- [x] output: "standalone" eklendi (next.config.ts)
- [x] Dockerfile oluşturuldu (/root/mqtt/comet_site/Dockerfile)
- [x] Docker Compose güncellendi (mqtt + site + nginx + certbot)
- [x] DNS: Veridyen'de A kayıtları eklendi (@ ve www → 46.224.182.40)
- [x] SSL sertifikası alındı (Let's Encrypt)
- [x] HTTPS yönlendirmesi aktif
- [x] SSL otomatik yenileme cron'a eklendi
- [x] GitHub: https://github.com/muhsinaliak/comet-site

### Hata Düzeltmeleri
- [x] TypeScript: quote/route.ts array destructuring fix
- [x] Resend lazy init (build-time crash önlendi)
- [x] Ürün sayfası: generateStaticParams kaldırıldı, force-dynamic eklendi

## Bekleyen İşler

### Kritik
- [ ] Admin şifresi çalışmıyor — container'daki env doğru (Thelastus1995) ama giriş olmuyor. Muhtemelen .env.local'da boşluk/satır sonu sorunu. `cat -A /root/mqtt/comet_site/.env.local` ile kontrol edilmeli.
- [ ] Ürün sayfası fix'i (force-dynamic) VPS'e deploy edilmeli:
  ```
  # Kendi bilgisayarında:
  git push origin main
  # VPS'te:
  cd /root/mqtt/comet_site && git pull origin main
  cd /root/mqtt && docker compose up -d --build comet-site
  ```

### İsteğe Bağlı
- [ ] Admin panelde ürün ekleme/düzenleme test edilmeli
- [ ] İletişim formu ve teklif formu email testi yapılmalı
- [ ] Resend'de cometcontrol.com domain doğrulandı, email gönderimi test edilmeli

## Güncelleme Akışı
Kod değişikliği yapıldığında:
```bash
# Kendi bilgisayarında
git add .
git commit -m "açıklama"
git push origin main

# VPS'te
cd /root/mqtt/comet_site && git pull origin main
cd /root/mqtt && docker compose up -d --build comet-site
```
