/* eslint-disable no-var */

function themeScript() {
  try {
    var match = document.cookie.match(
      new RegExp('(^| )' + 'devetek-theme' + '=([^;]+)'),
    );
    var cookieTheme = match ? match[2] : null;

    // 2. Check system preference
    var supportDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    // 3. Apply theme
    if (cookieTheme === 'dark' || (!cookieTheme && supportDarkMode)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
}

export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: `(${themeScript.toString()})()` }}
    />
  );
}
