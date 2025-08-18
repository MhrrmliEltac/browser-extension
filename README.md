# Browser Extension Frontend

Bu layihə Next.js 15.4.6 istifadə edərək hazırlanmış browser extension frontend tətbiqidir.

## 🚀 Texnologiyalar

- **Next.js 15.4.6** - React framework
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible components
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📁 Layihə Strukturu

```
frontend-next.js/
├── src/                    # Əsas mənbə kodları
├── public/                 # Statik fayllar
├── .next/                  # Next.js build faylları
├── node_modules/           # Dependencies
├── package.json            # Layihə konfiqurasiyası
├── tsconfig.json           # TypeScript konfiqurasiyası
├── next.config.ts          # Next.js konfiqurasiyası
├── postcss.config.mjs      # PostCSS konfiqurasiyası
├── eslint.config.mjs       # ESLint konfiqurasiyası
└── components.json         # UI components konfiqurasiyası
```

## 🛠️ Quraşdırma

1. **Dependencies quraşdırın:**
   ```bash
   npm install
   ```

2. **Development server başladın:**
   ```bash
   npm run dev
   ```

3. **Production build:**
   ```bash
   npm run build
   ```

4. **Production server başladın:**
   ```bash
   npm start
   ```

## 📜 Mövcud Scriptlər

- `npm run dev` - Development server (Turbopack ilə)
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint yoxlaması

## 🔧 Konfiqurasiya

### TypeScript
Layihə TypeScript 5 istifadə edir və `tsconfig.json` faylında konfiqurasiya edilib.

### Tailwind CSS
Tailwind CSS 4 istifadə olunur və `postcss.config.mjs` faylında konfiqurasiya edilib.

### ESLint
ESLint 9 istifadə olunur və Next.js konfiqurasiyası ilə birlikdə işləyir.

## 🎨 UI Komponentlər

Layihə Radix UI komponentlərindən istifadə edir:
- Checkbox
- Label
- Və digər accessible komponentlər

## 📦 Əsas Dependencies

### Production Dependencies
- `next`: 15.4.6
- `react`: 19.1.0
- `react-dom`: 19.1.0
- `@radix-ui/react-checkbox`: ^1.3.3
- `@radix-ui/react-label`: ^2.1.7
- `axios`: ^1.11.0
- `zustand`: ^5.0.7
- `lucide-react`: ^0.539.0
- `sonner`: ^2.0.7

### Development Dependencies
- `typescript`: ^5
- `tailwindcss`: ^4
- `eslint`: ^9
- `@types/react`: ^19
- `@types/node`: ^20

## 🌐 Development

Development server `http://localhost:3000` ünvanında işləyəcək.

## 📝 Qeydlər

- Layihə Turbopack istifadə edir (daha sürətli development)
- TypeScript tam dəstəklənir
- Tailwind CSS 4 yeni versiyası istifadə olunur
- Radix UI komponentləri accessibility üçün optimallaşdırılıb
