type CookieKey = 'token-auth' | string & {}

export function getCookie(name: CookieKey): string | undefined {
   // console.log(name);   

   let matches = globalThis?.document?.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
   ));
   return matches ? decodeURIComponent(matches[1]) : undefined;
}