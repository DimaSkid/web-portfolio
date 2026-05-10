/* Simple client-side i18n: looks for elements with `data-i18n` and replaces textContent
   Usage: add data-i18n="key" and optional data-i18n-params='{"name":"Dimitri"}'
*/
(function(){
  function fetchJson(path){
    return fetch(path, {cache: 'no-store'}).then(function(r){ if(!r.ok) throw new Error('Failed to load '+path); return r.json(); });
  }

  function applyTranslations(translations){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if(!key) return;
      var txt = translations[key];
      if(txt === undefined) return;
      var paramsAttr = el.getAttribute('data-i18n-params');
      if(paramsAttr){
        try{ var params = JSON.parse(paramsAttr); txt = txt.replace(/%([^%]+)%/g, function(_,k){ return (params[k] !== undefined) ? params[k] : _; }); }catch(e){}
      }
      // support replacing attributes: data-i18n-attr="placeholder,title"
      var attrList = el.getAttribute('data-i18n-attr');
      if(attrList){
        attrList.split(',').forEach(function(attr){ el.setAttribute(attr.trim(), txt); });
      } else {
        el.textContent = txt;
      }
    });

    // set document lang
    if(translations['__locale']){
      document.documentElement.lang = translations['__locale'];
    }
  }

  function loadLocale(locale){
    return fetchJson('/i18n/'+locale+'.json').then(function(translations){
      // attach locale info for html lang
      translations['__locale'] = locale;
      applyTranslations(translations);
      // mark active flag
      document.querySelectorAll('.lang-link').forEach(function(a){
        a.classList.toggle('active-locale', a.getAttribute('data-locale')===locale);
      });
    }).catch(function(e){ console.warn(e); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var urlParams = new URLSearchParams(window.location.search);
    var urlLocale = urlParams.get('_locale');
    var saved = localStorage.getItem('locale');
    var initial = urlLocale || saved || document.documentElement.lang || 'fr';
    
    console.log('[i18n] Detected locale:', initial, '(url:', urlLocale, ', saved:', saved, ', html:', document.documentElement.lang, ')');
    
    loadLocale(initial).then(function(){
      console.log('[i18n] Applied translations for:', initial);
    });

    // intercept clicks on lang links
    document.querySelectorAll('.lang-link[data-locale]').forEach(function(a){
      a.addEventListener('click', function(ev){
        ev.preventDefault();
        var loc = a.getAttribute('data-locale');
        if(!loc) return;
        localStorage.setItem('locale', loc);
        loadLocale(loc).then(function(){
          console.log('[i18n] Changed to:', loc);
        });
        // update URL query param without reload
        try{
          var url = new URL(window.location.href);
          url.searchParams.set('_locale', loc);
          window.history.replaceState({}, '', url);
        }catch(e){}
      });
    });
  });
})();
