Integrator Guide:

index.html filen er sat op med Scrip Configuration fra PayPal dokumentationen
Link: https://developer.paypal.com/sdk/js/configuration/#query-parameters

Main Scriptet (Første Script) skal forstås således at: 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID'
Her er så også tilføjes den lokale valuta samt lokation '&currency=DKK&locale=da_DK'

Det andet script indeholder et hard coded element, som indeholder en værdi af 10 kroner.
Derudover også en indikation på hvis betalingen er udført eller fejlet.


User Guide:

Setup: 
cd ind i denne mappe og kør en lokal server: python3 -m http.server 8000
Åben en brower og følg url: http://localhost:8000/index.html - vigtigt at det er Http (IKKE HTTPS) og at Porten er den samme (8000)

For at teste PayPal provider, skal brugeren ind på: 
link: https://developer.paypal.com/dashboard > accounts(personal)
Hvor den personal indeholder en email og et pw til at teste impementationen.