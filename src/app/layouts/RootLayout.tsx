// // src/layouts/RootLayout.tsx
// import { Outlet } from 'react-router';
// import { LanguageProvider } from '../../context/LanguageContext';
// // import { useLanguage } from '../../context/LanguageContext';

// export function RootLayout() {
//   return (
//     <LanguageProvider>
//       <Outlet />
//     </LanguageProvider>
//   );
// }
// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router';
import { LanguageProvider } from '../../context/LanguageContext';
import { UserProvider } from '../../context/UserContext';

export function RootLayout() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </LanguageProvider>
  );
}