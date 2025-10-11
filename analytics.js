
(function() {
    var gaScript = document.createElement('script')
    gaScript.async = true
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-GWPRJ1ZQ10'
    var firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(gaScript, firstScript)

    window.dataLayer = window.dataLayer || []
    function gtag() {
        dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'G-GWPRJ1ZQ10')
})()
