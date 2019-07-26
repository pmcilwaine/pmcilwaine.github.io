function loadDisqus() {
    var disqus = document.querySelector('.js-discuss');
    if (!disqus) {
        return;
    }

    var pageUrl = disqus.getAttribute('data-disqus-page-url');
    var pageIdentifier = disqus.getAttribute('data-disqus-page-identifier');
    var pageTitle = disqus.getAttribute('data-disqus-page-title');

    if (!pageUrl || !pageIdentifier || !pageTitle) {
        return;
    }

    window.disqus_config = function () {
        this.page = this.page || {};
        this.page.url = pageUrl;
        this.page.identifier = pageIdentifier;
        this.page.title = pageTitle;
    };

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://pmcilwaine.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(script);
}

(function () {
    window.addEventListener('DOMContentLoaded', function () {
        loadDisqus();
    });
})();