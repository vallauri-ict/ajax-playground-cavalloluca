# **`CAVALLO LUCA`:horse:**
### Ajax - Finance 
Lo scopo di questo esercizio è quello di interrogare in modalità Ajax una API pubblica di nome “Alpha Vantage”, che dispone di moltissime chiamate per ricevere dati relativi a transazioni borsistiche.

#### Alcuni cenni teorici:

Json-Server è un tool NodeJS che permette di simulare l'esistenza di un set di API in modalità REST-JSON, basato su un semplice file di configurazione contenente dati pre-formattati che consentano il testing delle applicazioni. Il prerequisito per il suo utilizzo è l'installazione di NodeJS, che vi consiglio in versione LTS (Long-Term Support).

ChartJS è una libreria JavaScript responsive, open-source e molto flessibile, che permette di creare semplicemente grafici efficaci, alimentando il motore di rendering con dati e opzioni in formato JSON.

Per evitare problemi di CORS e simulare correttamente la pubblicazione reale del nostro sito, viene utilizzato il modulo NodeJS "http-server", che consente di attivare con estrema semplicità un server http in localhost ed è più snello ed immediato rispetto a XAMPP.

- [x] visualizzare i dati di un'azienda scelta da menù a tendina
- [x] visualizzare i dati di una o più aziende scelte dalla barra di ricerca (inserire almeno due caratteri)
- [x] possibilità di visionare grafici relativi ai rank giornalieri e di eseguirne il download
- [ ] ~~upload grafico su Google Drive~~

- **GLOBAL_QUOTE**: a lightweight alternative to the time series APIs, this service returns the latest price and volume information for a security of your choice.
- **SYMBOL_SEARCH**: the Search Endpoint returns the best-matching symbols and market information based on keywords of your choice. The search results also contain match scores that provide you with the full flexibility to develop your own search and filtering logic.

Funzione per il download del grafico:
```_btnDownload.prop("href", myChart.toBase64Image());```

I dati relativi ai vari rank giornalieri vengono presi da un file json e ottenuti simulando un'API tramite json-server. Il codice è il seguente:

``` $.getJSON("http://localhost:3000/chart", function (dataChart) { 
      $.getJSON("http://localhost:3000/sectors", function (dataSectors) 
        { ... 
```

 How to contact me:
 
Contacts | Links 
------------ | -------------
School mail | l.cavallo.0928@vallauri.edu
Private mail | caval.luca02@gmail.com
Instagram | www.instagram.com/lucacavallo10_
Website | http://lukii.altervista.org/

**4B INF IIS G.VALLAURI**  www.vallauri.edu

